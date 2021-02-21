import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Field } from 'formik';

//Category selection
const CategorySelection = props => {
  const {
    distanceTypeIsKM,
    categories,
    defaultDistance,
    categorySelected,
  } = props;
  const [readyToView, setReadyToView] = useState(false);
  const [orderOfCategories, setOrderOfCategories] = useState([]);

  //set state to an empty array for every render
  useEffect(() => {
    setOrderOfCategories([]);
  }, []);

  useEffect(() => {
    if (categories) {
      setReadyToView(true);
    } else setReadyToView(false);

    //Category selected from event page make it as primary option: making new list of category
    if (defaultDistance && !categorySelected) {
      let _orderOfCategories = [];
      categories.forEach(category => {
        if (category === defaultDistance) _orderOfCategories.unshift(category);
        else _orderOfCategories.push(category);
      });

      setOrderOfCategories(_orderOfCategories);
    } else if (categorySelected) {
      //if there's already a value in redux state in registrants.data.selectedCategory
      let _orderOfCategories = [];
      categories.forEach((category, index) => {
        if (category === categorySelected) _orderOfCategories.unshift(category);
        else _orderOfCategories.push(category);
      });

      setOrderOfCategories(_orderOfCategories);
    } else {
      setOrderOfCategories(categories);
    }
  }, [categories, setReadyToView, defaultDistance, categorySelected]);

  return (
    <>
      {readyToView ? (
        <Field
          as='select'
          type='text'
          name='categorySelected'
          className='select-css'>
          {orderOfCategories.map((category, index) => (
            <option key={index} value={category || ''}>
              {`${category} ${distanceTypeIsKM ? 'Km' : 'Miles'}`}
            </option>
          ))}
        </Field>
      ) : (
        ''
      )}
    </>
  );
};

const mapStateToProps = state => ({
  categorySelected: state.registrantsInfo.data.categorySelected,
});

export default connect(mapStateToProps, null)(CategorySelection);
