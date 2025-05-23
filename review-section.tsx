export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
      rating: 5,
      comment: "Absolutely gorgeous pieces! The quality exceeded my expectations and the designs are so unique. Perfect for my wedding functions.",
      verified: true,
    },
    {
      id: 2,
      name: "Ananya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
      rating: 5,
      comment: "Fast delivery and beautiful packaging. The jewelry looks exactly like the photos. Will definitely order again!",
      verified: true,
    },
    {
      id: 3,
      name: "Kavya Menon",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60",
      rating: 5,
      comment: "Love the traditional designs with a modern touch. Great value for money and excellent customer service.",
      verified: true,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? "text-gold" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
            What Our Customers Say
          </h3>
          <p className="text-mauve text-lg">Real reviews from real customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-ivory p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex mb-4">
                {renderStars(review.rating)}
              </div>
              <p className="text-mauve mb-4 leading-relaxed">"{review.comment}"</p>
              <div className="flex items-center">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-medium text-charcoal">{review.name}</div>
                  <div className="text-sm text-mauve flex items-center">
                    {review.verified && (
                      <>
                        <i className="fas fa-check-circle text-green-500 mr-1"></i>
                        Verified Buyer
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">4.9</div>
              <div className="flex justify-center mb-2">
                {renderStars(5)}
              </div>
              <div className="text-mauve">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">10K+</div>
              <div className="text-mauve">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">15K+</div>
              <div className="text-mauve">Five Star Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
