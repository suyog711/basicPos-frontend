import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../api/auth';
import { useHistory } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../../lib/toastify';
import { toast } from 'react-toastify';
type RegisterProps = {
  //
};

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Username is Too Short!').max(50, 'Username is Too Long!').required('Username is Required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), null as any], 'Both password need to be the same'),
});

const Register: React.FC<RegisterProps | any> = () => {
  const history = useHistory();

  const showForm = ({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue, isSubmitting }: any) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
            placeholder="Username"
          />
          {errors.username && touched.username ? (
            <small id="passwordHelp" className="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="text"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            placeholder="Email"
            className={errors.email && touched.email ? 'form-control is-invalid' : 'form-control'}
          />
          {errors.email && touched.email ? (
            <small id="passwordHelp" className="text-danger">
              {errors.email}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={errors.password && touched.password ? 'form-control is-invalid' : 'form-control'}
            placeholder="Password"
          />
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            onBlur={handleBlur}
            name="confirm_password"
            onChange={handleChange}
            className={errors.confirm_password && touched.confirm_password ? 'form-control is-invalid' : 'form-control'}
            placeholder="Confirm Password"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.confirm_password}
            </small>
          ) : null}
        </div>
        <div className="row">
          <div className="col-md-12">
            <button disabled={isSubmitting} type="submit" className="btn btn-primary btn-block btn-flat">
              Confirm
            </button>
            <button
              type="button"
              onClick={() => {
                history.push('/login');
              }}
              className="btn btn-default btn-block btn-flat"
            >
              already member?
            </button>
          </div>
        </div>
      </form>
    );
  };
  const submitForm = async (values: any, setSubmitting: any) => {
    const newUser: Pick<IUser, 'username' | 'email' | 'password'> = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    try {
      const result = await registerUser(newUser);
      setSubmitting(false);
      if (result.data.result === 'success') {
        showSuccessToast(result.data.message);
        history.push('/login');
      } else if (result.data.result === 'error') {
        showErrorToast(result.data.message);
      }
    } catch (e) {
      console.log('error in register', e);
      showErrorToast(e.toString());
    }
  };
  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-logo">
          <a href="../../index2.html">
            <b>Basic</b>POS
          </a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirm_password: '',
              }}
              onSubmit={async (values, { setSubmitting }) => {
                // console.log(values);
                submitForm(values, setSubmitting);
              }}
              validationSchema={SignupSchema}
            >
              {props => showForm(props)}
            </Formik>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
};

export default Register;
