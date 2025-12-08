import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ id, title, price, category, imageUrl, isLiked, onToggleLike }) {
  const fallbackImage = "https://placehold.co/600x600?text=Kein+Bild";

  const handleLikeClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (onToggleLike) {
        onToggleLike(id);
    }
  };

  return (
    <Link to={`/product/${id}`} className="block h-full relative group">
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group h-full flex flex-col">
        
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
           
           <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-stone-800 shadow-sm">
             {category}
           </span>

           {isLiked && (
               <div className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md text-red-500 animate-in zoom-in duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
               </div>
           )}
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
            <h3 className="font-bold text-stone-900 line-clamp-1 mb-2">{title}</h3>
            
            <div className="flex justify-between items-end mt-auto">
                <p className="text-orange-600 font-black text-lg">{price} €</p>
                
                <button 
                    onClick={handleLikeClick}
                    className={`text-xs font-bold uppercase tracking-wide transition-all px-2 py-1 rounded ${
                        isLiked 
                        ? 'text-red-500 bg-stone-100 hover:bg-stone-200'
                        : 'bg-orange-600 text-white hover:bg-orange-500'
                    }`}
                >
                    {isLiked ? "Gemerkt!" : "Merken?"}
                </button>
            </div>
        </div>
      </div>
    </Link>
  );
}