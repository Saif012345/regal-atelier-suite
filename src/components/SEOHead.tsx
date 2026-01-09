import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  brand?: "azixa-rahman" | "simply-azixa";
}

export function SEOHead({ 
  title, 
  description, 
  image,
  type = "website",
  brand = "azixa-rahman"
}: SEOHeadProps) {
  useEffect(() => {
    const defaultTitle = brand === "simply-azixa" 
      ? "Simply Azixa | Modest Abayas & Everyday Elegance"
      : "Azixa Rahman | Luxury Formal Wear, Bridal & Prom Dresses";
    
    const defaultDescription = brand === "simply-azixa"
      ? "Discover elegant, modest abayas designed for everyday grace. Simply Azixa offers timeless pieces that combine comfort with sophistication."
      : "Azixa Rahman creates gowns that reflect your style, story, and confidence. Bold fashion moments with timeless silhouettes.";
    
    const defaultImage = brand === "simply-azixa" 
      ? "/og-image-simply-azixa.png" 
      : "/og-image.png";

    // Update document title
    document.title = title || defaultTitle;

    // Update meta tags
    const updateMeta = (property: string, content: string, isOg = false) => {
      const selector = isOg 
        ? `meta[property="${property}"]` 
        : `meta[name="${property}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement("meta");
        if (isOg) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", description || defaultDescription);
    updateMeta("og:title", title || defaultTitle, true);
    updateMeta("og:description", description || defaultDescription, true);
    updateMeta("og:image", image || defaultImage, true);
    updateMeta("og:type", type, true);
    updateMeta("twitter:title", title || defaultTitle);
    updateMeta("twitter:description", description || defaultDescription);
    updateMeta("twitter:image", image || defaultImage);

    return () => {
      // Reset to defaults on unmount if needed
    };
  }, [title, description, image, type, brand]);

  return null;
}
