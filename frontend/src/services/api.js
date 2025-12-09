 const API_BASE_URL = "/api";


const getHeaders = () => {

const headers = {

"Content-Type": "application/json",

};

return headers;

}; 
const categoryMap = {
    "Siebträgermaschinen": 28,
    "Kaffeemühlen": 2,
    "Filter & Co.": 3,
    "Barista Zubehör": 4,
    "Reinigung & Pflege": 5,
    "Tassen & Becher": 6,
    "Bohnen": 7,
    "Ersatzteile": 8
};

// Mapping: Condition String -> Integer
const conditionMap = {
    "NEW": 0,
    "LIKE_NEW": 1,
    "EXCELLENT": 2,
    "MAX_GOOD": 3,
    "GOOD": 4,
    "USED": 5,
    "DEFECT": 6
};

// --- AUTHENTIFIZIERUNG ---

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shop/account/validateLogin`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error("Serverfehler beim Login-Versuch.");

    const data = await response.json(); 
    const isLoginSuccessful = data === true || (data && typeof data === 'object');

    if (isLoginSuccessful) {
      const credentials = btoa(`${username}:${password}`);
      const authHeaderValue = `Basic ${credentials}`;
      
      localStorage.setItem("auth_header", authHeaderValue);
      localStorage.setItem("username", username);
      
      if (data.userId) {
          localStorage.setItem("userId", data.userId);
      }
      
      return true;
    } else {
      throw new Error("Benutzername oder Passwort falsch.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("auth_header");
  localStorage.removeItem("username"); 
  localStorage.removeItem("userId"); 
  window.location.href = "/";
};

export const registerUser = async (userData) => {
  const backendPayload = {
    street: userData.street,
    postcode: userData.zip,
    province: userData.city,
    lastname: userData.lastName,
    firstname: userData.firstName,
    email: userData.email,
    username: userData.username,
    password: userData.password,
    gender: userData.gender,
    birthday: userData.birthDate
  };

  const response = await fetch(`${API_BASE_URL}/shop/account/createAccount?continue`, {
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backendPayload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registrierung fehlgeschlagen.");
  }
  const text = await response.text();
  return text ? (text.startsWith('{') ? JSON.parse(text) : { success: true }) : { success: true };
};

// --- PRODUKTE & ACCOUNT ---

export const fetchProducts = async () => {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(`${API_BASE_URL}/shop/product/getAvailableProducts`, {
    method: "GET",
    headers: headers
  });

  if (!response.ok) throw new Error("Konnte Produkte nicht laden.");
  return await response.json();
};

export const fetchEcom = async () => {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(`${API_BASE_URL}/shop/product/getAvailableEcom`, {
    method: "GET",
    headers: headers
  });

  if (!response.ok) throw new Error("Konnte Produkte nicht laden.");
  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/shop/product/getProductById/${id}`, {
    method: "GET",
    headers: getHeaders()
  });

  if (!response.ok) throw new Error("Produkt konnte nicht geladen werden.");
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const fetchAccountPageData = async (username) => {
  if (!username) throw new Error("Kein Benutzername vorhanden.");
  const response = await fetch(`${API_BASE_URL}/shop/account/getAccountPageData/${username}`, {
    method: "GET",
    headers: getHeaders()
  });
  if (!response.ok) throw new Error("Konnte Account-Daten nicht laden.");
  return await response.json();
};

export const updateAccountData = async (accountDto) => {
  const response = await fetch(`${API_BASE_URL}/shop/account/updateUserData`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(accountDto)
  });
  if (!response.ok) throw new Error("Fehler beim Senden der Daten.");
  return await response.json(); 
};

// --- WATCHLIST ---

export const fetchWatchlist = async (username) => {
  const response = await fetch(`${API_BASE_URL}/shop/watchlist/getWatchlist/${username}`, {
    method: "GET",
    headers: getHeaders()
  });
  if (!response.ok) throw new Error("Konnte Watchlist nicht laden.");
  return await response.json();
};

export const fetchUserWatchlist = async () => {
    const username = localStorage.getItem("username");
    if (!username) return []; 
    try {
        const response = await fetch(`${API_BASE_URL}/shop/watchlist/getWatchlist/${username}`, {
            method: "GET",
            headers: getHeaders()
        });
        if (response.ok) {
            const data = await response.json();
            return data.watchedProducts ? data.watchedProducts.map(p => p.productId) : [];
        }
        return [];
    } catch (error) {
        return [];
    }
};

export const addToWatchlist = async (username, productId) => {
    const response = await fetch(`${API_BASE_URL}/shop/watchlist/add/${username}/${productId}`, {
        method: "POST",
        headers: getHeaders()
    });
    if (!response.ok) throw new Error("Fehler beim Hinzufügen zur Watchlist.");
};

export const removeFromWatchlist = async (username, productId) => {
    const response = await fetch(`${API_BASE_URL}/shop/watchlist/remove/${username}/${productId}`, {
        method: "POST",
        headers: getHeaders()
    });
    if (!response.ok) throw new Error("Fehler beim Entfernen aus der Watchlist.");
};

// --- CREATE OFFER  ---

export const createOffer = async (offerData) => {
  // 1. Username statt ID
  const username = localStorage.getItem("username");
  
  if (!username) {
      throw new Error("Du bist nicht eingeloggt (Username fehlt).");
  }

  // 2. IDs ermitteln
  const catId = categoryMap[offerData.category] || 1;
  const condId = conditionMap[offerData.condition] !== undefined 
                 ? conditionMap[offerData.condition] 
                 : 3;

  // 3. Bilder Arrays vorbereiten
  const imgUrls = offerData.imageUrl ? [offerData.imageUrl] : [];
  const altTexts = offerData.imageUrl ? [offerData.title] : [];

  // 4. Payload exakt nach deiner Vorgabe
  const payload = {
    categoryId: catId,                  // int
    sellerUsername: username,           // string
    title: offerData.title,             // string
    description: offerData.description, // string
    price: Math.round(parseFloat(offerData.price) * 100), // int (Cents)
    amount: 1,                          // int
    condition: condId,                  // int
    imageUrls: imgUrls,                 // Array<String>
    alts: altTexts,                     // Array<String>
    mainIndex: 0                        // int
  };

  console.log("Sende Payload an Backend:", JSON.stringify(payload, null, 2));

  const response = await fetch(`${API_BASE_URL}/shop/offer/createOffer`, { 
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("Backend Error:", errorText);
      throw new Error("Fehler beim Erstellen des Inserats.");
  }
  
  return true; 
};

// --- KAUFEN ---

export const buySecondHandProduct = async (productId, paymentMethod = "PAYPAL") => {
    const username = localStorage.getItem("username");
    if (!username) throw new Error("Nicht eingeloggt.");

    const payload = {
        buyerUsername: username,
        paymentMethod: paymentMethod,
        secondhandProductId: parseInt(productId),
        ecommerceProductId: null,
        quantity: 1
    };

    const response = await fetch(`${API_BASE_URL}/shop/order/createOrder/secondHand`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Kauf fehlgeschlagen (Second Hand).");
    return true;
};

export const buyEcomProduct = async (productId, quantity = 1, paymentMethod = "PAYPAL") => {
    const username = localStorage.getItem("username");
    if (!username) throw new Error("Nicht eingeloggt.");

    const payload = {
        buyerUsername: username,
        paymentMethod: paymentMethod,
        secondhandProductId: null,
        ecommerceProductId: parseInt(productId),
        quantity: quantity
    };

    const response = await fetch(`${API_BASE_URL}/shop/order/createOrder/ecom`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Kauf fehlgeschlagen (E-Commerce).");
    return true;
};

export const fetchEcomProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/shop/product/getEcomById/${id}`, {
    method: "GET",
    headers: getHeaders()
  });

  if (!response.ok) {
      throw new Error("E-Com Produkt konnte nicht geladen werden.");
  }
  
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};