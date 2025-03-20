
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search } from 'lucide-react';
import { mockCategories } from '@/utils/mockData';
import CategoryCard from '@/components/CategoryCard';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const Categories = () => {
  const { currentUser } = useUser();
  const isHR = currentUser?.role === 'hr';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    shortDescription: '',
    fullDescription: '',
    reimbursementConditions: ''
  });
  
  // Filter categories based on search term
  const filteredCategories = mockCategories.filter(category => {
    const searchLower = searchTerm.toLowerCase();
    return (
      category.name.toLowerCase().includes(searchLower) ||
      category.shortDescription.toLowerCase().includes(searchLower) ||
      category.fullDescription.toLowerCase().includes(searchLower) ||
      category.reimbursementConditions.toLowerCase().includes(searchLower)
    );
  });
  
  // Active and inactive categories
  const activeCategories = filteredCategories.filter(category => category.status === 'active');
  const inactiveCategories = filteredCategories.filter(category => category.status === 'inactive');
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof newCategory
  ) => {
    setNewCategory({
      ...newCategory,
      [field]: e.target.value
    });
  };
  
  const handleCreateCategory = () => {
    // Simulate creating a new category
    toast({
      title: "Category created",
      description: `${newCategory.name} has been created successfully.`,
    });
    
    setShowNewCategoryDialog(false);
    setNewCategory({
      name: '',
      shortDescription: '',
      fullDescription: '',
      reimbursementConditions: ''
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8 mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reimbursement Categories</h1>
            <p className="text-muted-foreground mt-1">
              {isHR 
                ? 'Manage reimbursement categories for your organization' 
                : 'Browse available reimbursement categories'}
            </p>
          </div>
          
          {isHR && (
            <Button className="mt-4 md:mt-0" onClick={() => setShowNewCategoryDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Category
            </Button>
          )}
        </div>
        
        {/* Search and Filters */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-10 subtle-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Categories Tabs */}
        <Tabs defaultValue="active" className="mt-6">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Categories ({activeCategories.length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Categories ({inactiveCategories.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            {activeCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCategories.map(category => (
                  <CategoryCard 
                    key={category.id} 
                    category={category} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No matching categories</h3>
                <p className="text-muted-foreground mt-1 mb-6">
                  {searchTerm 
                    ? `No categories match your search for "${searchTerm}"`
                    : "There are no active categories available"}
                </p>
                {isHR && (
                  <Button onClick={() => setShowNewCategoryDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Category
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            {inactiveCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inactiveCategories.map(category => (
                  <CategoryCard 
                    key={category.id} 
                    category={category} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No inactive categories</h3>
                <p className="text-muted-foreground mt-1">
                  {searchTerm 
                    ? `No inactive categories match your search for "${searchTerm}"`
                    : "There are no inactive categories"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      {/* New Category Dialog */}
      <Dialog open={showNewCategoryDialog} onOpenChange={setShowNewCategoryDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new reimbursement category for your organization.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={e => handleInputChange(e, 'name')}
                className="subtle-input"
                placeholder="e.g., Work Equipment"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={newCategory.shortDescription}
                onChange={e => handleInputChange(e, 'shortDescription')}
                className="subtle-input"
                placeholder="e.g., Equipment needed for remote work"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea
                id="fullDescription"
                value={newCategory.fullDescription}
                onChange={e => handleInputChange(e, 'fullDescription')}
                className="subtle-input min-h-[100px]"
                placeholder="Provide a detailed description of this category..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reimbursementConditions">Reimbursement Conditions</Label>
              <Textarea
                id="reimbursementConditions"
                value={newCategory.reimbursementConditions}
                onChange={e => handleInputChange(e, 'reimbursementConditions')}
                className="subtle-input min-h-[120px]"
                placeholder="List the conditions under which expenses in this category will be reimbursed..."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCategoryDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCategory}>Create Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
