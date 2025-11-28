import { Grievance, GrievanceCategory, GrievanceStatus } from './types';

export const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: 'GR-2023-8891',
    title: 'Pothole on Main Market Road',
    description: 'A large pothole has developed near the vegetable market entrance, causing traffic jams.',
    category: GrievanceCategory.ROADS,
    location: 'Guwahati, Market Road',
    status: GrievanceStatus.IN_REVIEW,
    dateSubmitted: '2023-10-25',
    imageUrl: 'https://picsum.photos/seed/road/400/300',
    isAnonymous: false,
    updates: [
      { date: '2023-10-25', title: 'Grievance Submitted', description: 'Your grievance has been received.', author: 'System' },
      { date: '2023-10-26', title: 'Under Review', description: 'Assigned to Municipal Corp reviewer.', author: 'Admin' }
    ]
  },
  {
    id: 'GR-2023-8902',
    title: 'Irregular Water Supply',
    description: 'No water supply in Sector 4 for the last 3 days.',
    category: GrievanceCategory.WATER,
    location: 'Jorhat, Sector 4',
    status: GrievanceStatus.ASSIGNED,
    dateSubmitted: '2023-10-20',
    imageUrl: 'https://picsum.photos/seed/water/400/300',
    isAnonymous: true,
    updates: [
      { date: '2023-10-20', title: 'Submitted', description: 'Received anonymously.', author: 'System' },
      { date: '2023-10-21', title: 'Assigned', description: 'Assigned to Water Works Dept.', author: 'System' },
      { date: '2023-10-22', title: 'Technician Dispatched', description: 'Team is checking the main valve.', author: 'Junior Engineer' }
    ]
  },
  {
    id: 'GR-2023-7721',
    title: 'Street Light Broken',
    description: 'Street light pole #45 is flickering and dangerous.',
    category: GrievanceCategory.ELECTRICITY,
    location: 'Dispur, Lane 2',
    status: GrievanceStatus.RESOLVED,
    dateSubmitted: '2023-09-15',
    imageUrl: 'https://picsum.photos/seed/light/400/300',
    isAnonymous: false,
    updates: [
      { date: '2023-09-15', title: 'Submitted', description: 'Reported via Nadi App.', author: 'User' },
      { date: '2023-09-18', title: 'Resolved', description: 'Bulb replaced and wiring fixed.', author: 'Line Man' }
    ]
  }
];

export const CATEGORY_ICONS: Record<GrievanceCategory, string> = {
  [GrievanceCategory.ROADS]: '🚧',
  [GrievanceCategory.ELECTRICITY]: '⚡',
  [GrievanceCategory.WATER]: '💧',
  [GrievanceCategory.SANITATION]: '🧹',
  [GrievanceCategory.CORRUPTION]: '🚫',
  [GrievanceCategory.OTHER]: '📝',
};

export const STATUS_COLORS: Record<GrievanceStatus, string> = {
  [GrievanceStatus.SUBMITTED]: 'bg-gray-100 text-gray-600',
  [GrievanceStatus.IN_REVIEW]: 'bg-orange-100 text-orange-600',
  [GrievanceStatus.ASSIGNED]: 'bg-blue-100 text-blue-600',
  [GrievanceStatus.RESOLVED]: 'bg-green-100 text-green-600',
};
