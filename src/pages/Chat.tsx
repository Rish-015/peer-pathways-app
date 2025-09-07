import { useState, useRef, useEffect } from "react";
import { Send, AlertTriangle, Heart, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm here to provide mental health support and guidance. How are you feeling today? Remember, this is a safe space and you can share whatever is on your mind.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "I understand that you're going through something difficult. It's completely normal to have these feelings, and I want you to know that reaching out shows great strength.",
      "Thank you for sharing that with me. Many college students experience similar challenges. Would you like to explore some coping strategies that might help?",
      "That sounds really challenging. Remember that you're not alone in this. Sometimes talking through our feelings can help us gain clarity and perspective.",
      "I hear you, and your feelings are valid. It's okay to not be okay sometimes. What kind of support do you think would be most helpful right now?",
      "It takes courage to open up about these feelings. Many students find that having someone listen without judgment can be incredibly healing. How long have you been feeling this way?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(userMessage.content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-gentle p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Mental Health Support</h1>
              <p className="text-sm text-muted-foreground">Always here to listen and support you</p>
            </div>
          </div>
          
          <Button variant="emergency" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Emergency Help
          </Button>
        </div>
      </div>

      {/* Emergency Banner */}
      <Alert className="mx-4 mt-4 border-warning bg-warning/10">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          If you're experiencing a mental health emergency, please call 988 (Suicide & Crisis Lifeline) 
          or contact your local emergency services immediately.
        </AlertDescription>
      </Alert>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <Card className="h-full flex flex-col shadow-comfort">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-muted-foreground text-sm">
              Confidential Mental Health Chat
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col min-h-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    message.type === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  )}>
                    {message.type === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={cn(
                    "px-4 py-3 rounded-2xl shadow-gentle transition-gentle",
                    message.type === "user"
                      ? "bg-chat-user text-foreground rounded-br-md"
                      : "bg-chat-ai text-foreground rounded-bl-md"
                  )}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div className="bg-chat-ai px-4 py-3 rounded-2xl rounded-bl-md shadow-gentle">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border pt-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind... (Press Enter to send)"
                  className="flex-1 rounded-full border-2 focus:border-primary"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  variant="calm"
                  size="icon"
                  className="rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                Your conversations are private and confidential. This AI is trained to provide supportive guidance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;