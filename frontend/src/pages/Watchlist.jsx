import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchWatchlist, removeFromWatchlist } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const conditionMapping = {
    NEW: "Neu",
    LIKE_NEW: "Wie neu",
    EXCELLENT: "Exzellent",
    MAX_GOOD: "Sehr gut",
    GOOD: "Gut",
    USED: "Gebraucht",
    DEFECT: "Defekt"
  };
   
  useEffect(() => {
    const loadWatchlist = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
            setIsLoading(false);
            return; 
        }
        const data = await fetchWatchlist(username);
        setWatchlistItems(data.watchedProducts || []);
      } catch (err) {
        console.error("Fehler beim Laden der Watchlist:", err);
        setError("Deine Merkliste konnte nicht geladen werden.");
      } finally {
        setIsLoading(false);
      }
    };
    loadWatchlist();
  }, []);

  const handleRemoveItem = async (productId) => {
    const username = localStorage.getItem("username");
    if (!username) return;

    const previousItems = [...watchlistItems];
    setWatchlistItems(prev => prev.filter(item => item.productId !== productId));

    try {
        await removeFromWatchlist(username, productId);
    } catch (err) {
        console.error("Fehler beim Entfernen:", err);
        setWatchlistItems(previousItems);
        alert("Konnte Eintrag nicht entfernen.");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-stone-500 font-bold animate-pulse">Lade deine Merkliste...</p>
      </div>
    );
  }

  if (!localStorage.getItem("username")) {
      return (
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <h1 className="text-3xl font-black text-stone-900 mb-4">Bitte melde dich an</h1>
            <Link to="/login" className="text-orange-600 font-bold hover:underline">Zum Login →</Link>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-white py-10">
        <div className="w-full px-6 md:px-10">
            
            <div className="flex justify-between items-end mb-8 border-b border-stone-200 pb-4">
                <div>
                    <h1 className="text-3xl font-black text-stone-900">Meine Merkliste</h1>
                    <p className="text-stone-500 text-sm mt-1">{watchlistItems.length} Artikel gespeichert</p>
                </div>
                <Link to="/marketplace" className="text-orange-600 font-bold hover:underline hidden sm:block">
                    Weiterstöbern →
                </Link>
            </div>

            {error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center">
                    {error}
                </div>
            ) : watchlistItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {watchlistItems.map((item) => {

                    const priceValue = item.price 
                        ? (item.price / 100).toFixed(2)
                        : '0.00';
                    
                    const imageUrl = item.images && item.images.length > 0 
                        ? item.images[0].imageUrl 
                        : null;

                    const displayCondition = conditionMapping[item.condition] || item.condition;

                    return (
                        <div key={item.productId} className="h-full">
                            <ProductCard 
                                id={item.productId} 
                                title={item.title}
                                price={priceValue}      
                                category={displayCondition}
                                imageUrl={imageUrl}
                                
                                isLiked={true} 
                                onToggleLike={() => handleRemoveItem(item.productId)}
                            />
                        </div>
                    );
                })}
                </div>
            ) : (
                <div className="text-center py-20 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
                    <span className="text-6xl block mb-4">👀</span>
                    <h2 className="text-xl font-bold text-stone-900 mb-2">Deine Merkliste ist leer</h2>
                    <p className="text-stone-500 mb-8 max-w-md mx-auto">
                        Sieht so aus, als hättest du noch keine Favoriten gespeichert.
                    </p>
                    <Link 
                        to="/marketplace" 
                        className="inline-block bg-orange-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200"
                    >
                        Zum Marktplatz
                    </Link>
                </div>
            )}
        </div>
    </div>
  );
}