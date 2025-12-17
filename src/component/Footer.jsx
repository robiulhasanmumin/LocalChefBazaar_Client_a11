import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import Logo from './Logo'
import { Link } from 'react-router'
import logo from "../assets/burger.png"


const Footer = () => {
  return (
 <footer>
      <div className="footer sm:footer-horizontal p-10">
        {/* logo */}
        <div>
    <Link className='flex gap-1.5 items-center' to="/">
      <img className='h-8 w-8' src={logo} alt="" />
      <p className='text-xl font-bold text-yellow-500'>LocalChefBazaar</p>
    </Link>
    <p className='mt-2'>“Fresh Homemade Food, Delivered with Care. <br /> Cooked with Love by Local Chefs”</p>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p>Email: localchefbazaar@gmail.com</p>
          <p>Phone: +880 1234-567898</p>
          <p>Location: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1">
            <li>
              <a href="https://facebook.com" target="_blank" className="hover:underline flex items-center gap-2">
                Facebook <FaFacebook />
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" className="hover:underline flex items-center gap-2">
                Instagram <FaInstagram/>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" className="hover:underline flex items-center gap-2">
                Twitter <FaTwitter/>
              </a>
            </li>
          </ul>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
          <p>Saturday – Thursday</p>
          <p>10:00 AM – 10:00 PM</p>
          <p>Friday: Closed</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-6 border-t border-gray-700 py-4">
        © {new Date().getFullYear()} LocalChefBazaar. All rights reserved. Made by RH Mumin
      </div>
    </footer>
    
  )
}

export default Footer