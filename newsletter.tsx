import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: (email: string) => apiRequest("POST", "/api/newsletter/subscribe", { email }),
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter. You'll receive updates on new collections and exclusive offers.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    subscribeMutation.mutate(email);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blush to-antique">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-serif font-bold text-white mb-4">
          Stay in Touch
        </h3>
        <p className="text-white text-lg mb-8">
          Be the first to know about new collections and exclusive offers
        </p>
        
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribeMutation.isPending}
            className="flex-1 px-4 py-3 rounded-l-md border-0 focus:ring-2 focus:ring-white focus:outline-none"
          />
          <Button
            type="submit"
            disabled={subscribeMutation.isPending}
            className="bg-gold text-white px-6 py-3 rounded-r-md hover:bg-antique transition-colors font-medium disabled:opacity-50"
          >
            {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        <p className="text-white/80 text-sm mt-4">
          Join over 50,000 jewelry lovers and get exclusive access to new arrivals, special promotions, and styling tips.
        </p>
      </div>
    </section>
  );
}
