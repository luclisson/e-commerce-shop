const API_BASE_URL = "/api";

// Hilfsfunktion für Header (Auth + JSON)
const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  
  // VERSUCH: Kommentiere das aus, damit wir keinen falschen Ausweis vorzeigen
  /* const storedAuth = localStorage.getItem("auth_header");
  if (storedAuth) {
    headers["Authorization"] = storedAuth;
  }
  */
  
  return headers;
};

// --- LOGIN ---
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

    // Prüfung: Dein Backend gibt aktuell true/false zurück.
    // Für die Account-Page wäre es besser, wenn es ein Objekt { userId: 1, ... } zurückgibt.
    // Dieser Code funktioniert vorerst mit beidem (Boolean 'true' oder Objekt).
    
    const isLoginSuccessful = data === true || (data && typeof data === 'object');

    if (isLoginSuccessful) {
      // Basic Auth Header erstellen
      const credentials = btoa(`${username}:${password}`);
      const authHeaderValue = `Basic ${credentials}`;
      
      localStorage.setItem("auth_header", authHeaderValue);
      localStorage.setItem("username", username);
      
      // Falls dein Backend schon so umgebaut ist, dass es die ID liefert:
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      } else {
        // Fallback: Wenn Backend nur 'true' liefert, können wir die ID noch nicht speichern.
        // Das bedeutet, die Account-Page wird evtl. keine Daten laden können.
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

// --- LOGOUT ---
export const logoutUser = () => {
  // Alles aufräumen
  localStorage.removeItem("auth_header");
  localStorage.removeItem("username"); 
  localStorage.removeItem("userId"); 
  
  // Hard Redirect zur Startseite
  window.location.href = "/";
};

// --- REGISTRIERUNG ---
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

// --- PRODUKTE LADEN ---
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

// --- ACCOUNT DATEN LADEN (NEU) ---
export const fetchAccountData = async () => {
  // 1. Username aus dem LocalStorage holen
  const username = localStorage.getItem("username");

  if (!username) {
      throw new Error("Kein Benutzername gefunden (nicht eingeloggt).");
  }

  // 2. Den Username an die URL hängen
  // ACHTUNG: Das funktioniert nur, wenn dein Backend hier einen String akzeptiert!
  const response = await fetch(`${API_BASE_URL}/shop/account/getAccountById/${username}`, {
      method: "GET",
      headers: getHeaders()
  });

  if (!response.ok) {
      throw new Error("Konnte Profildaten nicht laden.");
  }

  return await response.json();
};