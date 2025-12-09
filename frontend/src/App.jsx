import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Register from './pages/Register';
import AccountPage from './pages/AccountPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Watchlist from './pages/Watchlist';
import Ecommerce from './pages/Ecommerce';
import BuyConfirmationModal from './components/BuyConfirmationModal';
import SellSecondHand from './pages/SellSecondHand';

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
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/shop" element={<Ecommerce />} />
          <Route path="/sell" element={<SellSecondHand />} />
        </Routes>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;