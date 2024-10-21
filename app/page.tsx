// pages/index.tsx
import Link from 'next/link';
import Navbar from './components/navbar.';
import Footer from './components/footer';
const Home: React.FC = () => {
  return (
    <div className="bg-bgGreen min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-16 bg-light-dots">
  <div className="text-center">
    <h2 className="text-4xl font-lato font-bold text-gray-800 mb-4">
      Effortlessly split and track expenses with <span className="text-darkGreen font-bold">𝘝𝘺𝘢𝘢𝘺</span>.
    </h2>
    <h3 className="text-green-800 mb-8">
      Manage your group expenses like never before.
    </h3>
    <Link href="/signup">
      <span className="px-6 py-3 bg-btnGreen text-white font-semibold rounded-lg shadow-md hover:bg-darkGreen cursor-pointer">
        Get Started
      </span>
    </Link>
  </div>
</main>


      {/* Footer */}
      <div className=''><Footer /></div>
    </div>
  );
};

export default Home;