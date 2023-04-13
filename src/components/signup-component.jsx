import React, { useEffect, useState } from 'react'

const SignUp = () => {
  const[firstname, setFirstname] = useState('')
  const[lastname, setLastname] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  

  const handleSubmit = (e) =>{
    e.preventDefault()
    let regobh = {firstname, lastname, email, password}
    console.log(regobh);

    fetch('https://login-reg-mongo.herokuapp.com/register', {
      mode: 'no-cors',
      method: 'POST', 
      crossDomain: true,
      headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body:JSON.stringify({
        firstname,
        lastname,
        email,
        password
      }),
    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data, 'userRegister');
    })
  }

  return (
    <div className="row">
      <div className="offset-lg-4 col-lg-4" style={{ marginTop: "50px" }}>
        <form onSubmit={handleSubmit} className="container">
          <div className="card">
            <div className="card-header">
              <h3>Sign Up</h3>
            </div>
            <div className="card-body">

            <div className="form-group mb-3">
                <label>First name</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="form-control"
                  onChange={e=> setFirstname(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label>Last name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="form-control"
                  onChange={e=> setLastname(e.target.value)}
                />
              </div>

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
                  onChange={e=> setPassword(e.target.value)}
                />
              </div>

            
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary m-3">Sign Up</button>
            </div>

            <p className="text-right ms-auto pe-3"> Already registered 
              <a href="/sign-in"> sign in?</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
