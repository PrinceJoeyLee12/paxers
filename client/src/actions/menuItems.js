import { GET_MENUS } from './types';

//import material ui icons
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';

//Icons
import {
  // eslint-disable-next-line
  Settings as SettingsIcon,
  LogIn as LoginIcon,
  Calendar as CalendarIcon,
  // FilePlus as FilePlusIcon,
  User as UserIcon,
  Clipboard as ClipboardIcon,
  Wind as WindIcon,
} from 'react-feather';

// @route    GET api/sidebarMenus
// @desc     Get authenticated menu
// @access   Private
export const getAuthMenuItems = () => async dispatch => {
  try {
    dispatch({
      type: GET_MENUS,
      payload: [
        {
          href: '/',
          icon: ClipboardIcon,
          title: 'Events',
        },
        {
          href: '/my-activities',
          icon: WindIcon,
          title: 'My Races & Activities',
        },
        // {
        //   href: '/my-calendar',
        //   icon: CalendarIcon,
        //   title: 'My Calendar',
        // },
        {
          href: '/account/me',
          icon: UserIcon,
          title: 'Profile',
        },
        // {
        //   href: '/create-event',
        //   icon: FilePlusIcon,
        //   title: 'Create Event',
        // },
        {
          href: '/settings',
          icon: SettingsIcon,
          title: 'Settings',
        },
        {
          href: '/contact-us',
          icon: ContactSupportOutlinedIcon,
          title: 'Need Help ?',
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};

// @route    --
// @desc     Set guest menu
// @access   Public
export const getGuestMenuItems = () => async dispatch => {
  try {
    console.log('reached Guest');
    dispatch({
      type: GET_MENUS,
      payload: [
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
          icon: UserIcon,
          title: 'Sign Up',
        },
        {
          href: '/contact-us',
          icon: ContactSupportOutlinedIcon,
          title: 'Need Help ?',
        },
        // {
        //   href: '/create-event',
        //   icon: FilePlusIcon,
        //   title: 'Create Event',
        // },
      ],
    });
  } catch (err) {
    console.log(err);
  }
};
