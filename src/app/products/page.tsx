"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchBar } from "@/components/products/search-bar";
import {
  ProductFilters,
  type ProductFilters as ProductFiltersType,
} from "@/components/products/product-filters";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { products as productList } from "@/data/product";
// import CategoryTree from "@/components/CategoryTree"
// import { productCategories } from "@/data/productCategories"
import type { Product } from "@/types/global";

export default function ProductsPage() {
  const [products] = useState<Product[]>(productList);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productList);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const section = document.getElementById("scroll-section");
    if (!section) return;

    const handleScroll = () => {
      setScrolled(section.scrollTop > 5);
    };

    section.addEventListener("scroll", handleScroll);
    return () => section.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, {
      categories: [],
      priceRange: [0, 1000],
      inStock: false,
      onSale: false,
      organic: false,
      rating: 0,
    });
  };

  const handleFiltersChange = (filters: ProductFiltersType) => {
    applyFilters(searchQuery, filters);
  };

  // const handleCategorySelect = (name: string) => {
  //   const filtered = products.filter((p) =>
  //     p.category.toLowerCase().includes(name.toLowerCase()) ||
  //     (p.subcategory && p.subcategory.toLowerCase().includes(name.toLowerCase()))
  //   )
  //   setFilteredProducts(filtered)
  // }

  const applyFilters = (query: string, filters: ProductFiltersType) => {
    let filtered = [...products];

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) =>
        p.salePrice >= filters.priceRange[0] &&
        p.salePrice <= filters.priceRange[1]
    );

    // Stock filter
    if (filters.inStock) filtered = filtered.filter((p) => p.inStock);

    // Sale filter
    if (filters.onSale)
      filtered = filtered.filter(
        (p) => p.originalPrice && p.originalPrice > p.salePrice
      );

    // Organic filter
    if (filters.organic) filtered = filtered.filter((p) => p.isOrganic);

    // Rating filter
    if (filters.rating > 0)
      filtered = filtered.filter((p) => (p.rating || 0) >= filters.rating);

    setFilteredProducts(filtered);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (value) {
        case "price-low":
          return a.salePrice - b.salePrice;
        case "price-high":
          return b.salePrice - a.salePrice;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen ">
      <Header />

      <main className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-bold ">Products</h1>
          <SearchBar onSearch={handleSearch} className="max-w-2xl h-10 " />
        </div>

        <div className="flex flex-col lg:flex-row gap-6  h-130 py-5 sticky">
          {/* Sidebar */}
          <aside className="lg:w-64">
            {/* <div className="bg-white p-4 rounded-2xl shadow-sm border">
              <h2 className="font-semibold mb-3 text-lg">Categories</h2>
              <CategoryTree categories={productCategories} onSelect={handleCategorySelect} />
            </div> */}

            <div className=" h-110  overflow-y-auto rounded-lg">
              <ProductFilters onFiltersChange={handleFiltersChange} />
            </div>
          </aside>

          {/* Main content */}
          <section
            id="scroll-section"
            className="flex-1 h-[70vh]  overflow-y-auto relative rounded-lg pb-5"
          >
            {/* Controls bar */}
            <div
              className={`flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg sticky top-0 z-10 ${
                scrolled
                  ? "backdrop-blur-md  shadow-sm"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4 ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {filteredProducts.length} products
                  </span>
                  {searchQuery && (
                    <Badge variant="secondary">Search: "{searchQuery}"</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A–Z</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md ">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              viewMode={viewMode}
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
