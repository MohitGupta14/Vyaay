// pages/index.tsx
import Link from 'next/link';
import Navbar from '../components/navbar.';
import Footer from '../components/footer';
import SignupBox from './components/box';

const Home: React.FC = () => {
  return (
    <div className="bg-bgGreen min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <SignupBox />
      {/* Footer */}
      <div className=''><Footer /></div>
    </div>
  );
};

export default Home;