import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CartItemWithProduct } from "@/lib/types";

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const { toast } = useToast();

  // Get cart items
  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  // Update cart item mutation
  const updateCartMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      apiRequest("PUT", `/api/cart/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update cart item.",
        variant: "destructive",
      });
    },
  });

  // Remove cart item mutation
  const removeCartMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/cart/${id}`),
    onSuccess: () => {
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove item from cart.",
        variant: "destructive",
      });
    },
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartMutation.mutate({ id, quantity: newQuantity });
  };

  const removeItem = (id: number) => {
    removeCartMutation.mutate(id);
  };

  // Calculate total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 space-y-4 py-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-8">
            <ShoppingBag className="h-16 w-16 text-mauve mb-4" />
            <h3 className="text-lg font-semibold text-charcoal mb-2">Your cart is empty</h3>
            <p className="text-mauve text-center mb-6">
              Add some beautiful jewelry to get started
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gold text-white hover:bg-antique"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={
                        item.product.images?.[0] ||
                        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
                      }
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-charcoal text-sm mb-1 truncate">
                      {item.product.name}
                    </h4>
                    
                    <p className="text-gold font-semibold text-sm mb-2">
                      ₹{(parseFloat(item.product.price) * item.quantity).toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || updateCartMutation.isPending}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1 text-sm min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={updateCartMutation.isPending}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        disabled={removeCartMutation.isPending}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-charcoal">Subtotal:</span>
                <span className="font-bold text-charcoal text-lg">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <Separator />

              <div className="space-y-2">
                <Link href="/cart">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onOpenChange(false)}
                  >
                    View Cart
                  </Button>
                </Link>
                
                <Link href="/checkout">
                  <Button
                    className="w-full bg-gold text-white hover:bg-antique"
                    onClick={() => onOpenChange(false)}
                  >
                    Checkout
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-mauve text-center">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
