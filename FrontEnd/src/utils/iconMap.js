import {
  Home,
  Building2,
  Box,
  HardHat,
  Trees,
  LayoutDashboard,
  Users,
  Gem,
  KeyRound,
  Sparkles,
} from 'lucide-react';

/** Maps icon slugs stored in the database/constants to lucide components. */
const ICONS = {
  home: Home,
  building: Building2,
  box: Box,
  'hard-hat': HardHat,
  trees: Trees,
  layout: LayoutDashboard,
  users: Users,
  gem: Gem,
  key: KeyRound,
  sparkles: Sparkles,
};

export const getIcon = (name) => ICONS[name] || Sparkles;
