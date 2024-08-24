import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signup } from "../../auth/auth";
import "../login/login.css";
import loginImage from "../../assets/login-1.png"; 

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmission = (values) => {
    setIsLoading(true);
    signup(values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, "Min 5 character long")
      .max(15, "Should not exceed 15 characters")
      .required("Required"),
    lastName: Yup.string()
      .min(5, "Min 5 character long")
      .max(15, "Should not exceed 15 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Required"),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div>
      <div>
        <main className='sign-up'>
          <div className='sign-up__container'>
            <div className='sign-up__image'>
              <img
                src={loginImage} 
                alt='login'
                className='login-image'
              />
            </div>
            <div className='sign-up__content'>
              <header className='sign-up__header'>
                <h1 className='sign-up__title'>Sign up</h1>
                <p className='sign-up__descr'>
                  Welcome, Please Sign up your account.
                </p>
              </header>
              <div className='sign-up__form form'>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={SignUpSchema}
                  onSubmit={(values) => {
                    handleSubmission(values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form method='post'>
                      <div className='form__row form__row--two'>
                        <div className='input form__inline-input'>
                          <div className='input__container'>
                            <Field
                              name='firstName'
                              className='input__field'
                              id='first-name'
                              placeholder='First Name'
                            />
                            <label className='input__label' htmlFor='first-name'>
                              First Name
                            </label>
                            {errors.firstName && touched.firstName ? (
                              <span className='error-sign'>
                                {errors.firstName}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className='input form__inline-input'>
                          <div className='input__container'>
                            <Field
                              name='lastName'
                              className='input__field'
                              id='last-name'
                              placeholder='Last Name'
                            />
                            <label className='input__label' htmlFor='last-name'>
                              Last Name
                            </label>
                            {errors.lastName && touched.lastName ? (
                              <span className='error-sign'>
                                {errors.lastName}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className='form__row'>
                        <div className='input'>
                          <div className='input__container'>
                            <Field
                              name='email'
                              className='input__field'
                              id='email'
                              placeholder='Email'
                            />
                            <label className='input__label' htmlFor='email'>
                              Email
                            </label>
                            {errors.email && touched.email ? (
                              <span className='error-sign'>{errors.email}</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className='form__row'>
                        <div className='input'>
                          <div className='input__container'>
                            <Field
                              name='password'
                              className='input__field'
                              id='password'
                              placeholder='Password'
                              type='password'
                            />
                            <label className='input__label' htmlFor='password'>
                              Password
                            </label>
                            {errors.password && touched.password ? (
                              <span className='error-sign'>
                                {errors.password}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className='form__row'>
                        <div className='input'>
                          <div className='input__container'>
                            <Field
                              name='confirmPassword'
                              className='input__field'
                              id='confirm-password'
                              placeholder='Confirm Password'
                              type='password'
                            />
                            <label className='input__label' htmlFor='confirm-password'>
                              Confirm Password
                            </label>
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                              <span className='error-sign'>
                                {errors.confirmPassword}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className='form__row'>
                        <div className='input-checkbox'>
                          <div className='input-checkbox__container'>
                            <Field
                              type='checkbox'
                              name='agree'
                              className='input-checkbox__field'
                              id='agree'
                            />
                            <span className='input-checkbox__square'></span>
                            <label className='input-checkbox__label' htmlFor='agree'>
                              I agree with terms and conditions
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='form__row'>
                        <div className='component component--primary form__button'>
                          <button
                            className='btn btn--regular'
                            disabled={isLoading}
                            id='sign-up-button'
                            type='submit'
                          >
                            {isLoading ? "Signing up..." : "Sign up"}
                          </button>
                        </div>
                      </div>
                      <div className='form__row sign-up__sign'>
                        Already have an account? &nbsp;
                        <Link to='/login' className='link'>
                          Login.
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
