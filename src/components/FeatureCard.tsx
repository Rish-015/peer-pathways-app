import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  variant?: "default" | "primary" | "secondary" | "accent";
  className?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  variant = "default",
  className 
}: FeatureCardProps) => {
  const variantStyles = {
    default: "hover:shadow-gentle",
    primary: "bg-primary-soft border-primary/20 hover:shadow-comfort",
    secondary: "bg-secondary-soft border-secondary/20 hover:shadow-gentle", 
    accent: "bg-accent-soft border-accent/20 hover:shadow-warm"
  };

  return (
    <Card className={cn(
      "transition-comfort cursor-pointer group h-full",
      variantStyles[variant],
      className
    )}>
      <CardHeader>
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-gentle group-hover:scale-105",
          variant === "primary" && "bg-primary text-primary-foreground",
          variant === "secondary" && "bg-secondary text-secondary-foreground",
          variant === "accent" && "bg-accent text-accent-foreground",
          variant === "default" && "bg-muted text-muted-foreground"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant={variant === "default" ? "calm" : "ghost"}
          size="sm" 
          className="w-full"
          asChild
        >
          <a href={href}>Learn More</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;