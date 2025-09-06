import { ArrowUpRight, Users, Eye, MousePointerClick } from 'lucide-react';
import Header from '@/components/layout/Header';
import StatCard from '@/components/analytics/StatCard';
import TrafficChart from '@/components/analytics/TrafficChart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="font-headline text-2xl font-semibold">Analytics</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <StatCard
            title="Total Visitors"
            value="12,345"
            change="+20.1% from last month"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Page Views"
            value="45,678"
            change="+18.3% from last month"
            icon={<Eye className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Click-through Rate"
            value="2.5%"
            change="+1.2% from last month"
            icon={<MousePointerClick className="h-4 w-4 text-muted-foreground" />}
          />
          <StatCard
            title="Bounce Rate"
            value="42.1%"
            change="-5.2% from last month"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            isNegativeChangeGood={true}
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline">Website Traffic</CardTitle>
              <CardDescription>
                Showing traffic for the last 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrafficChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='font-headline'>Top Referrers</CardTitle>
              <CardDescription>
                The top sources driving traffic to your sites.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Visitors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">google.com</div>
                    </TableCell>
                    <TableCell className="text-right">3,201</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">twitter.com</div>
                    </TableCell>
                    <TableCell className="text-right">1,542</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">github.com</div>
                    </TableCell>
                    <TableCell className="text-right">987</TableCell>
                  </TableRow>
                   <TableRow>
                    <TableCell>
                      <div className="font-medium">producthunt.com</div>
                    </TableCell>
                    <TableCell className="text-right">765</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Direct</div>
                    </TableCell>
                    <TableCell className="text-right">543</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
