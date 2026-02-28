import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router'
import logo from "../assets/burger.png"

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200/50 pt-20 border-t border-base-content/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* --- Brand Section --- */}
          <div className="space-y-6">
            <Link 
              className='flex gap-2 items-center group transition-transform duration-300 active:scale-95' 
              to="/"
            >
              <img 
                className='h-10 w-10 object-contain drop-shadow-md group-hover:rotate-12 transition-transform' 
                src={logo} 
                alt="LocalChefBazaar Logo" 
              />
              <p className='text-2xl font-black tracking-tighter text-primary'>
                LocalChef<span className='text-base-content'>Bazaar</span>
              </p>
            </Link>
            <p className='text-base-content/60 leading-relaxed font-medium italic'>
              “Fresh Homemade Food, Delivered with Care. Cooked with Love by Local Chefs”
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { Icon: FaFacebookF, link: "https://facebook.com" },
                { Icon: FaInstagram, link: "https://instagram.com" },
                { Icon: FaTwitter, link: "https://twitter.com" }
              ].map((item, idx) => (
                <a 
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-base-300 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                >
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* --- Quick Links (Optional but Professional) --- */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-base-content/40">Company</h3>
            <ul className="space-y-4 font-bold text-base-content/70">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Our Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/all-meals" className="hover:text-primary transition-colors">Trending Menu</Link></li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-base-content/40">Contact</h3>
            <ul className="space-y-4 text-base-content/70 font-bold">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" /> 
                <span className="text-sm">localchefbazaar@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" /> 
                <span className="text-sm">+880 1234-567898</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" /> 
                <span className="text-sm">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* --- Working Hours --- */}
          <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-primary">Working Hours</h3>
            <div className="space-y-2">
              <p className="font-black text-base-content">Sat – Thu</p>
              <p className="text-2xl font-black text-primary italic">10am - 10pm</p>
              <div className="pt-2">
                <span className="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase rounded-full">
                  Friday: Closed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-base-content/5 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
            © {currentYear} <span className="text-primary">LocalChefBazaar</span>. All rights reserved.
          </p>
          <p className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
            Made with ❤️ by <span className="text-base-content border-b border-primary italic">RH Mumin</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer