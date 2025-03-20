
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import {
  Home,
  Layers,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  UserCog,
  Users,
} from 'lucide-react';
import UserAvatar from './UserAvatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

const Navigation: React.FC = () => {
  const { currentUser, switchRole } = useUser();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: Home,
      roles: ['employee', 'hr', 'accountant'],
    },
    {
      name: 'Categories',
      path: '/categories',
      icon: Layers,
      roles: ['employee', 'hr'],
    },
    {
      name: 'Expenses',
      path: '/expenses',
      icon: FileText,
      roles: ['employee', 'hr', 'accountant'],
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: BarChart3,
      roles: ['hr', 'accountant'],
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      roles: ['employee', 'hr', 'accountant'],
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => currentUser && item.roles.includes(currentUser.role)
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold tracking-tight">RefundMate</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 ml-6">
          {filteredNavItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? 'default' : 'ghost'}
                size="sm"
                className={`gap-2 text-sm ${
                  isActive(item.path) ? 'bg-primary' : ''
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Role Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="mr-2">
              <UserCog className="h-4 w-4 mr-2" />
              {currentUser?.role === 'employee' ? 'Employee' : 
               currentUser?.role === 'hr' ? 'HR Manager' : 'Accountant'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => switchRole('employee')}>
              <User className="h-4 w-4 mr-2" />
              <span>Employee</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole('hr')}>
              <UserCog className="h-4 w-4 mr-2" />
              <span>HR Manager</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => switchRole('accountant')}>
              <Users className="h-4 w-4 mr-2" />
              <span>Accountant</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <UserAvatar
                name={currentUser?.name || 'User'}
                imageUrl={currentUser?.avatar}
                role={currentUser?.role}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="font-medium">{currentUser?.name}</span>
              <span className="text-xs text-muted-foreground">
                {currentUser?.email}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 md:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-background/95 backdrop-blur-md animate-fade-in">
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-between py-4">
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold tracking-tight">RefundMate</h1>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4 mt-8">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 text-base ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary font-medium rounded-md'
                      : 'text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-8 pt-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center px-4 py-2">
                  <UserAvatar
                    name={currentUser?.name || 'User'}
                    imageUrl={currentUser?.avatar}
                    role={currentUser?.role}
                    size="lg"
                    className="mr-3"
                  />
                  <div>
                    <p className="font-medium">{currentUser?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="ml-4 mr-4" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
