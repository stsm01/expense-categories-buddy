
import { User, Category, Expense, ExpenseStatus, Comment } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'usr_001',
    name: 'Alex Morgan',
    email: 'alex@company.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    department: 'Marketing'
  },
  {
    id: 'usr_002',
    name: 'Jamie Chen',
    email: 'jamie@company.com',
    role: 'hr',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    department: 'Human Resources'
  },
  {
    id: 'usr_003',
    name: 'Taylor Smith',
    email: 'taylor@company.com',
    role: 'accountant',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    department: 'Finance'
  },
  {
    id: 'usr_004',
    name: 'Sam Johnson',
    email: 'sam@company.com',
    role: 'employee',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    department: 'Engineering'
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'cat_001',
    name: 'Work Equipment',
    shortDescription: 'Devices and tools for remote work',
    fullDescription: 'This category covers purchases of necessary equipment for effective remote work including monitors, keyboards, mice, headsets, and ergonomic furniture.',
    reimbursementConditions: 'Equipment must be necessary for work duties. Maximum reimbursement of $500 per calendar year. Original receipt required.',
    createdAt: new Date('2023-01-15'),
    createdBy: 'usr_002',
    status: 'active'
  },
  {
    id: 'cat_002',
    name: 'Professional Development',
    shortDescription: 'Courses, books, and learning materials',
    fullDescription: 'Expenses related to improving professional skills including online courses, books, conference tickets, workshops, and certifications related to your current role or career growth.',
    reimbursementConditions: 'Materials must be relevant to current role or approved career path. Pre-approval required for expenses over $200. Proof of completion for courses.',
    createdAt: new Date('2023-02-20'),
    createdBy: 'usr_002',
    status: 'active'
  },
  {
    id: 'cat_003',
    name: 'Travel & Transportation',
    shortDescription: 'Business trips and commuting expenses',
    fullDescription: 'Covers necessary travel expenses including flights, accommodation, ground transportation, and meals during business trips. Also includes commuting expenses for required office visits.',
    reimbursementConditions: 'Pre-approval required for all trips. Economy class for flights under 5 hours. Per diem rates apply for meals. Itemized receipts required.',
    createdAt: new Date('2023-03-10'),
    createdBy: 'usr_002',
    status: 'active'
  },
  {
    id: 'cat_004',
    name: 'Software Subscriptions',
    shortDescription: 'Work-related digital tools and services',
    fullDescription: 'Covers subscriptions to necessary software tools, digital services, and premium plans for services used for work purposes that are not provided by the company.',
    reimbursementConditions: 'Must be directly related to job duties. Annual subscriptions preferred over monthly when possible. Maximum of 5 subscriptions per employee.',
    createdAt: new Date('2023-04-05'),
    createdBy: 'usr_002',
    status: 'active'
  }
];

// Mock Comments
const mockComments: Record<string, Comment[]> = {
  'exp_002': [
    {
      id: 'cmt_001',
      userId: 'usr_001',
      userName: 'Alex Morgan',
      userRole: 'employee',
      message: "I've attached the receipt from the online course. Please let me know if you need any additional information.",
      timestamp: new Date('2023-05-18T14:30:00')
    },
    {
      id: 'cmt_002',
      userId: 'usr_002',
      userName: 'Jamie Chen',
      userRole: 'hr',
      message: "Could you provide the certificate of completion as well? It's required for our records.",
      timestamp: new Date('2023-05-19T09:15:00')
    },
    {
      id: 'cmt_003',
      userId: 'usr_001',
      userName: 'Alex Morgan',
      userRole: 'employee',
      message: "Certainly! I've just uploaded the completion certificate to the expense report.",
      timestamp: new Date('2023-05-19T11:45:00')
    }
  ],
  'exp_003': [
    {
      id: 'cmt_004',
      userId: 'usr_004',
      userName: 'Sam Johnson',
      userRole: 'employee',
      message: "This monitor was necessary as my previous one stopped working.",
      timestamp: new Date('2023-06-10T15:20:00')
    },
    {
      id: 'cmt_005',
      userId: 'usr_002',
      userName: 'Jamie Chen',
      userRole: 'hr',
      message: "Thanks for the information. Was your previous monitor company-issued or personal?",
      timestamp: new Date('2023-06-11T10:05:00')
    }
  ]
};

// Mock Expenses
export const mockExpenses: Expense[] = [
  {
    id: 'exp_001',
    employeeId: 'usr_001',
    categoryId: 'cat_001',
    amount: 249.99,
    description: 'Ergonomic office chair for home office',
    receiptUrl: '/placeholder.svg',
    status: 'approved',
    submittedDate: new Date('2023-05-15'),
    reviewedDate: new Date('2023-05-17'),
    reviewedBy: 'usr_002',
    paidDate: new Date('2023-05-30'),
    comments: [],
    categoryName: 'Work Equipment',
    employeeName: 'Alex Morgan'
  },
  {
    id: 'exp_002',
    employeeId: 'usr_001',
    categoryId: 'cat_002',
    amount: 199.00,
    description: 'Online course: Advanced UX Design Principles',
    receiptUrl: '/placeholder.svg',
    status: 'needs_revision',
    submittedDate: new Date('2023-05-18'),
    reviewedDate: new Date('2023-05-19'),
    reviewedBy: 'usr_002',
    comments: mockComments['exp_002'],
    categoryName: 'Professional Development',
    employeeName: 'Alex Morgan'
  },
  {
    id: 'exp_003',
    employeeId: 'usr_004',
    categoryId: 'cat_001',
    amount: 349.99,
    description: '27-inch 4K monitor for remote development work',
    receiptUrl: '/placeholder.svg',
    status: 'under_review',
    submittedDate: new Date('2023-06-10'),
    comments: mockComments['exp_003'],
    categoryName: 'Work Equipment',
    employeeName: 'Sam Johnson'
  },
  {
    id: 'exp_004',
    employeeId: 'usr_004',
    categoryId: 'cat_004',
    amount: 15.99,
    description: 'Monthly subscription to productivity tool',
    receiptUrl: '/placeholder.svg',
    status: 'submitted',
    submittedDate: new Date('2023-06-15'),
    comments: [],
    categoryName: 'Software Subscriptions',
    employeeName: 'Sam Johnson'
  },
  {
    id: 'exp_005',
    employeeId: 'usr_001',
    categoryId: 'cat_003',
    amount: 875.42,
    description: 'Flight and hotel for industry conference',
    receiptUrl: '/placeholder.svg',
    status: 'paid',
    submittedDate: new Date('2023-04-01'),
    reviewedDate: new Date('2023-04-03'),
    reviewedBy: 'usr_002',
    paidDate: new Date('2023-04-15'),
    comments: [],
    categoryName: 'Travel & Transportation',
    employeeName: 'Alex Morgan'
  },
  {
    id: 'exp_006',
    employeeId: 'usr_001',
    categoryId: 'cat_002',
    amount: 49.99,
    description: 'Book: Design Systems Handbook',
    status: 'draft',
    comments: [],
    categoryName: 'Professional Development',
    employeeName: 'Alex Morgan'
  }
];

// Helper function to get filtered expenses
export const getExpensesByStatus = (status: ExpenseStatus | 'all'): Expense[] => {
  if (status === 'all') return mockExpenses;
  return mockExpenses.filter(expense => expense.status === status);
};

export const getExpensesByEmployee = (employeeId: string): Expense[] => {
  return mockExpenses.filter(expense => expense.employeeId === employeeId);
};

export const getExpense = (id: string): Expense | undefined => {
  return mockExpenses.find(expense => expense.id === id);
};

export const getCategory = (id: string): Category | undefined => {
  return mockCategories.find(category => category.id === id);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Default user for the app
export const currentUser = mockUsers[0]; // Default to first employee
