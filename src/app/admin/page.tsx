"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Package, Users, ShoppingCart, TrendingUp, Calendar, DollarSign, Eye } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Flyers",
    value: "3",
    change: "2 expiring this week",
    icon: FileText,
    trend: "neutral",
  },
  {
    title: "Total Products",
    value: "1,247",
    change: "+15 added this week",
    icon: Package,
    trend: "up",
  },
  {
    title: "Active Customers",
    value: "856",
    change: "+12% from last month",
    icon: Users,
    trend: "up",
  },
]

const recentFlyers = [
  {
    id: "1",
    title: "Weekly Savings - January 15-21",
    status: "Active",
    views: 1247,
    endDate: "2024-01-21",
  },
  {
    id: "2",
    title: "New Year Fresh Start",
    status: "Expired",
    views: 892,
    endDate: "2024-01-14",
  },
  {
    id: "3",
    title: "Holiday Specials",
    status: "Expired",
    views: 2156,
    endDate: "2023-12-24",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your JK Fresh admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Flyers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Flyers
            </CardTitle>
            <CardDescription>Your latest flyer performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFlyers.map((flyer) => (
                <div key={flyer.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{flyer.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={flyer.status === "Active" ? "default" : "secondary"}>{flyer.status}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {flyer.views} views
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              View All Flyers
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex-col gap-2">
                <FileText className="h-5 w-5" />
                Create Flyer
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Package className="h-5 w-5" />
                Add Product
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <ShoppingCart className="h-5 w-5" />
                View Orders
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <TrendingUp className="h-5 w-5" />
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">New flyer "Weekly Savings" published</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">15 new products added to inventory</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Flyer "New Year Fresh Start" expired</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
