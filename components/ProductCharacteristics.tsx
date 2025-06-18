import { Product } from "@/sanity.types";
// import { getBrand } from "@/sanity/queries"; // Removed unused import
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristics = ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  // const brand = await getBrand(product?.slug?.current as string); // Removed direct fetch
  // console.log(brand); // Removed console.log

  // The product.brand should now be an object like { brandName: string, slug: ... } due to API projection
  // or null/undefined if not set.
  const brandName = product?.brand?.brandName; // Access brandName directly

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{product?.name}: Characteristics</AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">
            Brand:{" "}
            {brandName && ( // Check if brandName exists
              <span className="font-semibold tracking-wide">
                {brandName}
              </span>
            )}
          </p>
          <p className="flex items-center justify-between">
            Collection:{" "}
            <span className="font-semibold tracking-wide">2025</span>
          </p>
          <p className="flex items-center justify-between">
            Type:{" "}
            <span className="font-semibold tracking-wide">
              {product?.variant}
            </span>
          </p>
          <p className="flex items-center justify-between">
            Stock:{" "}
            <span className="font-semibold tracking-wide">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
