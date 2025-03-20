
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight, CheckCircle2, Users, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Landing = () => {
  const features = [
    {
      icon: <FileText className="h-12 w-12 text-primary" />,
      title: 'Simplified Expense Submission',
      description: 'Upload receipts and submit expenses with just a few clicks. Our intuitive interface makes the process fast and error-free.'
    },
    {
      icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
      title: 'Smart Approval Workflow',
      description: 'Customizable approval paths ensure expenses are reviewed by the right people at the right time.'
    },
    {
      icon: <Users className="h-12 w-12 text-blue-500" />,
      title: 'Role-Based Access',
      description: 'Different views for employees, HR managers, and accounting teams, with permissions tailored to each role.'
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-purple-500" />,
      title: 'Comprehensive Reporting',
      description: 'Generate detailed reports on expense categories, departments, time periods, and more for better financial insights.'
    }
  ];

  const testimonials = [
    {
      quote: "RefundMate has cut our reimbursement processing time by 70%. What used to take weeks now takes days.",
      author: "Sarah J.",
      role: "HR Director"
    },
    {
      quote: "The transparency of the system has virtually eliminated disputes about expense statuses and approvals.",
      author: "Michael T.",
      role: "Finance Manager"
    },
    {
      quote: "As an employee, I love how easy it is to submit expenses from my phone and track exactly where they are in the process.",
      author: "Alex R.",
      role: "Sales Representative"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-50 rounded-full opacity-50 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-50 rounded-full opacity-50 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold tracking-tight">RefundMate</h3>
            </div>
            <div className="hidden md:flex space-x-4 items-center">
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Expense Management Simplified
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Streamline Your Company's 
                <span className="text-primary"> Reimbursement Process</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                RefundMate eliminates paperwork, automates approvals, and provides real-time visibility into expense status for everyone involved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button className="h-12 px-6 text-base">
                    Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="h-12 px-6 text-base">
                  Schedule a Demo
                </Button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
              <div className="bg-white rounded-xl shadow-xl p-8 transform rotate-3">
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-bold text-xl mb-2">Expense Submission</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Quick receipt upload
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Category selection
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Auto-fill
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="h-10 bg-gray-100 rounded-md w-full" />
                  <div className="h-28 bg-gray-100 rounded-md w-full" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 bg-gray-100 rounded-md w-full" />
                    <div className="h-10 bg-gray-100 rounded-md w-full" />
                  </div>
                </div>
                <Button className="w-full">Submit Expense</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to streamline your expense reimbursement process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How RefundMate Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A simple, three-step process that saves time for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative">
              <div className="bg-white rounded-lg p-6 shadow-elevation-1 z-10 relative">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full font-bold text-xl mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Submit</h3>
                <p className="text-muted-foreground">Employees snap a photo of the receipt and submit it with a few taps.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-16 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg p-6 shadow-elevation-1 z-10 relative">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full font-bold text-xl mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Review</h3>
                <p className="text-muted-foreground">Managers receive notifications and approve expenses with one click.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 left-full w-16 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg p-6 shadow-elevation-1 z-10 relative">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full font-bold text-xl mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Reimburse</h3>
                <p className="text-muted-foreground">Accounting processes payments faster with all documentation in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Companies of all sizes trust RefundMate to simplify their expense management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <p className="italic mb-4 text-gray-700">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Expense Management?</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Join thousands of companies that have transformed their reimbursement process with RefundMate.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard">
                <Button variant="secondary" className="h-12 px-6 text-base bg-white text-primary hover:bg-white/90">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="h-12 px-6 text-base border-white text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-white">RefundMate</h3>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Simplifying expense reimbursement for modern companies.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} RefundMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
