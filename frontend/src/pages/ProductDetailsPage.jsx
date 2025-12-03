import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log("Starte Abruf für Produkt ID:", id);

        if (!id) throw new Error("Keine Produkt-ID in der URL gefunden.");

        const data = await fetchProductById(id);
        
        console.log("Empfangene Produktdaten:", data);

        if (data) {
            setProduct(data);
        } else {
            setError("Keine Daten erhalten.");
        }

      } catch (err) {
        console.error("Fehler in ProductDetailsPage:", err);
        setError("Konnte Produkt nicht laden. (Details in Konsole)");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (isLoading) return (
    <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-xl font-bold text-stone-400 animate-pulse">Lade Produktdetails...</p>
    </div>
  );
  
  if (error || !product) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-stone-800 mb-4">Hoppla!</h2>
        <p className="text-red-600 mb-6 font-medium">{error || "Produkt nicht gefunden"}</p>
        <Link to="/marketplace" className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
            Zurück zum Marktplatz
        </Link>
    </div>
  );

  const priceFormatted = product.price ? (product.price / 100).toFixed(2) : "0.00";
  const fallbackImage = "https://placehold.co/600x600?text=Kein+Bild";
  
  const mainImage = (product.images && Array.isArray(product.images) && product.images.length > 0) 
    ? product.images[0].imageUrl 
    : fallbackImage;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in zoom-in duration-300">
      <Link to="/marketplace" className="text-stone-500 hover:text-orange-600 mb-8 inline-flex items-center gap-2 font-medium transition-colors group">
        <span>←</span> <span className="group-hover:underline">Zurück zum Marktplatz</span>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-100">
        
        <div className="aspect-square bg-stone-50 rounded-2xl overflow-hidden relative shadow-inner group">
          <img 
            src={mainImage} 
            alt={product.title || "Produktbild"} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.target.src = fallbackImage; }} 
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <span className="bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {product.condition || 'Zustand unbekannt'}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-6 leading-tight">
            {product.title || "Unbekanntes Produkt"}
          </h1>
          
          <div className="prose prose-stone mb-10 text-stone-600 leading-relaxed text-lg">
            <p>{product.description || "Der Verkäufer hat keine detaillierte Beschreibung für dieses Produkt hinterlegt."}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-100 pt-8 mt-auto gap-6">
            <div>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-wide mb-1">Preis</p>
              <p className="text-4xl font-black text-orange-600">{priceFormatted} €</p>
            </div>
            
            <button 
                onClick={() => alert(`Kaufen-Flow für "${product.title}" starten...`)}
                className="bg-stone-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-600/30 active:scale-95 text-center"
            >
              Jetzt Kaufen
            </button>
          </div>

          {/*
          <div className="mt-8 text-sm text-stone-400 flex items-center gap-2">
            <span>Verkauft von</span>
            <span className="font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-lg">
                {product.seller || product.username || "Unbekannt"}
            </span>
          </div> */}
        </div>

      </div>
    </div>
  );
}