
import React from 'react';
import { Role, RoleConfig } from './types';

export const ROLE_CONFIGS: Record<Role, RoleConfig> = {
  [Role.CUSTOMER]: {
    title: 'Customer',
    description: 'Explore the marketplace and discover unique products tailored for you.',
    colorClass: 'text-indigo-400',
    buttonClass: 'bg-indigo-600 hover:bg-indigo-700',
    gradientClass: 'from-indigo-600 to-violet-600',
    icon: 'shopping-bag'
  },
  [Role.ADMIN]: {
    title: 'Administrator',
    description: 'Maintain ecosystem health, manage users, and secure the infrastructure.',
    colorClass: 'text-slate-400',
    buttonClass: 'bg-slate-700 hover:bg-slate-800',
    gradientClass: 'from-slate-700 to-zinc-900',
    icon: 'shield-check'
  }
};
