import { LucideProps } from 'lucide-react';

export type MenuItem = {
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
};
