'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  PlusCircle,
  Search,
  ExternalLink,
  Bot,
  Loader2,
  MoreHorizontal,
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
import { recommendTemplate, TemplateRecommendationOutput } from '@/ai/flows/template-recommendation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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

const createSiteSchema = z.object({
  siteName: z.string().min(3, {
    message: 'Site name must be at least 3 characters.',
  }).max(50, {
    message: 'Site name cannot be longer than 50 characters.'
  }).regex(/^[a-zA-Z0-9\s-]+$/, {
    message: 'Site name can only contain letters, numbers, spaces, and hyphens.'
  }),
});

export default function DashboardPage() {
  const { toast } = useToast();
  const [recommendedTemplate, setRecommendedTemplate] = React.useState<TemplateRecommendationOutput | null>(null);
  const [isRecommending, setIsRecommending] = React.useState(false);
  const [isCreateSiteOpen, setCreateSiteOpen] = React.useState(false);

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
    <DashboardLayout>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <CreateSiteDialog open={isCreateSiteOpen} onOpenChange={setCreateSiteOpen}>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Site
              </Button>
            </CreateSiteDialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Start with a template</CardTitle>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>
              Manage your existing websites.
            </CardDescription>
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
                      <div className="text-sm text-muted-foreground">
                        {project.domain}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.status === 'Published' ? 'default' : 'secondary'} className={project.status === 'Published' ? 'bg-green-600' : ''}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{project.updatedAt}</TableCell>
                    <TableCell className='text-right'>
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/editor/${project.name.toLowerCase()}`}>Edit Site</Link>
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                                <a href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer">
                                    View Site <ExternalLink className="h-4 w-4 ml-2" />
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
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
        <CardTitle className="font-headline text-base">{template.templateName}</CardTitle>
        <CardDescription className='text-xs line-clamp-2'>{template.templateDescription}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild size="sm">
          <Link href={`/editor/${template.templateName.replace(/\s+/g, '-').toLowerCase()}`}>Customize</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function CreateSiteDialog({ children, open, onOpenChange }: { children: React.ReactNode, open: boolean, onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof createSiteSchema>>({
    resolver: zodResolver(createSiteSchema),
    defaultValues: {
      siteName: '',
    },
  });

  function onSubmit(values: z.infer<typeof createSiteSchema>) {
    const siteId = values.siteName.replace(/\s+/g, '-').toLowerCase();
    router.push(`/editor/${siteId}`);
    onOpenChange(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Site</DialogTitle>
          <DialogDescription>
            Give your new website a name to get started. You can change this later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="siteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit">Create Site</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
