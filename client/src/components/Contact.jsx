import React from 'react'
import Fade from 'react-reveal/Fade';
import {  Divider } from "@mui/material";

const Contact = () => {
  return (
    <div className=''>
      <Fade bottom>
        <div className="about-us mt-4" >
          <div className="about-us__ilustration mb-4" >          
              <i className=" icons--contact ml-3"></i>
            </div>
            <div className="about-us_content mt-4" >
              <h1>Gdje nas možete pronaći!</h1>
              <div className='contact mt-4 mb-4'>
              <h4>Ukoliko imate bilo kakvih pitanja, pošaljite upit na e-mail ili nas posjetite na lokaciji.</h4>
              <Divider sx={{ color: "#9B9A9C" }} textAlign="left"></Divider>
                <div className='contact__icons mt-3'>
                  <i className="icons icons--mail icons--sm mb-2"></i>
                  <span>trip.planner@gmail.com</span>
                </div>
                <div className='contact__icons'>
                  <i className="icons icons--location icons--sm mb-2"></i>
                  <span>Ul. cara Hadrijana 10b, 31000, Osijek</span>
                </div>
                <div className='contact__icons'>
                  <i className="icons icons--phone icons--sm mb-4"></i>
                  <span>031 495 400</span>
                </div>
                <Divider sx={{ color: "#9B9A9C" }} textAlign="left"></Divider>
              </div>
            </div>
        </div>

      </Fade>
    </div>
  )
}

export default Contact