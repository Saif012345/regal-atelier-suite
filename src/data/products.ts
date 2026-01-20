import categoryProm from "@/assets/category-prom.jpg";
import categoryBridal from "@/assets/category-bridal.jpg";
import categoryOccasion from "@/assets/category-occasion.jpg";
import categoryAbaya from "@/assets/category-abaya.jpg";
import productRedSequin from "@/assets/product-red-sequin-gown.jpg";
import productPinkMermaid from "@/assets/product-pink-sequin-mermaid.jpg";
import productGoldBeaded from "@/assets/product-gold-beaded-gown.jpg";
import productBurgundyOccasion from "@/assets/product-burgundy-occasion.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  brand: "azixa" | "simply-azixa";
  description: string;
  details: string[];
  isCustom: boolean;
  colors?: { name: string; hex: string }[];
  lengths?: string[];
}

export const products: Product[] = [
  // Azixa Rahman - Prom
  {
    id: "celestial-ballgown",
    name: "Celestial Ballgown",
    price: 1899,
    images: [productRedSequin, categoryProm, categoryBridal],
    category: "Prom",
    brand: "azixa",
    description: "A breathtaking ballgown that captures the magic of a starlit night. Features intricate beadwork, a sweetheart neckline, and a dramatic full skirt that moves beautifully.",
    details: [
      "Hand-sewn beadwork throughout bodice",
      "Sweetheart neckline with optional straps",
      "Full tulle skirt with horsehair trim",
      "Built-in boning for structure",
      "Hidden back zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "midnight-dream",
    name: "Midnight Dream",
    price: 2199,
    images: [productPinkMermaid, categoryProm],
    category: "Prom",
    brand: "azixa",
    description: "An enchanting midnight blue gown with delicate crystal embellishments that shimmer like stars. Perfect for making a dramatic entrance.",
    details: [
      "Crystal embellishments throughout",
      "Deep V-neckline",
      "Flowing chiffon skirt",
      "Built-in boning for structure",
      "Hidden back zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "rose-enchantment",
    name: "Rose Enchantment",
    price: 1799,
    images: [categoryProm],
    category: "Prom",
    brand: "azixa",
    description: "A romantic blush gown adorned with 3D floral appliqués. The fitted bodice and flowing skirt create a timeless silhouette.",
    details: [
      "3D floral appliqués",
      "Fitted bodice with boning",
      "A-line skirt with train",
      "Hidden back zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "starlight-gown",
    name: "Starlight Gown",
    price: 2099,
    images: [categoryProm],
    category: "Prom",
    brand: "azixa",
    description: "A glamorous champagne gown with delicate beading that catches the light beautifully. Features a classic silhouette with modern details.",
    details: [
      "Delicate beading throughout",
      "Illusion neckline",
      "Mermaid silhouette",
      "Built-in boning",
      "Hidden back zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "aurora-silk",
    name: "Aurora Silk Gown",
    price: 2299,
    images: [categoryProm],
    category: "Prom",
    brand: "azixa",
    description: "A stunning silk gown in soft aurora hues. The luxurious fabric drapes elegantly, creating a sophisticated and timeless look.",
    details: [
      "Pure silk fabric",
      "One-shoulder design",
      "Draped bodice",
      "Hidden back zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "crystal-cascade",
    name: "Crystal Cascade",
    price: 2499,
    images: [categoryProm],
    category: "Prom",
    brand: "azixa",
    description: "An exquisite gown featuring cascading crystal embellishments. The dramatic design is perfect for those who want to make a statement.",
    details: [
      "Cascading crystal embellishments",
      "Strapless design",
      "Trumpet silhouette",
      "Built-in corset",
      "Chapel train",
      "Fully lined",
    ],
    isCustom: true,
  },

  // Azixa Rahman - Bridal
  {
    id: "eternal-grace",
    name: "Eternal Grace",
    price: 3999,
    images: [productGoldBeaded, categoryBridal],
    category: "Bridal",
    brand: "azixa",
    description: "A timeless bridal gown featuring delicate lace and a romantic silhouette. Perfect for the classic bride.",
    details: [
      "French lace overlay",
      "Illusion back with buttons",
      "Chapel length train",
      "Built-in corset",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "royal-elegance",
    name: "Royal Elegance",
    price: 4499,
    images: [categoryBridal],
    category: "Bridal",
    brand: "azixa",
    description: "A majestic bridal gown with intricate beadwork and a dramatic cathedral train. Designed for the bride who wants to feel like royalty.",
    details: [
      "Intricate beadwork",
      "Off-shoulder design",
      "Cathedral train",
      "Built-in boning",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "whispered-romance",
    name: "Whispered Romance",
    price: 3799,
    images: [categoryBridal],
    category: "Bridal",
    brand: "azixa",
    description: "A soft and romantic gown with flowing layers of tulle and delicate embroidery. Perfect for a garden or destination wedding.",
    details: [
      "Delicate embroidery",
      "V-neckline",
      "Flowing tulle skirt",
      "Hidden zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "moonlit-garden",
    name: "Moonlit Garden",
    price: 4199,
    images: [categoryBridal],
    category: "Bridal",
    brand: "azixa",
    description: "An ethereal gown inspired by moonlit gardens. Features 3D floral appliqués and a dreamy silhouette.",
    details: [
      "3D floral appliqués",
      "Sweetheart neckline",
      "A-line silhouette",
      "Chapel train",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "timeless-beauty",
    name: "Timeless Beauty",
    price: 4299,
    images: [categoryBridal],
    category: "Bridal",
    brand: "azixa",
    description: "A classic bridal gown with clean lines and elegant simplicity. The perfect canvas for your personal style.",
    details: [
      "Minimalist design",
      "Boat neckline",
      "Fit and flare silhouette",
      "Hidden zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "pearl-cascade",
    name: "Pearl Cascade",
    price: 4699,
    images: [categoryBridal],
    category: "Bridal",
    brand: "azixa",
    description: "A luxurious gown adorned with cascading pearls. The intricate detailing creates a truly unforgettable bridal look.",
    details: [
      "Cascading pearl embellishments",
      "High neckline",
      "Column silhouette",
      "Cathedral train",
      "Fully lined",
    ],
    isCustom: true,
  },

  // Azixa Rahman - Occasion
  {
    id: "gilded-evening",
    name: "Gilded Evening",
    price: 1599,
    images: [productBurgundyOccasion, categoryOccasion],
    category: "Occasion",
    brand: "azixa",
    description: "A sophisticated evening gown with gold accents. Perfect for galas and special events.",
    details: [
      "Gold metallic accents",
      "One-shoulder design",
      "Floor-length hem",
      "Hidden zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "sapphire-nights",
    name: "Sapphire Nights",
    price: 1799,
    images: [categoryOccasion],
    category: "Occasion",
    brand: "azixa",
    description: "A stunning sapphire blue gown that commands attention. The rich color and elegant cut make it perfect for formal occasions.",
    details: [
      "Deep sapphire color",
      "V-neckline",
      "Fitted silhouette",
      "Hidden zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "velvet-dream",
    name: "Velvet Dream",
    price: 1699,
    images: [categoryOccasion],
    category: "Occasion",
    brand: "azixa",
    description: "A luxurious velvet gown with a modern twist. The rich texture and flattering cut create an unforgettable look.",
    details: [
      "Premium velvet fabric",
      "Square neckline",
      "Mermaid silhouette",
      "Hidden zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "emerald-enchantress",
    name: "Emerald Enchantress",
    price: 1899,
    images: [categoryOccasion],
    category: "Occasion",
    brand: "azixa",
    description: "A striking emerald gown that exudes confidence and elegance. Perfect for making a grand entrance.",
    details: [
      "Rich emerald color",
      "Halter neckline",
      "A-line silhouette",
      "Hidden zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "champagne-soiree",
    name: "Champagne Soirée",
    price: 1749,
    images: [categoryOccasion],
    category: "Occasion",
    brand: "azixa",
    description: "A elegant champagne-colored gown perfect for cocktail parties and celebrations. Sophisticated and timeless.",
    details: [
      "Champagne satin fabric",
      "Off-shoulder design",
      "Tea-length hem",
      "Hidden zipper",
      "Fully lined",
    ],
    isCustom: true,
  },
  {
    id: "midnight-glamour",
    name: "Midnight Glamour",
    price: 1999,
    images: [categoryOccasion],
    category: "Occasion",
    brand: "azixa",
    description: "A dramatic black gown with subtle sparkle. The perfect choice for formal evening events.",
    details: [
      "Subtle sequin details",
      "Plunging neckline",
      "Column silhouette",
      "Hidden zipper",
      "Fully lined",
    ],
    isCustom: true,
  },

  // Simply Azixa - Abayas
  {
    id: "pearl-mist",
    name: "Pearl Mist Abaya",
    price: 249,
    images: [categoryAbaya],
    category: "Abayas",
    brand: "simply-azixa",
    description: "A graceful abaya in soft pearl mist color. Features delicate embroidery and a modern cut for everyday elegance.",
    details: [
      "Premium crepe fabric",
      "Delicate embroidery",
      "Hidden front buttons",
      "Belt included",
      "Fully lined",
    ],
    isCustom: false,
    colors: [
      { name: "Pearl", hex: "#e8e4e0" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    lengths: ["52", "54", "56", "58"],
  },
  {
    id: "midnight-grace",
    name: "Midnight Grace Abaya",
    price: 279,
    images: [categoryAbaya],
    category: "Abayas",
    brand: "simply-azixa",
    description: "An elegant black abaya with subtle shimmer details. Perfect for both casual and formal occasions.",
    details: [
      "Premium nida fabric",
      "Subtle shimmer details",
      "Front open style",
      "Belt included",
      "Fully lined",
    ],
    isCustom: false,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Dark Grey", hex: "#3d3d3d" },
    ],
    lengths: ["52", "54", "56", "58"],
  },
  {
    id: "desert-rose",
    name: "Desert Rose Abaya",
    price: 299,
    images: [categoryAbaya],
    category: "Abayas",
    brand: "simply-azixa",
    description: "A romantic abaya in dusty rose with floral embroidery. A beautiful choice for special occasions.",
    details: [
      "Premium crepe fabric",
      "Floral embroidery",
      "Front open style",
      "Belt included",
      "Fully lined",
    ],
    isCustom: false,
    colors: [
      { name: "Rose", hex: "#d4a5a5" },
      { name: "Blush", hex: "#e8c4c4" },
      { name: "Mauve", hex: "#b8a5b8" },
    ],
    lengths: ["52", "54", "56", "58"],
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze Abaya",
    price: 269,
    images: [categoryAbaya],
    category: "Abayas",
    brand: "simply-azixa",
    description: "A refreshing abaya in ocean blue tones. The flowing silhouette and light fabric make it perfect for warmer days.",
    details: [
      "Lightweight chiffon",
      "Inner dress included",
      "Flowing silhouette",
      "Belt included",
    ],
    isCustom: false,
    colors: [
      { name: "Ocean Blue", hex: "#5a8fa8" },
      { name: "Teal", hex: "#4a7c7c" },
      { name: "Sky", hex: "#87ceeb" },
    ],
    lengths: ["52", "54", "56", "58"],
  },
  {
    id: "golden-hour",
    name: "Golden Hour Abaya",
    price: 319,
    images: [categoryAbaya],
    category: "Abayas",
    brand: "simply-azixa",
    description: "A luxurious abaya with golden embroidery details. Perfect for celebrations and special events.",
    details: [
      "Premium silk blend",
      "Golden embroidery",
      "Front open style",
      "Belt included",
      "Fully lined",
    ],
    isCustom: false,
    colors: [
      { name: "Black/Gold", hex: "#1a1a1a" },
      { name: "Navy/Gold", hex: "#1e3a5f" },
      { name: "Burgundy/Gold", hex: "#722f37" },
    ],
    lengths: ["52", "54", "56", "58"],
  },
  {
    id: "classic-noir",
    name: "Classic Noir Abaya",
    price: 229,
    images: [categoryAbaya],
    category: "Abayas",
    brand: "simply-azixa",
    description: "A timeless black abaya with clean lines. The essential piece for every wardrobe.",
    details: [
      "Premium nida fabric",
      "Minimalist design",
      "Front open style",
      "Belt included",
      "Fully lined",
    ],
    isCustom: false,
    colors: [
      { name: "Black", hex: "#1a1a1a" },
    ],
    lengths: ["52", "54", "56", "58"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.id === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getProductsByBrand(brand: "azixa" | "simply-azixa"): Product[] {
  return products.filter((p) => p.brand === brand);
}
