import React, { useState } from 'react'
import './register.css'
import { useHistory } from "react-router-dom"
import olxImg from '../../images/olx.png'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import { loginUser } from '../../config/firebase'
import swal from 'sweetalert';
import oneImg from '../../images/1.webp'
import twoImg from '../../images/2.webp'
import threeImg from '../../images/3.webp'




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                  Login
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




export default function Login(){




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                  State
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                on login
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const onLogin = async function () {
    try {
        const user = await loginUser(email, password)
        history.replace('/mainOLX')
        swal("Logged In!", "Sucessfully!", "success");
        localStorage.setItem("userId", user.user.uid)

    } catch (error) {
        swal("Oops!", "Something wents wrong!", "warning");
    }
}




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                               render login
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  return (
    <div className="container-fluid login">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 mt-5">
          <div className="card shadow mt-5">
            <div className="card-header text-center">
              <img src={olxImg} width="60" alt=""/>
            </div>
            <div className="card-body">

              <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img  src={oneImg} width="50" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={twoImg} width="50" alt="" />
                  </div>
                  <div className="carousel-item">
                    <img src={threeImg} width="50" alt="" />
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>

              <input type="text" placeholder="Enter your Email"
              onChange={e => setEmail(e.target.value)}
              style={{marginTop:15}}
              /><br/><br/>

              <input type="password" placeholder="Enter your Password"
              onChange={e => setPassword(e.target.value)} 
              /><br/><br/>

              <button onClick={onLogin}>Login</button>
              <Link to="signup"><p>Not logged in?</p></Link>

            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}
