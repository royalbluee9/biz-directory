export interface CountryCode {
  code: string;
  name: string;
  dial_code: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
  { code: 'US', name: 'United States', dial_code: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial_code: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dial_code: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dial_code: '+61', flag: '🇦🇺' },
  { code: 'IN', name: 'India', dial_code: '+91', flag: '🇮🇳' },
  { code: 'CN', name: 'China', dial_code: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', dial_code: '+81', flag: '🇯🇵' },
  { code: 'DE', name: 'Germany', dial_code: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dial_code: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dial_code: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dial_code: '+34', flag: '🇪🇸' },
  { code: 'BR', name: 'Brazil', dial_code: '+55', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', dial_code: '+52', flag: '🇲🇽' },
  { code: 'RU', name: 'Russia', dial_code: '+7', flag: '🇷🇺' },
  { code: 'ZA', name: 'South Africa', dial_code: '+27', flag: '🇿🇦' },
  { code: 'KR', name: 'South Korea', dial_code: '+82', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', dial_code: '+65', flag: '🇸🇬' },
  { code: 'AE', name: 'United Arab Emirates', dial_code: '+971', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', dial_code: '+966', flag: '🇸🇦' },
  { code: 'PK', name: 'Pakistan', dial_code: '+92', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', dial_code: '+880', flag: '🇧🇩' },
  { code: 'ID', name: 'Indonesia', dial_code: '+62', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', dial_code: '+63', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', dial_code: '+84', flag: '🇻🇳' },
  { code: 'TH', name: 'Thailand', dial_code: '+66', flag: '🇹🇭' },
  { code: 'MY', name: 'Malaysia', dial_code: '+60', flag: '🇲🇾' },
  { code: 'NZ', name: 'New Zealand', dial_code: '+64', flag: '🇳🇿' },
  { code: 'NG', name: 'Nigeria', dial_code: '+234', flag: '🇳🇬' },
  { code: 'KE', name: 'Kenya', dial_code: '+254', flag: '🇰🇪' },
  { code: 'EG', name: 'Egypt', dial_code: '+20', flag: '🇪🇬' },
];
