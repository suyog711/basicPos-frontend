import React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '../../api/auth';
import { useHistory } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../lib/toastify';

type LoginProps = {
  //
};

const LoginSchema = Yup.object().shape({
  username: Yup.string().min(2, 'username is Too Short!').max(50, 'username is Too Long!').required('Username is Required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC<LoginProps | any> = () => {
  const history = useHistory();
  const showForm = ({ values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting, handleBlur }: any) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group  has-feedback">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            placeholder="Username"
            className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
          />
          {/* <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-user"></span>
            </div>
          </div> */}
          {errors.username && touched.username ? (
            <small id="passwordHelp" className="text-danger">
              {errors.username}
            </small>
          ) : null}
        </div>
        <div className="form-group  mb-3 has-feedback">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Password"
            className={errors.password && touched.password ? 'form-control is-invalid' : 'form-control'}
          />
          {/* <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock"></span>
            </div>
          </div> */}
          {errors.password && touched.password ? (
            <small id="passwordHelp" className="text-danger">
              {errors.password}
            </small>
          ) : null}
        </div>
        <div className="row">
          <div className="col-8">
            <div className="icheck-primary">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
          </div>
          <div className="col-4">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
              Sign In
            </button>
          </div>
        </div>
      </form>
    );
  };

  const submitForm = async (values: any, setSubmitting: any) => {
    try {
      const user: Pick<IUser, 'username' | 'password'> = {
        username: values.username,
        password: values.password,
      };
      const result = await loginUser(user);
      // console.log(result);
      setSubmitting(false);
      if (result.data.result === 'success') {
        localStorage.setItem('TOKEN_KEY', result.data.token);
        showSuccessToast(result.data.message);
        history.push('/dashboard');
      } else if (result.data.result === 'error') {
        showErrorToast(result.data.message);
      }
    } catch (e) {
      console.log('error in login', e);
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
            <p className="login-box-msg">Sign in to start your session</p>

            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                submitForm(values, setSubmitting);
              }}
              validationSchema={LoginSchema}
            >
              {/* {this.showForm()}            */}
              {props => showForm(props)}
            </Formik>
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
            <p className="mb-0">
              <Link to="/register">Register a new membership</Link>
            </p>
          </div>
          {/* /.form-box */}
        </div>
        {/* /.card */}
      </div>
    </div>
  );
};

export default Login;
