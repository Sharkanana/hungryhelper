import { ErrorMessage, useField } from 'formik';
// eslint-disable-next-line import/no-named-default
import TextField from '@mui/material/TextField';
import React from 'react';

const FormikTextField = props => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        {...field}
        {...props}
      />
      <ErrorMessage name={props.name} component="span" />
    </>
  );
};

export default FormikTextField;
