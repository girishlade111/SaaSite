'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Bot,
  Loader2,
  Heading1,
  GalleryVertical,
  RectangleHorizontal,
  FormInput,
  Type,
  Monitor,
  Smartphone,
  Undo,
  Redo,
  Save,
  Rocket,
  Settings,
  Palette,
  LayoutGrid,
  Package2,
} from 'lucide-react';
import Canvas from './Canvas';
import { generateContent } from '@/ai/flows/content-generation';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';

type ViewType = 'desktop' | 'mobile';

type Site = {
  id: string;
  name: string;
};

// AI Content Generation Modal
const contentGenSchema = z.object({
  topic: z.string().min(5, 'Please provide a more detailed topic.'),
});

function ContentGenerationModal({
  blockType,
  onClose,
}: {
  blockType: string | null;
  onClose: () => void;
}) {
  const [generatedContent, setGeneratedContent] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const form = useForm<z.infer<typeof contentGenSchema>>({
    resolver: zodResolver(contentGenSchema),
    defaultValues: { topic: '' },
  });

  async function onGenerate(values: z.infer<typeof contentGenSchema>) {
    setIsGenerating(true);
    try {
      const result = await generateContent({
        blockType: blockType || 'generic content',
        websiteTheme: values.topic,
      });
      setGeneratedContent(result.suggestedContent);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Content Generation Failed',
        description: 'The AI could not generate content. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Dialog open={!!blockType} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Generate Content for {blockType}</DialogTitle>
          <DialogDescription>
            Describe the theme or topic, and our AI will generate content for you.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onGenerate)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic / Theme</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Modern coffee shop in Seattle'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
              Generate
            </Button>
          </form>
        </Form>
        {generatedContent && (
          <div className="space-y-2 pt-4">
            <Label>Suggested Content:</Label>
            <Textarea readOnly value={generatedContent} className="h-32" />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button disabled={!generatedContent}>Use This Content</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Panels for the sidebar
const blocks = [
  { name: 'Header', icon: <RectangleHorizontal /> },
  { name: 'Hero Section', icon: <Heading1 /> },
  { name: 'Text Block', icon: <Type /> },
  { name: 'Image Gallery', icon: <GalleryVertical /> },
  { name: 'Contact Form', icon: <FormInput /> },
  { name: 'Footer', icon: <RectangleHorizontal /> },
];

function BlocksPanel({ onBlockSelect }: { onBlockSelect: (blockType: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {blocks.map((block) => (
        <Button
          key={block.name}
          variant="outline"
          className="h-24 flex-col gap-2"
          onClick={() => onBlockSelect(block.name)}
        >
          {React.cloneElement(block.icon, { className: 'h-6 w-6' })}
          <span className="text-xs">{block.name}</span>
        </Button>
      ))}
    </div>
  );
}

function StylePanel() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="font-medium">Color Palette</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Primary</Label>
            <Input type="color" defaultValue="#3F51B5" className="p-1 h-10" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Accent</Label>
            <Input type="color" defaultValue="#7E57C2" className="p-1 h-10" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="font-medium">Typography</Label>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Headlines</Label>
            <Select defaultValue="poppins">
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poppins">Poppins</SelectItem>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Body</Label>
            <Select defaultValue="pt-sans">
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-sans">PT Sans</SelectItem>
                <SelectItem value="lato">Lato</SelectItem>
                <SelectItem value="open-sans">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="font-medium">SEO Settings</Label>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Meta Title</Label>
            <Input placeholder="Your Website Title" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Meta Description</Label>
            <Textarea placeholder="A short description of your website." />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="font-medium">Custom Domain</Label>
        <div className="flex gap-2">
          <Input placeholder="your-domain.com" />
          <Button>Connect</Button>
        </div>
      </div>
    </div>
  );
}

// Main Editor Layout
export default function EditorLayout({ site }: { site: Site }) {
  const [view, setView] = React.useState<ViewType>('desktop');
  const [modalBlockType, setModalBlockType] = React.useState<string | null>(null);

  return (
    <SidebarProvider>
      <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="p-0 border-b">
              <div className="flex h-16 items-center justify-center">
                <Link href="/">
                    <Logo className="h-8 w-auto group-data-[collapsible=icon]:hidden" />
                    <Package2 className="h-6 w-6 hidden group-data-[collapsible=icon]:block" />
                </Link>
              </div>
          </SidebarHeader>
          <SidebarContent className="p-0">
            <Tabs defaultValue="blocks" className="flex flex-col h-full w-full">
              <div className="p-2">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="blocks" className="p-2"><LayoutGrid className="h-4 w-4"/></TabsTrigger>
                  <TabsTrigger value="styles" className="p-2"><Palette className="h-4 w-4"/></TabsTrigger>
                  <TabsTrigger value="settings" className="p-2"><Settings className="h-4 w-4"/></TabsTrigger>
                </TabsList>
              </div>
              <div className="flex-1 overflow-y-auto">
                <TabsContent value="blocks" className="m-0 p-2">
                    <BlocksPanel onBlockSelect={setModalBlockType} />
                </TabsContent>
                <TabsContent value="styles" className="m-0 p-4">
                    <StylePanel />
                </TabsContent>
                <TabsContent value="settings" className="m-0 p-4">
                    <SettingsPanel />
                </TabsContent>
              </div>
            </Tabs>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-col h-screen">
            {/* Top Bar */}
            <header className="flex h-16 items-center border-b bg-card px-4 shrink-0">
                <SidebarTrigger className="md:hidden" />
              <div className="flex-1">
                <h1 className="font-semibold text-lg font-headline pl-2">{site.name}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === 'desktop' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setView('desktop')}
                >
                  <Monitor className="h-5 w-5" />
                </Button>
                <Button
                  variant={view === 'mobile' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setView('mobile')}
                >
                  <Smartphone className="h-5 w-5" />
                </Button>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Button variant="ghost" size="icon"><Undo className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Redo className="h-5 w-5" /></Button>
                <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Save</Button>
                <Button><Rocket className="mr-2 h-4 w-4" /> Publish</Button>
              </div>
            </header>

            {/* Main Canvas */}
            <main className="flex-1 bg-muted/50 overflow-auto p-4 lg:p-8">
              <Canvas view={view} />
            </main>
          </div>
        </SidebarInset>

        <ContentGenerationModal
          blockType={modalBlockType}
          onClose={() => setModalBlockType(null)}
        />
      </div>
    </SidebarProvider>
  );
}
