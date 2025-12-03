import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ id, title, price, category, imageUrl }) {
  const fallbackImage = "https://placehold.co/600x600?text=Kein+Bild";

  return (
    <Link to={`/product/${id}`} className="block h-full">
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
        <div className="aspect-square bg-stone-100 relative overflow-hidden">
           <img 
              src={imageUrl || fallbackImage}
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
           />
           <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-stone-800">
             {category}
           </span>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="font-bold text-stone-900 line-clamp-1">{title}</h3>
            <p className="text-orange-600 font-black text-lg mt-1">{price} €</p>
        </div>
      </div>
    </Link>
  );
}