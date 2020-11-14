import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
import firebase from "firebase";
 



//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                   Ads
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




export default function Ads(props) {
  const history = useHistory();
  const [cards, setCards] = useState([]);


  useEffect(() => {
    fetchAds();
  }, []);




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                fetch ads
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const fetchAds = async () => {
    const db = firebase.firestore();
    const getData = await db.collection("posts").get();
    const showAds = [];
    getData.forEach((doc) => {
      console.log("ID OF Document ****************** ", doc.id);
      showAds.push({ ...doc.data(), adsID: doc.id });
    });
    setCards(showAds);
    console.log(showAds);
  };




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                               filter cards
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  const filterCards = cards.filter(card =>{
    return card.title.toLowerCase().includes(props.searchVal.toLowerCase())
  })




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                rendering
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




  return (
    <div className="ads container-fluid pr-5 pl-5">
      <div className="row">
        {filterCards.map((cards) => (

          <div className="col-md-3 pb-5">

            <div className="card shadow mt-2"  
             onClick={() => history.push(`./detail/${cards.adsID}`)} >

              <div style={{paddingLeft:32, paddingRight:32, textAlign:'center'}}>
                <img style={{ height: "13.1rem" }} className="card-img-top" key={cards.fileURL} src={cards.postURL} alt=""/>
              </div>

              <button className="butn">FEATURED</button>
              <div className="circle4"></div>

              <div className="card-body">
                <span style={{fontSize:22.1, color:'#142e2e', fontWeight:700, display:'block'}}>RS {cards.price}</span>
                <span style={{color:'grey', display:'block', marginBottom:19}}>{cards.title}</span>
                <span style={{color: 'grey', fontSize:11.1, position:'absolute', right:10, bottom:8}}>{cards.date}</span>
              </div>
            </div>
          </div>
        ))}
        <br />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

