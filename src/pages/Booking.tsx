import { useState } from "react";
import { Calendar, Clock, User, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  counselorName: string;
  specialization: string;
}

interface BookingStep {
  step: number;
  title: string;
  description: string;
}

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    urgency: "",
    previousCounseling: ""
  });

  const steps: BookingStep[] = [
    { step: 1, title: "Select Date", description: "Choose your preferred appointment date" },
    { step: 2, title: "Choose Time", description: "Pick an available time slot" },
    { step: 3, title: "Your Details", description: "Provide contact information" },
    { step: 4, title: "Confirmation", description: "Review and confirm your booking" }
  ];

  // Mock data for available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  // Mock time slots for selected date
  const timeSlots: TimeSlot[] = [
    { id: "1", time: "9:00 AM", available: true, counselorName: "Dr. Sarah Chen", specialization: "Anxiety & Depression" },
    { id: "2", time: "10:30 AM", available: false, counselorName: "Dr. Michael Rodriguez", specialization: "Academic Stress" },
    { id: "3", time: "12:00 PM", available: true, counselorName: "Dr. Emily Johnson", specialization: "Relationship Issues" },
    { id: "4", time: "2:00 PM", available: true, counselorName: "Dr. Sarah Chen", specialization: "Anxiety & Depression" },
    { id: "5", time: "3:30 PM", available: true, counselorName: "Dr. Alex Thompson", specialization: "Life Transitions" },
    { id: "6", time: "5:00 PM", available: false, counselorName: "Dr. Emily Johnson", specialization: "Relationship Issues" }
  ];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setCurrentStep(2);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep(3);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <section className="bg-card border-b border-border shadow-gentle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Confidential Counseling Sessions
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Book a private, confidential session with our licensed on-campus counselors. 
              All appointments are completely private and covered by student services.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Licensed Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-secondary" />
                <span>Student Services</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-gentle",
                  currentStep >= step.step
                    ? "bg-primary text-primary-foreground shadow-gentle"
                    : "bg-muted text-muted-foreground"
                )}>
                  {currentStep > step.step ? <CheckCircle className="h-5 w-5" /> : step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "h-1 w-16 mx-2 transition-gentle",
                    currentStep > step.step ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">{steps[currentStep - 1].title}</h2>
            <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-comfort">
          <CardContent className="p-8">
            {/* Step 1: Date Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select Your Preferred Date</h3>
                  <p className="text-muted-foreground">Choose from available dates in the next two weeks</p>
                </div>
                
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableDates.slice(0, 12).map((date) => (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className="p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary-soft transition-gentle text-center"
                    >
                      <div className="font-medium">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      <div className="text-sm text-muted-foreground">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Time Slot Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Available Times</h3>
                  <p className="text-muted-foreground">
                    {selectedDate && formatDate(selectedDate)}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && handleSlotSelect(slot)}
                      disabled={!slot.available}
                      className={cn(
                        "p-4 rounded-lg border-2 text-left transition-gentle",
                        slot.available
                          ? "border-border hover:border-primary hover:bg-primary-soft cursor-pointer"
                          : "border-muted bg-muted/50 cursor-not-allowed opacity-60"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{slot.time}</span>
                        <Badge variant={slot.available ? "default" : "secondary"}>
                          {slot.available ? "Available" : "Booked"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>{slot.counselorName}</p>
                        <p>{slot.specialization}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back to Date Selection
                </Button>
              </div>
            )}

            {/* Step 3: Contact Form */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <User className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your Information</h3>
                  <p className="text-muted-foreground">
                    This information is kept strictly confidential and used only for your appointment
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        required
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input
                        type="email"
                        required
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@university.edu"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Reason for Appointment</label>
                    <Textarea
                      value={bookingForm.reason}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Briefly describe what you'd like to discuss (optional)"
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Urgency Level</label>
                      <Select value={bookingForm.urgency} onValueChange={(value) => setBookingForm(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - General support</SelectItem>
                          <SelectItem value="medium">Medium - Noticeable impact</SelectItem>
                          <SelectItem value="high">High - Significant distress</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Previous Counseling</label>
                      <Select value={bookingForm.previousCounseling} onValueChange={(value) => setBookingForm(prev => ({ ...prev, previousCounseling: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">First time</SelectItem>
                          <SelectItem value="some">Some experience</SelectItem>
                          <SelectItem value="extensive">Extensive experience</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                      Back to Time Selection
                    </Button>
                    <Button type="submit" variant="calm" className="flex-1">
                      Review Booking
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && selectedSlot && (
              <div className="space-y-6 text-center">
                <div>
                  <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
                  <p className="text-muted-foreground">
                    Your appointment has been successfully scheduled. You'll receive a confirmation email shortly.
                  </p>
                </div>

                <Card className="bg-primary-soft border-primary/20 text-left">
                  <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>{selectedDate && formatDate(selectedDate)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{selectedSlot.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <p>{selectedSlot.counselorName}</p>
                        <p className="text-sm text-muted-foreground">{selectedSlot.specialization}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    <strong>Important:</strong> Your appointment is completely confidential. 
                    Please arrive 10 minutes early and bring your student ID.
                  </p>
                  <p>
                    If you need to reschedule or cancel, please do so at least 24 hours in advance.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                    Book Another Session
                  </Button>
                  <Button variant="calm" className="flex-1">
                    Add to Calendar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Booking;