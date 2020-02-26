
import React, {useState} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "./form/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

export default function Register({open, closeRegister}) {

  const [errorMsg, updateErrorMsg] = useState('');

  function clearAndCloseRegister() {
    updateErrorMsg('');
    closeRegister();
  }

  return (
    <Dialog open={open} onClose={clearAndCloseRegister} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Register</DialogTitle>

      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirm: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required(),
          email: Yup.string().required(),
          password: Yup.string().required(),
          confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords do not match.')
            .required()
        })}
        onSubmit={(values, { setSubmitting }) => {

          axios.post('/api/register', values)
            .then(res => {

              if(res.data.success) {
                clearAndCloseRegister();
              }
              else {
                updateErrorMsg(res.data.msg);
              }

            })
            .catch(error => updateErrorMsg(error.response.data.msg))
            .then(() => setSubmitting(false))
        }}
      >
        {({submitForm, isSubmitting}) => (
          <Form>
            <DialogContent>
              <DialogContentText>
                Complete all fields to register
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
              />
              <TextField
                required
                margin="dense"
                name="email"
                label="Email"
                type="text"
                fullWidth
              />
              <TextField
                required
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
              />
              <TextField
                required
                margin="dense"
                name="confirm"
                label="Confirm Password"
                type="password"
                fullWidth
              />
              <Typography>
                {errorMsg}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={clearAndCloseRegister} color="primary">
                Cancel
              </Button>
              <Button onClick={submitForm} disabled={isSubmitting} color="primary">
                Register
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}