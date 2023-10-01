import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('cryptouser');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const savedata = async () => {
    let result = await fetch('http://127.0.0.1:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        auth: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    localStorage.setItem('cryptouser', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.token));
    navigate('/');
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Sign Up</h1>
              <p className="text-center">Please fill in this form to create an account.</p>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={savedata}
                >
                  Submit
                </button>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
