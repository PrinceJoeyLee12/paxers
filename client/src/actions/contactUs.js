import api from '../utils/api';

// @route    POST api/contact-us/
// @desc     Send Message
// @access   Public
export const sendConcern = (data, setResponse, setErrors) => async dispatch => {
  try {
    const res = await api.post('/contact-us', data);
    setResponse(res.data.msg, res.status);
  } catch (err) {
    if (err.response !== 'undefined') {
      if (
        err.response.status !== 'undefined' &&
        (err.response.status === 500 || err.response.status === 401)
      )
        return setResponse(err.response.data.msg, err.response.status);

      if ('data' in err.response) setErrors(err.response.data);
    }
  }
};
