const Footer: React.FC = () => {
    return (
      <footer className="bg-black text-white py-6 rounded-t-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/MohitGupta14" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href="mailto:mohitguptaofficial53@gmail.com" className="hover:underline">
              Contact
            </a>
          </div>
          <p className="mb-4 font-thin">&copy; {new Date().getFullYear()} Vyaay. All rights reserved.</p>

        </div>
      </footer>
    );
  };
  
  export default Footer;
  