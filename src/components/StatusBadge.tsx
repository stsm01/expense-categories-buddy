
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ExpenseStatus, CategoryStatus } from '@/types';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  RefreshCcw, 
  FileCheck, 
  Ban, 
  DollarSign, 
  CreditCard
} from 'lucide-react';

interface StatusBadgeProps {
  status: ExpenseStatus | CategoryStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'draft':
        return {
          label: 'Draft',
          variant: 'outline' as const,
          icon: FileCheck,
          className: 'text-gray-500 border-gray-300 bg-gray-50'
        };
      case 'submitted':
        return {
          label: 'Submitted',
          variant: 'secondary' as const,
          icon: Clock,
          className: 'text-blue-600 border-blue-200 bg-blue-50'
        };
      case 'under_review':
        return {
          label: 'Under Review',
          variant: 'secondary' as const,
          icon: Clock,
          className: 'text-orange-600 border-orange-200 bg-orange-50'
        };
      case 'approved':
        return {
          label: 'Approved',
          variant: 'default' as const,
          icon: CheckCircle,
          className: 'text-green-600 border-green-200 bg-green-50'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          variant: 'destructive' as const,
          icon: Ban,
          className: 'text-red-600 border-red-200 bg-red-50'
        };
      case 'needs_revision':
        return {
          label: 'Needs Revision',
          variant: 'outline' as const,
          icon: RefreshCcw,
          className: 'text-amber-600 border-amber-200 bg-amber-50'
        };
      case 'processing_payment':
        return {
          label: 'Processing Payment',
          variant: 'outline' as const,
          icon: DollarSign,
          className: 'text-indigo-600 border-indigo-200 bg-indigo-50'
        };
      case 'paid':
        return {
          label: 'Paid',
          variant: 'default' as const,
          icon: CreditCard,
          className: 'text-emerald-600 border-emerald-200 bg-emerald-50'
        };
      case 'active':
        return {
          label: 'Active',
          variant: 'default' as const,
          icon: CheckCircle,
          className: 'text-green-600 border-green-200 bg-green-50'
        };
      case 'inactive':
        return {
          label: 'Inactive',
          variant: 'outline' as const,
          icon: Ban,
          className: 'text-gray-500 border-gray-300 bg-gray-50'
        };
      default:
        return {
          label: 'Unknown',
          variant: 'outline' as const,
          icon: AlertCircle,
          className: 'text-gray-500'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge 
      variant={config.variant} 
      className={`px-2 py-1 h-auto gap-1 font-medium ${config.className} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
