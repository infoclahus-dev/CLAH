
export type Language = 'vn' | 'en';
export type ViewState = 'home' | 'about' | 'contact' | 'services' | 'careers' | 'resources' | 'locations';

export interface LocalizedContent {
  vn: string;
  en: string;
}

export interface ServiceEntity {
  id: string;
  name: string;
  description: LocalizedContent;
  longDescription: LocalizedContent;
  iconName: 'Hammer' | 'PenTool' | 'Armchair' | 'Coffee';
  imageUrl: string;
  ctaText: LocalizedContent;
  features: { vn: string[]; en: string[] };
  websiteUrl?: string;
  logoUrl?: string;
}

export interface SubServiceItem {
  name: LocalizedContent;
  description: LocalizedContent;
  link: string;
  iconName: string;
}

export interface CompanyServiceGroup {
  id: string;
  name: string;
  services: SubServiceItem[];
}

export interface ServiceItem {
  id: string;
  name: LocalizedContent;
  description: LocalizedContent;
  link: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface ResourceItem {
  id: string;
  title: LocalizedContent;
  category: 'News' | 'Case Study' | 'Press Release' | 'Blog';
  date: string;
  image: string;
  link: string;
}

export interface OfficeLocation {
  id: string;
  name: LocalizedContent;
  address: string;
  phone?: string;
  email?: string;
  image: string;
  mapUrl?: string;
}

export interface RegionGroup {
  region: LocalizedContent;
  offices: OfficeLocation[];
}