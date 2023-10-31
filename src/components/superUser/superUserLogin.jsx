import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuperUserLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'superuser',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/superUser/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        userType: 'superuser',
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === 'ok') {
          window.localStorage.setItem('superUserAuthenticated', data.data);
          navigate('/superUser'); // Redirect upon successful login
        } else if (data.error === 'Invalid Password') {
          setError('Invalid Password');
        } else {
          setError('Login Unsuccessful');
        }
      })
      .catch((error) => {
        setError('Network error. Please try again later.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Super User Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {error && <div>{error}</div>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
