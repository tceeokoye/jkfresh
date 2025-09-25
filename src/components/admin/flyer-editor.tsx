"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, Save, Eye, Trash2, Plus, X, FileText } from "lucide-react"
import type { Flyer } from "../../types/global"

interface FlyerEditorProps {
  flyer?: Flyer
  onSave?: (flyer: Partial<Flyer>) => void
  onCancel?: () => void
}

export function FlyerEditor({ flyer, onSave, onCancel }: FlyerEditorProps) {
  const [formData, setFormData] = useState({
    title: flyer?.title || "",
    description: flyer?.description || "",
    startDate: flyer?.startDate || "",
    endDate: flyer?.endDate || "",
    isActive: flyer?.isActive || false,
    coverImage: flyer?.coverImage || "",
  })

  const [pages, setPages] = useState(flyer?.pages || [])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }))
  }

  const addPage = () => {
    const newPage = {
      id: Date.now().toString(),
      pageNumber: pages.length + 1,
      image: "",
      deals: [],
    }
    setPages((prev) => [...prev, newPage])
  }

  const removePage = (pageId: string) => {
    setPages((prev) => prev.filter((page) => page.id !== pageId))
  }

  const updatePageImage = (pageId: string, image: string) => {
    setPages((prev) => prev.map((page) => (page.id === pageId ? { ...page, image } : page)))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.endDate) newErrors.endDate = "End date is required"
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const flyerData = {
        ...formData,
        pages,
        updatedAt: new Date().toISOString(),
      }

      onSave?.(flyerData)
    } catch (error) {
      setErrors({ general: "Failed to save flyer. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <Alert variant="destructive">
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Flyer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Weekly Savings - January 15-21"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Great deals on fresh produce, meat, and pantry essentials"
              className={errors.description ? "border-destructive" : ""}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className={errors.startDate ? "border-destructive" : ""}
              />
              {errors.startDate && <p className="text-sm text-destructive mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className={errors.endDate ? "border-destructive" : ""}
              />
              {errors.endDate && <p className="text-sm text-destructive mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="/flyer-cover.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="isActive">Active Flyer</Label>
            {formData.isActive && <Badge variant="secondary">Live</Badge>}
          </div>
        </CardContent>
      </Card>

      {/* Flyer Pages */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Flyer Pages</CardTitle>
          <Button type="button" onClick={addPage} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Page
          </Button>
        </CardHeader>
        <CardContent>
          {pages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No pages added yet. Click "Add Page" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pages.map((page, index) => (
                <div key={page.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <Badge variant="outline">Page {index + 1}</Badge>
                  </div>

                  <div className="flex-1">
                    <Input
                      placeholder="Page image URL"
                      value={page.image}
                      onChange={(e) => updatePageImage(page.id, e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => removePage(page.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>

        <div className="flex gap-2">
          {flyer && (
            <Button type="button" variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Saving..." : "Save Flyer"}
          </Button>
        </div>
      </div>
    </form>
  )
}
