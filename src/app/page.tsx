'use client';

import * as React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  PlusCircle,
  Search,
  ExternalLink,
  Bot,
  Loader2,
  BarChart,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { recommendTemplate, TemplateRecommendationOutput } from '@/ai/flows/template-recommendation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Header from '@/components/layout/Header';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const projects = [
  {
    name: 'QuantumLeap',
    domain: 'quantumleap.saasite.io',
    status: 'Published',
    updatedAt: '2 days ago',
  },
  {
    name: 'NovaCreative',
    domain: 'novacreative.saasite.io',
    status: 'Published',
    updatedAt: '5 days ago',
  },
  {
    name: 'ApexSolutions',
    domain: 'apexsolutions.saasite.io',
    status: 'Draft',
    updatedAt: '1 week ago',
  },
  {
    name: 'StellarEats',
    domain: 'stellareats.saasite.io',
    status: 'Published',
    updatedAt: '2 weeks ago',
  },
];

const staticTemplates = [
  {
    templateName: 'E-commerce Pro',
    templateDescription: 'A sleek and modern template for online stores.',
    templateImageUrl: 'https://picsum.photos/600/400?random=1',
    hint: 'online store'
  },
  {
    templateName: 'Portfolio Showcase',
    templateDescription: 'Highlight your work with this elegant portfolio template.',
    templateImageUrl: 'https://picsum.photos/600/400?random=2',
    hint: 'personal portfolio'
  },
];

const formSchema = z.object({
  industry: z.string().min(3, {
    message: 'Please describe your industry in at least 3 characters.',
  }),
});

export default function DashboardPage() {
  const { toast } = useToast();
  const [recommendedTemplate, setRecommendedTemplate] = React.useState<TemplateRecommendationOutput | null>(null);
  const [isRecommending, setIsRecommending] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsRecommending(true);
    setRecommendedTemplate(null);
    try {
      const result = await recommendTemplate({ industry: values.industry });
      setRecommendedTemplate(result);
    } catch (error) {
      console.error('Error recommending template:', error);
      toast({
        variant: "destructive",
        title: "AI Recommendation Failed",
        description: "Could not generate a template recommendation. Please try again.",
      });
    } finally {
      setIsRecommending(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Start with a template</CardTitle>
              <CardDescription>
                Describe your business or idea, and let our AI recommend the perfect starting point.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="e.g., 'Coffee Shop', 'Photographer Portfolio', 'SaaS startup'" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isRecommending}>
                    {isRecommending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                    <span className="ml-2 hidden sm:inline">Recommend</span>
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {isRecommending && (
                   <Card className="w-full animate-pulse">
                     <div className="w-full h-40 bg-muted rounded-t-lg"></div>
                     <CardHeader>
                       <div className="h-6 w-3/4 bg-muted rounded"></div>
                       <div className="h-4 w-full bg-muted rounded mt-2"></div>
                       <div className="h-4 w-1/2 bg-muted rounded mt-1"></div>
                     </CardHeader>
                     <CardFooter>
                       <div className="h-10 w-28 bg-muted rounded-md"></div>
                     </CardFooter>
                   </Card>
                )}
                {recommendedTemplate && (
                  <TemplateCard template={recommendedTemplate} hint={form.getValues('industry')} />
                )}
                {staticTemplates.map((template, index) => (
                  <TemplateCard key={index} template={template} hint={template.hint} />
                ))}
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="grid gap-2">
                <CardTitle className="font-headline text-2xl">Your Projects</CardTitle>
                <CardDescription>
                  Manage your existing websites or start a new one from scratch.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="gap-1">
                <Link href="/editor/new">
                  <PlusCircle className="h-4 w-4" />
                  New Site
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Last Updated</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.name}>
                      <TableCell>
                        <div className="font-medium">{project.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {project.domain}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={project.status === 'Published' ? 'default' : 'secondary'} className={project.status === 'Published' ? 'bg-green-600' : ''}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{project.updatedAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/editor/${project.name.toLowerCase()}`}>Edit</Link>
                          </Button>
                          <Button asChild variant="ghost" size="icon">
                             <a href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}


function TemplateCard({ template, hint }: { template: TemplateRecommendationOutput, hint?: string }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Image
          alt={template.templateName}
          className="aspect-video w-full object-cover"
          height={300}
          src={template.templateImageUrl}
          width={600}
          data-ai-hint={hint}
        />
      </CardContent>
      <CardHeader>
        <CardTitle className="font-headline">{template.templateName}</CardTitle>
        <CardDescription>{template.templateDescription}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href={`/editor/${template.templateName.replace(/\s+/g, '-').toLowerCase()}`}>Customize</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
