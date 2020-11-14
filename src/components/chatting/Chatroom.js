import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { sendMessageToDb, getMessages, joinRoom , getFriendData} from '../../config/firebase'
import firebase from 'firebase'
import './chat.css'




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                 Chatroom
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




export default function Chatroom() {
   const {chatId} = useParams()
   const userId = localStorage.getItem('userId')
   const [message, setMessage] = useState('')
   const [messages, setMessages] = useState([])
   const [myimg, setMyimg]=useState([])
   const [userData, setUserData]=useState([])
   // const { friendId } = useParams()
   const friendId = localStorage.getItem("freindId")


   useEffect(() => {
      showMessages()
   fetchUserData();
   fetchUserImage()
   fetchMyImg()
   }, [])




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                             show messages
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




   const showMessages = async() =>{
      const response = await getMessages(chatId)
      console.log('chat id', chatId)
      const tempMessages=[]
      response.forEach(doc=>{
         tempMessages.push(doc.data())
      })
      setMessages(tempMessages)
   }




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                               send message
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




   const sendMessage = async () => {
      await sendMessageToDb(message, chatId)
      showMessages()
   }




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                              get friend id
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================


const fetchUserImage= async () => {
   if(userId != null){
   const db = firebase.firestore();
   const friendUid = localStorage.getItem('friendId')
   const data = await db.collection("users").doc(friendUid).get()
   console.log("ušerI headerr------->",friendId)
   setUserData(data.data());
}
}




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                             fetch user image
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================





const fetchMyImg= async () => {
   const db = firebase.firestore();
   const myUid = localStorage.getItem('userId')
   const data = await db.collection("users").doc(myUid).get()
   setMyimg(data.data());
}




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                            fetch user data
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================





   const fetchUserData = async () => {
      try {
        const response = await getFriendData()
        const tempUsers = []
        response.forEach(doc => {
          tempUsers.push({ ...doc.data(), id: doc.id })
        })
        setUserData(tempUsers)
      } catch (e) {
        alert(e.message)
      }
    }
    
  console.log("userData**** from chatroom", userData)
  



//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                 render
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




   return (

      <div>
         <div className="container chatroom">
            <div className="row">

               <div className="col-md-2"></div>

         

               <div className="col-md-8">

                  <div className="card shadow mt-5" style={{height:500}}>




                     {userData && 
                        <div className="card-header" style={{backgroundColor:"#6b968b"}}>
                           <img src={userData.fileUrl} width="41px" className="rounded-circle" alt="" />
                           <span  style={{fontWeight:700, color:"white", marginLeft:5}}>{userData.fullName}</span>
                        </div>
                     }




                     <div className="card-body ">
                        {messages.map(item => {
                           return <div style={{
                                 textAlign:userId === item.userId ? 'right' : 'left', 
                                 marginBottom:10,
                           }}>
                              <p style={{
                                 background:userId===item.userId 
                                 ? 'linear-gradient(#c5dbd4, #b8d1c9, #a7c2b9)'
                                 : 'linear-gradient(#c5dbd4, #b8d1c9, #a7c2b9)',
                                 color:'#49635a',
                                 display:'inline',
                                 fontFamily: 'Underdog, cursive',
                                 fontFamily: 'Balsamiq Sans, cursive',
                                 padding:'5px 15px 17px 15px',
                                 borderRadius:'7px',
                                 letterSpacing:0.6,
                                 fontSize:14,
                              }}>
                                 {item.message}
                              </p>
                              <p style={{fontSize:8.3, color:'#6e706f', marginTop:-1, 
                                 textAlign:userId === item.userId ? 'right' : 'left', 
                                 marginRight:userId === item.userId ? '3' : '-7', 
                                 position:'relative',
                              }}>
                                 {item.timeStamp}
                              </p>
                           </div>
                        })}            
                     </div>




                     <div className="card-footer" style={{width:'100%'}}>
                        <div className="row">
                           <input type="text" placeholder="Type Here" class="form-control form-rounded inputfield" 
                              style={{
                                 border:'none', 
                                 borderRadius:"20px" , 
                                 width:"85%", 
                                 marginLeft:13,
                                 backgroundColor: '#f2f2f2',
                                 boxShadow: '0 4px 2px -2px #c5c7c5' ,
                                 color: '#6b968b',
                                 padding: '15px 15px 15px 15px',
                                 fontSize:14
                              }}
                              onChange={e => setMessage(e.target.value)}
                           />
                           <i className="fa fa-send -o" style={{fontSize:20,marginTop:6,width:"6%", marginLeft:20}} onClick={()=>sendMessage()} id="button"></i>
                        </div>
                     </div>
                  </div>
               </div>




               <div className="col-md-2"></div>

            </div>
         </div>

      </div>
   )
}
