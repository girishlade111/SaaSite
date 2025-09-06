'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BarChart, Settings, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Route } from 'next';

type NavLink = {
    href: Route;
    label: string;
    icon: React.ElementType;
    active?: boolean;
}

export default function MainNav({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/analytics', label: 'Analytics', icon: BarChart },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
            <Link
                key={link.href}
                href={link.href}
                className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    isActive && 'bg-muted text-primary',
                    isMobile && 'gap-4 text-lg'
                )}
            >
                <link.icon className="h-4 w-4" />
                {link.label}
            </Link>
        )
      })}
    </>
  );
}