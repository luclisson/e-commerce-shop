import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchEcom, fetchUserWatchlist, addToWatchlist, removeFromWatchlist } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

export default function Ecommerce() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likedProductIds, setLikedProductIds] = useState(new Set());
  
  const [searchParams] = useSearchParams();

  const categoryGroups = {
    "Bohnen & Röstungen": ["Bohnen", "Single Origin", "Blends", "Espressobohnen"],
    "Maschinen": ["Siebträgermaschinen (Espressomaschinen)", "Filterkaffeemaschinen", "Mühlen"],
    "Barista Equipment": ["Zubehör", "Werkzeuge & Barista-Zubehör", "Tamper & Matten", "Milchkannen (Pitcher)"],
    "Lifestyle": ["Tassen & Becher", "Reinigung & Pflege", "Merchandise"]
  };

  const [selectedGroup, setSelectedGroup] = useState(() => {
      const categoryFromUrl = searchParams.get('category');
      return categoryFromUrl && categoryGroups[categoryFromUrl] ? categoryFromUrl : "Alle";
  });

  useEffect(() => {
      const categoryFromUrl = searchParams.get('category');
      if (categoryFromUrl && categoryGroups[categoryFromUrl]) {
          setSelectedGroup(categoryFromUrl);
      } else {
          setSelectedGroup("Alle");
      }
  }, [searchParams]);

  // LOAD DATA
  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        try {
            const [products, watchlistIds] = await Promise.all([
                fetchEcom(),
                fetchUserWatchlist()
            ]);

            setAllProducts(products);
            setLikedProductIds(new Set(watchlistIds));
        } catch (error) {
            console.error("Fehler beim Laden des Shops:", error);
        } finally {
            setIsLoading(false);
        }
    };
    loadData();
  }, []);

  const handleToggleLike = async (productId) => {
    const username = localStorage.getItem("username");
    if (!username) {
        alert("Bitte einloggen, um Artikel zu merken.");
        return;
    }

    const isLiked = likedProductIds.has(productId);
    
    setLikedProductIds(prev => {
        const next = new Set(prev);
        if (isLiked) next.delete(productId);
        else next.add(productId);
        return next;
    });

    try {
        if (isLiked) await removeFromWatchlist(username, productId); 
        else await addToWatchlist(username, productId);
    } catch (error) {
        console.error("Watchlist Fehler", error);
        // Rollback
        setLikedProductIds(prev => { 
            const next = new Set(prev);
            if (isLiked) next.add(productId);
            else next.delete(productId);
            return next;
        });
    }
  };

  const visibleProducts = selectedGroup === "Alle"
    ? allProducts
    : allProducts.filter(product => {
        const allowedCategories = categoryGroups[selectedGroup];
        return allowedCategories && allowedCategories.includes(product.category);
    });

  return (
    <div className="min-h-screen bg-stone-50 py-6">
      <div className="w-full px-4">
        <div className="mx-auto mb-10">
            <div className="bg-stone-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-stone-800 opacity-50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500 opacity-10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2">Nicht die Bohne Originals</span>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Originals Shop</h1>
                    <div className="w-16 h-1 bg-stone-700 rounded-full mb-6"></div>
                    <p className="text-stone-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                        Handverlesene Bohnen, brandneues Equipment und exklusives Zubehör.
                    </p>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          
          <aside className="w-full md:w-56 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm sticky top-4">
                  <h2 className="font-bold text-lg mb-3 text-stone-800">Sortiment</h2>
                  <div className="flex flex-col gap-1.5">
                      <button onClick={() => setSelectedGroup("Alle")} className={`text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all flex justify-between items-center ${selectedGroup === "Alle" ? 'bg-stone-900 text-white shadow-sm' : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`}>
                          <span>Alle Artikel</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedGroup === "Alle" ? 'bg-stone-700 text-white' : 'bg-white text-stone-500 border border-stone-200'}`}>{allProducts.length}</span>
                      </button>
                      {Object.keys(categoryGroups).map((groupName) => {
                          const count = allProducts.filter(p => categoryGroups[groupName].includes(p.category)).length;
                          return (
                              <button key={groupName} onClick={() => setSelectedGroup(groupName)} className={`text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all flex justify-between items-center ${selectedGroup === groupName ? 'bg-stone-900 text-white shadow-sm' : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`}>
                                  <span>{groupName}</span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedGroup === groupName ? 'bg-stone-700 text-white' : 'bg-white text-stone-500 border border-stone-200'}`}>{count}</span>
                              </button>
                          );
                      })}
                  </div>
              </div>
          </aside>

          <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
                  {isLoading ? (
                      Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
                  ) : visibleProducts.length > 0 ? (
                      visibleProducts.map((p) => {
                          const id = p.productId || p.id;
                          const badgeText = p.condition ? p.condition : "Original";

                          return (
                              <ProductCard 
                                  key={id} 
                                  id={id} 
                                  title={p.title}
                                  description={p.description} 
                                  price={(p.price / 100).toFixed(2)}
                                  category={badgeText} 
                                  imageUrl={p.images && p.images.length > 0 ? p.images[0].imageUrl : null}
                                  productType="ecom"
                                  
                                  isLiked={likedProductIds.has(id)}
                                  onToggleLike={handleToggleLike}
                              />
                          );
                      })
                  ) : (
                      <div className="col-span-full py-20 text-center text-stone-500">
                          <span className="text-4xl block mb-2">🛍️</span>
                          <p className="text-sm">Unser Lager wird gerade aufgefüllt.</p>
                          <button onClick={() => setSelectedGroup("Alle")} className="text-stone-900 font-bold hover:underline mt-1 text-sm">Alle Artikel anzeigen</button>
                      </div>
                  )}
              </div>
          </div>
        </div>

      </div> 
    </div>
  );
}