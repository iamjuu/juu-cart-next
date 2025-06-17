import { NextResponse } from "next/server";
import { productType } from "@/constants/data";

export async function GET(request: Request) {
  return NextResponse.json(productType);
} 