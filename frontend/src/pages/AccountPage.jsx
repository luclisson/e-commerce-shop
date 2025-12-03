import React, { useState, useEffect } from 'react';
import { fetchAccountPageData } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function AccountPage() {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    street: '',
    postcode: '',
    city: ''
  });

  const [myOffers, setMyOffers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [debugData, setDebugData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUsername = localStorage.getItem("username");

        if (!storedUsername) {
          throw new Error("Nicht eingeloggt (Kein Username gefunden).");
        }

        const dto = await fetchAccountPageData(storedUsername);
        
        console.log("🔥 VOM BACKEND EMPFANGEN:", dto);
        setDebugData(dto); 

        const acc = dto.accountData || {}; 
        const addr = acc.addressDto || {}; 

        setUserData({
          firstname: acc.firstName || '',
          lastname: acc.lastName || '',
          email: acc.email || '',
          birthday: acc.birthday ? acc.birthday.toString().split('T')[0] : '',
          street: addr.street || '',
          postcode: addr.postcode || '',
          city: addr.province || '' 
        });

        if (dto.products && Array.isArray(dto.products)) {
            setMyOffers(dto.products);
        }

      } catch (err) {
        console.error("Fehler:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Speichern an Backend gesendet!");
    setIsEditing(false);
  };

  if (isLoading) return <div className="p-10 text-center font-bold text-stone-500">Lade Profil...</div>;
  
  if (error) return (
    <div className="p-10 text-center">
      <h2 className="text-red-600 font-bold mb-2">Fehler beim Laden</h2>
      <p className="text-stone-600">{error}</p>
      <a href="/" className="underline mt-4 block text-stone-900 hover:text-orange-600">Zurück zur Startseite</a>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900">Mein Profil</h1>
          <p className="text-stone-500 mt-2">Verwalte deine persönlichen Daten und Adressen.</p>
        </div>
        
        {!isEditing && (
            <button 
                onClick={() => setIsEditing(true)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 active:scale-95"
            >
                <span>✎</span> Daten bearbeiten
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        <div className="md:col-span-1">
            <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-stone-200 text-center shadow-sm space-y-6">
                <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    {userData.firstname && userData.firstname.charAt(0)}
                    {userData.lastname && userData.lastname.charAt(0)}
                </div>
                <h2 className="font-bold text-xl">
                  {userData.firstname ? `${userData.firstname} ${userData.lastname}` : 'Unbekannter Nutzer'}
                </h2>
                <p className="text-stone-500 text-sm mb-4">{userData.email || 'Keine E-Mail'}</p>
                <div className="pt-4 border-t border-stone-100">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        Verifizierter Verkäufer
                    </span>
                </div>
            </form>
        </div>

        <div className="md:col-span-2">
            <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                
                <h3 className="font-bold text-lg border-b border-stone-100 pb-2 mb-4 text-stone-800">Persönliche Daten</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Vorname</label>
                        <input 
                            type="text" 
                            name="firstname"
                            value={userData.firstname}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Nachname</label>
                        <input 
                            type="text" 
                            name="lastname"
                            value={userData.lastname}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">E-Mail</label>
                    <input 
                        type="email" 
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        disabled={true}
                        className="w-full bg-stone-50 border border-stone-200 text-stone-500 rounded-lg px-4 py-2 cursor-not-allowed outline-none"
                    />
                </div>

                <h3 className="font-bold text-lg border-b border-stone-100 pb-2 mb-4 pt-4 text-stone-800">Anschrift</h3>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Straße & Hausnummer</label>
                    <input 
                        type="text" 
                        name="street"
                        value={userData.street}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder={isEditing ? "Musterstraße 1" : ""}
                        className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-stone-700 mb-1">PLZ</label>
                        <input 
                            type="text" 
                            name="postcode"
                            value={userData.postcode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-stone-700 mb-1">Stadt</label>
                        <input 
                            type="text" 
                            name="city"
                            value={userData.city}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all outline-none ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-4 pt-6 animate-in fade-in slide-in-from-top-2">
                        <button 
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 bg-stone-100 text-stone-700 font-bold py-3 rounded-xl hover:bg-stone-200 transition-colors"
                        >
                            Abbrechen
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 bg-orange-600 text-white hover:bg-orange-50 hover:text-orange-700 font-bold py-3 rounded-xl transition-colors shadow-lg"
                        >
                            Speichern
                        </button>
                    </div>
                )}
            </form>
        </div>
      </div>

      <div className="mt-12 border-t border-stone-200 pt-10">
        <h2 className="text-2xl font-black text-stone-900 mb-6">
          Meine aktiven Angebote ({myOffers.length})
        </h2>

        {myOffers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myOffers.map((product) => (
              <ProductCard 
                key={product.offerId || product.title} 
                title={product.title}
                price={(product.price / 100).toFixed(2)}
                category={product.condition}
                imageUrl={product.images && product.images.length > 0 ? product.images[0].imageUrl : null}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 border-dashed">
            <p className="text-stone-500 font-medium mb-4">Du hast noch keine Artikel eingestellt.</p>
            <button className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg">
              Jetzt Artikel verkaufen
            </button>
          </div>
        )}
      </div>

    </div>
  );
}