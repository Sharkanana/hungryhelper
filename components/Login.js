
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

export default function Login({open, closeLogin}) {

  const [errorMsg, updateErrorMsg] = useState('');

  return (
    <Dialog open={open} onClose={closeLogin} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Login</DialogTitle>

      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required(),
          password: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting}) => {

          fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(values)
          }).then((res) => {

            console.log(res);
            // if(res.data.success) {
            //
            //   updateErrorMsg(res);
            //   // localStorage.setItem('jwtToken', res.data.token);
            //   // axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
            //
            //   closeLogin();
            // }
            // else {
            //   updateErrorMsg(res);
            // }
          });

        }}
      >
        {({submitForm, isSubmitting}) => (
          <Form>
            <DialogContent>
              <DialogContentText>
                Please enter your username and password to login.
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
                name="password"
                label="Password"
                type="password"
                fullWidth
              />
            </DialogContent>
            <Typography>
              {errorMsg}
            </Typography>
            <DialogActions>
              <Button onClick={closeLogin} color="primary">
                Cancel
              </Button>
              <Button onClick={submitForm} disabled={isSubmitting} color="primary">
                Login
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}