"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";
// import { client } from "@/sanity/lib/client"; // Removed Sanity client import
import NoProductAvailable from "./NoProductAvailable";
import { Loader2 } from "lucide-react";
import Container from "./Container";
import HomeTabbar from "./HomeTabbar";
import { productType } from "@/constants/data";
import { Product as SanityProduct } from "@/sanity.types";

// Define types for mock data with mockUrl
type SanityProductImage = NonNullable<SanityProduct['images']>[0];

export interface ProductImageWithMockUrl extends SanityProductImage {
  mockUrl?: string;
}

export interface ProductWithMockImages extends Omit<SanityProduct, 'images'> {
  images?: ProductImageWithMockUrl[];
}

const ProductGrid = () => {
  const [products, setProducts] = useState<ProductWithMockImages[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  // const query = `*[_type == \"product\" && variant == $variant] | order(name asc){
  // ...,\"categories\": categories[]->title
  // }`; // Removed direct query
  // const params = { variant: selectedTab.toLowerCase() }; // Removed direct params

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call with a delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Sample product data: 5 items for each category
        const sampleProducts: ProductWithMockImages[] = [
          // Gadgets
          { _id: "g1", _type: "product", name: "Smart Gadget Alpha", price: 29.99, images: [{ _type: "image", _key: "img_g1_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Gadget+1", asset: undefined }], variant: "gadget", slug: { current: "smart-gadget-alpha", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "g1_rev" },
          { _id: "g2", _type: "product", name: "Tech Gizmo Beta", price: 49.99, images: [{ _type: "image", _key: "img_g2_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Gadget+2", asset: undefined }], variant: "gadget", slug: { current: "tech-gizmo-beta", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "g2_rev" },
          { _id: "g3", _type: "product", name: "Wireless Wonder Gamma", price: 19.99, images: [{ _type: "image", _key: "img_g3_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Gadget+3", asset: undefined }], variant: "gadget", slug: { current: "wireless-wonder-gamma", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "g3_rev" },
          { _id: "g4", _type: "product", name: "Compact Device Delta", price: 79.99, images: [{ _type: "image", _key: "img_g4_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Gadget+4", asset: undefined }], variant: "gadget", slug: { current: "compact-device-delta", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "g4_rev" },
          { _id: "g5", _type: "product", name: "Power User Gadget Epsilon", price: 99.99, images: [{ _type: "image", _key: "img_g5_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Gadget+5", asset: undefined }], variant: "gadget", slug: { current: "power-user-gadget-epsilon", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "g5_rev", isFeatured: true },
          // Appliances
          { _id: "a1", _type: "product", name: "Kitchen Appliance One", price: 129.00, images: [{ _type: "image", _key: "img_a1_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Appliance+1", asset: undefined }], variant: "appliances", slug: { current: "kitchen-appliance-one", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "a1_rev" },
          { _id: "a2", _type: "product", name: "Home Comfort Appliance Two", price: 89.50, images: [{ _type: "image", _key: "img_a2_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Appliance+2", asset: undefined }], variant: "appliances", slug: { current: "home-comfort-appliance-two", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "a2_rev" },
          { _id: "a3", _type: "product", name: "Utility Appliance Three", price: 249.99, images: [{ _type: "image", _key: "img_a3_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Appliance+3", asset: undefined }], variant: "appliances", slug: { current: "utility-appliance-three", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "a3_rev" },
          { _id: "a4", _type: "product", name: "Smart Appliance Four", price: 199.00, images: [{ _type: "image", _key: "img_a4_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Appliance+4", asset: undefined }], variant: "appliances", slug: { current: "smart-appliance-four", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "a4_rev" },
          { _id: "a5", _type: "product", name: "Compact Appliance Five", price: 75.00, images: [{ _type: "image", _key: "img_a5_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Appliance+5", asset: undefined }], variant: "appliances", slug: { current: "compact-appliance-five", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "a5_rev" },
          // Refrigerators
          { _id: "r1", _type: "product", name: "CoolZone Fridge A", price: 499.99, images: [{ _type: "image", _key: "img_r1_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Refrigerator+1", asset: undefined }], variant: "refrigerators", slug: { current: "coolzone-fridge-a", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "r1_rev" },
          { _id: "r2", _type: "product", name: "FrostFree Freezer B", price: 599.00, images: [{ _type: "image", _key: "img_r2_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Refrigerator+2", asset: undefined }], variant: "refrigerators", slug: { current: "frostfree-freezer-b", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "r2_rev" },
          { _id: "r3", _type: "product", name: "EcoCool Refrigerator C", price: 650.00, images: [{ _type: "image", _key: "img_r3_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Refrigerator+3", asset: undefined }], variant: "refrigerators", slug: { current: "ecocool-refrigerator-c", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "r3_rev" },
          { _id: "r4", _type: "product", name: "Compact Cooler D", price: 399.99, images: [{ _type: "image", _key: "img_r4_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Refrigerator+4", asset: undefined }], variant: "refrigerators", slug: { current: "compact-cooler-d", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "r4_rev" },
          { _id: "r5", _type: "product", name: "MaxChill Fridge E", price: 799.00, images: [{ _type: "image", _key: "img_r5_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Refrigerator+5", asset: undefined }], variant: "refrigerators", slug: { current: "maxchill-fridge-e", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "r5_rev", isFeatured: true },
          // Others
          { _id: "o1", _type: "product", name: "Miscellaneous Item X1", price: 15.00, images: [{ _type: "image", _key: "img_o1_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Other+1", asset: undefined }], variant: "others", slug: { current: "miscellaneous-item-x1", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "o1_rev" },
          { _id: "o2", _type: "product", name: "Unique Product Y2", price: 22.50, images: [{ _type: "image", _key: "img_o2_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Other+2", asset: undefined }], variant: "others", slug: { current: "unique-product-y2", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "o2_rev" },
          { _id: "o3", _type: "product", name: "General Item Z3", price: 10.99, images: [{ _type: "image", _key: "img_o3_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Other+3", asset: undefined }], variant: "others", slug: { current: "general-item-z3", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "o3_rev" },
          { _id: "o4", _type: "product", name: "Special Find W4", price: 33.00, images: [{ _type: "image", _key: "img_o4_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Other+4", asset: undefined }], variant: "others", slug: { current: "special-find-w4", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "o4_rev" },
          { _id: "o5", _type: "product", name: "Everyday Essential V5", price: 5.99, images: [{ _type: "image", _key: "img_o5_1", mockUrl: "https://via.placeholder.com/300x300.png?text=Other+5", asset: undefined }], variant: "others", slug: { current: "everyday-essential-v5", _type: "slug" }, _createdAt: "2023-01-01T00:00:00Z", _updatedAt: "2023-01-01T00:00:00Z", _rev: "o5_rev" },
        ];

        // Filter products based on selectedTab (optional, if you want to keep tab functionality)
        const filteredProducts = sampleProducts.filter(
          (product) => product.variant?.toLowerCase() === selectedTab.toLowerCase() || selectedTab === "All Products" // Adjust based on your tab logic
        );
        
        // If no specific tab matches, or "All Products" is selected, show all sample products, otherwise show filtered.
        if (filteredProducts.length > 0) {
          setProducts(filteredProducts);
        } else if (selectedTab !== "All Products") { // If a specific tab is selected but no products match
             setProducts([]); // Show no products
        } else {
            setProducts(sampleProducts); // Default to all sample products if "All Products" or no specific match
        }

      } catch (error) {
        console.log("Product fetching Error", error);
        setProducts([]); // Clear products on error
      } finally {
        setLoading(false);
      }
    };
    if (selectedTab) { // Fetch data only if a tab is selected
      fetchData();
    }
  }, [selectedTab]);

  return (
    <Container className="flex flex-col lg:px-0 my-10">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
          <motion.div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Product is loading...</span>
          </motion.div>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          <>
            {products?.map((product) => (
              <AnimatePresence key={product?._id}>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard key={product?._id} product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </>
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </Container>
  );
};

export default ProductGrid;
