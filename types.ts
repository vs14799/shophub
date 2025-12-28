
export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  preferences?: string[];
}

export type AuthMode = 'login' | 'register';

export interface RoleConfig {
  title: string;
  description: string;
  colorClass: string;
  buttonClass: string;
  gradientClass: string;
  icon: string;
}
