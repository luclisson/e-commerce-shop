// src/pages/AccountPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchAccountData } from '../services/api';

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
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // HIER IST DIE ÄNDERUNG:
        // Wir brauchen keine ID mehr übergeben, die Funktion holt sich den Username selbst.
        const data = await fetchAccountData();
        
        setUserData({
          firstname: data.firstName || '',
          lastname: data.lastName || '',
          email: data.email || '',
          birthday: data.birthday ? data.birthday.split('T')[0] : '',
          // Adresse nur mappen, wenn sie im JSON enthalten ist
          street: data.address ? data.address.strasse_mit_hausnr : '',
          postcode: data.address ? data.address.plz : '',
          city: data.address ? data.address.ort : ''
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // ... (Restlicher Render Code bleibt gleich) ...

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Hier später: Update-Funktion im Backend aufrufen
    alert("Speichern simulieren: Daten an Backend gesendet!");
    setIsEditing(false);
  };

  if (isLoading) return <div className="text-center p-10">Lade Profildaten...</div>;
  if (error) return <div className="text-center p-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* Header Bereich */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900">Mein Profil</h1>
          <p className="text-stone-500 mt-2">Verwalte deine persönlichen Daten und Adressen.</p>
        </div>
        
        {/* Bearbeiten Button Toggle */}
        {!isEditing && (
            <button 
                onClick={() => setIsEditing(true)}
                className="text-orange-600 font-bold hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors"
            >
                ✎ Bearbeiten
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Linke Spalte: Avatar Card */}
        <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center">
                <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    {userData.firstname.charAt(0)}{userData.lastname.charAt(0)}
                </div>
                <h2 className="font-bold text-xl">{userData.firstname} {userData.lastname}</h2>
                <p className="text-stone-500 text-sm">{userData.email}</p>
                <div className="mt-4 pt-4 border-t border-stone-100">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        Verifizierter Käufer
                    </span>
                </div>
            </div>
        </div>

        {/* Rechte Spalte: Formular */}
        <div className="md:col-span-2">
            <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                
                <h3 className="font-bold text-lg border-b border-stone-100 pb-2 mb-4">Persönliche Daten</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Vorname</label>
                        <input 
                            type="text" 
                            name="firstname"
                            value={userData.firstname}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full border rounded-lg px-4 py-2 transition-all ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
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
                            className={`w-full border rounded-lg px-4 py-2 transition-all ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
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
                        disabled={!isEditing} // E-Mail oft nicht änderbar machen
                        className="w-full bg-stone-50 border border-stone-200 text-stone-500 rounded-lg px-4 py-2 cursor-not-allowed"
                    />
                </div>

                <h3 className="font-bold text-lg border-b border-stone-100 pb-2 mb-4 pt-4">Anschrift</h3>

                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Straße & Hausnummer</label>
                    <input 
                        type="text" 
                        name="street"
                        value={userData.street}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full border rounded-lg px-4 py-2 transition-all ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
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
                            className={`w-full border rounded-lg px-4 py-2 transition-all ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
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
                            className={`w-full border rounded-lg px-4 py-2 transition-all ${isEditing ? 'bg-white border-stone-300 focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 border-stone-200 text-stone-500 cursor-not-allowed'}`}
                        />
                    </div>
                </div>

                {/* Speicher Buttons nur zeigen wenn isEditing true ist */}
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
                            className="flex-1 bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
                        >
                            Speichern
                        </button>
                    </div>
                )}

            </form>
        </div>
      </div>
    </div>
  );
}