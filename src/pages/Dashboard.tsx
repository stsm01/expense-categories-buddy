
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/StatusBadge';
import { Link } from 'react-router-dom';
import { mockExpenses, mockCategories } from '@/utils/mockData';
import { Plus, BarChart3, Layers, FileText, ArrowUpRight, Clock } from 'lucide-react';
import ExpenseCard from '@/components/ExpenseCard';
import CategoryCard from '@/components/CategoryCard';

const Dashboard = () => {
  const { currentUser } = useUser();
  const [statTimeframe, setStatTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  const isEmployee = currentUser?.role === 'employee';
  const isHR = currentUser?.role === 'hr';
  const isAccountant = currentUser?.role === 'accountant';
  
  // Filter expenses based on user role
  const userExpenses = isEmployee
    ? mockExpenses.filter(expense => expense.employeeId === currentUser?.id)
    : mockExpenses;
  
  // Get recent expenses (limit to 3)
  const recentExpenses = [...userExpenses]
    .sort((a, b) => {
      const dateA = a.submittedDate || new Date(0);
      const dateB = b.submittedDate || new Date(0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 3);
  
  // Get expenses needing attention
  const pendingExpenses = mockExpenses.filter(expense => 
    (isHR && (expense.status === 'submitted' || expense.status === 'under_review')) ||
    (isEmployee && expense.employeeId === currentUser?.id && expense.status === 'needs_revision') ||
    (isAccountant && expense.status === 'approved')
  ).slice(0, 3);
  
  // Calculate statistics
  const totalSubmitted = userExpenses.filter(
    expense => expense.status !== 'draft'
  ).length;
  
  const totalApproved = userExpenses.filter(
    expense => expense.status === 'approved' || expense.status === 'processing_payment' || expense.status === 'paid'
  ).length;
  
  const totalAmount = userExpenses
    .filter(expense => expense.status !== 'draft' && expense.status !== 'rejected')
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Get popular categories (for HR)
  const categoryUsage = mockExpenses.reduce((acc, expense) => {
    if (!expense.categoryId) return acc;
    acc[expense.categoryId] = (acc[expense.categoryId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const popularCategories = Object.entries(categoryUsage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([categoryId]) => mockCategories.find(cat => cat.id === categoryId))
    .filter(Boolean) as typeof mockCategories;
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8 mx-auto max-w-7xl animate-fade-in">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {currentUser?.name}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            {isEmployee && (
              <Button asChild>
                <Link to="/expenses/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Expense
                </Link>
              </Button>
            )}
            {isHR && (
              <Button asChild>
                <Link to="/categories/new">
                  <Plus className="h-4 w-4 mr-2" />
                  New Category
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="neo-card animate-scale-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total {isHR ? 'Processed' : 'Submitted'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSubmitted}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {statTimeframe === 'week' ? 'This week' : 
                 statTimeframe === 'month' ? 'This month' : 'This year'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-card animate-scale-in delay-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {isHR ? 'Approval Rate' : 'Approved'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalSubmitted > 0 
                  ? `${Math.round((totalApproved / totalSubmitted) * 100)}%`
                  : '0%'
                }
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalApproved} out of {totalSubmitted} expenses
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-card animate-scale-in delay-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalAmount)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {statTimeframe === 'week' ? 'This week' : 
                 statTimeframe === 'month' ? 'This month' : 'This year'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/expenses">
                  View all
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {recentExpenses.length > 0 ? (
              <div className="space-y-4">
                {recentExpenses.map(expense => (
                  <ExpenseCard key={expense.id} expense={expense} />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No recent expenses</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">
                    You haven't submitted any expenses yet.
                  </p>
                  {isEmployee && (
                    <Button asChild>
                      <Link to="/expenses/new">
                        <Plus className="h-4 w-4 mr-2" />
                        New Expense
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Needs Attention Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {isHR ? 'Needs Your Approval' : 
               isAccountant ? 'Ready for Payment' : 
               'Needs Your Attention'}
            </h2>
            
            {pendingExpenses.length > 0 ? (
              <div className="space-y-4">
                {pendingExpenses.map(expense => (
                  <ExpenseCard key={expense.id} expense={expense} />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">All caught up!</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isHR ? 'No expenses waiting for your approval.' : 
                     isAccountant ? 'No expenses ready for payment processing.' : 
                     'No expenses need your attention at the moment.'}
                  </p>
                </CardContent>
              </Card>
            )}
            
            {/* Popular Categories - Only show for HR */}
            {isHR && popularCategories.length > 0 && (
              <>
                <div className="flex items-center justify-between mt-8">
                  <h2 className="text-xl font-semibold">Popular Categories</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/categories">
                      View all
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {popularCategories.map(category => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Quick Links Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-6 justify-start" asChild>
              <Link to="/expenses">
                <FileText className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Expenses</div>
                  <div className="text-xs text-muted-foreground mt-1">View and manage your expenses</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 justify-start" asChild>
              <Link to="/categories">
                <Layers className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Categories</div>
                  <div className="text-xs text-muted-foreground mt-1">Browse reimbursement categories</div>
                </div>
              </Link>
            </Button>
            
            {(isHR || isAccountant) && (
              <Button variant="outline" className="h-auto py-6 justify-start" asChild>
                <Link to="/reports">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Reports</div>
                    <div className="text-xs text-muted-foreground mt-1">Generate and export reports</div>
                  </div>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
