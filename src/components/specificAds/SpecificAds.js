import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../header/Header'
import './specificAds.css'
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Footer1 , Footer2} from '../footer/footer'




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                               specific ads
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




export default function SpecificAds() {




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                 state
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




    const { adsID } = useParams()
    const [specificAdsData, setSpecificAdsData] = useState([])  
  const [specificUserData, setSpecificUserData] = useState([]);

    useEffect(() => {
        fetchSpecificAd()
    }, [])




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                          fetch specific ad data
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================





    const fetchSpecificAd= async () => {
        const db = firebase.firestore()
        const getData = await db.collection("posts").doc(adsID).get()
        setSpecificAdsData(getData.data())
        setSpecificUserData(getData.data().userProfile)
    }




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                rendering
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




    return (
        <div>
            < Header />
            
            <div className="specificAd container-fluid p-5">
            {specificAdsData && 
                <div className="row">
                <div className="col-md-7">
                        <div className="card shadow ml-3 " style={{ border: '1px solid lightgrey'}}>
                            <img className="card-img-top" style={{ padding: 60 }} src={specificAdsData.postURL} alt="" />

                        </div>
                    </div>
                     
                     <div className="col-md-5">
                         <div className="row">
                             <div className="col-md-12">
                                 <div className="card  mb-3">
                                     <div className="card-body">
                                                <p style={{fontSize:24, fontWeight:600, color:'black'}}>RS {specificAdsData.price}</p>
                                            <p style={{color:'grey', fontSize:20, marginTop:-16}}>{specificAdsData.title}</p>
                                         <p style={{color:"grey", fontSize:13}}>{specificAdsData.place}</p>
                                            <p style={{position:"absolute", bottom:"10%", right:"2%", color:'grey', fontSize:12}}>{specificAdsData.date}</p>
                                     </div>
                                     <div className="circle4"><i className="fa fa-heart" style={{marginTop:12, marginLeft:12, fontWeight:600}}></i></div>
                                 </div>
                             </div>
                         </div>
 
 
                         <div className="row">
                             <div className="col-md-12">
                                 <div className="card mb-3">
                                     <div className="card-body">
                                     <p style={{fontSize:22, fontWeight:600}}>Seller Description</p>
                                    {specificUserData &&
                                        <img className="rounded-circle" src={specificUserData.fileUrl} width="70" /> 
                                    } 
                                        <span style={{ fontWeight:700, fontSize:17,marginLeft:20}}>{specificAdsData.name}</span>
                                        <Link to="/chats">
                                        <button style={{backgroundColor:'#6b968b', marginTop:7,color:'white', display:"block", width:'100%', border:'none', paddingTop:6, paddingBottom:6, borderRadius:7}}>Chat with seller</button>
                                        </Link>
                                        <i className="fa fa-phone" style={{display:'inline-block', marginTop:15, fontSize:17, color:"grey", marginLeft:15}}></i>
                                        <span style={{textAlign:'center',fontSize:15, color:'grey', marginLeft:7}}>{specificAdsData.number}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <p style={{fontSize:22, fontWeight:600}}>Posted In</p>
                                        <p style={{fontSize:15, color:"grey"}}>{specificAdsData.place}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }  
<br/>
            {specificAdsData && 
                <div className="row">
                    <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                        <p style={{fontSize:24, fontWeight:600, color:'black'}}>Description</p>
                        <p style={{fontSize:14, color:'grey'}}>{specificAdsData.description}</p>
                        </div>
                    </div>
                    </div>
                </div>
            }
            </div>
            <Footer1 />
            <Footer2 />
        </div>
    ) 
}