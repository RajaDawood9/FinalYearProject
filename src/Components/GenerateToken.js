import React, { useState } from 'react';
import axios from 'axios';

const GenerateToken = () => {
  const [token, setToken] = useState('');

  const generateToken = async () => {
    try {
      const res = await axios.post('/api/auth/generate-token', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setToken(res.data.token);
      alert('Token generated successfully!');
    } catch (error) {
      alert('Error generating token!');
    }
  };

  return (
    <div>
      <button onClick={generateToken}>Generate Token</button>
      {token && <p>Your Token: {token}</p>}
    </div>
  );
};

export default GenerateToken;
