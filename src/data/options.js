// Onboarding option data — kept generic; role list is configurable for now.
// When the rural-fire-service rollout is confirmed, swap ROLE_OPTIONS to:
//   { id: 'volunteer',   label: 'Volunteer',                       sub: 'Active in a brigade or unit.' },
//   { id: 'firefighter', label: 'Career firefighter',              sub: 'Paid full-time or part-time.' },
//   { id: 'officer',     label: 'Officer / Leadership',            sub: 'Crew leader, captain, deputy.' },
//   { id: 'trainer',     label: 'Trainer / Educator',              sub: 'Run sessions or develop courses.' },
//   { id: 'support',     label: 'Support / Administration',        sub: 'Operations, comms, finance, HR.' },
//   { id: 'student',     label: 'Student',                         sub: 'Studying through UNE or another provider.' },
//   { id: 'other',       label: 'Other',                           sub: 'None of these fit — that\'s fine.' },

export const ROLE_OPTIONS = [
  { id: 'student',      label: 'Student',                 sub: 'Studying through UNE or another provider.', icon: 'sparkles' },
  { id: 'practitioner', label: 'Practitioner',            sub: 'Active in your field day-to-day.',           icon: 'users' },
  { id: 'volunteer',    label: 'Volunteer',               sub: 'Giving time to a brigade, unit, or org.',    icon: 'star' },
  { id: 'trainer',      label: 'Trainer / Educator',      sub: 'Run sessions or develop courses.',           icon: 'award' },
  { id: 'leader',       label: 'Leadership / Officer',    sub: 'Manage a team, crew, or program.',           icon: 'clipboard-list' },
  { id: 'support',      label: 'Support / Administration',sub: 'Operations, comms, finance, HR.',             icon: 'folder' },
  { id: 'other',        label: 'Other',                   sub: 'None of these quite fit.',                    icon: 'help-circle' },
];

export const EXPERIENCE_OPTIONS = [
  { id: 'new',     label: 'Just starting out',  sub: 'Less than a year of hands-on experience.' },
  { id: 'some',    label: 'Some experience',    sub: '1 – 3 years.' },
  { id: 'mid',     label: 'Experienced',        sub: '3 – 5 years.' },
  { id: 'senior',  label: 'Highly experienced', sub: '5+ years.' },
];

export const GOAL_OPTIONS = [
  { id: 'foundational', label: 'Build foundational knowledge' },
  { id: 'refresh',      label: 'Refresh existing skills' },
  { id: 'certify',      label: 'Prepare for a certification' },
  { id: 'scenario',     label: 'Prepare for a specific scenario' },
  { id: 'explore',      label: 'Explore new topics' },
  { id: 'team',         label: 'Train my team or unit' },
  { id: 'other',        label: 'Something else' },
];

export const INTEREST_OPTIONS = [
  { id: 'theory',         label: 'Theory & fundamentals' },
  { id: 'hands-on',       label: 'Hands-on practice' },
  { id: 'leadership',     label: 'Leadership & management' },
  { id: 'safety',         label: 'Safety & compliance' },
  { id: 'communication',  label: 'Communication' },
  { id: 'wellbeing',      label: 'Wellbeing & resilience' },
  { id: 'tech',           label: 'Tools & technology' },
  { id: 'community',      label: 'Community engagement' },
  { id: 'planning',       label: 'Planning & strategy' },
];

export const AU_STATES = [
  'Australian Capital Territory',
  'New South Wales',
  'Northern Territory',
  'Queensland',
  'South Australia',
  'Tasmania',
  'Victoria',
  'Western Australia',
  'Outside Australia',
];

export const HEARD_OPTIONS = [
  { id: 'word-of-mouth', label: 'Word of mouth' },
  { id: 'social-media',  label: 'Social media' },
  { id: 'une',           label: 'University of New England (UNE)' },
  { id: 'event',         label: 'An event or workshop' },
  { id: 'search',        label: 'Search engine' },
  { id: 'other',         label: 'Other' },
];

// Recommendation cards on the welcome screen — keyed by goal id.
export const RECS = {
  foundational: { title: 'Foundations of practice',     meta: '6 lessons · ~45 min', icon: 'sparkles' },
  refresh:      { title: 'Quick-reference essentials',  meta: '4 lessons · ~25 min', icon: 'rotate-cw' },
  certify:      { title: 'Certification path',          meta: '12 lessons · ~3 hrs', icon: 'award' },
  scenario:     { title: 'Scenario drills',             meta: '8 lessons · ~1 hr',   icon: 'star' },
  explore:      { title: 'Browse the catalogue',        meta: 'Updated weekly',      icon: 'folder' },
  team:         { title: 'Team training playbook',      meta: 'Setup in ~10 min',    icon: 'clipboard-list' },
  other:        { title: 'Talk to us about your goal',  meta: 'Book a 15 min call',  icon: 'message-square' },
};
