import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEcomProduct } from '../services/api';

export default function SellEcom() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Bohnen',
    price: '',
    stock: '10',
    imageUrl: ''
  });

  const categories = [
    "Bohnen", "Siebträgermaschinen", "Kaffeemühlen", "Zubehör", "Lifestyle"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const imageList = formData.imageUrl ? [{ 
          imageUrl: formData.imageUrl, 
          altText: formData.title, 
          isMain: true, 
          sortOrder: 1 
      }] : [];

      await createEcomProduct({ ...formData, images: imageList });
      
      navigate('/shop');
    } catch (err) {
      console.error(err);
      setError("Fehler beim Anlegen: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 py-10">
      <div className="max-w-2xl mx-auto px-4">
        
        <div className="text-center mb-8">
            <span className="bg-stone-800 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Admin Area
            </span>
            <h1 className="text-3xl font-black text-stone-900 mt-3">Neues Shop-Produkt</h1>
            <p className="text-stone-500 mt-2">Artikel zum "Originals Shop" hinzufügen.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-stone-200 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-stone-900"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">{error}</div>}

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Produktname</label>
                    <input type="text" name="title" required className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-stone-800 outline-none" placeholder="z.B. NDB House Blend" value={formData.title} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Kategorie</label>
                        <select name="category" className="w-full border border-stone-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-stone-800 outline-none" value={formData.category} onChange={handleChange}>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Preis (€)</label>
                        <input type="number" name="price" required min="0" step="0.01" className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-stone-800 outline-none" value={formData.price} onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Lagerbestand (Stück)</label>
                    <input type="number" name="stock" required min="0" className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-stone-800 outline-none" value={formData.stock} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Bild-URL</label>
                    <input type="text" name="imageUrl" placeholder="https://..." className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-stone-800 outline-none" value={formData.imageUrl} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Beschreibung</label>
                    <textarea name="description" rows="4" required className="w-full border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-stone-800 outline-none resize-none" value={formData.description} onChange={handleChange}></textarea>
                </div>

                <button type="submit" disabled={isLoading} className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg active:scale-95 ${isLoading ? 'bg-gray-400' : 'bg-stone-900 hover:bg-stone-800'}`}>
                    {isLoading ? "Speichere..." : "Produkt anlegen"}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}