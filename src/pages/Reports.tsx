
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockExpenses, mockCategories } from '@/utils/mockData';
import { Download, FileSpreadsheet, ArrowUpRight, Calendar, User, Users, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Reports = () => {
  const { currentUser } = useUser();
  const isHR = currentUser?.role === 'hr';
  const isAccountant = currentUser?.role === 'accountant';
  
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportType, setExportType] = useState<'employee' | 'category' | 'date'>('employee');
  const [exportFormat, setExportFormat] = useState<'excel' | 'csv'>('excel');
  const [exportEmail, setExportEmail] = useState('');
  
  // Calculate total amounts for statistics
  const totalPending = mockExpenses
    .filter(expense => ['submitted', 'under_review'].includes(expense.status))
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const totalApproved = mockExpenses
    .filter(expense => ['approved', 'processing_payment'].includes(expense.status))
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  const totalPaid = mockExpenses
    .filter(expense => expense.status === 'paid')
    .reduce((sum, expense) => sum + expense.amount, 0);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Calculate category distribution
  const categoryAmounts = mockExpenses
    .filter(expense => expense.status !== 'rejected' && expense.status !== 'draft')
    .reduce((acc, expense) => {
      if (!expense.categoryId) return acc;
      acc[expense.categoryId] = (acc[expense.categoryId] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
  
  const categoryData = Object.entries(categoryAmounts)
    .map(([categoryId, amount]) => {
      const category = mockCategories.find(c => c.id === categoryId);
      return {
        id: categoryId,
        name: category?.name || 'Unknown',
        amount,
      };
    })
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);
  
  const handleExport = () => {
    toast({
      title: "Report exported",
      description: exportEmail 
        ? `Report has been sent to ${exportEmail}.`
        : "Report has been downloaded successfully.",
    });
    
    setShowExportDialog(false);
  };
  
  const reportTypes = [
    {
      id: 'expenses-by-employee',
      title: 'Expenses by Employee',
      description: 'Detailed breakdown of expenses submitted by each employee',
      icon: Users,
      className: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'expenses-by-category',
      title: 'Expenses by Category',
      description: 'Summary of expenses grouped by reimbursement category',
      icon: Tag,
      className: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'expenses-by-status',
      title: 'Expenses by Status',
      description: 'Overview of expenses segmented by their current status',
      icon: ArrowUpRight,
      className: 'bg-green-100 text-green-600'
    },
    {
      id: 'monthly-summary',
      title: 'Monthly Summary',
      description: 'Month-by-month summary of all expenses and reimbursements',
      icon: Calendar,
      className: 'bg-amber-100 text-amber-600'
    },
    {
      id: 'pending-approvals',
      title: 'Pending Approvals',
      description: 'List of all expenses awaiting review and approval',
      icon: User,
      className: 'bg-red-100 text-red-600'
    },
    {
      id: 'payment-report',
      title: 'Payment Report',
      description: 'Summary of all processed and pending payments',
      icon: FileSpreadsheet,
      className: 'bg-cyan-100 text-cyan-600'
    }
  ];
  
  const handleReportClick = (reportId: string) => {
    // Set export type based on report
    if (reportId === 'expenses-by-employee') {
      setExportType('employee');
    } else if (reportId === 'expenses-by-category') {
      setExportType('category');
    } else {
      setExportType('date');
    }
    
    setShowExportDialog(true);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8 mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Generate and export expense reports
            </p>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="neo-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalPending)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting approval or review
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalApproved)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Ready for payment
              </p>
            </CardContent>
          </Card>
          
          <Card className="neo-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Paid Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalPaid)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Reimbursed to employees
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Report Types */}
        <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reportTypes.map(report => (
            <Card 
              key={report.id} 
              className="neo-card hover-scale cursor-pointer" 
              onClick={() => handleReportClick(report.id)}
            >
              <CardHeader>
                <div className={`w-10 h-10 rounded-full ${report.className} flex items-center justify-center mb-2`}>
                  <report.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardFooter className="border-t pt-3 pb-2 mt-auto">
                <Button variant="ghost" size="sm" className="w-full justify-start text-primary">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Category Breakdown */}
        <h2 className="text-xl font-semibold mb-4">Top Expense Categories</h2>
        <Card className="neo-card mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Category Distribution</CardTitle>
            <CardDescription>
              Breakdown of expenses by reimbursement category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map(category => {
                const percentage = (category.amount / Object.values(categoryAmounts).reduce((a, b) => a + b, 0)) * 100;
                
                return (
                  <div key={category.id} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{category.name}</span>
                      <span className="font-medium">{formatCurrency(category.amount)}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary rounded-full h-2" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-3">
            <Button variant="outline" size="sm" className="w-full" onClick={() => handleReportClick('expenses-by-category')}>
              <Download className="h-4 w-4 mr-2" />
              Export Full Category Report
            </Button>
          </CardFooter>
        </Card>
      </main>
      
      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Export Report</DialogTitle>
            <DialogDescription>
              Configure your report export options.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="exportType">Report Type</Label>
              <Select value={exportType} onValueChange={(value: any) => setExportType(value)}>
                <SelectTrigger className="subtle-input">
                  <SelectValue placeholder="Select export type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Expenses by Employee</SelectItem>
                  <SelectItem value="category">Expenses by Category</SelectItem>
                  <SelectItem value="date">Expenses by Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exportFormat">Export Format</Label>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger className="subtle-input">
                  <SelectValue placeholder="Select export format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exportEmail">Email Report To (Optional)</Label>
              <Input
                id="exportEmail"
                type="email"
                placeholder="accounting@company.com"
                className="subtle-input"
                value={exportEmail}
                onChange={e => setExportEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to download directly
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              {exportEmail ? 'Send' : 'Download'} {exportFormat.toUpperCase()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
