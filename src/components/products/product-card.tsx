"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { addToCart } from "../../store/slices/cartSlice";
import { formatPrice } from "../../utils/helpers";
import type { Product } from "../../types/global";
import type { AppDispatch } from "../../store";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    dispatch(addToCart({ product, quantity: 1 }));
    setTimeout(() => setIsAdding(false), 400);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.salePrice) / product.originalPrice) *
          100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        scale: 1.03,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <Card className="bg-white border border-gray-100 rounded-lg p-0 overflow-hidden h-full">
          <CardContent className="p-0 flex flex-col h-full ">
            {/* 🖼 Image */}
            <div className="relative  h-28 overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* ❤️ Like */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1.5 right-1.5 h-6 w-6 p-0 bg-white/80 hover:bg-white rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
              >
                <Heart
                  className={`h-3.5 w-3.5 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                  }`}
                />
              </Button>

              {/* 🔖 Discount */}
              {discount > 0 && (
                <Badge className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5">
                  {discount}% OFF
                </Badge>
              )}
            </div>

            {/* 🧾 Info */}
            <div className="p-2 flex flex-col justify-between flex-1">
              <h3 className="font-medium text-xs truncate">{product.name}</h3>

              <div className="flex items-center justify-between mt-1">
                <span className="font-semibold text-sm text-primary">
                  {formatPrice(product.salePrice)}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="h-6 px-2 text-[10px]"
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  {isAdding ? "..." : "Add"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
