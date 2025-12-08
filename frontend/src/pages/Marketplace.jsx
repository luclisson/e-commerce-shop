import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchProducts, fetchWatchlist, addToWatchlist, removeFromWatchlist } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

export default function Marketplace() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [watchedProductIds, setWatchedProductIds] = useState(new Set());

  const [searchParams] = useSearchParams();

  const categoryGroups = {
    "Siebträgermaschinen": ["Siebträgermaschinen (Espressomaschinen)", "Dualboiler", "Einkreiser", "Zweikreiser", "Professionelle Gastro-Maschinen"],
    "Kaffeemühlen": ["Kaffeemühlen (Grinder)", "On-Demand-Mühlen", "Handmühlen", "Doser-Mühlen"],
    "Filter & Co.": ["Filterkaffeemaschinen", "Pour-Over-Maschinen", "AeroPress", "Chemex", "French Press", "Cold-Brew-Systeme"],
    "Barista Zubehör": ["Zubehör", "Werkzeuge & Barista-Zubehör", "Tamper & Matten", "WDT-Tools", "Präzisionswaagen", "Milchkannen (Pitcher)", "Knock Boxen (Ausschlagbehälter)", "Siebträger (Komplett)", "Tamping-Matten & Stationen"],
    "Reinigung & Pflege": ["Reinigungszubehör", "Kaffeefettlöser", "Entkalker"],
    "Tassen & Becher": ["To-Go-Becher (wiederverwendbar)", "Espressotassen", "Cappuccino-Tassen"]
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

  const conditionMapping = {
    NEW: "Neu", LIKE_NEW: "Wie neu", EXCELLENT: "Exzellent",
    MAX_GOOD: "Sehr gut", GOOD: "Gut", USED: "Gebraucht", DEFECT: "Defekt"
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const productsData = await fetchProducts();
        setAllProducts(productsData);

        const username = localStorage.getItem("username");
        if (username) {
            try {
                const watchlistData = await fetchWatchlist(username);
                const ids = watchlistData.watchedProducts 
                    ? new Set(watchlistData.watchedProducts.map(p => p.productId))
                    : new Set();
                setWatchedProductIds(ids);
            } catch (wlError) {
                console.error("Watchlist konnte nicht geladen werden:", wlError);
            }
        }
      } catch (err) {
        console.error("Fehler beim Laden:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleToggleLike = async (productId) => {
    const username = localStorage.getItem("username");
    if (!username) {
        alert("Bitte logge dich ein, um Artikel zu merken.");
        return;
    }

    const isLiked = watchedProductIds.has(productId);

    setWatchedProductIds(prev => {
        const newSet = new Set(prev);
        if (isLiked) newSet.delete(productId);
        else newSet.add(productId);
        return newSet;
    });

    try {
        if (isLiked) {
            await removeFromWatchlist(username, productId);
        } else {
            await addToWatchlist(username, productId);
        }
    } catch (error) {
        console.error("Fehler beim Update der Watchlist:", error);
        setWatchedProductIds(prev => {
            const newSet = new Set(prev);
            if (isLiked) newSet.add(productId);
            else newSet.delete(productId);
            return newSet;
        });
        alert("Aktion fehlgeschlagen.");
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
      
        <div className="mx-auto mb-20">
            <div className="bg-orange-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Marktplatz</h1>
                    <div className="w-16 h-1 bg-white/30 rounded-full mb-6"></div>
                    <h2 className="text-lg md:text-xl font-bold text-orange-100 mb-2">Deine Maschine verstaubt?</h2>
                    <p className="text-orange-100/80 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">Mach Platz für Neues! Erstelle in wenigen Minuten ein Inserat.</p>
                    <Link to="/sell" className="inline-block bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-stone-100 transition-all shadow-lg transform hover:-translate-y-0.5">Kostenlos verkaufen</Link>
                </div>
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          
          <aside className="w-full md:w-56 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm sticky top-4">
                  <h2 className="font-bold text-lg mb-3 text-stone-800">Kategorien</h2>
                  <div className="flex flex-col gap-1.5">
                      <button onClick={() => setSelectedGroup("Alle")} className={`text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all flex justify-between items-center ${selectedGroup === "Alle" ? 'bg-orange-700 text-white shadow-sm' : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`}>
                          <span>Alle Produkte</span>
                          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">{allProducts.length}</span>
                      </button>
                      {Object.keys(categoryGroups).map((groupName) => {
                          const count = allProducts.filter(p => categoryGroups[groupName].includes(p.category)).length;
                          return (
                              <button key={groupName} onClick={() => setSelectedGroup(groupName)} className={`text-left px-3 py-1.5 rounded-md text-xs font-medium transition-all flex justify-between items-center ${selectedGroup === groupName ? 'bg-orange-600 text-white shadow-sm' : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'}`}>
                                  <span>{groupName}</span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedGroup === groupName ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-500'}`}>{count}</span>
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
                          const displayCondition = conditionMapping[p.condition] || p.condition;
                          const id = p.productId || p.id;
                          
                          const isLiked = watchedProductIds.has(id);

                          return (
                              <ProductCard 
                                  key={id} id={id} title={p.title}
                                  description={p.description} 
                                  price={(p.price / 100).toFixed(2)}
                                  category={displayCondition} 
                                  imageUrl={p.images && p.images.length > 0 ? p.images[0].imageUrl : null}
                                  
                                  isLiked={isLiked}
                                  onToggleLike={handleToggleLike}
                              />
                          );
                      })
                  ) : (
                      <div className="col-span-full py-20 text-center text-stone-500">
                          <span className="text-4xl block mb-2">📦</span>
                          <p className="text-sm">Keine Produkte gefunden.</p>
                          <button onClick={() => setSelectedGroup("Alle")} className="bg-orange-600 text-white font-bold hover:underline mt-1 text-sm">Alle anzeigen</button>
                      </div>
                  )}
              </div>
          </div>
        </div>

      </div> 
    </div>
  );
}