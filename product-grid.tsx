import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ProductCard from "./product-card";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  showFeatured?: boolean;
  title?: string;
  limit?: number;
  categoryId?: number;
}

export default function ProductGrid({ 
  showFeatured = false, 
  title = "Our Products",
  limit = 8,
  categoryId 
}: ProductGridProps) {
  const { data: productsData, isLoading, error } = useQuery<{
    products: Product[];
    total: number;
  }>({
    queryKey: ["/api/products", { 
      featured: showFeatured || undefined,
      categoryId,
      limit,
      offset: 0 
    }],
  });

  const products = productsData?.products || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-80 mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">{title}</h3>
          <p className="text-mauve">Unable to load products at this time.</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">{title}</h3>
          <p className="text-mauve mb-6">No products available at this time.</p>
          <Link href="/products">
            <Button className="bg-gold text-white hover:bg-antique">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
            {title}
          </h3>
          <p className="text-mauve text-lg">
            {showFeatured ? "Our most loved pieces" : "Discover our beautiful collection"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {!showFeatured && products.length >= limit && (
          <div className="text-center mt-12">
            <Link href="/products">
              <Button 
                variant="outline"
                size="lg"
                className="border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-200"
              >
                View All Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
