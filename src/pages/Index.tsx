
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser, isLoading, switchRole } = useUser();

  useEffect(() => {
    // If user is logged in, redirect to dashboard
    if (currentUser && !isLoading) {
      navigate('/dashboard');
    }
  }, [currentUser, isLoading, navigate]);

  const features = [
    {
      title: 'Simple Category Management',
      description: 'Create and manage reimbursement categories with clear guidelines.',
      role: 'hr'
    },
    {
      title: 'Streamlined Expense Submission',
      description: 'Upload receipts and submit expenses with just a few clicks.',
      role: 'employee'
    },
    {
      title: 'Transparent Review Process',
      description: 'Track your expense status from submission to payment.',
      role: 'employee'
    },
    {
      title: 'Efficient Approvals',
      description: 'Review and approve expenses with clear visibility into each request.',
      role: 'hr'
    },
    {
      title: 'Integrated Communications',
      description: 'Direct messaging between employees and HR for clarifications.',
      role: 'both'
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Export data for accounting and financial reconciliation.',
      role: 'accountant'
    }
  ];

  const handleRoleSelect = (role: 'employee' | 'hr' | 'accountant') => {
    switchRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-50 rounded-full opacity-50 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-50 rounded-full opacity-50 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-slide-in">
              Welcome to RefundMate
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-in">
              Simplify Your Company's 
              <span className="text-primary"> Expense Reimbursement</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-in delay-200">
              A seamless platform that makes it easy for employees to submit expenses and for HR to review, approve, and process them.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-in delay-300">
              <Button className="h-12 px-6 text-base" onClick={() => navigate('/dashboard')}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-12 px-6 text-base">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Choose Your Role</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the app from different perspectives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Employee Card */}
            <div 
              className="neo-card p-6 flex flex-col items-center text-center hover-scale cursor-pointer animate-scale-in delay-100"
              onClick={() => handleRoleSelect('employee')}
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Employee</h3>
              <p className="text-muted-foreground mb-4">Submit expenses and track their status through the approval process.</p>
              <div className="mt-auto">
                <Button variant="ghost" className="group">
                  Continue as Employee
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            {/* HR Manager Card */}
            <div 
              className="neo-card p-6 flex flex-col items-center text-center hover-scale cursor-pointer animate-scale-in delay-200"
              onClick={() => handleRoleSelect('hr')}
            >
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">HR Manager</h3>
              <p className="text-muted-foreground mb-4">Review and approve expense requests and manage reimbursement categories.</p>
              <div className="mt-auto">
                <Button variant="ghost" className="group">
                  Continue as HR
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            
            {/* Accountant Card */}
            <div 
              className="neo-card p-6 flex flex-col items-center text-center hover-scale cursor-pointer animate-scale-in delay-300"
              onClick={() => handleRoleSelect('accountant')}
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Accountant</h3>
              <p className="text-muted-foreground mb-4">Process payments and generate financial reports for approved expenses.</p>
              <div className="mt-auto">
                <Button variant="ghost" className="group">
                  Continue as Accountant
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to streamline your expense reimbursement process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <div 
                key={feature.title}
                className="bg-white rounded-xl p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${(i * 100) + 100}ms` }}
              >
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
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

export default Index;
