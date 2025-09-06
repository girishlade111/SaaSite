import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  isNegativeChangeGood?: boolean;
};

export default function StatCard({ title, value, change, icon, isNegativeChangeGood = false }: StatCardProps) {
  const isPositive = change.startsWith('+');
  const isNegative = change.startsWith('-');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={cn(
          "text-xs text-muted-foreground",
          isPositive && (isNegativeChangeGood ? "text-red-500" : "text-green-500"),
          isNegative && (isNegativeChangeGood ? "text-green-500" : "text-red-500"),
        )}>
          {change}
        </p>
      </CardContent>
    </Card>
  );
}
