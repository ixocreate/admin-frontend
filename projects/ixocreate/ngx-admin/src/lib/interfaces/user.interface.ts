export interface User {
  avatar?: string;
  createdAt: string;
  email: string;
  id: string;
  lastLoginAt: string;
  permissions: string[];
  role: string;
  status: string;
  userAttributes: any[];
  accountAttributes: any[];
  locale?: string;
  numberLocale?: string;
  dateLocale?: string;
  timezone?: string;
}
