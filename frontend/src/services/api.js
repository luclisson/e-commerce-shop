const API_BASE_URL = "/api";

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  
  
  return headers;
};

// OGIN
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shop/account/validateLogin`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        username: username, 
        password: password 
      })
    });

    if (!response.ok) {
      throw new Error("Serverfehler beim Login-Versuch.");
    }

    const data = await response.json(); 
    
    const isLoginSuccessful = data === true || (data && typeof data === 'object');

    if (isLoginSuccessful) {
      const credentials = btoa(`${username}:${password}`);
      const authHeaderValue = `Basic ${credentials}`;
      
      localStorage.setItem("auth_header", authHeaderValue);
      localStorage.setItem("username", username);
      
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      } else {
        console.warn("Backend lieferte keine User-ID. Account-Page wird eingeschränkt sein.");
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

//  LOGOUT
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

  const response = await fetch(`${API_BASE_URL}/shop/offer/getAvailableProducts`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Konnte Produkte nicht laden.");
  }

  return await response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/shop/offer/getProductById/${id}`, {
    method: "GET",
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Produkt konnte nicht geladen werden.");
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const fetchAccountPageData = async (username) => {
  if (!username) {
    throw new Error("Kein Benutzername vorhanden.");
  }

  const response = await fetch(`${API_BASE_URL}/shop/account/getAccountPageData/${username}`, {
    method: "GET",
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Konnte Account-Daten nicht laden.");
  }

  return await response.json();
};

export const fetchWatchlist = async (username) => {
  const response = await fetch(`${API_BASE_URL}/shop/watchlist/getWatchlist/${username}`, {
    method: "GET",
    headers: getHeaders()
  });

  if (!response.ok) {
    throw new Error("Konnte Watchlist nicht laden.");
  }

  return await response.json();
};

export const updateAccountData = async (accountDto) => {
  const token = localStorage.getItem("token"); 
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const response = await fetch(`${API_BASE_URL}/shop/account/updateUserData`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(accountDto)
  });

  if (!response.ok) {
    throw new Error("Fehler beim Senden der Daten.");
  }

  return await response.json(); 
};