"use client"

import { useState } from "react"
import { FlyerList } from "@/components/admin/flyer-list"
import { FlyerEditor } from "@/components/admin/flyer-editor"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Flyer } from "../../../src/types/global"

export default function AdminFlyersPage() {
  const [currentView, setCurrentView] = useState<"list" | "edit" | "create">("list")
  const [selectedFlyer, setSelectedFlyer] = useState<Flyer | null>(null)

  const handleEdit = (flyer: Flyer) => {
    setSelectedFlyer(flyer)
    setCurrentView("edit")
  }

  const handleView = (flyer: Flyer) => {
    // Navigate to flyer detail page
    window.open(`/flyer/${flyer.id}`, "_blank")
  }

  const handleDelete = (flyerId: string) => {
    // In real app, show confirmation dialog and delete
    console.log("Delete flyer:", flyerId)
  }

  const handleCreate = () => {
    setSelectedFlyer(null)
    setCurrentView("create")
  }

  const handleSave = (flyerData: Partial<Flyer>) => {
    // In real app, save to database
    console.log("Save flyer:", flyerData)
    setCurrentView("list")
  }

  const handleCancel = () => {
    setCurrentView("list")
    setSelectedFlyer(null)
  }

  if (currentView === "edit" || currentView === "create") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleCancel}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Flyers
          </Button>
          <h1 className="text-2xl font-bold">{currentView === "edit" ? "Edit Flyer" : "Create New Flyer"}</h1>
        </div>

        <FlyerEditor flyer={selectedFlyer || undefined} onSave={handleSave} onCancel={handleCancel} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Flyer Management</h1>
        <p className="text-muted-foreground">Create and manage your weekly flyers</p>
      </div>

      <FlyerList onEdit={handleEdit} onView={handleView} onDelete={handleDelete} onCreate={handleCreate} />
    </div>
  )
}
