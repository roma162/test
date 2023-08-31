import React from 'react'
import { Element, Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@material-ui/core";
import LoginIcon from '@mui/icons-material/Login';
import AboutUs from 'components/AboutUs';
import Contact from 'components/Contact';
import Gallery from 'components/Gallery';
import Footer from 'components/Footer';
import Form from "../components/Form"

const Welcome = () => {
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    return (
        <div>
            <div className="header header--wl">            
                <div className="header__logo-container">
                    <i className="icons icons--welcome01 icons--mdlg"></i>
                    { isNonMobileScreens &&
                    <div className='flex-o'>
                        <span className="header__logo-container__name">Trip</span>
                        <span className="header__logo-container__name2">Planner</span>
                    </div>
                    
                    }
                </div>
                {isNonMobileScreens ? (        
                    <ul className="header__nav--wl">
                        <li className='header__nav__item'>
                            <Link to="test1" spy={true} smooth={true} offset={-200} duration={500}>O nama</Link>
                        </li>
                        <li className='header__nav__item'>
                            <Link to="test2" spy={true} smooth={true} offset={-50} duration={500}>Galerija</Link>
                        </li>
                        <li className='header__nav__item'>
                            <Link to="test3" spy={true} smooth={true} offset={-50} duration={500}>Kontakt</Link>
                        </li>
                        <li className='header__nav__item'>
                            <Link onClick={() => navigate("/login")} >Prijava</Link>
                        </li>
                    </ul>
                ) : <LoginIcon onClick={() => navigate("/login")} sx={{fontSize: "30px", cursor: "pointer"}}/>
                }
            </div>
         
            <div className="wl-container" >
                <h3> “Ulaganje u putovanje je ulaganje u sebe." </h3>            
            </div>

            <Element name="test1" className="element">
                <AboutUs />
            </Element>
            <Element name="test2" className="element">
                <Gallery />
            </Element>
            {isNonMobileScreens && (
            <div className="space"></div> )}
            <Element name="test3" className="element">
                <Contact />
            </Element>
            {isNonMobileScreens && (
            <div className="space"></div> )}
            {isNonMobileScreens && (
            
            <div className='login__wl'>
                <div className="login__wl--form">
                    <h1>Pridružite nam se sada!</h1>
                    <Form />
                </div>
                <div className="about-us__ilustration mt-4" >          
                    <i className=" icons--login-form"></i>
                </div>
            </div>
            )}
            <div className="space"></div>
            <Footer />
        </div>
    )
}

export default Welcome