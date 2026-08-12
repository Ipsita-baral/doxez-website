'use client';

import React from 'react';
import NextLink from 'next/link';
import { useRouter as useNextRouter, usePathname as useNextPathname, useParams as useNextParams } from 'next/navigation';

export function Link({ to, href, children, ...props }) {
  const target = to || href || '#';
  return (
    <NextLink href={target} {...props}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, href, className, children, ...props }) {
  const pathname = useNextPathname();
  const target = to || href || '#';
  const isActive = pathname === target;
  const computedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <NextLink href={target} className={computedClassName} {...props}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useNextRouter();
  return React.useCallback((to, options) => {
    if (typeof to === 'number') {
      if (to === -1) router.back();
      return;
    }
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [router]);
}

export function useLocation() {
  const pathname = useNextPathname();
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearch(window.location.search);
    }
  }, [pathname]);

  return { pathname, search };
}

export function useParams() {
  return useNextParams() || {};
}
