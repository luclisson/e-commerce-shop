const API_BASE_URL = "/api";

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  const storedAuth = localStorage.getItem("auth_header");
  
  if (storedAuth) {
    headers["Authorization"] = storedAuth;
  }
  
  return headers;
};

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

    const isValid = await response.json(); 

    if (isValid === true) {
      const credentials = btoa(`${username}:${password}`);
      const authHeaderValue = `Basic ${credentials}`;
      
      localStorage.setItem("auth_header", authHeaderValue);
      localStorage.setItem("username", username);
      
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

export const fetchProducts = async () => {

  const response = await fetch(`${API_BASE_URL}/shop/offer/getAvailableProducts`, {
    method: "GET",
    headers: getHeaders()
  });

  if (!response.ok) {
    if (response.status === 401) {
      logoutUser();
    }
    throw new Error("Konnte Produkte nicht laden.");
  }

  return await response.json();
};