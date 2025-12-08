import React, { useState, useEffect } from 'react';

export default function BuyConfirmationModal({ isOpen, onClose, onConfirm, product, isProcessing }) {
  const [paymentMethod, setPaymentMethod] = useState('PAYPAL');
  const [buyerName, setBuyerName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setBuyerName(user);
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const price = (product.price / 100).toFixed(2);
  const title = product.title || "Unbekanntes Produkt";
  
  const imageUrl = (product.images && product.images.length > 0) 
    ? product.images[0].imageUrl 
    : "https://placehold.co/600x600?text=Kein+Bild";

  const handleConfirmClick = () => {
    onConfirm(paymentMethod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto">
        
        <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
          <h3 className="text-lg font-black text-stone-900">Kauf abschließen</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 transition-colors text-2xl leading-none">&times;</button>
        </div>

        <div className="p-6">
          
          <div className="flex gap-4 mb-6">
            <div className="w-20 h-20 bg-stone-100 rounded-lg overflow-hidden border border-stone-200 flex-shrink-0">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
            <div>
                <h4 className="font-bold text-stone-900 leading-tight mb-1 line-clamp-2">{title}</h4>
                <p className="text-sm text-stone-500">Menge: 1</p>
            </div>
          </div>

          {/* Rechnung */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-2 mb-6">
            <div className="flex justify-between text-sm text-stone-600">
                <span>Zwischensumme</span>
                <span>{price} €</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600">
                <span>Versand</span>
                <span className="text-green-600 font-bold">Kostenlos</span>
            </div>
            <div className="h-px bg-stone-200 my-2"></div>
            <div className="flex justify-between text-lg font-black text-stone-900">
                <span>Gesamtsumme</span>
                <span>{price} €</span>
            </div>
          </div>

          <h4 className="font-bold text-stone-800 mb-3 text-sm uppercase tracking-wide">Zahlungsmethode</h4>
          <div className="space-y-2 mb-6">
            
            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'PAYPAL' ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-stone-200 hover:border-stone-300'}`}>
                <input 
                    type="radio" 
                    name="payment" 
                    value="PAYPAL" 
                    checked={paymentMethod === 'PAYPAL'} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-orange-600 w-4 h-4"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-stone-800 text-sm">PayPal</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">Empfohlen</span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">Konto von {buyerName}</p>
                </div>
            </label>

            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'CREDIT_CARD' ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-stone-200 hover:border-stone-300'}`}>
                <input 
                    type="radio" 
                    name="payment" 
                    value="CREDIT_CARD" 
                    checked={paymentMethod === 'CREDIT_CARD'} 
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-orange-600 w-4 h-4"
                />
                <div>
                    <p className="font-bold text-stone-800 text-sm">Kreditkarte</p>
                    <p className="text-xs text-stone-500 mt-0.5">Visa, Mastercard</p>
                </div>
            </label>

          </div>

        </div>

        <div className="p-6 border-t border-stone-100 bg-stone-50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl font-bold text-stone-600 hover:bg-stone-200 transition-colors"
          >
            Abbrechen
          </button>
          <button 
            onClick={handleConfirmClick}
            disabled={isProcessing}
            className={`flex-1 px-4 py-3 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 ${
                isProcessing 
                ? 'bg-stone-400 cursor-wait' 
                : 'bg-stone-900 hover:bg-orange-600 hover:shadow-orange-200'
            }`}
          >
            {isProcessing ? "Verarbeite..." : "Jetzt bezahlen"}
          </button>
        </div>

      </div>
    </div>
  );
}