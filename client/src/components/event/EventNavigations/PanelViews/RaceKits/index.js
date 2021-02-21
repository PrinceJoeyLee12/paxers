import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Components
import Kits from './Kits';

const RaceKits = ({ categories, distanceTypeIsKM }) => {
  return (
    <>
      <Kits
        title={"Registration's Kits"}
        categories={categories}
        distanceTypeIsKM={distanceTypeIsKM}
        kitType='registration'
      />
      <div style={{ paddingTop: '20px' }}>
        <Kits
          title={"Finisher's Kits"}
          categories={categories}
          distanceTypeIsKM={distanceTypeIsKM}
          kitType='finishers'
        />
      </div>
    </>
  );
};

RaceKits.propTypes = {
  categories: PropTypes.array.isRequired,
  distanceTypeIsKM: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  categories: state.event.event.categories,
  distanceTypeIsKM: state.event.event.distanceTypeIsKM,
});

export default connect(mapStateToProps, null)(RaceKits);
