export interface CompanyLogo {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly className: string;
  readonly sizes?: string;
}

export const companyLogos: CompanyLogo[] = [
  {
    id: 'pacific',
    src: "/images/external/6670ec397a1011258afcd015_pacific.png",
    alt: 'Pacific Portfolios',
    className: "h-8 max-w-full"
  },
  {
    id: 'wellington-altus',
    src: "/images/external/68557fdc0f44e1d557a7a557_wellington%20altus%20logo.png",
    alt: 'Wellington Altus',
    className: "h-8 max-w-full"
  },
  {
    id: 'raymond-james',
    src: "/images/external/689ca20e87c6eb62afb3f61d_raymond-james-logo%20(1).png",
    alt: 'Raymond James',
    className: "h-8 max-w-full"
  },
  {
    id: 'company-4',
    src: "/images/external/689ca1b08a901203ca80fbe9_cajvltlljwea7r26rgm7.png",
    alt: 'Company logo',
    className: "h-8 max-w-full"
  },
  {
    id: 'company-5',
    src: "/images/external/689f31db5221da1e6a8fb977_image%20-%20edited.png",
    alt: 'Company logo',
    className: "h-8 max-w-full"
  }
] as const;
