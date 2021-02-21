import React, { useEffect, useState } from 'react';
import {
  Formik,
  Form as FormikForm,
  Field,
  useFormikContext,
  ErrorMessage,
} from 'formik';
import { TextField as FormikTextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';

export function Form(props) {
  return (
    <Formik {...props}>
      <FormikForm className='needs-validation' noValidate=''>
        {props.children}
      </FormikForm>
    </Formik>
  );
}

export function TextField(props) {
  const { name, label, type, ...rest } = props;

  return (
    <>
      <Field
        style={{ width: '100%' }}
        component={FormikTextField}
        name={name}
        type={type}
        label={label}
        {...rest}
      />
    </>
  );
}

export function SelectField(props) {
  const { name, label, options, type } = props;
  const [view, setView] = useState(false);

  useEffect(() => {
    if (options.length > 0) {
      setView(true);
    } else setView(false);
  }, [options, setView]);
  return (
    <>
      {view ? (
        <>
          <label htmlFor={name}>{label}</label>
          <Field as='select' type={type} name={name} className='select-css'>
            {options.map((option, index) => (
              <option key={index} value={option.value || ''}>
                {option.value}
              </option>
            ))}
          </Field>{' '}
        </>
      ) : (
        ''
      )}
    </>
  );
}

export function CheckboxOrRadioField(props) {
  const { name, label, options, type } = props;
  const [view, setView] = useState(false);

  useEffect(() => {
    options.length > 0 ? setView(true) : setView(false);
  }, [options, setView]);

  return (
    <>
      {view ? (
        <>
          <div id={`my-${type}-group`}>{label}</div>
          <div role='group' aria-labelledby={`my-${type}-group`}>
            {options.map((option, index) => (
              <label key={index} style={{ paddingRight: '8px' }}>
                <Field type='checkbox' name={name} value={option.value || ''} />
                {option.value}
              </label>
            ))}
            <div>
              <ErrorMessage style={{ color: 'red' }} name={name} />
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export function SubmitButton(props) {
  const { title, ...rest } = props;
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <Button
      style={{ width: '100%' }}
      variant='contained'
      color='secondary'
      type='submit'
      {...rest}
      disabled={!isValid || isSubmitting}>
      {title}
    </Button>
  );
}
