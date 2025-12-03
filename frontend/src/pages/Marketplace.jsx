import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

 return (
    <div className="w-full px-6 md:px-10 py-10">
      <h1 className="text-3xl font-bold mb-8 text-stone-900">Aktuelle Angebote</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        
        {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : (
            products.map((p) => (
                <ProductCard 
                    key={p.productId || p.id || p.title} 
                    id={p.productId || p.id} 

                    title={p.title}
                    
                    description={p.description} 
                    
                    price={(p.price / 100).toFixed(2)}
                    
                    category={p.condition} 
                    
                    imageUrl={p.images && p.images.length > 0 ? p.images[0].imageUrl : null}
                />
            ))
        )}

      </div>
    </div>
  );
}