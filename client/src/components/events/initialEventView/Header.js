import React from 'react';
import Moment from 'react-moment';
//material UI
import { CardHeader } from '@material-ui/core';

const Header = ({ title, startDate, endDate, isVirtual }) => {
  return (
    <>
      <CardHeader
        title={title}
        subheader={
          startDate && endDate ? (
            <>
              <Moment format='MMM DD, YYYY'>{startDate}</Moment>
              {isVirtual ? (
                <>
                  <span>{' - '}</span>
                  <Moment format='MMM DD, YYYY'>{endDate}</Moment>
                </>
              ) : (
                ''
              )}
            </>
          ) : (
            <Moment format='MMMM DD, YYYY ' date={startDate} />
          )
        }
      />
    </>
  );
};

export default Header;
