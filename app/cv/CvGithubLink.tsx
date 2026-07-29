import type { AnchorHTMLAttributes } from "react";

type CvGithubLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function CvGithubLink({
  children,
  href,
  ...props
}: CvGithubLinkProps) {
  return (
    <a {...props} href={href}>
      {children}
    </a>
  );
}
