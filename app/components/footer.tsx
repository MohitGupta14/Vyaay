import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 text-white py-12 rounded-t-3xl shadow-2xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">𝘝𝘺𝘢𝘢𝘺</h2>
            <p className="text-green-200 font-funnel">
              Simplifying group expenses, one split at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/features", label: "Features" },
                { href: "/pricing", label: "Pricing" },
                { href: "/signup", label: "Get Started" }
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-green-200 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social and Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {[
                { 
                  icon: FaGithub, 
                  href: "https://github.com/MohitGupta14",
                  aria: "GitHub Profile"
                },
                { 
                  icon: FaEnvelope, 
                  href: "mailto:mohitguptaofficial53@gmail.com",
                  aria: "Email"
                },
                { 
                  icon: FaLinkedin, 
                  href: "https://linkedin.com/in/yourprofile",
                  aria: "LinkedIn"
                },
                { 
                  icon: FaTwitter, 
                  href: "https://twitter.com/yourhandle",
                  aria: "Twitter"
                }
              ].map((social) => (
                <Link 
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.aria}
                  className="text-green-200 hover:text-white transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
            
            <p className="text-sm text-green-300">
              Made with <FaHeart className="inline w-4 h-4 text-red-400 fill-red-400" /> in India
            </p>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-8 pt-6 border-t border-green-800 text-center">
          <p className="text-sm text-green-300 font-funnel">
            &copy; {new Date().getFullYear()} Vyaay. All rights reserved.
            <span className="mx-2 opacity-50">|</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span className="mx-2 opacity-50">|</span>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;