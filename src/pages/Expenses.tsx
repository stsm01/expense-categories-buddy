
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Plus, Search } from 'lucide-react';
import { mockExpenses, getExpensesByEmployee } from '@/utils/mockData';
import ExpenseCard from '@/components/ExpenseCard';
import { Link } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import ExpenseForm from '@/components/ExpenseForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ExpenseStatus } from '@/types';

const Expenses = () => {
  const { currentUser } = useUser();
  const isEmployee = currentUser?.role === 'employee';
  const isHR = currentUser?.role === 'hr';
  const isAccountant = currentUser?.role === 'accountant';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewExpenseDialog, setShowNewExpenseDialog] = useState(false);
  
  // Get expenses based on user role
  const userExpenses = isEmployee
    ? getExpensesByEmployee(currentUser?.id || '')
    : mockExpenses;
  
  // Filter expenses based on search term and category
  const filteredExpenses = userExpenses.filter(expense => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (expense.description?.toLowerCase().includes(searchLower) ||
      expense.categoryName?.toLowerCase().includes(searchLower) ||
      expense.id.toLowerCase().includes(searchLower));
    
    const matchesCategory = selectedCategory === 'all' || expense.categoryId === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Group expenses by status
  const draftExpenses = filteredExpenses.filter(expense => expense.status === 'draft');
  const pendingExpenses = filteredExpenses.filter(
    expense => ['submitted', 'under_review'].includes(expense.status)
  );
  const inProgressExpenses = filteredExpenses.filter(
    expense => ['needs_revision', 'approved', 'processing_payment'].includes(expense.status)
  );
  const completedExpenses = filteredExpenses.filter(
    expense => ['paid', 'rejected'].includes(expense.status)
  );
  
  // Get unique categories from expenses
  const categories = Array.from(
    new Set(userExpenses.map(expense => expense.categoryId).filter(Boolean))
  );
  
  // Group tabs based on user role
  const tabs = [
    { value: 'all', label: `All (${filteredExpenses.length})` },
    ...(isEmployee ? [{ value: 'draft', label: `Drafts (${draftExpenses.length})` }] : []),
    { value: 'pending', label: `Pending (${pendingExpenses.length})` },
    { value: 'in-progress', label: `In Progress (${inProgressExpenses.length})` },
    { value: 'completed', label: `Completed (${completedExpenses.length})` },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8 mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
            <p className="text-muted-foreground mt-1">
              {isEmployee 
                ? 'Manage and track your expense reimbursements'
                : isHR
                ? 'Review and process expense reimbursement requests'
                : 'Process payments for approved expenses'}
            </p>
          </div>
          
          {isEmployee && (
            <Button className="mt-4 md:mt-0" onClick={() => setShowNewExpenseDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Expense
            </Button>
          )}
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              className="pl-10 subtle-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] subtle-input">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(categoryId => {
                  const expense = userExpenses.find(e => e.categoryId === categoryId);
                  return (
                    <SelectItem key={categoryId} value={categoryId}>
                      {expense?.categoryName || 'Unknown'}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Expenses Tabs */}
        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="mb-6">
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <ExpensesList expenses={filteredExpenses} />
          </TabsContent>
          
          {isEmployee && (
            <TabsContent value="draft" className="mt-0">
              <ExpensesList expenses={draftExpenses} />
            </TabsContent>
          )}
          
          <TabsContent value="pending" className="mt-0">
            <ExpensesList expenses={pendingExpenses} />
          </TabsContent>
          
          <TabsContent value="in-progress" className="mt-0">
            <ExpensesList expenses={inProgressExpenses} />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <ExpensesList expenses={completedExpenses} />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* New Expense Dialog */}
      <Dialog open={showNewExpenseDialog} onOpenChange={setShowNewExpenseDialog}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>New Expense</DialogTitle>
            <DialogDescription>
              Create a new expense reimbursement request.
            </DialogDescription>
          </DialogHeader>
          
          <ExpenseForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper component for the expense list
const ExpensesList = ({ expenses }: { expenses: typeof mockExpenses }) => {
  const { currentUser } = useUser();
  const isEmployee = currentUser?.role === 'employee';
  
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No expenses found</h3>
        <p className="text-muted-foreground mt-1 mb-6">
          {isEmployee
            ? "You don't have any expenses in this category"
            : "No expenses match your current filters"}
        </p>
        {isEmployee && (
          <Button asChild>
            <Link to="/expenses/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Expense
            </Link>
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {expenses.map(expense => (
        <ExpenseCard 
          key={expense.id} 
          expense={expense} 
        />
      ))}
    </div>
  );
};

export default Expenses;
