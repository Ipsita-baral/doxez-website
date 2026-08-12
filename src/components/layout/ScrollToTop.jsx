'use client';

import { useEffect } from "react";
import { useLocation } from "@/lib/router-compat";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;