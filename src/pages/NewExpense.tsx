
import React from 'react';
import Navigation from '@/components/Navigation';
import ExpenseForm from '@/components/ExpenseForm';

const NewExpense = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8 mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">New Expense</h1>
          <p className="text-muted-foreground mt-1">
            Create a new expense reimbursement request
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ExpenseForm />
        </div>
      </main>
    </div>
  );
};

export default NewExpense;
