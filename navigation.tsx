import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Heart, ShoppingBag, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import SearchModal from "./search-modal";
import CartSidebar from "./cart-sidebar";
import type { CartItemWithProduct, WishlistItemWithProduct } from "@/lib/types";

export default function Navigation() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Get cart items count
  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  // Get wishlist items count
  const { data: wishlistItems = [] } = useQuery<WishlistItemWithProduct[]>({
    queryKey: ["/api/wishlist"],
    enabled: isAuthenticated,
  });

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const navigationLinks = [
    { href: "/", label: "Home", active: location === "/" },
    { href: "/products", label: "Collections", active: location.startsWith("/products") },
    { href: "/products?category=bridal", label: "Bridal", active: false },
    { href: "/about", label: "About", active: location === "/about" },
    { href: "/contact", label: "Contact", active: location === "/contact" },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-serif font-bold text-charcoal cursor-pointer">
                  Vaidaan
                </h1>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className={`transition-colors duration-200 font-medium ${
                    link.active 
                      ? "text-gold" 
                      : "text-charcoal hover:text-gold"
                  }`}>
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="text-charcoal hover:text-gold transition-colors"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              {isAuthenticated && (
                <Link href="/wishlist">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-charcoal hover:text-gold transition-colors relative"
                  >
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-gold text-white text-xs">
                        {wishlistCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-charcoal hover:text-gold transition-colors"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-charcoal hover:text-gold transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => window.location.href = "/api/login"}
                  size="sm"
                  className="bg-gold text-white hover:bg-antique transition-colors"
                >
                  Login
                </Button>
              )}

              {/* Cart */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCart(true)}
                  className="text-charcoal hover:text-gold transition-colors relative"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-gold text-white text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              )}
              
              {/* Mobile menu button */}
              <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden text-charcoal">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-6">
                    <h2 className="text-lg font-serif font-bold text-charcoal mb-4">Menu</h2>
                    {navigationLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <a 
                          className={`block py-2 px-4 rounded-md transition-colors ${
                            link.active 
                              ? "bg-gold text-white" 
                              : "text-charcoal hover:bg-ivory"
                          }`}
                          onClick={() => setShowMobileMenu(false)}
                        >
                          {link.label}
                        </a>
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal open={showSearch} onOpenChange={setShowSearch} />

      {/* Cart Sidebar */}
      <CartSidebar open={showCart} onOpenChange={setShowCart} />
    </>
  );
}
