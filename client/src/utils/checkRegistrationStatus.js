import moment from 'moment';

export const checkRegistrationStatus = registrationEnd => {
  // if registration end is today or after today
  return moment(registrationEnd).isSameOrAfter(moment(), 'days');
};
