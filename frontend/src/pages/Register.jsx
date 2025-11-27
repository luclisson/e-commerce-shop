import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const InputField = ({ label, name, type = "text", placeholder, colSpan = "col-span-1", value, onChange }) => (
  <div className={colSpan}>
    <label className="block text-sm font-bold text-stone-700 mb-1">{label}</label>
    <input 
      type={type}
      name={name}
      required
      value={value}
      onChange={onChange}
      className="w-full bg-stone-50 text-stone-900 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-none transition-all"
      placeholder={placeholder}
    />
  </div>
);

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    gender: 'diverse',
    firstName: '',
    lastName: '',
    birthDate: '',
    zip: '',
    city: '',
    street: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (formData.email === 'fehler@test.de') {
        setError('Diese E-Mail-Adresse wird bereits verwendet.');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigate('/'); 
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen py-12 px-4 flex justify-center items-start">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-stone-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-stone-900">Konto erstellen</h1>
          <p className="text-stone-500 mt-2">Werde Teil der Community und verkaufe dein Equipment.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm font-bold border border-red-100 flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-stone-700 mb-1">Geschlecht</label>
            <select 
              name="gender" 
              value={formData.gender} 
              onChange={handleChange}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 transition-all"
            >
              <option value="diverse">Divers</option>
              <option value="female">Weiblich</option>
              <option value="male">Männlich</option>
              <option value="n.A.">Nicht Angeben</option>
            </select>
          </div>

          <InputField 
            label="Vorname" name="firstName" placeholder="Maxine" 
            value={formData.firstName} onChange={handleChange} 
          />
          <InputField 
            label="Nachname" name="lastName" placeholder="Musterfrau" 
            value={formData.lastName} onChange={handleChange} 
          />
          
          <InputField 
            label="Geburtstag" name="birthDate" type="date" 
            value={formData.birthDate} onChange={handleChange} 
          />
          
          <InputField 
            label="Username" name="username" placeholder="EspressoHecht69" 
            value={formData.username} onChange={handleChange} 
          />

          <div className="col-span-1 md:col-span-2 border-t border-stone-100 my-2"></div>
          
          <InputField 
            label="Straße & Hausnr." name="street" placeholder="Kaffeeweg 12" colSpan="col-span-1 md:col-span-2" 
            value={formData.street} onChange={handleChange} 
          />
          <InputField 
            label="PLZ" name="zip" placeholder="20095" 
            value={formData.zip} onChange={handleChange} 
          />
          <InputField 
            label="Ort" name="city" placeholder="Hamburg" 
            value={formData.city} onChange={handleChange} 
          />

          <div className="col-span-1 md:col-span-2 border-t border-stone-100 my-2"></div>

          <InputField 
            label="E-Mail-Adresse" name="email" type="email" placeholder="maxine@musterfrau.de" colSpan="col-span-1 md:col-span-2" 
            value={formData.email} onChange={handleChange} 
          />
          
          <InputField 
            label="Passwort" name="password" type="password" placeholder="••••••••" 
            value={formData.password} onChange={handleChange} 
          />
          <InputField 
            label="Passwort wiederholen" name="confirmPassword" type="password" placeholder="••••••••" 
            value={formData.confirmPassword} onChange={handleChange} 
          />

          <div className="col-span-1 md:col-span-2 mt-4">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verarbeite...
                </>
              ) : (
                "Jetzt registrieren"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}