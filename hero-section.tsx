import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="h-96 md:h-[600px] bg-cover bg-center relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`,
          }}
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              Festive Collection 2024
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover our exquisite range of traditional jewelry crafted with modern elegance
            </p>
            <Link href="/products">
              <Button 
                size="lg"
                className="bg-gold text-white px-8 py-3 rounded-md font-medium hover:bg-antique transition-colors duration-200 transform hover:scale-105"
              >
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gold/30 rounded-full animate-pulse hidden md:block" />
        <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-gold/30 rounded-full animate-pulse hidden md:block" />
        <div className="absolute top-1/2 left-20 w-12 h-12 border-2 border-gold/30 rounded-full animate-pulse hidden lg:block" />
      </div>
    </section>
  );
}
