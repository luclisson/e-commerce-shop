import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full px-6 md:px-10 py-10 min-h-screen bg-stone-50">
      

      <div className="relative bg-stone-900 text-white rounded-3xl mt-6 mx-4 md:mx-10 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        
        <div className="relative z-10 py-32 px-6 md:px-20 text-center">
          <span className="uppercase tracking-widest text-orange-500 font-bold text-sm mb-4 block">Nicht die Bohne</span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Dein Kaffee-<br/>Upgrade wartet.
          </h1>
          <p className="text-stone-300 text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light">
            Der Premium-Marktplatz für gebrauchtes High-End Kaffee-Equipment. 
            Von Enthusiasten für Enthusiasten.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/marketplace" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-900/20 hover:text-white transform hover:-translate-y-1">
                Jetzt stöbern
            </Link>
            <Link to="/sell" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 hover:text-white transition-all hover:-translate-y-1">
                Equipment verkaufen
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
              ♻️
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Nachhaltiger Genuss</h3>
            <p className="text-stone-500 leading-relaxed">
              Gib hochwertigen Maschinen ein zweites Leben. Das spart Ressourcen und schont deinen Geldbeutel, ohne Kompromisse beim Geschmack.
            </p>
          </div>
          <div className="p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
              🏅
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">High-End Quality</h3>
            <p className="text-stone-500 leading-relaxed">
              Wir fokussieren uns auf Langlebigkeit. Hier findest du Marken wie La Marzocco, Rocket, ECM und Eureka statt Plastikschrott.
            </p>
          </div>
          <div className="p-6">
            <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
              🤝
            </div>
            <h3 className="text-xl font-bold text-stone-900 mb-3">Community First</h3>
            <p className="text-stone-500 leading-relaxed">
              Kaufe und verkaufe sicher innerhalb einer Community, die den Wert einer perfekt extrahierten Espresso-Shot zu schätzen weiß.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-stone-900 mb-12 text-center">Beliebte Kategorien</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kategorie 1 */}
            <Link to="/marketplace?category=Siebträgermaschinen" className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://hommel-kaffeesysteme.de/wp-content/uploads/new-classic-iaro-lmde-web-27-scaled.jpg" 
                alt="Siebträger" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-white text-2xl font-bold">Siebträger</h3>
                  <p className="text-stone-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    E61, Dualboiler & Handhebel
                  </p>
                </div>
              </div>
            </Link>

            {/* Kategorie 2 */}
            <Link to="/marketplace?category=Kaffeemühlen" className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.joomcdn.net%2F560ccb7ac98521f06b3f7213254a07d8ce93d485_original.jpeg&f=1&nofb=1&ipt=abc63d828643eb1dd5edb90374835962764aaf4aa93932ab8de2a0eeeed87284" 
                alt="Mühlen" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-white text-2xl font-bold">Mühlen</h3>
                  <p className="text-stone-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    Single Dosing & On-Demand
                  </p>
                </div>
              </div>
            </Link>

            {/* Kategorie 3 */}
            <Link to="/marketplace?category=Barista%20Zubehör" className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
              <img 
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.kavosdraugas.lt%2F58622468-f977-4729-9c2b-3aaaa60e7b96%2F800x800%2Fchiatotamper57mm5jpg.jpg&f=1&nofb=1&ipt=b00dd0e18ee30bff3302ba48098b81125df59cc0e51fc47e6263365a7d093388" 
                alt="Zubehör" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-white text-2xl font-bold">Zubehör</h3>
                  <p className="text-stone-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    Tamper, Leveler & Waagen
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-orange-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Deine Maschine verstaubt?</h2>
            <p className="text-orange-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Mach Platz für Neues und verdiene Geld dabei. Erstelle in wenigen Minuten ein Inserat und erreiche tausende Kaffeeliebhaber.
            </p>
            <Link 
              to="/account" 
              className="inline-block bg-white text-orange-600 px-10 py-4 rounded-xl font-bold hover:bg-stone-100 transition-colors shadow-lg"
            >
              Kostenlos inserieren
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}