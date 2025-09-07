import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student"
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (role: string) => {
    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Mock login logic - replace with actual authentication
    console.log(`${role} login attempt:`, formData);
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${role}!`,
      variant: "default"
    });

    // Store login state in localStorage for demo
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", formData.email);

    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl text-primary">MindfulU</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your account</p>
        </div>

        <Card className="shadow-elegant border-soft">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Choose your role and sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger 
                  value="student" 
                  className="flex items-center space-x-2"
                  onClick={() => setFormData({...formData, role: "student"})}
                >
                  <User className="h-4 w-4" />
                  <span>Student</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="admin" 
                  className="flex items-center space-x-2"
                  onClick={() => setFormData({...formData, role: "admin"})}
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="student" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student-email">Student Email</Label>
                  <Input
                    id="student-email"
                    name="email"
                    type="email"
                    placeholder="your.email@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-soft"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="student-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border-soft pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => handleLogin("student")} 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Sign In as Student
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Student access provides anonymous support and resources
                </p>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    name="email"
                    type="email"
                    placeholder="admin@university.edu"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-soft"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="border-soft pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={() => handleLogin("admin")} 
                  className="w-full bg-secondary hover:bg-secondary/90"
                >
                  Sign In as Admin
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Admin access includes moderation and management tools
                </p>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help accessing your account?{" "}
                <Link to="/support" className="text-primary hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-gentle">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;