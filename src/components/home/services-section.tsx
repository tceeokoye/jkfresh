import Image from "next/image"
import Link from "next/link"
import { MapPin, Users, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


const services = [
  {
    id: 1,
    title: "Find a Store",
    description: "Locate your nearest JK Fresh store and check hours",
    image: "/modern-grocery-store-exterior.jpg",
    icon: MapPin,
    cta: "Find Store",
    link: "/stores",
    color: "bg-primary",
  },
  {
    id: 2,
    title: "Join Our Team",
    description: "Discover career opportunities and grow with us",
    image: "/happy-grocery-store-employees-team.jpg",
    icon: Users,
    cta: "View Careers",
    link: "/careers",
    color: "bg-secondary",
  },
  {
    id: 3,
    title: "Pharmacy Services",
    description: "Full-service pharmacy with prescription and wellness services",
    image: "/modern-pharmacy-counter-with-pharmacist.jpg",
    icon: Pill,
    cta: "Learn More",
    link: "/pharmacy",
    color: "bg-primary",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute top-4 left-4 p-3 rounded-full ${service.color} text-white`}>
                  <service.icon className="w-6 h-6" />
                </div>
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 text-pretty">{service.description}</p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={service.link}>{service.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
