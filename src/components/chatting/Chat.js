import React, { useState, useEffect } from 'react'
import { getAllUsers, joinRoom } from '../../config/firebase'
import {useHistory} from 'react-router-dom'
import './chat.css'




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                chat list
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




export default function Chat() {
  const [users , setUsers] = useState([])
  const history = useHistory()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    fetchAlllUsers()
  }, [])




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                             fetch all usees
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================

  const fetchAlllUsers = async() => {
    try{
      const response = await getAllUsers()
      const tempUsers = []
      response.forEach(doc => {
      tempUsers.push({...doc.data(), id:doc.id})
    })    
      setUsers(tempUsers)
    } catch(e){
      alert(e.message)
    }
  }




//=========================================°°°°°°°°°°°°°°°°°°°°°°°=================================================
//                                            navigate to chat
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const navigateToChat = async (id) => {
    const chatroom = await joinRoom(id)
    console.log('chatroom***',chatroom.id)
    history.push(`/chatroom/${chatroom.id}`)
  }



  
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                               rendering
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
  



  return (
  
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-2"></div>


        <div className="col-md-8">
          <div className="chatlist card shadow">

            <div className="card-header p-3" style={{backgroundColor:"#6b968b"}}>
              <h5 style={{fontWeight:700, color:"white",display:"inline-block", paddingTop:4 }}>CHATLIST</h5>
            </div>

            <div className="body">
              <ul style={{listStyleType: 'none'}}>
                {users.map(({fullName, id, fileUrl}) => {
                  return id !== userId && <li key={id} onClick={()=> navigateToChat(id)}>
                    <div className="row pt-2">
                      <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                        <img src={fileUrl} width="37px" className="rounded-circle" style={{position:'relative', left:15}} alt="" />
                      </div>
                      <div className="col-lg-10 col-md-10 col-sm-12 col-12" style={{cursor: "pointer"}}>
                        <span className="d-none d-md-block " style={{ fontWeight:700, color:"#142e2e" , marginLeft:-47}}>{fullName}</span>
                        <p style={{color:'grey', fontSize:13, marginLeft:-47}}>It is your message</p>
                      </div>
                    </div>
                  </li>
                })}
              </ul>
            </div>

          </div>
        </div>
        <div className="col-md-2"></div>

      </div>
    </div>
  )
}