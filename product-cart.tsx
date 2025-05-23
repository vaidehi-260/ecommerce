import { useState } from "react";
import { Link } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  // Check if in wishlist
  const { data: wishlistStatus } = useQuery<{ isInWishlist: boolean }>({
    queryKey: [`/api/wishlist/${product.id}/check`],
    enabled: isAuthenticated,
  });

  // Get product rating
  const { data: rating } = useQuery<{ average: number; count: number }>({
    queryKey: [`/api/products/${product.id}/rating`],
  });

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/cart", { productId: product.id, quantity: 1 }),
    onSuccess: () => {
      toast({
        title: "Added to Cart",
        description: "Product has been added to your cart successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: any) => {
      if (error.message.includes("401")) {
        toast({
          title: "Please Login",
          description: "You need to login to add items to cart.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to add product to cart.",
          variant: "destructive",
        });
      }
    },
  });

  // Wishlist toggle mutation
  const wishlistMutation = useMutation({
    mutationFn: () =>
      wishlistStatus?.isInWishlist
        ? apiRequest("DELETE", `/api/wishlist/${product.id}`)
        : apiRequest("POST", "/api/wishlist", { productId: product.id }),
    onSuccess: () => {
      toast({
        title: wishlistStatus?.isInWishlist ? "Removed from Wishlist" : "Added to Wishlist",
        description: wishlistStatus?.isInWishlist
          ? "Product has been removed from your wishlist."
          : "Product has been added to your wishlist.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/wishlist/${product.id}/check`] });
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
    },
    onError: (error: any) => {
      if (error.message.includes("401")) {
        toast({
          title: "Please Login",
          description: "You need to login to manage your wishlist.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to update wishlist.",
          variant: "destructive",
        });
      }
    },
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCartMutation.mutate();
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlistMutation.mutate();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-gold text-gold" />);
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  const productImage = product.images?.[0] || 
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500";

  const hasDiscount = product.originalPrice && 
    parseFloat(product.originalPrice) > parseFloat(product.price);

  const discountPercentage = hasDiscount 
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.originalPrice!)) * 100)
    : 0;

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`}>
        <div className="relative overflow-hidden rounded-lg mb-4 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
          {/* Product Image */}
          <div className="aspect-square relative overflow-hidden">
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-cover product-image-zoom transition-transform duration-500"
            />
            
            {/* Discount Badge */}
            {hasDiscount && (
              <Badge 
                variant="destructive" 
                className="absolute top-4 left-4 z-10"
              >
                {discountPercentage}% OFF
              </Badge>
            )}

            {/* Stock Badge */}
            {!product.inStock && (
              <Badge 
                variant="secondary" 
                className="absolute top-4 right-4 z-10 bg-gray-600 text-white"
              >
                Out of Stock
              </Badge>
            )}

            {/* Wishlist Button */}
            {isAuthenticated && (
              <div className={`absolute top-4 right-4 transition-opacity duration-300 ${
                isHovered || wishlistStatus?.isInWishlist ? "opacity-100" : "opacity-0"
              }`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWishlistToggle}
                  disabled={wishlistMutation.isPending}
                  className={`bg-white/90 hover:bg-white shadow-lg transition-colors ${
                    wishlistStatus?.isInWishlist 
                      ? "text-red-500 hover:text-red-600" 
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      wishlistStatus?.isInWishlist ? "fill-current" : ""
                    }`} 
                  />
                </Button>
              </div>
            )}

            {/* Quick Add to Cart */}
            {isAuthenticated && product.inStock && (
              <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={addToCartMutation.isPending}
                  className="bg-gold text-white hover:bg-antique transition-colors shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {addToCartMutation.isPending ? "Adding..." : "Quick Add"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="text-center">
        <h4 className="font-medium text-charcoal mb-2 hover:text-gold transition-colors cursor-pointer">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h4>
        
        {/* Rating */}
        {rating && rating.count > 0 && (
          <div className="flex justify-center items-center mb-2">
            <div className="flex">
              {renderStars(rating.average)}
            </div>
            <span className="text-sm text-mauve ml-2">({rating.count})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex justify-center items-center gap-2">
          <p className="text-lg font-semibold text-charcoal">
            ₹{parseFloat(product.price).toLocaleString()}
          </p>
          {hasDiscount && (
            <p className="text-sm text-mauve line-through">
              ₹{parseFloat(product.originalPrice!).toLocaleString()}
            </p>
          )}
        </div>

        {/* Material */}
        {product.material && (
          <p className="text-sm text-mauve mt-1">{product.material}</p>
        )}
      </div>
    </div>
  );
}
