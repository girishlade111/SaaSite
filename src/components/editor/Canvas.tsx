
'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import * as React from 'react';

type CanvasProps = {
  view: 'desktop' | 'mobile';
};

export default function Canvas({ view }: CanvasProps) {
  const [year, setYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={cn(
          'relative mx-auto flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-xl transition-all duration-300 ease-in-out',
          view === 'desktop' ? 'w-full' : 'w-[375px] max-h-[720px] border-8 border-black rounded-3xl'
        )}
      >
        <div
          className={cn(
            'absolute top-0 left-1/2 -translate-x-1/2 h-4 w-24 bg-black rounded-b-lg',
            view === 'desktop' && 'hidden'
          )}
        ></div>
        <div className="flex-1 overflow-y-auto">
          {/* Placeholder website content */}
          <header className="sticky top-0 z-10 flex items-center justify-between bg-card/80 p-4 backdrop-blur-sm border-b">
            <h1 className="text-lg font-bold font-headline">QuantumLeap</h1>
            <nav className="hidden md:flex gap-4 text-sm">
              <a href="#" className="hover:text-primary">Home</a>
              <a href="#" className="hover:text-primary">Features</a>
              <a href="#" className="hover:text-primary">Pricing</a>
            </nav>
            <button className="md:hidden">☰</button>
          </header>

          <main>
            <section className="text-center p-8 md:p-16 bg-muted/50">
              <h2 className="text-3xl md:text-5xl font-bold font-headline mb-4">
                Innovate. Elevate. Dominate.
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mb-6">
                QuantumLeap provides cutting-edge solutions to propel your business into the future.
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-semibold">
                Get Started
              </button>
            </section>

            <section className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="font-bold font-headline mb-2 text-lg">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">Leverage the power of artificial intelligence.</p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold font-headline mb-2 text-lg">Scalable</h3>
                  <p className="text-sm text-muted-foreground">Infrastructure that grows with your business.</p>
                </div>
                <div className="text-center">
                  <h3 className="font-bold font-headline mb-2 text-lg">Secure</h3>
                  <p className="text-sm text-muted-foreground">Your data is protected with enterprise-grade security.</p>
                </div>
              </div>
            </section>
             <section className="bg-muted/50 p-8 md:p-12">
                <h2 className="text-3xl font-bold font-headline text-center mb-8">
                    From Our Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Image src="https://picsum.photos/400/300?random=11" alt="gallery image" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="abstract technology" />
                    <Image src="https://picsum.photos/400/300?random=12" alt="gallery image" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="office workspace" />
                    <Image src="https://picsum.photos/400/300?random=13" alt="gallery image" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="business meeting" />
                    <Image src="https://picsum.photos/400/300?random=14" alt="gallery image" width={400} height={300} className="rounded-lg object-cover" data-ai-hint="city skyline" />
                </div>
             </section>
          </main>

          <footer className="p-4 border-t text-center text-xs text-muted-foreground">
            <p>&copy; {year} QuantumLeap. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
