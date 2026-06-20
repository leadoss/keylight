import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const catalogues = [
  {
    title: "Wall Lights",
    image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/WALL-LIGHT.png",
    pdf: "https://www.keylightspain.eu/Catalogue/Wall%20Lights.pdf",
  },
  {
    title: "Power Supply & Sensors",
    image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/POWER-SUPPLY-SENSORS.png",
    pdf: "https://www.keylightspain.eu/Catalogue/keylight%20Power%20supply%20and%20sensors%20.pdf",
  },
  {
    title: "Spotlight",
    image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/SPOTLIGHTS.png",
    pdf: "https://www.keylightspain.eu/Catalogue/SPOTLIGHT.pdf",
  },
  {
    title: "Outdoor Light",
    image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/OUTDOOR-2.png",
    pdf: "https://www.keylightspain.eu/Catalogue/KEYLIGHT%20OUTDOOR-WEBSIT.pdf",
  },
  {
    title: "Magnetic Light",
    image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/MAGNETIC-LIGHTS.png",
    pdf: "https://www.keylightspain.eu/Catalogue/KEYLIGHT%20MAGNETIC-WEBSIT.pdf",
  },
  {
    title: "LED Strip & Aluminum Profile",
    image: "https://www.keylightspain.eu/wp-content/uploads/2024/05/LED-STRIPS-ALUMINUM-PROFILING.jpg.png",
    pdf: "https://www.keylightspain.eu/Catalogue/KEYLIGHT%20LED%20NEW-LOW.pdf",
  },
];

export default function CataloguePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="bg-brand-black min-h-screen pt-32 pb-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">

          {/* Header */}
          <div className="mb-16">
            <h1 className="text-white text-4xl md:text-5xl font-bold">Catalogue</h1>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogues.map((cat) => (
              <div key={cat.title} className="group flex flex-col bg-white/4 border border-white/8 overflow-hidden">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] bg-white/5">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                  <div>
                    <h2 className="text-white font-semibold text-base mb-1">{cat.title}</h2>
                    <p className="text-white/35 text-xs tracking-wide">By Keylight Spain</p>
                  </div>

                  <a
                    href={cat.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 px-5 py-3 bg-accent text-brand-black text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-white transition-colors duration-300 self-start"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 3v13M5 13l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 21h18" strokeLinecap="round" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
