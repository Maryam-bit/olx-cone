import React from 'react'
import './footer.css'




//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================
//                                                foooter 1
//=========================================°°°°°°°°°°°°°°°°°°°°°°°==================================================




function Footer1() {
  return(
    <div className="footer1 container-fluid pl-5">
      <div className="row">

        <div className="col-md-9">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <span className="footerHeading">POPULAR CATEGORIES</span>
                <span className="footerText">Cars</span>
                <span className="footerText">Flats for rent</span>
                <span className="footerText">Jobs</span>
                <span className="footerText">Mobile Phones</span>
              </div>
              <div className="col-md-3">
                <span className="footerHeading">TRENDING SEARCHES</span>
                <span className="footerText">Bikes</span>
                <span className="footerText">Watches</span>
                <span className="footerText">Books</span>
                <span className="footerText">Dogs</span>
              </div>
              <div className="col-md-3">
                <span className="footerHeading">ABOUT US</span>
                <span className="footerText">About OLX group</span>
                <span className="footerText">OLX Blog</span>
                <span className="footerText">Contact Us</span>
                <span className="footerText">OLX for Business</span>
              </div>
              <div className="col-md-3">
                <span className="footerHeading">OLX</span>
                <span className="footerText">Help</span>
                <span className="footerText">Sitemap</span>
                <span className="footerText">Legal & Privacy information</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <span className="footerHeading">FOLLOW US</span>
                <span className="footerIcon"><i className="fa fa-facebook"></i></span>
                <span className="footerIcon"><i className="fa fa-play"></i></span>
                <span className="footerIcon"><i className="fa fa-twitter"></i></span>
                <span className="footerIcon"><i className="fa fa-instagram"></i></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}






function Footer2(){
    return(
      <div className="footer2">
        <span className="fLeft"><b>Other Countries  </b> India - South Africa - Indonesia</span>
        <span className="fRight"><b>Free Classifieds in Pakistan</b> . © 2006-2020 OLX</span>
      </div>
    )
}

export{
Footer1,
Footer2
}