import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { Product } from "@shared/schema";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: searchResults, isLoading } = useQuery<{
    products: Product[];
    total: number;
  }>({
    queryKey: ["/api/products", { search: searchTerm, limit: 8 }],
    enabled: searchTerm.length > 2,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onOpenChange(false);
      // Navigate to products page with search
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleProductClick = () => {
    onOpenChange(false);
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-charcoal">Search Products</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mauve" />
            <Input
              placeholder="Search for jewelry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Button type="submit" className="w-full bg-gold text-white hover:bg-antique">
            Search All Products
          </Button>
        </form>

        {/* Search Results */}
        {searchTerm.length > 2 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-charcoal mb-3">Quick Results</h3>
            
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults?.products.length === 0 ? (
              <p className="text-mauve text-sm">No products found for "{searchTerm}"</p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {searchResults?.products.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`}>
                    <div 
                      className="flex items-center space-x-3 p-2 rounded-md hover:bg-ivory cursor-pointer transition-colors"
                      onClick={handleProductClick}
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                        }
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gold">
                          ₹{parseFloat(product.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {searchResults && searchResults.total > searchResults.products.length && (
                  <div className="text-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onOpenChange(false);
                        window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
                      }}
                      className="text-gold hover:text-antique"
                    >
                      View all {searchResults.total} results
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
