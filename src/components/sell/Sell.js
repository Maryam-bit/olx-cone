import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { Footer1,Footer2 } from '../footer/footer'
import * as firebase from 'firebase';
import logo from '../../images/olx.png'
import './sell.css'
import swal from 'sweetalert';




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                 SellNav
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




function SellNav() {

    return (
      <div>
        <nav className="navbar navbar-light bg-light p-3 shadow">
          <a className="navbar-brand" href="#">
            <Link to="/"> <i className="fa fa-arrow-left" style={{ fontWeight: 400, marginRight: 25, marginLeft: 10, color: 'black' }}></i>
              <img src={logo} width="50" alt="" /></Link>
          </a>
        </nav>
        <SellInfo />
      </div>
    )
}




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                               img uploader
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




 class SingleImageUploadComponent extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
          file: null
      }
      this.uploadSingleFile = this.uploadSingleFile.bind(this)
      this.upload = this.upload.bind(this)
  }

  uploadSingleFile(e) {
      this.setState({
          file: URL.createObjectURL(e.target.files[0])
      })
  }

  upload(e) {
      e.preventDefault()
      console.log(this.state.file)
  }

  render() {
      let imgPreview;
      if (this.state.file) {
          imgPreview = <img src={this.state.file} style={{width:'5.4rem', height:'5.4rem', position:"absolute", top:'35%',left:'5%', opacity:0.7}} alt='' />;
      }

    return (
      <form>
        <div className="row form-group">
          <div className="icons p-4 card button-wrapper">
            <span class="label"><i className="fa fa-camera" onClick={this.upload}></i></span>
            <input type="file" name="upload" id="upload" class="upload-box form-control" onChange={this.uploadSingleFile} placeholder="Upload File" />
          </div>
        </div>

        <div className="form-group preview">
          {imgPreview}
        </div>
      </form >
    )
  }
}




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                           collecting post info
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




function SellInfo () {



//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                  states
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const history = useHistory();
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] =useState('')
  const [name, setName] =useState('')
  const [place, setPlace] =useState('')
  const [number, setNumber] =useState('')
  const [fileUrl, setFileUrl] = useState(null)
  const [userProfile, setUserProfile] = useState([]);




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                              img to storage
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const onFileChange = function (e) {
    const file = e.target.files[0] 
    const storageRef = firebase.storage().ref(`Adds/${file.name}`); 
    storageRef.put(file).then(function (res) {
      res.ref.getDownloadURL().then(function (url) {
        console.log('url--->', url)
        setFileUrl(url)
        console.log('file url from sell', fileUrl)
      })
    })
  }

console.log('file url ====================>>>>>>>>>', fileUrl)
console.log('user profile===================>>>>>>>>>', userProfile)




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                      send data to db on form submit
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const onSubmit = (e) => {
    e.preventDefault();

    const today = new Date(),
    date = new Date().toLocaleDateString(); // 11/16/2015
    firebase.firestore().collection("posts")
        .add({
            category,
            title,
            description,
            price,
            name,
            place,
            number,
            postURL: fileUrl,
            date, 
            userProfile
        }).then(() => {
        history.replace('/mainOLX')
        swal("Your data has been submitted!", "Sucessfully!", "success");
        }).catch((error) => {
        swal("Oops!", "Something wents wrong!", "warning");
        })

    setCategory('') 
    setTitle('')
    setDescription('')
    setPrice('')
    setName('')
    setPlace('')
    setNumber('')
  }
  useEffect(() => {
    fetchProfile()
  }, [])




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                             fetch user data
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const fetchProfile = async () => {
    const db = firebase.firestore();
    const userId = localStorage.getItem('userId')
    const data = await db.collection("users").doc(userId).get()
    setUserProfile(data.data());
  };




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                               rendering
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================





    return (
      <>
        <form onSubmit={onSubmit}>

            <div className="main">
              <p style={{textAlign:"center", fontSize:25, fontWeight:700, marginTop:11}}>POST YOUR AD</p><br />
            
              <div className="mainCard shadow" style={{width:'60rem', margin:"0 auto"}}>
             
                <div className="childCard card p-3">
                  <p className="headings" style={{ fontSize:15, fontWeight:600, color:'#6b968b'}}>CATEGORY</p>
                  <input type="text" onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Category" />
                </div>

                <div className="childCard card p-3">
                  <p className="headings" style={{fontSize:15, fontWeight:600, color:'#6b968b'}}>INCLUDE SOME DETAILS</p>
                  <span>
                    <input type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Add title"
                   />
                    <p style={{fontSize:11, color:'#b3b4b5', marginLeft:8, marginTop:2}}>Mention the key features of your item e.g (brand , model , age , type)</p>
                  </span>

                  <span>
                    <textarea id="w3review" name="w3review" rows="4" cols="60"
                  onChange={(e) => setDescription(e.target.value)} value={description}  placeholder='Description'
                    ></textarea>
                    <p style={{fontSize:11, color:'#b3b4b5', marginLeft:8, marginTop:2}}> Include Conditions , features and reason for selling.</p>
                  </span>
                </div>

                <div className="childCard card p-3">
                  <p className="headings" style={{fontSize:15, fontWeight:600, color:'#6b968b'}}>SET A PRICE</p>
                  <div class="form-text"> 
                    <input type='text' id="youridhere" style={{paddingLeft:38}} onChange={(e) => setPrice(e.target.value)} value={price} />  
                    <label for="youridhere" class="static-value" style={{ color:"grey", position:'absolute', left:25, top:65}}>RS |</label>
                  </div>
                </div>

                <div className="childCard card p-3" onChange={onFileChange}>
                  <p className="headings" style={{fontSize:15, fontWeight:600, color:'#6b968b'}}>UPLOAD PHOTO</p>
                  <SingleImageUploadComponent />
                </div>

                <div className="childCard card p-3">
                  <p className="headings" style={{fontSize:15, fontWeight:600, color:'#6b968b'}}>CONFIRM YOUR LOCATION</p>
                  <input type='text' id="youridhere" onChange={(e) => setPlace(e.target.value)} value={place} placeholder="Place" />  
                </div>

                <div className="childCard card p-3">
                  <p className="headings" style={{fontSize:15, fontWeight:600, color:'#6b968b'}}>REVIEW DETAILS</p>
                  <img src={userProfile.fileUrl} className="rounded-circle" width="100" /><br />
                  <input type='text' onChange={(e) => setName(e.target.value)} value={name} placeholder="Your Name"/><br />
                  <input type='text' id="youridhere" onChange={(e) => setNumber(e.target.value)} value={number} placeholder="Number"/>
                </div>

                <div className="childCard card p-3">
                  <button type="submit" >Post </button>
                </div>

              </div>
            </div>
        </form>
        <br />
        <br />
        <Footer1 />
        <Footer2 />
      </>
    )
}




export {
  SellNav,
  SellInfo
}