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
    src: "https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/6670ec397a1011258afcd015_pacific.png",
    alt: 'Pacific Portfolios',
    className: "h-8 max-w-full"
  },
  {
    id: 'wellington-altus',
    src: "https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/68557fdc0f44e1d557a7a557_Wellington%20Altus%20logo.png",
    alt: 'Wellington Altus',
    className: "h-8 max-w-full"
  },
  {
    id: 'raymond-james',
    src: "https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/689ca20e87c6eb62afb3f61d_raymond-james-logo%20(1).png",
    alt: 'Raymond James',
    className: "h-8 max-w-full"
  },
  {
    id: 'company-4',
    src: "https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/689ca1b08a901203ca80fbe9_cajvltlljwea7r26rgm7.png",
    alt: 'Company logo',
    className: "h-8 max-w-full"
  },
  {
    id: 'company-5',
    src: "https://cdn.prod.website-files.com/666872ff37bdf42ce9637d05/689f31db5221da1e6a8fb977_image%20-%20Edited.png",
    alt: 'Company logo',
    className: "h-8 max-w-full"
  }
] as const;
