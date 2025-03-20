
export type UserRole = 'employee' | 'hr' | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export type CategoryStatus = 'active' | 'inactive';

export interface Category {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  reimbursementConditions: string;
  createdAt: Date;
  createdBy: string;
  status: CategoryStatus;
}

export type ExpenseStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'approved' 
  | 'rejected' 
  | 'needs_revision' 
  | 'processing_payment' 
  | 'paid';

export interface Expense {
  id: string;
  employeeId: string;
  categoryId: string;
  amount: number;
  description: string;
  receiptUrl?: string;
  status: ExpenseStatus;
  submittedDate?: Date;
  reviewedDate?: Date;
  reviewedBy?: string;
  paidDate?: Date;
  comments?: Comment[];
  categoryName?: string;
  employeeName?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  message: string;
  timestamp: Date;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
  relatedItemId?: string;
  relatedItemType?: 'expense' | 'category';
}
