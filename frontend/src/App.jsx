import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white w-full font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      <Navbar />
      <main className="w-full flex-grow flex flex-col">
        <Hero />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}

export default App;