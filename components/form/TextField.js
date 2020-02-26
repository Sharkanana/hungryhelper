import { ErrorMessage, useField } from 'formik';
// eslint-disable-next-line import/no-named-default
import { TextField as MuiTextField } from '@material-ui/core';
import React from 'react';

const TextField = props => {
  const [field, meta] = useField(props);
  return (
    <>
      <MuiTextField
        {...field}
        {...props}
      />
      <ErrorMessage name={props.name} component="span" />
    </>
  );
};

export default TextField;
