import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOffer } from '../services/api';

export default function SellSecondHand() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    sellerUsername: '',
    title: '',
    description: '',
    category: 'Siebträgermaschinen (Espressomaschinen)',
    price: '',
    condition: 'GOOD',
    imageUrl: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
        setFormData(prev => ({ ...prev, sellerUsername: storedUser }));
    }
  }, []);

  // Alle Kategorien aus dem SQL Dump
  const categories = [
    // --- Maschinen ---
    "Siebträgermaschinen (Espressomaschinen)",
    "Einkreiser",
    "Zweikreiser",
    "Dualboiler",
    "Professionelle Gastro-Maschinen",
    "Filterkaffeemaschinen",
    "Pour-Over-Maschinen",
    "Cold-Brew-Systeme",
    
    // --- Mühlen ---
    "Kaffeemühlen (Grinder)",
    "On-Demand-Mühlen",
    "Doser-Mühlen",
    "Handmühlen",

    // --- Brüh-Equipment ---
    "AeroPress",
    "Chemex",
    "French Press",
    "Hario V60",
    "Kalita Wave",
    "Syphon",
    "Immersionsbrüher",
    
    // --- Zubehör & Tools ---
    "Siebträger & Siebe",
    "Siebträger (Komplett)",
    "Präzisionssiebe",
    "Tamper & Matten",
    "Standard-Tamper",
    "Präzisions-Tamper",
    "Tamping-Matten & Stationen",
    "Dosierwerkzeuge",
    "WDT-Tools",
    "Dosiertrichter (Dosing Funnels)",
    "Milchschäumen & Latte Art",
    "Milchkannen (Pitcher)",
    "Waagen & Timer",
    "Präzisionswaagen",
    "Brühkessel (Kettles)",
    "Knock Boxen (Ausschlagbehälter)",

    // --- Pflege & Ersatzteile ---
    "Reinigungszubehör",
    "Entkalker",
    "Kaffeefettlöser",
    "Ersatzteile für Maschinen",
    "Ersatzteile – Dichtungen",
    "Ersatzteile – Siebe",
    "Ersatzteile – Pumpen",
    "Ersatzteile – Heizelemente",
    "Ersatzteile – Wasserfilter-Systeme",

    // --- Sonstiges ---
    "Tassen & Becher",
    "Espressotassen",
    "Cappuccino-Tassen",
    "To-Go-Becher (wiederverwendbar)",
    "Bohnen",
    "Literatur & Deko"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createOffer(formData);
      navigate('/account');
    } catch (err) {
      console.error(err);
      setError("Fehler beim Erstellen: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        
        <div className="text-center mb-8">
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Marktplatz
            </span>
            <h1 className="text-3xl font-black text-stone-900 mt-3">Gebraucht verkaufen</h1>
            <p className="text-stone-500 mt-2">Erstelle ein Inserat für die Community.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-stone-100 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm">{error}</div>}

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Verkäufer</label>
                    <input 
                        type="text" 
                        name="sellerUsername" 
                        readOnly
                        className="w-full bg-stone-100 border border-stone-200 text-stone-500 rounded-xl px-4 py-3 outline-none cursor-not-allowed font-medium" 
                        value={formData.sellerUsername} 
                    />
                    <p className="text-xs text-stone-400 mt-1 ml-1">Angemeldet als dieser Nutzer</p>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Titel</label>
                    <input 
                        type="text" 
                        name="title" 
                        required 
                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" 
                        placeholder="z.B. Rocket Appartamento" 
                        value={formData.title} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Kategorie</label>
                        <select 
                            name="category" 
                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" 
                            value={formData.category} 
                            onChange={handleChange}
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-2">Preis (€)</label>
                        <input 
                            type="number" 
                            name="price" 
                            required 
                            min="0" 
                            step="0.01" 
                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" 
                            value={formData.price} 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Zustand</label>
                    <select 
                        name="condition" 
                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" 
                        value={formData.condition} 
                        onChange={handleChange}
                    >
                        <option value="NEW">Neu</option>
                        <option value="LIKE_NEW">Wie neu</option>
                        <option value="EXCELLENT">Exzellent</option>
                        <option value="MAX_GOOD">Sehr Gut</option>
                        <option value="GOOD">Gut</option>
                        <option value="USED">Gebraucht</option>
                        <option value="DEFECT">Defekt</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Bild-URL</label>
                    <input 
                        type="text" 
                        name="imageUrl" 
                        placeholder="https://..." 
                        required
                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-shadow" 
                        value={formData.imageUrl} 
                        onChange={handleChange} 
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Beschreibung</label>
                    <textarea 
                        name="description" 
                        rows="4" 
                        required 
                        className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none resize-none transition-shadow" 
                        value={formData.description} 
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={isLoading} 
                    className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg hover:shadow-orange-200 active:scale-95 ${isLoading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-500'}`}
                >
                    {isLoading ? "Wird erstellt..." : "Kostenlos inserieren"}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}