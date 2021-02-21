import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//utils
import { toCamelCase } from '../../utils/textFormater';

//material UI
import { Grid, Card, CircularProgress } from '@material-ui/core';

//actions
import { setRegistrantsData } from '../../actions/registrantsInfo';

//Formik
import {
  Form,
  TextField,
  SelectField,
  SubmitButton,
  CheckboxOrRadioField,
} from './FormElements';
import * as Yup from 'yup';
import Categories from './CategorySelection';

//utils
import { checkCategoryAvailability } from '../../utils/checkCategoryAvailability';

//
const RenderFallbackOption = ({ children, ...other }) => {
  return <div style={{ textAlign: 'center' }}>{children}</div>;
};
const FormFields = ({
  form,
  distanceTypeIsKM,
  categories,
  distance,
  setRegistrantsData,
  registrantsInfo: { isSubmitting, data },
  eventId,
}) => {
  const [formData, setFormData] = useState({});
  const [availableCategories, setAvailableCategories] = useState([]);
  const [validationSchema, setValidationSchema] = useState({});
  const [readyToView, setReadyToView] = useState(false);

  let _availableCategories = [];

  useEffect(() => {
    if (Object.keys(formData).length > 0) setReadyToView(true);
  }, [formData]);

  useEffect(
    () => {
      if (form !== undefined) initForm(form);
    },
    // eslint-disable-next-line
    [form],
  );

  const initForm = form => {
    let _formData = {};
    let _validationSchema = {};

    form.formFields.forEach((field, index) => {
      const elementName = toCamelCase(field.label); // to remove all spaces in field.label and to make it all lowercase

      //check if there's a value of element name in redux state.registrantsInfo and set it as it for initial value in formik or else set it to an empty string
      data[`${elementName}`] !== undefined && data[`${elementName}`] !== ''
        ? (_formData[elementName] = data[`${elementName}`])
        : (_formData[elementName] = '');

      if (field.type === 'text') {
        _validationSchema[elementName] = Yup.string();
      } else if (field.type === 'email') {
        _validationSchema[elementName] = Yup.string().email();
      } else if (field.type === 'number') {
        _validationSchema[elementName] = Yup.number()
          .min(5, 'Must be at least 5 years old')
          .max(90, 'Must be at most 90 years old');
      } else if (field.type === 'select' || field.type === 'radio') {
        _validationSchema[elementName] = Yup.string().oneOf(
          field.options.map(o => o.value),
        );
        _formData[elementName] = field.options[0].value;
      } else if (field.type === 'checkbox' || field.type === 'radio') {
        _validationSchema[elementName] = Yup.array().oneOf(
          [field.isRequired],
          field.options.map(o => o.value),
        );
        _formData[elementName] = [field.options[0].value];
      }

      if (field.isRequired) {
        _validationSchema[elementName] = _validationSchema[
          elementName
        ].required('This Field is Required');
      }
    });

    _availableCategories = checkCategoryAvailability(categories);
    setAvailableCategories(_availableCategories);

    let setDefaultCategory = `${
      distance === undefined ? _availableCategories[0] : distance
    }`;
    setFormData({ ..._formData, categorySelected: setDefaultCategory });
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  };

  // ----------------------------------Getting the type of elementField ---------------------------

  const getFormElement = field => {
    const elementName = toCamelCase(field.label); // to remove all spaces in field.label and to make it all lowercase
    const props = {
      name: elementName,
      label: field.label,
      options: field.options,
      type: field.type,
    };

    if (
      field.type === 'text' ||
      field.type === 'email' ||
      field.type === 'number'
    ) {
      return <TextField {...props} />;
    }

    if (field.type === 'select') {
      return <SelectField {...props} />;
    }

    if (field.type === 'radio' || field.type === 'checkbox') {
      return <CheckboxOrRadioField {...props} />;
    }
  };

  //Handle Submit
  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    let fee = 'Free'; //Registration Fee initialize as Free
    //get the Registration fee of the selectedCategories
    categories.forEach((category, index) => {
      if (
        values.categorySelected !== undefined &&
        category.distance === values.categorySelected &&
        category.registrationAmount !== undefined
      ) {
        fee = categories[index].registrationAmount;
      }
    });

    setRegistrantsData(eventId, values, fee);
    setSubmitting(isSubmitting);
  };
  return (
    <>
      {readyToView ? (
        <Form
          enableReinitialize
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          <Grid
            container
            spacing={2}
            justify='center'
            style={{ marginTop: '20px' }}>
            <Card style={{ maxWidth: 600, width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Categories
                    distanceTypeIsKM={distanceTypeIsKM}
                    categories={availableCategories}
                    defaultDistance={distance}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                {form.formFields.map((field, index) => (
                  <Grid key={index} item xs={12} sm={6}>
                    {getFormElement(field)}
                  </Grid>
                ))}
              </Grid>
            </Card>
            <Grid container justify='center'>
              <Grid item xs={12} sm={6} style={{ margin: '20px' }}>
                <SubmitButton title={`Submit Form`} />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      ) : (
        <RenderFallbackOption>
          <CircularProgress />
        </RenderFallbackOption>
      )}
    </>
  );
};

FormFields.propTypes = {
  setRegistrantsData: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

const mapStateToProps = state => ({
  registrantsInfo: state.registrantsInfo,
});

export default connect(mapStateToProps, { setRegistrantsData })(FormFields);
