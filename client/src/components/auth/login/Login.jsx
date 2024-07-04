import React, { useState } from 'react';
import { api } from '../../../api/axios';
import { BrandBar } from '../../brandBar/brandBar';
import { Nav_bar } from '../../Navbar/Navbar';
import './login.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import photo from '../../../imgs/image.png'
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  
  const toggleVisibility = (e) => {
    setIsPassword(!isPassword);
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('auth/login', {
        email,
        password,
      });
      const { access_token, refresh_token } = response.data.data[0];
      console.log('login res data ', access_token, refresh_token);

      // Store tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='login-form'>
      <BrandBar />
      <Nav_bar />
      <div className='form-div'>
        <form onSubmit={handleLogin}>
          <div className='fields'>
            <div>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div>
              <i className='pass-ico'></i>
              <input
                type={isPassword ? 'password' : 'text'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <i className='eye-ico' onClick={toggleVisibility}></i>
            </div>
          </div>
          <div className='opts'>
            <Link to = '/register' className='link'>create an account</Link>
            <Link to = '' className='link'>forgot password ?</Link>
          </div>
          <div className='btn-div'>
            <button type="submit" className='sub-button'> Login </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;