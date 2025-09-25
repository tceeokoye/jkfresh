"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Eye, Trash2, Calendar, FileText } from "lucide-react"
import { formatDate } from "../../utils/helpers"
import type { Flyer } from "../../types/global"

// Mock data
const mockFlyers: Flyer[] = [
  {
    id: "1",
    title: "Weekly Savings - January 15-21",
    description: "Great deals on fresh produce, meat, and pantry essentials",
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    coverImage: "/grocery-store-weekly-flyer-with-deals.jpg",
    pages: [],
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
    pages: [],
    isActive: false,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
  {
    id: "3",
    title: "Holiday Specials - December 18-24",
    description: "Everything you need for the perfect holiday feast",
    startDate: "2023-12-18",
    endDate: "2023-12-24",
    coverImage: "/holiday-feast-flyer.jpg",
    pages: [],
    isActive: false,
    createdAt: "2023-12-18T00:00:00Z",
    updatedAt: "2023-12-18T00:00:00Z",
  },
]

interface FlyerListProps {
  onEdit?: (flyer: Flyer) => void
  onView?: (flyer: Flyer) => void
  onDelete?: (flyerId: string) => void
  onCreate?: () => void
}

export function FlyerList({ onEdit, onView, onDelete, onCreate }: FlyerListProps) {
  const [flyers] = useState<Flyer[]>(mockFlyers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredFlyers = flyers.filter(
    (flyer) =>
      flyer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flyer.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (flyer: Flyer) => {
    const now = new Date()
    const startDate = new Date(flyer.startDate)
    const endDate = new Date(flyer.endDate)

    if (!flyer.isActive) {
      return <Badge variant="secondary">Inactive</Badge>
    }

    if (now < startDate) {
      return <Badge variant="outline">Scheduled</Badge>
    }

    if (now > endDate) {
      return <Badge variant="destructive">Expired</Badge>
    }

    return <Badge variant="default">Active</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Flyers
          </CardTitle>
          <Button onClick={onCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Create Flyer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search flyers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Pages</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFlyers.map((flyer) => (
                <TableRow key={flyer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{flyer.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[300px]">{flyer.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(flyer)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {formatDate(flyer.startDate)} - {formatDate(flyer.endDate)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{flyer.pages.length} pages</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatDate(flyer.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView?.(flyer)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(flyer)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete?.(flyer.id)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredFlyers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No flyers found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
