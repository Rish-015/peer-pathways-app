import { Link } from "react-router-dom";
import { MessageCircle, BookOpen, Users, Calendar, Shield, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FeatureCard from "@/components/FeatureCard";
import heroImage from "@/assets/hero-wellness.jpg";

const Home = () => {
  const features = [
    {
      title: "AI Support Chat",
      description: "Get immediate support from our trained AI counselor, available 24/7 when you need it most.",
      icon: MessageCircle,
      href: "/chat",
      variant: "primary" as const
    },
    {
      title: "Resource Library",
      description: "Access curated mental wellness resources including articles, videos, and guided exercises.",
      icon: BookOpen,
      href: "/resources",
      variant: "secondary" as const
    },
    {
      title: "Peer Community",
      description: "Connect with fellow students in a safe, supportive environment with mood sharing and anonymous support.",
      icon: Users,
      href: "/community",
      variant: "accent" as const
    },
    {
      title: "Professional Booking",
      description: "Schedule confidential appointments with licensed on-campus counselors at your convenience.",
      icon: Calendar,
      href: "/booking",
      variant: "default" as const
    }
  ];

  const principles = [
    {
      icon: Shield,
      title: "Complete Confidentiality",
      description: "Your privacy is our top priority. All interactions are secure and confidential."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Mental health doesn't wait. Our AI support is available whenever you need it."
    },
    {
      icon: Heart,
      title: "Stigma-Free Environment",
      description: "We believe mental health is health. No judgment, just support and understanding."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Mental Wellness{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Starts Here
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  A safe, supportive space for college students to prioritize their mental health. 
                  Get AI-powered support, connect with peers, and access professional care—all in complete confidentiality.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/chat">Start AI Chat</Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/resources">Explore Resources</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Anonymous & Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Peaceful wellness landscape" 
                className="rounded-2xl shadow-comfort w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our platform provides multiple pathways to support your mental health journey, 
              from immediate AI assistance to professional counseling services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Built on Trust & Understanding
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the unique challenges college students face. Our platform is designed 
              with your needs and privacy in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <Card key={index} className="text-center border-0 bg-transparent">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-primary-soft rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {principle.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Ready to Prioritize Your Mental Health?
            </h2>
            <p className="text-lg text-muted-foreground">
              Take the first step towards better mental wellness. Our AI support is ready to listen, 
              and our community is here to support you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/chat">Start Your Journey</Link>
              </Button>
              <Button variant="comfort" size="xl" asChild>
                <Link to="/booking">Book Professional Help</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;