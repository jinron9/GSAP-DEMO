'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap-trial/dist/gsap';
import { ScrollTrigger } from 'gsap-trial/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap-trial/dist/ScrollSmoother';
import { Inter } from 'next/font/google';

import Header from '../components/Header';
import useIsomorphicLayoutEffect from '../helpers/isomorphicEffect';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const smoother = useRef();
  const ctx = useRef();
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ctx.current = gsap.context(() => {
      smoother.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
      });
    });

    return () => ctx.current.revert();
  }, [pathname]);

  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        <Header />
        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
