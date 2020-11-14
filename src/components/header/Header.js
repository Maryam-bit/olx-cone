import React, { useState, useEffect } from 'react'
import './header.css'
import olxLogo from '../../images/olx.png'
import { firebase } from '../../config/firebase'
import mainImg from '../../images/mainPageImage.jpg'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import {signOut} from '../../config/firebase';




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                 Header
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




function Header(props){




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                   State
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userImage, setUserImage] = useState([]);
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        fetchUserImage()
        checkUser()
    }, [])




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                              fetching img  
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




    const fetchUserImage= async () => {
        if(userId != null){
        const db = firebase.firestore();
        const UserId = localStorage.getItem('userId')
        const data = await db.collection("users").doc(UserId).get()
        console.log("ušerI headerr------->",UserId)
        setUserImage(data.data());
    }
    }




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                 logout
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




const logOut = async function () {
    try {
        const user = await signOut()
        localStorage.removeItem('userId')
        alert("signout sucecsfully")
    } catch (e) {
        alert(e.message)
    }
    setIsLoggedIn(true)
}




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                               user checker
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




const checkUser = () => {
    let userId = localStorage.getItem('userId')
    if (userId != null) {
        setIsLoggedIn(true)
    }
}




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                              Render Header
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




        return(
            <div className="HeaderMain container-fluid">
                <div className="row">

                    <div className="logo">
                        <img  src={olxLogo}/>
                    </div>

                    <div className="searchBar">
                        <input type="text" placeholder="Find Cars, Mobile phones and more.." onChange={(e) => props.searchMethod(e.target.value)}/>
                    </div>

                    <div className="search-icon">   
                        <i className="fa fa-search"></i>
                    </div>

                    <div className="rightBar">
                        <Link to="/chats"><i className="fa fa-comment-o"></i></Link>

                        {/* {isLoggedIn  */}
                        {!isLoggedIn && userId === null
                         ? 
                            <Link to="/login"><a style={{fontWeight:700, marginRight:12, position:'relative', top:-6, color:'#54756d'}}>Login</a></Link>
                        :
                            <> 
                                <img className="rounded-circle" src={userImage.fileUrl} width="30px"/> 
                                    <div className="dropdown"> 
                                        <span className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="fa fa-angle-down"></i> 
                                        </span> 
                                        <div className="dropdown-menu"> 
                                            <a  onClick={logOut}  style={{marginLeft:10, padding:10, fontSize:13, color:'#54756d', fontWeight:700}}>LogOut</a>
                                        </div>
                                    </div>
                            </>
                        }

                        <button>
                            <Link to="/sell">
                                <i className="fa fa-plus" style={{color:'black'}}></i><span style={{color:'black'}}>SELL</span>
                                </Link>
                        </button>

                    </div>
                </div>
            </div>
        )
    }




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                  MainImg
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




class MainImg extends React.Component {
    render(){
        return(
            <div>
                <img src={mainImg} width='100%' alt="" />
            </div>
        )
    }
}




export{
    Header,
    MainImg,
};