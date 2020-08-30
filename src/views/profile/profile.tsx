import React, { useEffect, useState, ChangeEvent } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { getUserProfile, updateUserProfile } from './../../api/user';
import { showSuccessToast, showErrorToast } from './../../lib/toastify';
import token from '../../helpers/token';

type ProfileProps = {
  //
};
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ProfileSchema = Yup.object().shape({
  username: Yup.string().min(2, 'username is Too Short!').max(50, 'username is Too Long!').required('username is Required'),
  firstName: Yup.string().min(2, 'firstname is Too Short!').max(30, 'firstname is Too Long!').required('firstname is Required'),
  lastName: Yup.string().min(2, 'lastname is Too Short!').max(30, 'lastname is Too Long!').required('lastname is Required'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'Phone number must be 10 characters!')
    .required('Phone number is Required'),
  address: Yup.string().min(12, 'address is Too Short!').max(50, 'address is Too Long!').required('address is Required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
});

const Profile: React.FC<any> = () => {
  const [response, setResponse] = useState({
    _id: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    avatars: '',
  });
  useEffect(() => {
    getUserProfile()
      .then(result => {
        setResponse(result.data.data);
        console.log(result.data);
      })
      .catch(err => console.log(err));
  }, []);
  const showPreviewImage = values => {
    return (
      <div className="text-center">
        <img
          id="avatars"
          src={values && values.file_obj != null ? values.file_obj : response && response.avatars}
          className="profile-user-img img-fluid img-circle"
          width={100}
        />
      </div>
    );
  };
  const showForm = ({ values, errors, touched, handleChange, handleSubmit, onSubmit, isSubmitting, setFieldValue }: any) => {
    return (
      <>
        <form role="form" onSubmit={handleSubmit}>
          {showPreviewImage(values)}
          <div className="card-body">
            {/* <span style={{ color: '#00B0CD', marginLeft: 10 }}>Add Picture</span> */}
            <div className="form-group">
              <label htmlFor="exampleInputFile">Avatar upload</label>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      if (e.target && e.target.files) {
                        setFieldValue('avatars', e.target.files[0]); // for upload
                        setFieldValue('file_obj', URL.createObjectURL(e.target.files[0])); // for preview image
                      }
                    }}
                    name="avatars"
                    // className={errors.email && touched.email ? 'form-control is-invalid' : 'form-control'}
                    accept="image/*"
                    id="avatars"
                    className="custom-file-input"
                    // id="exampleInputFile"
                  />
                  <label className="custom-file-label" htmlFor="exampleInputFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>

            {/* <input type="hidden" name="id" value={values._id} /> */}
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
            <div className="form-group has-feedback">
              <label htmlFor="username">Username</label>
              <input
                onChange={handleChange}
                value={values.username}
                type="text"
                className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
                id="username"
                placeholder="Enter UserName"
              />
              <label htmlFor="username">First Name</label>
              <input
                onChange={handleChange}
                value={values.firstName}
                type="text"
                className={errors.firstName && touched.firstName ? 'form-control is-invalid' : 'form-control'}
                id="firstName"
                placeholder="Enter First Name"
              />
              {errors.firstName && touched.firstName ? (
                <small id="passwordHelp" className="text-danger">
                  {errors.firstName}
                </small>
              ) : null}
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="lastName">Last Name</label>
              <input
                onChange={handleChange}
                value={values.lastName}
                type="text"
                className={errors.lastName && touched.lastName ? 'form-control is-invalid' : 'form-control'}
                id="lastName"
                placeholder="Enter Last Name"
              />
              {errors.lastName && touched.lastName ? (
                <small id="passwordHelp" className="text-danger">
                  {errors.lastName}
                </small>
              ) : null}
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="phone">phone number</label>
              <input
                onChange={handleChange}
                value={values.phone}
                type="text"
                className={errors.phone && touched.phone ? 'form-control is-invalid' : 'form-control'}
                id="phone"
                placeholder="Enter phone number"
              />
              {errors.phone && touched.phone ? (
                <small id="passwordHelp" className="text-danger">
                  {errors.phone}
                </small>
              ) : null}
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="address">address</label>
              <textarea
                onChange={handleChange}
                value={values.address}
                className={errors.address && touched.address ? 'form-control is-invalid' : 'form-control'}
                id="address"
                placeholder="Address"
              />
              {errors.address && touched.address ? (
                <small id="passwordHelp" className="text-danger">
                  {errors.address}
                </small>
              ) : null}
            </div>
          </div>
          {/* /.card-body */}
          <div className="card-footer">
            <button type="submit" disabled={isSubmitting} className="btn btn-block btn-primary">
              Save
            </button>
          </div>
        </form>
      </>
    );
  };

  const submitForm = vals => {
    updateUserProfile(vals)
      .then(res => {
        if (res.data.result === 'success') {
          showSuccessToast(res.data.message);
        } else if (res.data.result === 'error') {
          showErrorToast(res.data.message);
        }
      })
      .catch(error => {
        console.log(error);
        showErrorToast('Unexpected error');
      });
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="offset-md-3 col-sm-8">
              <h1>Profile</h1>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* left column */}
            <div className="offset-md-3 col-md-6">
              {/* general form elements */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">update profile</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <Formik
                  enableReinitialize={true}
                  initialValues={
                    response ? response : { _id: '', username: '', email: '', firstName: '', lastName: '', phone: '', address: '', avatars: '' }
                  }
                  onSubmit={(values, { setSubmitting }) => {
                    let formData = new FormData();
                    formData.append('_id', values._id);
                    formData.append('username', values.username);
                    formData.append('firstName', values.firstName);
                    formData.append('lastName', values.lastName);
                    formData.append('phone', values.phone);
                    formData.append('address', values.address);
                    formData.append('email', values.email);
                    if (values.avatars) {
                      formData.append('avatars', values.avatars);
                    }
                    console.log(values);
                    submitForm(formData);
                    setSubmitting(false);
                  }}
                  validationSchema={ProfileSchema}
                >
                  {props => showForm(props)}
                </Formik>
              </div>
              {/* /.card */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
