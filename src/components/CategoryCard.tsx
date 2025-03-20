
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';
import StatusBadge from './StatusBadge';
import { useUser } from '@/context/UserContext';
import { Info, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const isHR = currentUser?.role === 'hr';
  const [showDetails, setShowDetails] = React.useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/categories/edit/${category.id}`);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <Card 
      className="neo-card overflow-hidden hover-scale cursor-pointer h-full flex flex-col"
      onClick={onClick || (() => setShowDetails(true))}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl line-clamp-1">{category.name}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {category.shortDescription}
            </CardDescription>
          </div>
          <StatusBadge status={category.status} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-sm line-clamp-3">
          {category.reimbursementConditions}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 bg-secondary/30 flex justify-between">
        <div className="text-xs text-muted-foreground">
          Created {formatDate(category.createdAt)}
        </div>
        {isHR && (
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
      </CardFooter>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {category.name}
              <StatusBadge status={category.status} className="ml-2" />
            </DialogTitle>
            <DialogDescription>
              {category.shortDescription}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                Full Description
              </h4>
              <p className="text-sm text-muted-foreground">
                {category.fullDescription}
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                Reimbursement Conditions
              </h4>
              <div className="text-sm bg-secondary p-3 rounded-md">
                {category.reimbursementConditions}
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground pt-2 flex justify-between">
              <span>Created on {formatDate(category.createdAt)}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CategoryCard;
