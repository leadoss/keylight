export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  count?: number;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  image: string;
  subcategories: Product[];
}

export const categories: Category[] = [
  {
    slug: "profiles-flexible-strips",
    title: "Profiles & Flexible Strips",
    description: "Versatile LED strips and aluminium profiles for every application",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&h=750&fit=crop",
    subcategories: [
      { id: 1, name: "0-Edge", slug: "0-edge", image: "/0edge.png", count: 1 },
      { id: 2, name: "Hand Rail", slug: "hand-rail", image: "/1edge.png", count: 2 },
      { id: 3, name: "Series A", slug: "series-a", image: "/2edge.png", count: 12 },
      { id: 4, name: "Series D", slug: "series-d", image: "/3edge.png", count: 7 },
      { id: 5, name: "Series G", slug: "series-g", image: "/4edge.png", count: 11 },
      { id: 6, name: "Series Inground", slug: "series-inground", image: "/5edge.png", count: 1 },
      { id: 7, name: "Series Mounted", slug: "series-mounted", image: "/6edge.png", count: 13 },
      { id: 8, name: "Series Trimless", slug: "series-trimless", image: "/7edge.png", count: 16 },
      { id: 9, name: "Three Directional Profil Aluminum", slug: "three-directional", image: "/8edge.png", count: 9 },
      { id: 10, name: "Indoor LED Strip", slug: "indoor-led-strip", image: "/9edge.png", count: 9 },
      { id: 11, name: "Outdoor LED Strip", slug: "outdoor-led-strip", image: "/10edge.png", count: 9 },
    ],
  },
  {
    slug: "indoor",
    title: "For Your Indoor Spaces",
    description: "Magnetic track lighting systems for precision interior illumination",
    image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/David-S-700x700.png",
    subcategories: [
      { id: 1, name: "DAVID magnetic track light", slug: "david-magnetic-track-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/David-S-700x700.png", count: 16 },
      { id: 2, name: "LISA magnetic track light", slug: "lisa-magnetic-track-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/Lisa-S-700x700.png", count: 12 },
      { id: 3, name: "MAX-360 Magnetic Track Light", slug: "max-360-magnetic-track-light", image: "https://www.keylightspain.eu/wp-content/uploads/2025/01/Cover-Max360-700x700.png", count: 25 },
      { id: 4, name: "MIKE magnetic track light", slug: "mike-magnetic-track-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/Mike-S-700x700.png", count: 13 },
      { id: 5, name: "Nova magnetic track light", slug: "nova-magnetic-track-light", image: "https://www.keylightspain.eu/wp-content/uploads/2025/03/Nova-sub-category-700x700.png", count: 14 },
      { id: 6, name: "PEARL magnetic track light", slug: "pearl-magnetic-track-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/04/PEARL-magnetic-track-light-700x700.png", count: 19 },
      { id: 7, name: "0/10 Power Supply", slug: "power-supply-0-10", image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/Untitled-2-3-700x700.png", count: 4 },
      { id: 8, name: "DALI Power Supply", slug: "power-supply-dali", image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/Untitled-1-700x700.png", count: 4 },
      { id: 9, name: "Power Supply IP20", slug: "power-supply-ip20", image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/IP20-Power-Supply-700x700.png", count: 8 },
      { id: 10, name: "Power Supply IP67", slug: "power-supply-ip67", image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/IP-Power-Supply-700x700.png", count: 6 },
      { id: 11, name: "Power Supply Slim", slug: "power-supply-slim", image: "https://www.keylightspain.eu/wp-content/uploads/2024/09/Slim-power-Supply-700x700.png", count: 3 },
    ],
  },
  {
    slug: "outdoor",
    title: "For Your Outdoor Spaces",
    description: "Weather-resistant lighting designed for exteriors",
    image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/Outdoor-Wall-Light-700x700.jpg",
    subcategories: [
      { id: 1, name: "Outdoor ceiling light", slug: "outdoor-ceiling-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/04/Outdoor-ceiling-light-700x700.jpg", count: 16 },
      { id: 2, name: "Outdoor flood light", slug: "outdoor-flood-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/Outdoor-flood-light-700x700.jpg", count: 13 },
      { id: 3, name: "Outdoor inground light", slug: "outdoor-inground-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/Outdoor-inground-light-700x700.webp", count: 9 },
      { id: 4, name: "Outdoor Lighting LED Lawn Bollard", slug: "outdoor-lawn-bollard", image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/Outdoor-Lawn-Bollard-700x700.jpg", count: 21 },
      { id: 5, name: "Outdoor Lighting Wall Mounted", slug: "outdoor-wall-mounted", image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/Outdoor-Wall-Light-700x700.jpg", count: 76 },
      { id: 6, name: "Outdoor Spike Light", slug: "outdoor-spike-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/Outdoor-Spike-Light-700x700.jpg", count: 5 },
      { id: 7, name: "Outdoor Step Light", slug: "outdoor-step-light", image: "https://www.keylightspain.eu/wp-content/uploads/2025/02/Subcategory-cover-700x700.png", count: 18 },
    ],
  },
  {
    slug: "spotlights",
    title: "Spotlights",
    description: "Precision directional lighting for every setting",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=750&fit=crop",
    subcategories: [
      { id: 1, name: "Alex Series", slug: "alex-series", image: "https://www.keylightspain.eu/wp-content/uploads/2024/10/downlight-700x700.png", count: 14 },
      { id: 2, name: "Elsa Series", slug: "elsa-series", image: "https://www.keylightspain.eu/wp-content/uploads/2024/10/Elsaa-Series-700x700.png", count: 9 },
      { id: 3, name: "Maverick Series", slug: "maverick-series", image: "https://www.keylightspain.eu/wp-content/uploads/2024/10/Maverick-Series-700x700.png", count: 41 },
      { id: 4, name: "Onyx Series", slug: "onyx-series", image: "https://www.keylightspain.eu/wp-content/uploads/2025/02/Cover-Picture-700x700.png", count: 7 },
      { id: 5, name: "Spot Light", slug: "spot-light-spot-light", image: "https://www.keylightspain.eu/wp-content/uploads/2024/07/Spot-700x700.png", count: 5 },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
