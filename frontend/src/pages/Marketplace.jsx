import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

export default function Marketplace() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchParams] = useSearchParams();

  const categoryGroups = {
    "Siebträgermaschinen": [
        "Siebträgermaschinen (Espressomaschinen)", "Dualboiler", "Einkreiser", "Zweikreiser", "Professionelle Gastro-Maschinen"
    ],
    "Kaffeemühlen": [
        "Kaffeemühlen (Grinder)", "On-Demand-Mühlen", "Handmühlen", "Doser-Mühlen"
    ],
    "Filter & Co.": [
        "Filterkaffeemaschinen", "Pour-Over-Maschinen", "AeroPress", "Chemex", "French Press", "Cold-Brew-Systeme"
    ],
    "Barista Zubehör": [
        "Zubehör", "Werkzeuge & Barista-Zubehör", "Tamper & Matten", "WDT-Tools", "Präzisionswaagen", "Milchkannen (Pitcher)", "Knock Boxen (Ausschlagbehälter)", "Siebträger (Komplett)", "Tamping-Matten & Stationen"
    ],
    "Reinigung & Pflege": [ "Reinigungszubehör", "Kaffeefettlöser", "Entkalker" ],
    "Tassen & Becher": [ "To-Go-Becher (wiederverwendbar)", "Espressotassen", "Cappuccino-Tassen" ]
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
    fetchProducts().then((data) => {
      setAllProducts(data);
      setIsLoading(false);
    });
  }, []);

  const visibleProducts = selectedGroup === "Alle"
    ? allProducts
    : allProducts.filter(product => {
        const allowedCategories = categoryGroups[selectedGroup];
        return allowedCategories && allowedCategories.includes(product.category);
    });

  return (
    <div className="w-full px-6 md:px-10 py-10 min-h-screen bg-stone-50">
      <h1 className="text-3xl font-black mb-8 text-stone-900">Marktplatz</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm sticky top-4">
                <h2 className="font-bold text-xl mb-4 text-stone-800">Kategorien</h2>
                <div className="flex flex-col gap-2">
                    
                    <button
                        onClick={() => setSelectedGroup("Alle")}
                        className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-all flex justify-between items-center ${
                            selectedGroup === "Alle" 
                            ? 'bg-orange-700 text-white shadow-md' 
                            : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                    >
                        <span>Alle Produkte</span>
                        <span className="text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full">{allProducts.length}</span>
                    </button>

                    {Object.keys(categoryGroups).map((groupName) => {
                        const count = allProducts.filter(p => categoryGroups[groupName].includes(p.category)).length;
                        return (
                            <button
                                key={groupName}
                                onClick={() => setSelectedGroup(groupName)}
                                className={`text-left px-4 py-2 rounded-lg text-sm font-medium transition-all flex justify-between items-center ${
                                    selectedGroup === groupName 
                                    ? 'bg-orange-600 text-white shadow-md' 
                                    : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                                }`}
                            >
                                <span>{groupName}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${selectedGroup === groupName ? 'bg-stone-700 text-white' : 'bg-stone-200 text-stone-500'}`}>{count}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>

        {/* PRODUKTE GRID */}
        <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                ) : visibleProducts.length > 0 ? (
                    visibleProducts.map((p) => {
                        const displayCondition = conditionMapping[p.condition] || p.condition;
                        const id = p.productId || p.id;
                        return (
                            <ProductCard 
                                key={id} id={id} title={p.title}
                                description={p.description} 
                                price={(p.price / 100).toFixed(2)}
                                category={displayCondition} 
                                imageUrl={p.images && p.images.length > 0 ? p.images[0].imageUrl : null}
                            />
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center text-stone-500">
                        <span className="text-4xl block mb-2">📦</span>
                        <p>Keine Produkte in "{selectedGroup}" gefunden.</p>
                        <button onClick={() => setSelectedGroup("Alle")} className="text-orange-600 font-bold hover:underline mt-2">Alle anzeigen</button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}