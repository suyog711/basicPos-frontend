import * as React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../lib/toastify';
import { forgotPassword } from './../../api/auth';
const PasswordForgotSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
});

type PasswordForgotProps = {
  //
};

const PasswordForgot: React.FC<any> = () => {
  const submitForm = async (formData, setSubmitting) => {
    try {
      const result = await forgotPassword(formData);
      setSubmitting(false);
      if (result.data.result === 'success') {
        showSuccessToast(result.data.message);
      } else if (result.data.result === 'error') {
        showErrorToast(result.data.message);
      }
    } catch (error) {
      setSubmitting(false);
      showErrorToast('unexpected error');
    }
  };

  const showForm = ({ values, errors, touched, handleChange, handleSubmit, onSubmit, isSubmitting, setFieldValue }: any) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group  has-feedback">
            <label htmlFor="email">Email address</label>
            <input
              onChange={handleChange}
              value={values.email}
              type="email"
              className={errors.email && touched.email ? 'form-control is-invalid' : 'form-control'}
              id="email"
              placeholder="Enter email"
            />
            {errors.email && touched.email ? (
              <small id="passwordHelp" className="text-danger">
                {errors.email}
              </small>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
              Request new password
            </button>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          {/* <a href="#"> */}
          <b>Basic</b>POS
          {/* </a> */}
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>
            <Formik
              initialValues={{
                email: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                submitForm(values, setSubmitting);
              }}
              validationSchema={PasswordForgotSchema}
            >
              {props => showForm(props)}
            </Formik>
            <Link to="/login">Login</Link>
            <p className="mb-0">
              <Link to="/register">Register a new membership</Link>
            </p>
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </div>
  );
};

export default PasswordForgot;
