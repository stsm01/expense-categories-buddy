
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserRole } from '@/types';

interface UserAvatarProps {
  name: string;
  role?: UserRole;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  name, 
  role, 
  imageUrl, 
  size = 'md',
  className = '',
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const sizeClass = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }[size];

  const roleColor = {
    employee: 'bg-blue-100 text-blue-800',
    hr: 'bg-purple-100 text-purple-800',
    accountant: 'bg-green-100 text-green-800',
  }[role || 'employee'];

  return (
    <Avatar className={`${sizeClass} ${className} ring-2 ring-background shadow-sm transition-all duration-300`}>
      <AvatarImage
        src={imageUrl}
        alt={name}
        className="object-cover"
      />
      <AvatarFallback className={roleColor}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
