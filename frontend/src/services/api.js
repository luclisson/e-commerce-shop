 const API_BASE_URL = "/api";


const getHeaders = () => {

const headers = {

"Content-Type": "application/json",

};

return headers;

}; 

// LOGIN
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
      
      if (data.userId) localStorage.setItem("userId", data.userId);
      
      return true;
    } else {
      throw new Error("Benutzername oder Passwort falsch.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("auth_header");
  localStorage.removeItem("username"); 
  localStorage.removeItem("userId"); 
  window.location.href = "/";
};

// REGISTRIERUNG
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

export const fetchProducts = async () => {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(`${API_BASE_URL}/shop/product/getAvailableProducts`, { // Adjusted path based on earlier context, check your backend
    method: "GET",
    headers: headers
  });

  if (!response.ok) throw new Error("Konnte Produkte nicht laden.");
  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/shop/product/getProductById/${id}`, { // Adjusted path
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

export const fetchWatchlist = async (username) => {
  const response = await fetch(`${API_BASE_URL}/shop/watchlist/getWatchlist/${username}`, {
    method: "GET",
    headers: getHeaders()
  });
  if (!response.ok) throw new Error("Konnte Watchlist nicht laden.");
  return await response.json();
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

export const updateAccountData = async (accountDto) => {
  const response = await fetch(`${API_BASE_URL}/shop/account/updateUserData`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(accountDto)
  });
  if (!response.ok) throw new Error("Fehler beim Senden der Daten.");
  return await response.json(); 
};

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

    const response = await fetch(`${API_BASE_URL}/order/createOrder/ecom`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("Kauf fehlgeschlagen (E-Commerce).");
    return true;
};