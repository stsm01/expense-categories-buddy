
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Expense } from '@/types';
import StatusBadge from './StatusBadge';
import UserAvatar from './UserAvatar';
import { CalendarIcon, Receipt } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getUserById } from '@/utils/mockData';
import { useUser } from '@/context/UserContext';
import ChatInterface from './ChatInterface';

interface ExpenseCardProps {
  expense: Expense;
  onClick?: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onClick }) => {
  const { currentUser } = useUser();
  const [showDetails, setShowDetails] = React.useState(false);
  const [showChat, setShowChat] = React.useState(false);
  
  const canApprove = currentUser?.role === 'hr' && 
    (expense.status === 'submitted' || expense.status === 'under_review');
  
  const canReject = currentUser?.role === 'hr' && 
    (expense.status === 'submitted' || expense.status === 'under_review');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  const employeeUser = expense.employeeId ? getUserById(expense.employeeId) : undefined;
  
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowDetails(true);
    }
  };
  
  return (
    <Card 
      className="neo-card overflow-hidden hover-scale cursor-pointer h-full flex flex-col"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-1">
            {expense.categoryName || 'Expense'}
          </CardTitle>
          <StatusBadge status={expense.status} />
        </div>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-2xl font-bold">{formatCurrency(expense.amount)}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{expense.description}</p>
          </div>
          {expense.receiptUrl && (
            <div className="bg-muted rounded-md p-1 text-muted-foreground">
              <Receipt className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 px-4 bg-secondary/30">
        <div className="flex items-center justify-between w-full">
          {employeeUser && (
            <div className="flex items-center">
              <UserAvatar 
                name={employeeUser.name} 
                role={employeeUser.role}
                imageUrl={employeeUser.avatar}
                size="sm"
              />
              <span className="text-xs ml-2 text-muted-foreground line-clamp-1">
                {employeeUser.name}
              </span>
            </div>
          )}
          {expense.submittedDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {formatDate(expense.submittedDate)}
            </div>
          )}
        </div>
      </CardFooter>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {expense.categoryName}
              <StatusBadge status={expense.status} className="ml-2" />
            </DialogTitle>
            <DialogDescription>
              Expense #{expense.id.split('_')[1]}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="text-2xl font-bold">{formatCurrency(expense.amount)}</p>
              </div>
              
              {employeeUser && (
                <div className="flex flex-col items-end">
                  <p className="text-sm text-muted-foreground">Submitted by</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm mr-2">{employeeUser.name}</span>
                    <UserAvatar 
                      name={employeeUser.name} 
                      role={employeeUser.role}
                      imageUrl={employeeUser.avatar}
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{expense.description}</p>
            </div>
            
            {expense.receiptUrl && (
              <div>
                <h4 className="text-sm font-medium mb-2">Receipt</h4>
                <div className="bg-secondary rounded-md p-4 flex items-center justify-center">
                  <img 
                    src={expense.receiptUrl}
                    alt="Receipt" 
                    className="max-h-[200px] object-contain"
                  />
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Submitted</p>
                <p>{formatDate(expense.submittedDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Reviewed</p>
                <p>{formatDate(expense.reviewedDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Paid</p>
                <p>{formatDate(expense.paidDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowChat(true);
                  setShowDetails(false);
                }}
              >
                View conversation
              </Button>
              
              <div className="space-x-2">
                {canReject && (
                  <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                    Request revision
                  </Button>
                )}
                {canApprove && (
                  <Button variant="default">
                    Approve
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="sm:max-w-[600px] h-[70vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Expense Conversation</DialogTitle>
            <DialogDescription>
              Discuss this expense with the team.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-grow overflow-hidden">
            <ChatInterface expenseId={expense.id} comments={expense.comments || []} />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ExpenseCard;
