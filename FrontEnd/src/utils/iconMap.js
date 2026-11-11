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
  CookingPot,
  Briefcase,
  Store,
  Armchair,
  Hammer,
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
  kitchen: CookingPot,
  briefcase: Briefcase,
  store: Store,
  armchair: Armchair,
  hammer: Hammer,
};

export const getIcon = (name) => ICONS[name] || Sparkles;
