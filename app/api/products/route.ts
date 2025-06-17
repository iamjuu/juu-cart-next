import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const variant = searchParams.get("variant");
    const categorySlug = searchParams.get("category");
    const brandSlug = searchParams.get("brand");
    const minPriceStr = searchParams.get("minPrice");
    const maxPriceStr = searchParams.get("maxPrice");
    const slug = searchParams.get("slug");
    const isFeatured = searchParams.get("isFeatured"); // Added for fetching featured products

    const filters: string[] = ['_type == "product"'];
    const params: Record<string, string | number> = {};

    if (slug) {
      filters.push("slug.current == $slug");
      params.slug = slug;
    }
    if (variant) {
      filters.push("variant == $variant");
      params.variant = variant.toLowerCase(); // Ensure variant is lowercase for matching
    }
    if (categorySlug) {
      filters.push("references(*[_type == 'category' && slug.current == $categorySlug]._id)");
      params.categorySlug = categorySlug;
    }
    if (brandSlug) {
      filters.push("references(*[_type == 'brand' && slug.current == $brandSlug]._id)");
      params.brandSlug = brandSlug;
    }
    if (minPriceStr) {
      const minPrice = parseFloat(minPriceStr);
      if (!isNaN(minPrice)) {
        filters.push("price >= $minPrice");
        params.minPrice = minPrice;
      }
    }
    if (maxPriceStr) {
      const maxPrice = parseFloat(maxPriceStr);
      if (!isNaN(maxPrice)) {
        filters.push("price <= $maxPrice");
        params.maxPrice = maxPrice;
      }
    }
    if (isFeatured === 'true') {
      filters.push("isFeatured == true");
    }

    const query = groq`*[${filters.join(" && ")}] {
      ...,
      "images": images[]{..., asset->}, // Expand image assets fully
      "categories": categories[]->{title, slug},
      "brand": brand->{brandName, slug}
    }${slug ? " [0]" : " | order(name asc)"}`;

    const products: Product[] | Product = await client.fetch(query, params);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
} 