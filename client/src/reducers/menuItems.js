import { GET_MENUS } from '../actions/types';

//Icons
import {
  LogIn as LoginIcon,
  Calendar as CalendarIcon,
  // FilePlus as FilePlusIcon,
  UserPlus as UserPlusIcon,
  Phone as PhoneIcon,
} from 'react-feather';

const initialState = {
  sidebarMenus: [
    {
      href: '/',
      icon: CalendarIcon,
      title: 'Events',
    },
    {
      href: '/login',
      icon: LoginIcon,
      title: 'Sign In',
    },
    {
      href: '/register',
      icon: UserPlusIcon,
      title: 'Sign Up',
    },
    {
      href: '/contact-us',
      icon: PhoneIcon,
      title: 'Contact Us',
    },
    // {
    //   href: '/create-event',
    //   icon: FilePlusIcon,
    //   title: 'Create Event',
    // },
  ],
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MENUS:
      return {
        ...state,
        sidebarMenus: payload,
      };
    default:
      return state;
  }
}
