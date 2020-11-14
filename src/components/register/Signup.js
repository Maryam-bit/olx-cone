import React, {useState } from 'react'
import { useHistory } from "react-router-dom"
import { signupUser } from '../../config/firebase'
import './register.css'
import olxImg from '../../images/olx.png'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import firebase from 'firebase';




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                 Sign up
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




export default function Signup  () {




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                  state
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const history = useHistory()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [fileUrl, setFileUrl] = useState(null)




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                              onFileChange
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const onFileChange = function (e) {
    const file = e.target.files[0]
    const storageRef = firebase.storage().ref(`Adds/${file.name}`);
    storageRef.put(file).then(function (res) {
      res.ref.getDownloadURL().then(function (url) {
        console.log('url---====::=:->', url)
        console.log('file url fromstate', url)
        setFileUrl(url)
      })
    })
  }




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                register
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const signup = async function () {
    signupUser({fullName, email, password, phone, fileUrl})
  history.replace('/login')
  }
  



//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                 render
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================

  


  return (
    <div className="container-fluid login">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 mt-5">
          <div className="card shadow">
            <div className="card-header text-center">
              <img src={olxImg} width="60" alt=""/>
            </div>
            <div className="card-body">

              <input type="text" placeholder="Name"
              onChange={e => setFullName(e.target.value)}
              /><br/><br/>

              <input type="text" placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              /><br/><br/>

              <input type="number" placeholder="Number"
              onChange={e => setPhone(e.target.value)}
              /><br/><br/>

              <input type="password" placeholder="Create password"
              onChange={e => setPassword(e.target.value)}
              /><br/><br/>

              <div className="ml-3"
                onChange={onFileChange}>
                <h5 style={{textAlign:'left', color:'#6b968b', marginLeft:6, fontSize:15}}>Upload Photo</h5>
                <SingleImageUploadComponent />
              </div>

              <button className="login" onClick={signup}>sign up</button>
              
              <Link to="login"><p>Signed In?</p></Link>

            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                              Image Uploader
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
      imgPreview = <img src={this.state.file} style={{width:'4.8rem', height:'4.7rem', position:"relative", bottom:85,right:90, opacity:0.7}} alt='' />;
    }

    return (
      <form>
        <div className="form-group">
        <div className="icons card p-4 button-wrapper" style={{ width: '5rem' }}>
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