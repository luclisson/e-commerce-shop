import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Register from './pages/Register';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
      
      <Navbar />

      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;