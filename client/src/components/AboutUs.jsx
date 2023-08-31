import React from 'react'
import Fade from 'react-reveal/Fade';

const AboutUs = () => {
  return (
    <div>
      <Fade bottom>
        <div className="about-us color-white" >
            <div className="about-us_content mt-4" >
              <h1>O nama</h1>
              <h4>
                Trip Planner je web aplikacija za planiranje putovanja uz pomoć preporuka lokalnog stanovništva.
              </h4>
              <h6> Ukoliko planirate posjetiti jedan od većih Hrvatskih gradova prijavite se i pogledajte 
                prekrasne lokacije koje lokalno stanovništvo toga grada preporučuje. Ili ukoliko ste 
                stanovnik jednog od ponuđenih gradova i mislite da neke lokacije zaslužuju da ih više ljudi posjeti,
                podijelite ih sa svijetom.
              </h6>
            </div>
            <div className="about-us__ilustration mt-4" >          
              <i className=" icons--aboutus"></i>
            </div>
        </div>
      </Fade>
    </div>
  )
}

export default AboutUs