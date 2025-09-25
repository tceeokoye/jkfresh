"use client"

import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift, ShoppingBag, Star, TrendingUp, Calendar, MapPin, Bell, CreditCard } from "lucide-react"
import type { RootState } from "../../store"

export function DashboardOverview() {
  const user = useSelector((state: RootState) => state.auth.user)

  if (!user) return null

  const loyaltyProgress = (user.loyaltyPoints / 500) * 100 // 500 points for next tier

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
        <p className="opacity-90">You have {user.loyaltyPoints} loyalty points and 3 new offers waiting for you.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <Star className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.loyaltyPoints}</div>
            <p className="text-xs text-muted-foreground">{500 - user.loyaltyPoints} points to next tier</p>
            <Progress value={loyaltyProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$247.50</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$89.25</div>
            <p className="text-xs text-muted-foreground">This year so far</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
            <Gift className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Expires in 5 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Offers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Your Active Offers
            </CardTitle>
            <CardDescription>Exclusive deals just for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">20% Off Fresh Produce</p>
                <p className="text-sm text-muted-foreground">Valid until Jan 25</p>
              </div>
              <Badge variant="secondary">20% OFF</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Buy 2 Get 1 Free Dairy</p>
                <p className="text-sm text-muted-foreground">Valid until Jan 28</p>
              </div>
              <Badge variant="secondary">BOGO</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">$5 Off Orders Over $50</p>
                <p className="text-sm text-muted-foreground">Valid until Feb 1</p>
              </div>
              <Badge variant="secondary">$5 OFF</Badge>
            </div>

            <Button className="w-full bg-transparent" variant="outline">
              View All Offers
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest orders and activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Order #1234</p>
                <p className="text-sm text-muted-foreground">Jan 18, 2024 • $67.50</p>
              </div>
              <Badge variant="outline">Delivered</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Order #1233</p>
                <p className="text-sm text-muted-foreground">Jan 15, 2024 • $42.25</p>
              </div>
              <Badge variant="outline">Delivered</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Points Earned</p>
                <p className="text-sm text-muted-foreground">Jan 15, 2024 • +25 points</p>
              </div>
              <Badge variant="secondary">+25</Badge>
            </div>

            <Button className="w-full bg-transparent" variant="outline">
              View Order History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your account and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <MapPin className="h-5 w-5" />
              Store Locator
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Bell className="h-5 w-5" />
              Notifications
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Gift className="h-5 w-5" />
              Redeem Points
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
