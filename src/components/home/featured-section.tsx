"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featuredItems = [
  {
    id: 1,
    title: "Check Out This Week's Flyer",
    description: "Discover amazing deals and savings on your favorite products",
    image: "/grocery-store-weekly-flyer-with-deals.jpg",
    cta: "View Flyer",
    link: "/flyer",
    type: "flyer",
    badge: "Save 30%",
  },
  {
    id: 2,
    title: "Fresh Produce Special",
    description: "Farm-fresh fruits and vegetables at unbeatable prices",
    image: "/fresh-produce-display.png",
    cta: "Shop Produce",
    link: "/products?category=produce",
    type: "category",
    badge: "Fresh Daily",
  },
  {
    id: 3,
    title: "Premium Meat Selection",
    description: "Quality cuts from trusted Canadian suppliers",
    image: "/premium-meat-cuts-butcher-display.jpg",
    cta: "Shop Meat",
    link: "/products?category=meat",
    type: "category",
    badge: "AAA Grade",
  },
  {
    id: 4,
    title: "Bakery Fresh Daily",
    description: "Artisan breads and pastries baked fresh every morning",
    image: "/fresh-bakery-bread-and-pastries.jpg",
    cta: "Visit Bakery",
    link: "/products?category=bakery",
    type: "category",
    badge: "Baked Today",
  },
];

export function FeaturedSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            The Latest from JK Fresh
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our weekly specials, fresh arrivals, and premium selections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                  {item.badge}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg mb-2 text-balance">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-90 text-pretty">
                    {item.description}
                  </p>
                </div>
              </div>
              <CardContent className="p-4">
                <Button
                  asChild
                  className="w-full"
                  variant={item.type === "flyer" ? "default" : "outline"}
                >
                  <Link
                    href={item.link}
                    className="flex items-center justify-center gap-2"
                  >
                    {item.type === "flyer" ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <ShoppingCart className="w-4 h-4" />
                    )}
                    {item.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
