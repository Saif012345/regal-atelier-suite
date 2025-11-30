import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { InstagramSection } from "@/components/home/InstagramSection";

import categoryProm from "@/assets/category-prom.jpg";
import categoryBridal from "@/assets/category-bridal.jpg";
import categoryOccasion from "@/assets/category-occasion.jpg";
import categoryAbaya from "@/assets/category-abaya.jpg";

const categories = [
  {
    name: "Prom",
    description: "Make an unforgettable entrance with our stunning prom collection",
    image: categoryProm,
    href: "/shop?category=prom",
  },
  {
    name: "Bridal",
    description: "Timeless elegance for your most special day",
    image: categoryBridal,
    href: "/shop?category=bridal",
  },
  {
    name: "Occasion",
    description: "Sophisticated pieces for galas, events & celebrations",
    image: categoryOccasion,
    href: "/shop?category=occasion",
  },
  {
    name: "Abayas",
    description: "Luxurious modest wear with exquisite detailing",
    image: categoryAbaya,
    href: "/shop?category=abayas",
  },
];

const featuredProducts = [
  {
    id: "celestial-ballgown",
    name: "Celestial Ballgown",
    price: 1899,
    image: categoryProm,
    category: "Prom",
    isNew: true,
  },
  {
    id: "eternal-grace",
    name: "Eternal Grace",
    price: 3499,
    image: categoryBridal,
    category: "Bridal",
    isNew: true,
  },
  {
    id: "emerald-dream",
    name: "Emerald Dream",
    price: 1299,
    image: categoryOccasion,
    category: "Occasion",
  },
  {
    id: "noir-elegance",
    name: "Noir Elegance Abaya",
    price: 599,
    image: categoryAbaya,
    category: "Abaya",
  },
];

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <CategorySection categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <ServicesSection />
      <TestimonialSection />
      <InstagramSection />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
