"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { addToCart } from "@/store/slices/cartSlice";
import { formatPrice } from "@/utils/helpers";
import type { Product } from "@/types/global";
import type { AppDispatch } from "@/store";
import Image from "next/image";
import Link from "next/link";

// Mock product data
const mockProduct: Product = {
  
  id: "1",
  tags: [],
  name: "Fresh Organic Strawberries",
  description:
    "Sweet, juicy strawberries perfect for snacking, smoothies, or desserts. Grown locally using organic farming practices.",
  salePrice: 4.99,
  images: [],
  inStock: true,
  stockQuantity: 25,
  originalPrice: 6.99,
  image: "/fresh-strawberries-container.jpg",
  category: "Fresh Produce",
  unit: "lb",
  stock: 25,
  rating: 4.5,
  reviewCount: 128,
  isOrganic: true,
  nutritionFacts: {
    calories: 32,
    protein: "0.7g",
    carbs: "7.7g",
    fat: "0.3g",
    fiber: "2g",
    sugar: "4.9g",
  },
  ingredients: ["Fresh Organic Strawberries"],
  allergens: [],
  origin: "Local Farm, Ontario",
  storageInstructions: "Store in refrigerator. Best consumed within 3-5 days.",
};

export default function ProductDetailPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // In real app, fetch product by ID
    setProduct(mockProduct);
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.salePrice) / product.originalPrice) *
          100
      )
    : 0;

  const images = [product.image, product.image, product.image]; // Mock multiple images

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products" className="flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Products
            </Link>
          </Button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount > 0 && (
                  <Badge variant="destructive">{discount}% OFF</Badge>
                )}
                {product.isOrganic && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Organic
                  </Badge>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating!)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.salePrice)}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.salePrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              {product.unit && (
                <span className="text-muted-foreground">
                  per {product.unit}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.stock === 0 ? (
                <Badge variant="destructive">Out of Stock</Badge>
              ) : product.stock < 10 ? (
                <Badge variant="outline" className="text-orange-600">
                  Only {product.stock} left in stock
                </Badge>
              ) : (
                <Badge variant="secondary">In Stock</Badge>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= (product.stock || 0)}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - {formatPrice(product.salePrice * quantity)}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsLiked(!isLiked)}
                  className="px-4"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="px-4 bg-transparent"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free delivery over $75</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Quality guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span>Easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Product Information</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Origin</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.origin}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Storage</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.storageInstructions}
                    </p>
                  </div>
                </div>

                {product.ingredients && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Ingredients</h4>
                      <p className="text-sm text-muted-foreground">
                        {product.ingredients.join(", ")}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">
                  Nutrition Facts (per 100g)
                </h3>
                {product.nutritionFacts && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {product.nutritionFacts.calories}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Calories
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {product.nutritionFacts.protein}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Protein
                      </div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {product.nutritionFacts.carbs}
                      </div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {product.nutritionFacts.fat}
                      </div>
                      <div className="text-sm text-muted-foreground">Fat</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {product.nutritionFacts.fiber}
                      </div>
                      <div className="text-sm text-muted-foreground">Fiber</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {product.nutritionFacts.sugar}
                      </div>
                      <div className="text-sm text-muted-foreground">Sugar</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Reviews feature coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
