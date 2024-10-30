import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      alert('Registered Successfully!');
    } catch (error) {
      alert('Error Registering!');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{backgroundColor:'white',  padding:'10px', borderRadius:'10px'}}>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={onChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={onChange} required />
      <button type="submit">Register</button>
    </form>
  );
}
export default Register;