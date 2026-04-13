'use client';

import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Heart, MapPin, Bed, Bath, Move, Bell, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// --- Tipos y Datos ---
interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  tag: string;
  type: string;
  status: 'Buy' | 'Rent';
  featured?: boolean;
}

const PROPERTIES: Property[] = [
  {
    id: 1,
    title: "The Glass Pavilion",
    location: "Beverly Hills, California",
    price: "$5,250,000",
    beds: 5,
    baths: 4.5,
    sqft: "4,200 m²",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop",
    tag: "EXCLUSIVE",
    type: "House",
    status: "Buy",
    featured: true
  },
  {
    id: 2,
    title: "Azure Heights Penthouse",
    location: "Downtown, Vancouver",
    price: "$3,800,000",
    beds: 3,
    baths: 3,
    sqft: "2,100 m²",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470&auto=format&fit=crop",
    tag: "NEW ARRIVAL",
    type: "Penthouse",
    status: "Buy",
    featured: true
  },
  {
    id: 3,
    title: "Modern Family Home",
    location: "123 Pine St, Seattle",
    price: "$850,000",
    beds: 3,
    baths: 2,
    sqft: "120 m²",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1470&auto=format&fit=crop",
    tag: "FOR SALE",
    type: "House",
    status: "Buy"
  },
  {
    id: 4,
    title: "Urban Loft",
    location: "456 Elm Ave, Portland",
    price: "$3,200/mo",
    beds: 1,
    baths: 1,
    sqft: "85 m²",
    image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=1470&auto=format&fit=crop",
    tag: "FOR RENT",
    type: "Apartment",
    status: "Rent"
  },
  {
    id: 5,
    title: "Highland Retreat",
    location: "789 Mountain Rd, Bend",
    price: "$620,000",
    beds: 2,
    baths: 2,
    sqft: "98 m²",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1470&auto=format&fit=crop",
    tag: "FOR SALE",
    type: "Villa",
    status: "Buy"
  },
  {
    id: 6,
    title: "Sea View Penthouse",
    location: "321 Ocean Dr, Miami",
    price: "$4,500/mo",
    beds: 3,
    baths: 3,
    sqft: "180 m²",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop",
    tag: "FOR RENT",
    type: "Penthouse",
    status: "Rent"
  },
  {
    id: 7,
    title: "Central Studio",
    location: "555 Main St, Chicago",
    price: "$550,000",
    beds: 1,
    baths: 1,
    sqft: "50 m²",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813ef6e?q=80&w=1470&auto=format&fit=crop",
    tag: "FOR SALE",
    type: "Studio",
    status: "Buy"
  },
  {
    id: 8,
    title: "Garden Villa",
    location: "999 Oak Ln, Austin",
    price: "$2,800/mo",
    beds: 2,
    baths: 2,
    sqft: "110 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop",
    tag: "FOR RENT",
    type: "Villa",
    status: "Rent"
  }
];

// --- Subcomponentes ---
function PropertyCard({ 
  property, 
  compact = false, 
  isSaved, 
  onToggleSave 
}: { 
  property: Property, 
  compact?: boolean, 
  isSaved: boolean, 
  onToggleSave: (id: number) => void 
}) {
  return (
    <Card className={`overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer ${compact ? 'rounded-2xl' : 'rounded-3xl'}`}>
      <div className={`relative ${compact ? 'h-[180px]' : 'h-[400px]'}`}>
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${property.tag.includes('RENT') ? 'bg-[#006655]/90 text-white' : 'bg-white/90 text-[#0f231f]'} font-bold px-3 py-0.5 rounded-sm border-none text-[10px] tracking-wider uppercase`}>
            {property.tag}
          </Badge>
        </div>
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={(e) => { e.preventDefault(); onToggleSave(property.id); }}
          className={`absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-md transition-all ${isSaved ? 'text-red-500 scale-110' : 'text-zinc-400'}`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <CardContent className={`${compact ? 'p-4' : 'p-8'} space-y-3 bg-white`}>
        {!compact && (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">{property.title}</h3>
              <p className="text-muted-foreground flex items-center gap-1 text-sm">
                <MapPin className="w-3 h-3" /> {property.location}
              </p>
            </div>
            <p className="text-2xl font-bold text-[#006655]">{property.price}</p>
          </div>
        )}
        {compact && (
          <div className="space-y-1">
            <p className="text-lg font-bold text-[#0f231f]">{property.price}</p>
            <h3 className="text-sm font-semibold truncate">{property.title}</h3>
            <p className="text-xs text-muted-foreground truncate">{property.location}</p>
          </div>
        )}
        <div className={`flex items-center gap-4 ${compact ? 'pt-2' : 'pt-4 border-t border-zinc-50'} text-[11px] font-medium text-muted-foreground`}>
          <div className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5" /> {property.beds} {compact ? '' : 'Beds'}</div>
          <div className="flex items-center gap-1.5"><Bath className="w-3.5 h-3.5" /> {property.baths} {compact ? '' : 'Baths'}</div>
          <div className="flex items-center gap-1.5"><Move className="w-3.5 h-3.5" /> {property.sqft}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// --- Componente Principal ---
export default function Home() {
  const [activeView, setActiveView] = useState<'All' | 'Rent' | 'Saved'>('All');
  const [activeCategory, setActiveCategory] = useState("All");
  const [marketFilter, setMarketFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSave = (id: number) => {
    setSavedIds(prev => {
      const isSaved = prev.includes(id);
      if (isSaved) {
        toast.info("Removed from Saved Homes");
        return prev.filter(item => item !== id);
      } else {
        toast.success("Added to Saved Homes");
        return [...prev, id];
      }
    });
  };

  const handleAdvancedSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => searchInputRef.current?.focus(), 600);
  };

  const handleUnderConstruction = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    toast.info(`${section} section is currently under construction.`, {
      description: "We are working hard to bring this feature to you soon!",
      duration: 3000,
    });
  };

  // Lógica de Filtrado Unificada
  const filteredData = useMemo(() => {
    return PROPERTIES.filter(p => {
      // Filtro de Búsqueda
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtro de Categoría (Header)
      const matchesCategory = activeCategory === "All" || p.type === activeCategory;
      
      // Filtro de Vista (Navegación)
      const matchesView = activeView === 'All' ? true :
                         activeView === 'Rent' ? p.status === 'Rent' :
                         savedIds.includes(p.id);

      return matchesSearch && matchesCategory && matchesView;
    });
  }, [activeView, activeCategory, searchQuery, savedIds]);

  const featuredList = filteredData.filter(p => p.featured);
  const marketList = filteredData.filter(p => !p.featured && (marketFilter === "All" || p.status === marketFilter));

  return (
    <div className="min-h-screen bg-[#EEF6F6] text-[#0f231f] font-sans antialiased relative overflow-x-hidden">
      
      {/* Notifications Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[100] transition-transform duration-500 border-l border-zinc-100 ${isNotifOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsNotifOpen(false)}>
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
            <Bell className="w-12 h-12 text-zinc-300" />
            <p className="text-sm font-medium">Your notification center is empty</p>
          </div>
        </div>
      </div>
      
      {/* Overlay para Sidebar */}
      {isNotifOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[90] transition-opacity" 
          onClick={() => setIsNotifOpen(false)}
        />
      )}

      {/* Navigation Bar */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('All')}>
          <div className="w-10 h-10 bg-[#0f231f] rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-[#06f9d0] rounded-full" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">LuxeEstate</span>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => { setActiveView('All'); setActiveCategory('All'); }}
            className={`font-bold transition-all ${activeView === 'All' ? 'text-[#0f231f] relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#06f9d0]' : 'text-zinc-500 hover:text-[#0f231f]'}`}
          >
            Buy
          </button>
          <button 
            onClick={() => setActiveView('Rent')}
            className={`font-bold transition-all ${activeView === 'Rent' ? 'text-[#0f231f] relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#06f9d0]' : 'text-zinc-500 hover:text-[#0f231f]'}`}
          >
            Rent
          </button>
          <a href="#" onClick={(e) => handleUnderConstruction(e, 'Sell')} className="font-semibold text-zinc-500 hover:text-[#0f231f] transition-colors">Sell</a>
          <button 
            onClick={() => setActiveView('Saved')}
            className={`font-bold transition-all ${activeView === 'Saved' ? 'text-[#0f231f] relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#06f9d0]' : 'text-zinc-500 hover:text-[#0f231f]'}`}
          >
            Saved Homes
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-zinc-800" onClick={handleAdvancedSearch}><Search className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon" className="relative text-zinc-800" onClick={() => setIsNotifOpen(true)}>
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#06f9d0] rounded-full border-2 border-white" />
            <Bell className="w-5 h-5" />
          </Button>
          <Link href="/profile">
            <Avatar className="w-10 h-10 border-2 border-[#06f9d0] hover:scale-105 transition-transform shadow-sm">
              <AvatarFallback className="bg-primary/10 font-bold text-[#006655]">U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </header>

      <main className="px-8 pt-20 pb-24 max-w-7xl mx-auto space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-10">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-[1]">
            {activeView === 'Saved' ? 'Your saved ' : activeView === 'Rent' ? 'Rental ' : 'Find your '}
            <span className="relative">
              {activeView === 'Saved' ? 'favorites' : activeView === 'Rent' ? 'sanctuaries' : 'sanctuary'}
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-[#06f9d0]/40 rounded-full" />
            </span>.
          </h1>
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="w-6 h-6 text-zinc-400 group-focus-within:text-[#06f9d0] transition-colors" />
            </div>
            <Input 
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, neighborhood, or name..." 
              className="h-20 pl-16 pr-36 rounded-[2.5rem] shadow-2xl border-none text-xl bg-white placeholder:text-zinc-300 ring-0 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-36 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-[#0f231f]">
                <X className="w-5 h-5" />
              </button>
            )}
            <Button className="absolute right-3 top-3 h-14 px-10 rounded-[2rem] bg-[#006655] hover:bg-[#004d40] text-white font-bold text-lg shadow-lg">
              Search
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["All", "House", "Apartment", "Villa", "Penthouse", "Studio"].map((category) => (
              <button 
                key={category} 
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                  activeCategory === category 
                  ? "bg-[#0f231f] text-white shadow-xl scale-105" 
                  : "bg-white text-zinc-500 hover:bg-zinc-100 shadow-sm"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Dynamic Section: Featured or Saved Header */}
        {(activeView === 'All' || activeView === 'Rent') && featuredList.length > 0 && (
          <section className="space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-4xl font-bold tracking-tight">Featured Collections</h2>
              <Button variant="link" className="text-[#006655] font-bold text-lg hover:gap-2 transition-all">View all →</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {featuredList.map((prop) => (
                <PropertyCard 
                  key={prop.id} 
                  property={prop} 
                  isSaved={savedIds.includes(prop.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          </section>
        )}

        {/* Main Grid: Market or Saved List */}
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-tight">
              {activeView === 'Saved' ? 'Your Saved Homes' : activeView === 'Rent' ? 'Rentals in Market' : 'New in Market'}
            </h2>
            {activeView === 'All' && (
              <div className="bg-white p-1 rounded-full shadow-sm flex gap-1 border border-zinc-100">
                {["All", "Buy", "Rent"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setMarketFilter(filter)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                      marketFilter === filter ? "bg-[#0f231f] text-white shadow-md" : "text-zinc-400 hover:text-zinc-800"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {marketList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {marketList.map((prop) => (
                <PropertyCard 
                  key={prop.id} 
                  property={prop} 
                  compact 
                  isSaved={savedIds.includes(prop.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center space-y-4 bg-white/40 rounded-[2.5rem] border-2 border-dashed border-zinc-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Heart className="w-8 h-8 text-zinc-200" />
              </div>
              <p className="text-zinc-500 font-medium">No properties found in this view.</p>
              {activeView === 'Saved' && (
                <Button variant="outline" onClick={() => setActiveView('All')}>Browse all properties</Button>
              )}
            </div>
          )}
        </section>

        {activeView === 'All' && (
          <div className="flex justify-center pb-20">
            <Button 
              variant="outline" 
              onClick={() => { setIsLoadingMore(true); setTimeout(() => { setIsLoadingMore(false); toast.success("More loaded!"); }, 1000); }}
              disabled={isLoadingMore}
              className="px-14 py-8 rounded-2xl border-white bg-white/80 shadow-xl text-lg font-bold hover:bg-white transition-all min-w-[280px]"
            >
              {isLoadingMore ? <div className="w-6 h-6 border-4 border-[#006655] border-t-transparent rounded-full animate-spin" /> : "Load more properties"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
