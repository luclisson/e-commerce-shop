import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { 
    fetchAccountPageData, 
    fetchWatchlist, 
    updateAccountData, 
    removeFromWatchlist 
} from '../services/api';
import ProductCard from '../components/ProductCard';

export default function AccountPage() {
  const [userData, setUserData] = useState({
    username: '', 
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    street: '',
    postcode: '',
    city: '',     
    gender: 'female',
    isGuest: false
  });

  const [myOffers, setMyOffers] = useState([]);
  const [myWatchlist, setMyWatchlist] = useState([]);
  const [watchlistError, setWatchlistError] = useState(null);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const conditionMapping = {
    NEW: "Neu", LIKE_NEW: "Wie neu", EXCELLENT: "Exzellent",
    MAX_GOOD: "Sehr gut", GOOD: "Gut", USED: "Gebraucht", DEFECT: "Defekt"
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUsername = localStorage.getItem("username");

        if (!storedUsername) {
          setIsLoading(false);
          return; 
        }

        const dto = await fetchAccountPageData(storedUsername);
        const acc = dto.accountData || {}; 
        const addr = acc.addressDto || {}; 

        setUserData({
          username: acc.username || storedUsername,
          firstname: acc.firstName || '',
          lastname: acc.lastName || '',
          email: acc.email || '',
          birthday: acc.birthday ? acc.birthday.toString().split('T')[0] : '',
          street: addr.street || '',
          postcode: addr.postcode || '',
          city: addr.province || '',
          gender: acc.gender || 'female',
          isGuest: acc.isGuest || false
        });

        if (dto.products && Array.isArray(dto.products)) {
            setMyOffers(dto.products);
        }

        try {
            setWatchlistError(null);
            const watchlistResponse = await fetchWatchlist(storedUsername);
            const items = watchlistResponse.watchedProducts || [];
            setMyWatchlist(items);
        } catch (wlError) {
            console.error("Fehler beim Laden der Watchlist:", wlError);
            setWatchlistError("Konnte Watchlist nicht laden");
        }

      } catch (err) {
        console.error("Fehler beim Laden der Profildaten:", err);
        setError("Deine Profildaten konnten nicht geladen werden.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRemoveFromWatchlist = async (productId) => {
    const username = localStorage.getItem("username");
    if (!username) return;

    const previousWatchlist = [...myWatchlist];
    setMyWatchlist(prev => prev.filter(item => item.productId !== productId));

    try {
        await removeFromWatchlist(username, productId);
    } catch (err) {
        console.error("Fehler beim Entfernen:", err);
        setMyWatchlist(previousWatchlist);
        alert("Konnte Eintrag nicht entfernen.");
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveError(null);

    try {
        let isoDate = null;
        if (userData.birthday) {
            const dateObj = new Date(userData.birthday);
            isoDate = dateObj.toISOString(); 
        }

        const accountDto = {
            firstName: userData.firstname,
            lastName: userData.lastname,
            username: userData.username,
            email: userData.email,
            birthday: isoDate,
            gender: userData.gender,
            isGuest: userData.isGuest,
            addressDto: {
                street: userData.street,
                postcode: userData.postcode,
                province: userData.city 
            }
        };

        const result = await updateAccountData(accountDto);

        if (result === 0) {
            setIsEditing(false);
        } else {
            setSaveError("Das Backend hat einen Fehler gemeldet (Code 1). Bitte Eingaben prüfen.");
        }

    } catch (err) {
        console.error("Fehler beim Speichern:", err);
        setSaveError("Verbindungsfehler: " + err.message);
    }
  };


  if (isLoading) {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
            <p className="text-stone-500 font-bold animate-pulse">Lade Profil...</p>
        </div>
    );
  }
  
  if (!localStorage.getItem("username")) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-black text-stone-900 mb-4">Bitte melde dich an</h1>
          <Link to="/login" className="text-orange-600 font-bold hover:underline">Zum Login →</Link>
      </div>
    );
  }

  if (error) {
    return (
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">
             <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl inline-block">
                {error}
             </div>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-stone-800 min-h-[80vh]">
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-stone-900">Mein Konto</h1>
          <p className="text-stone-500 mt-2">Verwalte deine persönlichen Daten und Adressen.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-10">
        <button 
            onClick={() => setActiveTab('profile')}
            className={`font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 active:scale-95 ${
                activeTab === 'profile' 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
        >
            Profil & Daten
        </button>
        
        <button 
            onClick={() => setActiveTab('offers')}
            className={`font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 active:scale-95 ${
                activeTab === 'offers' 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
        >
            Meine Angebote 
            <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'offers' ? 'bg-stone-700 text-white' : 'bg-white text-gray-600'}`}>
                {myOffers.length}
            </span>
        </button>
        
        <button 
            onClick={() => setActiveTab('watchlist')}
            className={`font-medium px-4 py-2 rounded-lg transition-all flex items-center gap-2 active:scale-95 ${
                activeTab === 'watchlist' 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }`}
        >
            Watchlist
            {myWatchlist.length > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'watchlist' ? 'bg-stone-700 text-white' : 'bg-white text-gray-600'}`}>
                    {myWatchlist.length}
                </span>
            )}
        </button>
      </div>


      {activeTab === 'profile' && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-in fade-in zoom-in-95 duration-300">
        
        <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center shadow-sm space-y-4">
                <div className="w-24 h-24 bg-stone-900 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-2">
                    {userData.firstname ? userData.firstname.charAt(0) : '?'}
                    {userData.lastname ? userData.lastname.charAt(0) : ''}
                </div>
                
                <div>
                    <h2 className="font-bold text-xl leading-tight">
                        {userData.firstname ? `${userData.firstname} ${userData.lastname}` : 'Unbekannter Nutzer'}
                    </h2>
                    {userData.username && (
                        <p className="text-orange-600 font-bold text-sm mt-1">@{userData.username}</p>
                    )}
                </div>

                <p className="text-stone-500 text-sm border-b border-stone-100 pb-4">{userData.email || 'Keine E-Mail'}</p>
                
                <div className="">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                        Verifizierter Verkäufer
                    </span>
                </div>
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="w-full mt-4 bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <span>✎</span> Bearbeiten
                    </button>
                )}
            </div>
        </div>

        <div className="md:col-span-2">
            <form onSubmit={handleSave} className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">

                <h3 className="font-bold text-lg border-b border-stone-100 pb-2 mb-4 text-stone-800">Persönliche Daten</h3>
                {saveError && <div className="bg-red-50 text-red-700 border border-red-200 p-3 rounded-lg text-sm mb-4">{saveError}</div>}
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Vorname</label>
                        <input type="text" name="firstname" value={userData.firstname} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 outline-none ${isEditing ? 'bg-white focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 text-stone-500 cursor-not-allowed'}`} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Nachname</label>
                        <input type="text" name="lastname" value={userData.lastname} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 outline-none ${isEditing ? 'bg-white focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 text-stone-500 cursor-not-allowed'}`} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">E-Mail</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 outline-none ${isEditing ? 'bg-white focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 text-stone-500 cursor-not-allowed'}`} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Geschlecht</label>
                        <select name="gender" value={userData.gender} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 outline-none ${isEditing ? 'bg-white focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 text-stone-500 cursor-not-allowed'}`}>
                            <option value="Female">Weiblich</option>
                            <option value="Male">Männlich</option>
                            <option value="Divers">Divers</option>
                            <option value="Notanswered">Nicht Angeben</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Geburtstag</label>
                        <input type="date" name="birthday" value={userData.birthday} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 outline-none ${isEditing ? 'bg-white focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 text-stone-500 cursor-not-allowed'}`} />
                    </div>
                </div>
                <h3 className="font-bold text-lg border-b border-stone-100 pb-2 mb-4 pt-4 text-stone-800">Anschrift</h3>
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Straße & Hausnummer</label>
                    <input type="text" name="street" value={userData.street} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 outline-none ${isEditing ? 'bg-white focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 text-stone-500 cursor-not-allowed'}`} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-stone-700 mb-1">PLZ</label>
                        <input type="text" name="postcode" value={userData.postcode} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 outline-none ${isEditing ? 'bg-white focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 text-stone-500 cursor-not-allowed'}`} />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-sm font-bold text-stone-700 mb-1">Stadt (Provinz)</label>
                        <input type="text" name="city" value={userData.city} onChange={handleChange} disabled={!isEditing} className={`w-full border rounded-lg px-4 py-2 outline-none ${isEditing ? 'bg-white focus:ring-2 focus:ring-orange-500' : 'bg-stone-50 text-stone-500 cursor-not-allowed'}`} />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex gap-4 pt-6 animate-in fade-in slide-in-from-top-2">
                        <button type="button" onClick={() => { setIsEditing(false); setSaveError(null); }} className="flex-1 bg-stone-100 text-stone-700 font-bold py-3 rounded-xl hover:bg-stone-200 transition-colors">Abbrechen</button>
                        <button type="submit" className="flex-1 bg-orange-600 text-white hover:bg-orange-50 hover:text-orange-700 font-bold py-3 rounded-xl transition-colors shadow-lg">Speichern</button>
                    </div>
                )}
            </form>
        </div>
      </div>
      )}

      {activeTab === 'offers' && (
      <div className="mt-4 animate-in fade-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-black text-stone-900 mb-6">
          Meine aktiven Angebote ({myOffers.length})
        </h2>

        {myOffers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myOffers.map((product) => {
                const displayCondition = conditionMapping[product.condition] || product.condition;
                const id = product.offerId || product.id;
                
                return (
                    <div key={id} className="h-full">
                        <ProductCard 
                            id={id}
                            title={product.title}
                            price={(product.price / 100).toFixed(2)}
                            category={displayCondition}
                            imageUrl={product.images && product.images.length > 0 ? product.images[0].imageUrl : null}
                        />
                    </div>
                );
            })}
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
      )}

      {activeTab === 'watchlist' && (
      <div className="mt-4 animate-in fade-in zoom-in-95 duration-300">
        <h2 className="text-2xl font-black text-stone-900 mb-6">
          Meine Merkliste ({myWatchlist.length})
        </h2>

        {watchlistError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <strong>Fehler:</strong> {watchlistError}
            </div>
        )}

        {myWatchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myWatchlist.map((item) => {
                const title = item.title || "Unbekanntes Produkt";
                const price = item.price ? (item.price / 100).toFixed(2) : "0.00";
                const imageUrl = item.images && item.images.length > 0 ? item.images[0].imageUrl : null;
                const displayCondition = conditionMapping[item.condition] || item.condition;

                return (
                  <div key={item.productId || Math.random()} className="h-full">
                    <ProductCard 
                        id={item.productId}
                        title={title}
                        price={price}
                        category={displayCondition}
                        imageUrl={imageUrl}
                        
                        isLiked={true}
                        onToggleLike={() => handleRemoveFromWatchlist(item.productId)}
                    />
                  </div>
                );
            })}
          </div>
        ) : (
          !watchlistError && (
            <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 border-dashed">
                <span className="text-4xl block mb-2">👀</span>
                <p className="text-stone-500 font-medium mb-4">Du hast dir noch keine Produkte gemerkt.</p>
                <Link to="/marketplace" className="text-orange-600 font-bold hover:underline">
                Stöbere jetzt im Shop
                </Link>
            </div>
          )
        )}
      </div>
      )}

    </div>
  );
}