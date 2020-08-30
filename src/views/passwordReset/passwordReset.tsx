import * as React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useParams, useHistory } from 'react-router-dom';
import { resetPassword } from '../../api/auth';
import { showSuccessToast, showErrorToast } from '../../lib/toastify';
type PasswordResetProps = {
  //
};

const PasswordresetSchema = Yup.object().shape({
  password: Yup.string().required('New Password is required'),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), null as any], 'Both password need to be the same'),
});

const PasswordReset: React.FC<any> = () => {
  const { token } = useParams();
  const history = useHistory();
  const submitForm = async (values, setSubmitting) => {
    try {
      const result = await resetPassword(values, token);
      setSubmitting(false);
      if (result.data.result === 'success') {
        showSuccessToast(result.data.message);
        history.push('/login');
      } else if (result.data.result === 'error') {
        showErrorToast(result.data.message);
      }
    } catch (error) {
      setSubmitting(false);
      showErrorToast('unexpected error');
    }
  };
  const showForm = ({ values, errors, touched, handleBlur, handleChange, handleSubmit, onSubmit, isSubmitting, setFieldValue }: any) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group  has-feedback">
            <label htmlFor="password">Password:</label>
            <input
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type="password"
              className={errors.password && touched.password ? 'form-control is-invalid' : 'form-control'}
              id="password"
              placeholder="Enter new password"
            />
            {errors.password && touched.password ? (
              <small id="passwordHelp" className="text-danger">
                {errors.password}
              </small>
            ) : null}
          </div>
          <div className="form-group  has-feedback">
            <label htmlFor="password">Confirm Password:</label>

            <input
              onChange={handleChange}
              value={values.confirm_password}
              onBlur={handleBlur}
              type="password"
              className={errors.confirm_password && touched.confirm_password ? 'form-control is-invalid' : 'form-control'}
              id="confirm_password"
              name="confirm_password"
              placeholder="Enter password again"
            />
            {errors.confirm_password && touched.confirm_password ? (
              <small id="passwordHelp" className="text-danger">
                {errors.confirm_password}
              </small>
            ) : null}
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block">
              Save new password
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
          <a href="#">
            <b>Basic</b>POS
          </a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
            <Formik
              initialValues={{
                password: '',
                confirm_password: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                submitForm(values, setSubmitting);
              }}
              validationSchema={PasswordresetSchema}
            >
              {/* {this.showForm()}            */}
              {props => showForm(props)}
            </Formik>
            <p className="mb-0">
              <Link to="/login">Login</Link>
            </p>
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

export default PasswordReset;
