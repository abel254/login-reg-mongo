import React, { useEffect, useState } from 'react'

const UserDetails = () => {

  const [userdata, setUserdata] = useState('')

  useEffect(()=>{
    fetch('http://localhost:5000/userData', {
      method: 'POST', 
      crossDomain: true,
      headers:{
        'Content-Type': 'application/json',
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body:JSON.stringify({
        token:window.localStorage.getItem('token')
      }),
    })
    .then((res)=> res.json())
    .then((data)=>{
      console.log(data, 'userData');
      setUserdata(data.data)
      if(data.data === 'token expired'){
        alert('Token expired login again')
        window.localStorage.clear()
        window.location.href = './sign-in'
      }
    })
  },[])

  const logOut = () =>{
    window.localStorage.clear()
    window.location.href = './sign-in'
  }
  return (
    <div className="row">
      <div className='col-lg-5 offset-lg-4' style={{ marginTop: "150px" }}>
        <div className="card">
          <div className="card-body">
            <div>
            Name <h2>{userdata.firstname}</h2>
            email <h2>{userdata.email}</h2>
            <button onClick={logOut} className="btn btn-primary mt-3">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
