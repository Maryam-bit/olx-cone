import * as firebase from 'firebase';
import 'firebase/database'
import 'firebase/auth';
import swal from 'sweetalert';

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                            firebase configuration
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

  var firebaseConfig = {
    apiKey: "AIzaSyBy7ZGU0hhaON74PQ-T53Ypub3-vot-Tpw",
    authDomain: "olx-react-88571.firebaseapp.com",
    databaseURL: "https://olx-react-88571.firebaseio.com",
    projectId: "olx-react-88571",
    storageBucket: "olx-react-88571.appspot.com",
    messagingSenderId: "1073942353959",
    appId: "1:1073942353959:web:bc780c764a0fee13e09602",
    measurementId: "G-9QFNQX8LPQ"
  };

//==========================°°°°°°°°°°°°°°°°============================
//                           initialization
//==========================°°°°°°°°°°°°°°°°============================
  
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore = firebase.database();
  const db = firebase.firestore()

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                              get specific Ad id
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
  
function getSpecificAdsId(adsID) {
  return db.collection("posts").doc(adsID).get()
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                                register user
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

async function signupUser({email, password, fullName, phone, fileUrl}) {
  try{
    const user = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    db.collection('users')
    .doc(user.user.uid)
    .set({
      email,
      fullName, 
      phone,
      fileUrl
    })
  }
  catch(e){
    swal("Oops!", "Something wents wrong!", "warning");
  }
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                                 login user
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

function loginUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password)
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                                get all usrs
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

async function getAllUsers(){
  return await db.collection("users").get()
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                                  join Room 
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

async function joinRoom(friendId,chatId) {
  const myUid = localStorage.getItem('userId')
  try{
    console.log('myUid , friendId' , myUid , friendId,chatId)
    var response = await db.collection("chatroom")
    .where('user1', '==', myUid)
    .where('user2', '==', friendId)
    .get()
    console.log('response****',response)
    let foundChatroom = false
    response.forEach(doc => {
      console.log('docData****', doc.data())
      foundChatroom={ ...doc.data(), id:doc.id}
      localStorage.setItem("friendId", friendId)
    })

    if (foundChatroom) return foundChatroom

    var response = await db.collection("chatroom")
    .where('user2', '==', myUid)
    .where('user1', '==', friendId)
    .get()
    foundChatroom = false
    response.forEach(doc => {
      console.log('docData****', doc.data())
      foundChatroom={ ...doc.data(), id:doc.id}
      localStorage.setItem("friendId", friendId)
    })
    if (foundChatroom) return foundChatroom

  return await db.collection('chatroom').add({
      user1: myUid,
      user2:friendId,
      timeStanp:new Date().toLocaleTimeString()
  })

}catch(e){
  alert(e.message)
}
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                             send msg to database
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

function sendMessageToDb(message, chatId){
  const myUid = localStorage.getItem('userId')
  db.collection('chatroom').doc(chatId).collection('messages').add({
    message,
    userId: myUid,
    timeStamp: new Date().toLocaleTimeString()
  })
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                                 get messages
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

async function getMessages(chatId){
  return db.collection("chatroom").doc(chatId).collection('messages').orderBy("timeStamp").get()
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                                  sign out
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

function signOut(){
firebase.auth().signOut()
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                                get friend id
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

async function getFriendData() {
  return await db.collection("users").get()
}

//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================
//                                    export 
//==========================°°°°°°°°°°°°°°°°°°°°°°°°°°============================

export{
  firebase, 
  getSpecificAdsId,
  signupUser,
  loginUser,
  getAllUsers,
  joinRoom,
  sendMessageToDb,
  getMessages,
  signOut,
  getFriendData
}