import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
    fetchProductById, 
    fetchEcomProductById, 
    buySecondHandProduct, 
    buyEcomProduct 
} from '../services/api';
import BuyConfirmationModal from '../components/BuyConfirmationModal';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const isEcom = typeParam === 'ecom';

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const conditionMapping = {
    NEW: "Neu", LIKE_NEW: "Wie neu", EXCELLENT: "Exzellent",
    MAX_GOOD: "Sehr gut", GOOD: "Gut", USED: "Gebraucht", DEFECT: "Defekt"
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (!id) throw new Error("Keine Produkt-ID gefunden.");

        let data = null;

        if (isEcom) {
            console.log("Lade E-Commerce Produkt mit ID:", id);
            data = await fetchEcomProductById(id);
        } else {
            console.log("Lade Second-Hand Produkt mit ID:", id);
            data = await fetchProductById(id);
        }

        if (data) {
            setProduct(data);
        } else {
            setError("Keine Daten erhalten.");
        }

      } catch (err) {
        console.error("Fehler in ProductDetailsPage:", err);
        setError("Konnte Produkt nicht laden.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, isEcom]);

  const handleConfirmPurchase = async (selectedPaymentMethod) => {
    setIsProcessing(true);
    try {
        const currentProductId = product.productId || product.id;

        if (isEcom) {
            await buyEcomProduct(currentProductId, 1, selectedPaymentMethod);
        } else {
            await buySecondHandProduct(currentProductId, selectedPaymentMethod);
        }

        setIsBuyModalOpen(false);
        alert("Kauf erfolgreich! Vielen Dank für deine Bestellung.");
        navigate('/account'); 

    } catch (err) {
        console.error("Kauf fehlgeschlagen:", err);
        alert("Fehler beim Kauf: " + err.message);
        setIsBuyModalOpen(false);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleOpenBuyModal = () => {
    const username = localStorage.getItem("username");
    if (!username) {
        alert("Bitte logge dich ein, um zu kaufen.");
        return;
    }
    setIsBuyModalOpen(true);
  };

  if (isLoading) return (
    <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl font-bold text-stone-400 animate-pulse">Lade Produktdetails...</p>
    </div>
  );
  
  if (error || !product) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-stone-800 mb-4">Hoppla!</h2>
        <p className="text-red-600 mb-6 font-medium">{error || "Produkt nicht gefunden"}</p>
        <Link to={isEcom ? "/shop" : "/marketplace"} className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
            Zurück zur Übersicht
        </Link>
    </div>
  );

  const priceFormatted = product.price ? (product.price / 100).toFixed(2) : "0.00";
  const fallbackImage = "https://placehold.co/600x600?text=Kein+Bild";
  
  const mainImage = (product.images && Array.isArray(product.images) && product.images.length > 0) 
    ? product.images[0].imageUrl 
    : fallbackImage;

  const displayBadge = isEcom 
    ? (product.stock ? `Auf Lager: ${product.stock} Stk.` : "Neuware")
    : (product.condition ? (conditionMapping[product.condition] || product.condition) : 'Zustand unbekannt');

  const backLink = isEcom ? "/shop" : "/marketplace";
  const backLabel = isEcom ? "Zurück zum Shop" : "Zurück zum Marktplatz";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in zoom-in duration-300">
      
      <BuyConfirmationModal 
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onConfirm={handleConfirmPurchase}
        product={product}
        isProcessing={isProcessing}
      />

      <div className="flex justify-between items-center mb-8">
          <Link to={backLink} className="text-stone-500 hover:text-orange-600 inline-flex items-center gap-2 font-medium transition-colors group">
            <span>←</span> <span className="group-hover:underline">{backLabel}</span>
          </Link>

          <Link to="/watchlist" className="text-stone-500 hover:text-orange-600 inline-flex items-center gap-2 font-medium transition-colors group">
            <span className="group-hover:underline">Zurück zur Merkliste</span> <span>→</span>
          </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
        
        {/* BILD */}
        <div className="aspect-square bg-stone-50 rounded-2xl overflow-hidden relative shadow-inner group">
          <img 
            src={mainImage} 
            alt={product.title || "Produktbild"} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.target.src = fallbackImage; }} 
          />
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isEcom ? 'bg-stone-900 text-white' : 'bg-orange-100 text-orange-800'}`}>
              {displayBadge}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight">
            {product.title || "Unbekanntes Produkt"}
          </h1>
          
          <div className="prose prose-stone mb-10 text-stone-600 leading-relaxed text-lg">
            <p>{product.description || "Keine Beschreibung verfügbar."}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-100 pt-8 mt-auto gap-6">
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-wide mb-1">Preis</p>
              <p className="text-4xl font-black text-orange-600">{priceFormatted} €</p>
            </div>
            
            <button 
                onClick={handleOpenBuyModal}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95 text-center ${
                    isEcom 
                        ? 'bg-stone-900 text-white hover:bg-stone-700 hover:shadow-stone-900/30' 
                        : 'bg-orange-600 text-white hover:bg-orange-500 hover:shadow-orange-600/30'
                }`}
            >
              Jetzt Kaufen
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}