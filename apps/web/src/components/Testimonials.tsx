"use client"

import { Card, CardContent } from "./ui/card"
import { Star, Quote } from "lucide-react"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  image: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Sustainability Director",
    company: "EcoTech Solutions",
    content: "Polymers transformed our ESG reporting. We now have real-time data on our recycling impact and our employees are more engaged than ever with sustainability goals.",
    image: "https://images.unsplash.com/photo-1638699532230-1c7676c2a708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBzdXN0YWluYWJpbGl0eXxlbnwxfHx8fDE3NTg3ODg2MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Environmental Manager",
    company: "GreenTech Corp",
    content: "The gamification aspect is brilliant. Our team went from barely meeting recycling targets to exceeding them by 300%. The PLY tokens are a great incentive.",
    image: "https://images.unsplash.com/photo-1645520718652-9342896b0eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTg3ODg2MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5
  },
  {
    name: "Jennifer Kim",
    role: "Head of Operations",
    company: "Future Dynamics",
    content: "The dashboard insights help us optimize our waste management processes. We've reduced costs by 40% while improving our environmental impact significantly.",
    image: "https://images.unsplash.com/photo-1594987688270-18b659f564e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBzdXN0YWluYWJpbGl0eSUyMG5hdHVyZXxlbnwxfHx8fDE3NTg3ODg2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 5
  }
]

export default function Testimonials() {
  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="text-xs sm:text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">
            WHY POLYMERS
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Trusted by Forward-Thinking Companies
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            See how organizations are transforming their sustainability practices with Polymers Network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#16651c] text-[#16651c]" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="h-6 w-6 text-[#16651c]/30 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed pl-4">
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#16651c]/20 to-[#22c55e]/20 flex items-center justify-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}