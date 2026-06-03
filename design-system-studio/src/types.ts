export interface Theme {
  id: string;
  name: string;
  description: string;
  fontSans: string;
  fontMono: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  containerBg: string;
  borderColor: string;
  radius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  heroImageUrl: string;
}

export interface PromptConfig {
  appName: string;
  appType: string;
  vibe: string;
  brandColors: string;
  borderRadius: string;
  extraRequirements: string;
}
