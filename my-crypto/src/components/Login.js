import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('cryptouser');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const logindata = async () => {
    let result = await fetch('http://127.0.0.1:5000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        auth: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log("hello", result);
    if (result.auth) {
      localStorage.setItem('cryptouser', JSON.stringify(result.user));
      localStorage.setItem('token', JSON.stringify(result.auth));
      navigate('/');
      console.log(result.name);
    } else {
      console.log('no user found');
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">User Login</h1>
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
                  onClick={logindata}
                >
                  Login
                </button>
                <p>New User? <Link to='/register'>Register</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
