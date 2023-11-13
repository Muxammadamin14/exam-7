"use client"
import { useState, useEffect } from 'react';
import '../css/registration.min.css';
import Image from 'next/image';
import logo from '../img/Logo.png';
import ilustration from '../img/illustration.png';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsRegistered(true);
      const { name, email, password } = JSON.parse(userData);
      setFormData({ name, email, password });
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });
  };

  const handleSignUp = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let hasErrors = false;

    if (formData.name.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Please enter your full name',
      }));
      hasErrors = true;
    } else if (formData.name.trim().length < 3 || formData.name.trim().length > 50) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Name must be between 3 and 50 characters',
      }));
      hasErrors = true;
    }

    if (formData.email.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter your email',
      }));
      hasErrors = true;
    }

    if (formData.password.trim() === '') {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Please enter your password',
      }));
      hasErrors = true;
    } else if (formData.password.trim().length < 8 || formData.password.trim().length > 16) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be between 8 and 16 characters',
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    localStorage.setItem('userData', JSON.stringify(formData));
    setIsRegistered(true);
    window.location.href = '/home';
  };

  return (
    <div className='form-site'>
      <div className="login-div-1">
        <div className="eatlylogo">
          <Image src={logo} alt="logo etly" />
        </div>
        <div className="div-form">
          <h1 className='eatlyText'>Sign Up To eatly</h1>
          {isRegistered ? (
            <p className="already-registered">You have already registered.</p>
          ) : (
            <form className='div-formik'>
              <input
                type="text"
                name="name"
                id="name"
                className={`name ${formErrors.name && 'error'}`}
                placeholder='FULL NAME'
                value={formData.name}
                onChange={handleInputChange}
                disabled={isRegistered}
              />
              {formErrors.name && <p className="error-text">{formErrors.name}</p>}
              <input
                type="email"
                name="email"
                id="email"
                className={`email ${formErrors.email && 'error'}`}
                placeholder='EMAIL'
                value={formData.email}
                onChange={handleInputChange}
                disabled={isRegistered}
              />
              {formErrors.email && <p className="error-text">{formErrors.email}</p>}
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className={`password ${formErrors.password && 'error'}`}
                  placeholder='PASSWORD'
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isRegistered}
                />
                {formErrors.password && <p className="error-text">{formErrors.password}</p>}
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? '✅' : '🚫'}
                </button>
              </div>
              <button className='btnSignup' onClick={handleSignUp} disabled={isRegistered}>
                SIGN UP
              </button>
            </form>
          )}
          <div className="accoun-1">
            <h5>Already Have An Account?</h5>
            <a href='/home' className='account'>Log In</a>
          </div>
          <div className="footer-div">
            <h5 className='footer-1'>Policy Privacy</h5>
            <h5 className='footer-2'>&copy; 2022</h5>
          </div>
        </div>
      </div>
      <div className="login-div-2">
        <Image src={ilustration} alt="logo etly" className='ilustration' />
      </div>
    </div>
  );
};

export default Registration;
