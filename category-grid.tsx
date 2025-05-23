import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Category } from "@shared/schema";

export default function CategoryGrid() {
  const { data: categories = [], isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Default categories with images for fallback
  const defaultCategories = [
    {
      id: 1,
      name: "Earrings",
      slug: "earrings",
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
    },
    {
      id: 2,
      name: "Necklaces",
      slug: "necklaces",
      imageUrl: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
    },
    {
      id: 3,
      name: "Rings",
      slug: "rings",
      imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
    },
    {
      id: 4,
      name: "Bridal Sets",
      slug: "bridal-sets",
      imageUrl: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600",
    },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  if (isLoading) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-mauve">Unable to load categories at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
          Shop by Category
        </h3>
        <p className="text-mauve text-lg">Explore our carefully curated collections</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {displayCategories.slice(0, 4).map((category) => (
          <Link key={category.id} href={`/products?category=${category.slug}`}>
            <div className="group cursor-pointer">
              <div 
                className="aspect-square bg-cover bg-center rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300 shadow-lg"
                style={{ 
                  backgroundImage: `url('${category.imageUrl || defaultCategories.find(c => c.slug === category.slug)?.imageUrl}')` 
                }}
              />
              <h4 className="text-lg font-medium text-charcoal text-center group-hover:text-gold transition-colors">
                {category.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
