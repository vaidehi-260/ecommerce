import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-serif font-bold mb-4">Vaidaan</h4>
            <p className="text-gray-300 mb-4">
              Crafting timeless elegance with traditional artistry and modern design.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
              >
                <i className="fab fa-pinterest"></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-gold transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <a className="text-gray-300 hover:text-gold transition-colors">Collections</a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=bridal">
                  <a className="text-gray-300 hover:text-gold transition-colors">Bridal</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-gold transition-colors">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Care */}
          <div>
            <h5 className="font-semibold mb-4">Customer Care</h5>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  Care Instructions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                  Shipping Information
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h5 className="font-semibold mb-4">Contact Us</h5>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <i className="fas fa-phone mr-2"></i> 
                +91 98765 43210
              </p>
              <p className="flex items-center">
                <i className="fas fa-envelope mr-2"></i> 
                hello@vaidaan.com
              </p>
              <p className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i> 
                Mumbai, India
              </p>
            </div>
            
            {/* Business Hours */}
            <div className="mt-4">
              <h6 className="font-medium mb-2">Business Hours</h6>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                <p>Sunday: 11:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              &copy; 2024 Vaidaan Jewelry. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
