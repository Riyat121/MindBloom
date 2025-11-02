import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // 👇 Added responsive width limit & centering utilities
      "mx-auto w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-md",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
