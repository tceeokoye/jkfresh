import { NextResponse } from "next/server"
import type { Flyer } from "../../../../src/types/global"

// Mock flyer data
const mockFlyer: Flyer = {
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
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const flyerId = params.id

    // In real app, fetch from database by ID
    if (flyerId === "1") {
      return NextResponse.json({ flyer: mockFlyer })
    }

    return NextResponse.json({ error: "Flyer not found" }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flyer" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const flyerId = params.id
    const body = await request.json()

    // In real app, update in database
    const updatedFlyer: Flyer = {
      ...mockFlyer,
      ...body,
      id: flyerId,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ flyer: updatedFlyer })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update flyer" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const flyerId = params.id

    // In real app, delete from database
    return NextResponse.json({ message: "Flyer deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete flyer" }, { status: 500 })
  }
}
