"use client"

import { Badge } from "@/components/ui/badge";
import { Payment } from "@/data/payments.data"
import { ColumnDef } from "@tanstack/react-table"

// Define the possible status values
type Status = 'pending' | 'processing' | 'success' | 'failed' | 'default';

// Map status to variant
const statusVariantMap: Record<Status, 'default' | 'secondary' | 'destructive'> = {
  pending: 'secondary',
  processing: 'secondary',
  success: 'default',
  failed: 'destructive',
  default: 'default',
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "clientName",
    header: "Client Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = statusVariantMap[status as Status] ?? 'default';

      return (
        <Badge variant={ variant }> { status }</Badge>
      )
    }
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]
