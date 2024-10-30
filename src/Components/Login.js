import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      alert('Logged in Successfully!');
      window.location.href = '/dashboard'; // Redirect to dashboard after login
    } catch (error) {
      alert('Error Logging In!');
    }
  };

  return (
      <div >
        <form onSubmit={onSubmit} style={{backgroundColor:'white',  padding:'10px', borderRadius:'10px'}}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={onChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
  );
};

export default Login;
