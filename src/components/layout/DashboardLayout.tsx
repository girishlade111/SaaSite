'use client'
import Link from 'next/link';
import Logo from '../icons/Logo';
import Header from './Header';
import MainNav from './MainNav';
import { Instagram, Linkedin, Github, Codepen, Mail } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-card md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-16 items-center border-b px-4 lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Logo className="h-8 w-auto" />
                  <span className="sr-only">SaaSite</span>
                </Link>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <MainNav />
                </nav>
              </div>
              <div className="mt-auto p-4">
                <Separator className="my-4" />
                <div className="flex items-center justify-center space-x-4">
                    <a href="https://www.instagram.com/girish_lade_/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                    </a>
                    <a href="https://www.linkedin.com/in/girish-lade-075bba201/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="https://github.com/girishlade111" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://codepen.io/Girish-Lade-the-looper" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Codepen className="h-5 w-5" />
                        <span className="sr-only">Codepen</span>
                    </a>
                     <a href="mailto:girishlade111@gmail.com" className="text-muted-foreground hover:text-primary">
                        <Mail className="h-5 w-5" />
                        <span className="sr-only">Email</span>
                    </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      );
}
