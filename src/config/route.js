import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import MainOLX from '../components/MainOLX'
import {SellNav, SellInfo} from '../components/sell/Sell'
import SpecificAds from '../components/specificAds/SpecificAds'
import  Login  from '../components/register/Login'
import  Signup  from '../components/register/Signup'
import Chat from  '../components/chatting/Chat'
import Chatroom from '../components/chatting/Chatroom'

export default function MainRouter ({ isLoggedIn, isLoading }) {
    if (isLoading) return <img width="150" style={{marginLeft:'45%',marginTop:'15%'}} src='https://cdn.lowgif.com/small/ee5eaba393614b5e-pehliseedhi-suitable-candidate-suitable-job.gif' /> 
    console.log('window.location.pathname***', window.location.pathname)
    const currentPath = window.location.pathname.length === 1 ? '/' : window.location.pathname

    return (
        <Router>
            <div>
                <Switch>

                    <Route  path="/" exact>
                        <Redirect to={currentPath} /> <MainOLX />
                    </Route>

                    <Route path="/sell">
                        {isLoggedIn ? <Redirect to={currentPath} /> && <SellNav /> : <MainOLX />}
                    </Route>

                    <Route path="/mainOLX" component={MainOLX}></Route>

                     <Route path="/sellingadd">
                        {AuthChecker(isLoggedIn, <SellInfo />)}
                    </Route>

                    <Route path="/detail/:adsID">
                        <SpecificAds/>
                    </Route>

                    <Route path="/login" component={Login}></Route>

                    <Route path="/signup" component={Signup}></Route>

                    <Route path="/chats">
                        {AuthChecker(isLoggedIn, <Chat />)}
                    </Route>


                    <Route path="/chatroom/:chatId">
                        <Chatroom />
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}
function AuthChecker(isLoggedIn, component) {
    return isLoggedIn ? component : <Redirect to='/' />
}