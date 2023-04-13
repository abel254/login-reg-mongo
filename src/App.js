import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login-component";
import SignUp from "./components/signup-component";
import UserDetails from "./components/userDetails";

function App() {
  const isLoggedIn = window.localStorage.getItem('loggedIn')
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={isLoggedIn === 'true' ? <UserDetails/> : <Login/>}></Route>
          <Route path="/sign-in" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/userDetails" element={<UserDetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
