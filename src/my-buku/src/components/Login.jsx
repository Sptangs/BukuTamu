import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    setLoading(true);
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then((data) => {
        if (data.auth) {
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/bukutamu');
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container" style={{ height: '510px' }}>
      <div
        className="row"
        style={{
          boxShadow: '0 4px 10px rgba(0.5, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          width: '350px',
          height: '370px',
          marginTop: '120px',
        }}
      >
        <div className="col-md-6 offset-md-3 ml-auto">
          <h1 style={{ margin: '0px 0px 20px -50px', fontWeight: '500' }}>Login</h1>
          <form style={{ margin: '0px 0px 0px -160px' }} onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                style={{ width: '300px', height: '45px', fontSize: '20px', padding: '5px 20px 10px 20px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div
                className="input-group"
                style={{ width: '340px', height: '45px', fontSize: '20px', padding: '5px 20px 10px 20px', marginLeft: '-20px' }}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  style={{ width: '210px', height: '45px', fontSize: '20px', padding: '5px 20px 10px 20px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button" onClick={handleShowPassword}>
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                  </button>
                </div>
              </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: '20px 0px 0px 0px', width: '300px', height: '40px', fontSize: '18px' }}
              disabled={loading} // Disable the button while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
