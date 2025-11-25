import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-stone-900 text-white py-24 px-6 md:px-10 rounded-3xl mt-6 mx-4 md:mx-10 text-center">
      <h1 className="text-4xl md:text-6xl font-black mb-6">Dein Kaffee-Upgrade.</h1>
      <p className="text-stone-400 text-xl mb-8 max-w-2xl mx-auto">
        Der Marktplatz für gebrauchtes High-End Kaffee-Equipment.
      </p>
      <Link to="/marketplace" className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-500 transition-all inline-block">
          Zum Marktplatz
      </Link>
    </div>
  );
}