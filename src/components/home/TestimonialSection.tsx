import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Bride",
    content:
      "My wedding dress exceeded every expectation. The attention to detail and craftsmanship was impeccable. I felt like a princess on my special day.",
    rating: 5,
  },
  {
    id: 2,
    name: "Emily Chen",
    role: "Prom 2024",
    content:
      "The custom design process was amazing! They brought my Pinterest board to life. Everyone at prom asked where I got my dress.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amira Hassan",
    role: "Special Occasion",
    content:
      "Beautiful abayas with such elegant details. The quality is outstanding and the customer service is exceptional. Highly recommend!",
    rating: 5,
  },
];

export function TestimonialSection() {
  return (
    <section className="py-24 bg-blush/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-widest text-primary uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className="relative bg-card rounded-lg p-8 shadow-card hover:shadow-elegant transition-shadow duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Quote className="h-5 w-5" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-display text-lg font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
