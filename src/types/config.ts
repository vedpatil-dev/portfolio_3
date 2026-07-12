export interface Chapter {
  id: string;
  number: number;
  romanNumber: string;
  title: string;
  route: string;
  transition: string;
}

export interface MapLocation {
  id: string;
  name: string;
  section: string;
  route: string;
  x: number;
  y: number;
}

export interface SiteConfig {
  url: string;
  themeColor: string;
  analyticsId: string;
}

export interface SeoConfig {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  openGraph: {
    type: string;
    locale: string;
    siteName: string;
  };
}
