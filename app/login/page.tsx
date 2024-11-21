// pages/index.tsx
"use client"
import Navbar from '../components/navbar.';
import Footer from '../components/footer';
import LoginBox from './components/box';

const Home = () => {
  
  return (
    <div className="bg-bgGreen min-h-screen flex flex-col">
    {/* Navbar */}
    <Navbar />
    
    {/* Main Content (LoginBox) */}
    <div className="flex-grow justify-center items-center">
      <LoginBox />
    </div>
    
    {/* Footer */}
    
    <Footer />
  
    
  </div>
  
  );
};


export default Home;
