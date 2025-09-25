import { NextResponse } from "next/server"
import type { Flyer } from "../../../src/types/global"

// Mock flyer data - replace with actual database queries
const mockFlyers: Flyer[] = [
  {
    id: "1",
    title: "Weekly Savings - January 15-21",
    description: "Great deals on fresh produce, meat, and pantry essentials",
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    coverImage: "/grocery-store-weekly-flyer-with-deals.jpg",
    pages: [
      {
        id: "1",
        pageNumber: 1,
        image: "/flyer-page-1-produce-deals.jpg",
        deals: [],
      },
      {
        id: "2",
        pageNumber: 2,
        image: "/flyer-page-2-meat-specials.jpg",
        deals: [],
      },
    ],
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "New Year Fresh Start - January 8-14",
    description: "Healthy options and organic produce to start your year right",
    startDate: "2024-01-08",
    endDate: "2024-01-14",
    coverImage: "/healthy-organic-produce-flyer.jpg",
    pages: [
      {
        id: "3",
        pageNumber: 1,
        image: "/organic-produce-deals-page.jpg",
        deals: [],
      },
    ],
    isActive: false,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
]

export async function GET() {
  try {
    return NextResponse.json({ flyers: mockFlyers })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flyers" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // In real app, validate and save to database
    const newFlyer: Flyer = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ flyer: newFlyer }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create flyer" }, { status: 500 })
  }
}
