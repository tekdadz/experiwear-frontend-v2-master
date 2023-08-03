import { LINKS } from 'utils/constants';
import {
  HomeIcon,
  MailIcon,
  MessageSquareIcon,
  CheckSquareIcon,
  DealIcon,
  CalendarIcon,
  AccelerometerIcon,
  StatsIcon,
  AlertIcon,
  TicketIcon,
} from 'components/icons';

export const OVERVIEW_ITEMS = [
  {
    icon: HomeIcon,
    ...LINKS.home,
  },
  {
    icon: StatsIcon,
    ...LINKS.stats,
  },
];

export const ALERT_ACTIONS_ITEMS = [
  {
    icon: MailIcon,
    ...LINKS.news,
  },
  {
    icon: MessageSquareIcon,
    ...LINKS.quickPoll,
  },
  {
    icon: CheckSquareIcon,
    ...LINKS.score,
  },
  {
    icon: DealIcon,
    ...LINKS.promo,
  },
  {
    icon: CalendarIcon,
    ...LINKS.schedule,
  },
  {
    icon: AccelerometerIcon,
    ...LINKS.gameday,
  },
];

export const SAVED_ALERTS_ITEMS = [
  {
    icon: AlertIcon,
    ...LINKS.saved,
  },
];

export const MANAGE_TICKETS = [
  {
    icon: TicketIcon,
    ...LINKS.tickets,
  },
];

export const SIDEBAR_GROUPS = [
  {
    title: 'Overview',
    items: OVERVIEW_ITEMS,
  },
  {
    title: 'Alert actions',
    items: ALERT_ACTIONS_ITEMS,
  },
  {
    title: 'Saved alerts',
    items: SAVED_ALERTS_ITEMS,
  },
  {
    title: 'Ticket actions',
    items: MANAGE_TICKETS,
  },
];
