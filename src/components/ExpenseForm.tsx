
import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Category, Expense } from '@/types';
import { mockCategories } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FileUpload from './FileUpload';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Receipt, Info } from 'lucide-react';

interface ExpenseFormProps {
  expense?: Expense;
  onSubmit?: (expense: Partial<Expense>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit }) => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState(expense?.amount?.toString() || '');
  const [description, setDescription] = useState(expense?.description || '');
  const [categoryId, setCategoryId] = useState(expense?.categoryId || '');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    expense?.categoryId 
      ? mockCategories.find(cat => cat.id === expense.categoryId) || null
      : null
  );
  
  const [errors, setErrors] = useState({
    amount: '',
    description: '',
    categoryId: '',
    receipt: '',
  });
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
      setErrors({ ...errors, amount: '' });
    }
  };
  
  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setErrors({ ...errors, categoryId: '' });
    
    const category = mockCategories.find(cat => cat.id === value);
    setSelectedCategory(category || null);
  };
  
  const handleReceiptChange = (file: File | null) => {
    setReceipt(file);
    setErrors({ ...errors, receipt: '' });
  };
  
  const validateForm = (): boolean => {
    const newErrors = {
      amount: !amount ? 'Amount is required' : '',
      description: !description ? 'Description is required' : '',
      categoryId: !categoryId ? 'Category is required' : '',
      receipt: !receipt && !expense?.receiptUrl ? 'Receipt is required' : '',
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const expenseData: Partial<Expense> = {
      ...expense,
      amount: parseFloat(amount),
      description,
      categoryId,
      employeeId: currentUser?.id,
      status: expense?.status || 'draft',
    };
    
    if (onSubmit) {
      onSubmit(expenseData);
    } else {
      // Simulate form submission
      toast({
        title: expense ? "Expense updated" : "Expense created",
        description: expense 
          ? "Your expense has been updated successfully."
          : "Your expense has been saved as a draft.",
      });
      
      navigate('/expenses');
    }
  };
  
  const handleSaveAndSubmit = () => {
    if (!validateForm()) return;
    
    const expenseData: Partial<Expense> = {
      ...expense,
      amount: parseFloat(amount),
      description,
      categoryId,
      employeeId: currentUser?.id,
      status: 'submitted',
      submittedDate: new Date(),
    };
    
    if (onSubmit) {
      onSubmit(expenseData);
    } else {
      // Simulate form submission
      toast({
        title: "Expense submitted",
        description: "Your expense has been submitted for approval.",
      });
      
      navigate('/expenses');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Expense Category</Label>
            <Select value={categoryId} onValueChange={handleCategoryChange}>
              <SelectTrigger className="subtle-input">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Categories</SelectLabel>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId}</p>}
          </div>
          
          {selectedCategory && (
            <div className="rounded-lg bg-secondary/50 p-4 border">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-medium">{selectedCategory.name} - Reimbursement Conditions</h4>
                  <p className="text-xs text-muted-foreground">
                    {selectedCategory.reimbursementConditions}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</div>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="subtle-input pl-8"
                placeholder="0.00"
              />
            </div>
            {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors({ ...errors, description: '' });
              }}
              className="subtle-input min-h-[120px]"
              placeholder="Describe what this expense is for..."
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center">
              <Receipt className="h-4 w-4 mr-2" />
              Receipt / Invoice
            </Label>
            <FileUpload
              onFileChange={handleReceiptChange}
              accept="image/*,.pdf"
              existingUrl={expense?.receiptUrl}
              className="min-h-[240px] flex items-center justify-center"
            />
            {errors.receipt && <p className="text-sm text-destructive">{errors.receipt}</p>}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t">
        <Button type="button" variant="outline" onClick={() => navigate('/expenses')}>
          Cancel
        </Button>
        
        <div className="space-x-2">
          <Button type="submit" variant="outline">
            Save as Draft
          </Button>
          <Button type="button" onClick={handleSaveAndSubmit}>
            <PlusCircle className="h-4 w-4 mr-2" />
            {expense?.status === 'draft' ? 'Submit for Approval' : 'Save & Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
