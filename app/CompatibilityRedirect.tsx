"use client";

import { useEffect } from "react";

type CompatibilityRedirectProps = {
  href: string;
  label: string;
};

export default function CompatibilityRedirect({
  href,
  label,
}: CompatibilityRedirectProps) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main>
      <p>
        Esta página se ha movido. <a href={href}>{label}</a>.
      </p>
    </main>
  );
}
