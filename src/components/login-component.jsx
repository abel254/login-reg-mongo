import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(email, password);

    fetch('https://mauve-binturong-coat.cyclic.app//login-user', {
      mode: 'no-cors',
      method: 'POST', 
      crossDomain: true,
      headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body:JSON.stringify({
        email,
        password
      }),
    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data, 'userRegister');
      if(data.status === 'ok'){
        alert('Login successful')
        window.localStorage.setItem('token', data.data)
        window.localStorage.setItem('loggedIn', true)

        window.location.href='./userDetails'
      }
    })
  }

  return (
    <div className="row">
      <div className="offset-lg-4 col-lg-4" style={{ marginTop: "120px" }}>
        <form onSubmit={handleSubmit} className="container">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="card-body">
              <div className="form-group mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-control"
                  onChange={e=> setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  onChange={e=>setPassword(e.target.value)}
                />
              </div>

              <div className="form-group mt-3">
                <input type="checkbox" id="customCheck1" />
                <label htmlFor="customCheck1">Remember me</label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary m-3">Submit</button>
            </div>

            <p className="text-right ms-auto pe-3"> Forgot
              <a href="/sign-up"> password?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
