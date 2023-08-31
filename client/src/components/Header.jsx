import { useState } from "react";
import Select from "@material-ui/core/Select";
import {
    IconButton,
    useMediaQuery
} from "@material-ui/core";
import {
    Menu,
    Close
} from "@mui/icons-material";
import { FormControl, InputBase, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";


const Navbar = ({userId, handleChange, picturePath}) => {

    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id } = useSelector((state) => state.user);


    const fullName = `${user.firstName} ${user.lastName}`; 

    return (
        <div className="header">
            <div className="header__logo-container">
                <i className="icons icons--welcome01 icons--mdlg"></i>
                { isNonMobileScreens &&
                    <div className='flex-o'>
                        <span className="header__logo-container__name">Trip</span>
                        <span className="header__logo-container__name2">Planner</span>
                    </div>
                }
            </div>
            { window.location.href.includes('home') ?
            <div className="header__icon" onClick={() => navigate(`/profile/${userId}`)}>
                <i className="icons icons--profile"></i>
            </div> : 
            <div className="header__icon" onClick={() => navigate(`/home`)}>
                <i className="icons icons--home"></i>
            </div>
            }
            {isNonMobileScreens ? (
                <div className="header__nav">          
                    <FormControl className="header__nav__dropdown" variant="standard" value= {fullName}>
                        <Select 
                            value={fullName} 
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <span className="header__nav__dropdown__user">{fullName}</span>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Odjava</MenuItem>
                        </Select>
                    </FormControl>
                    
                </div>
            ) : ( 
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>
                )}
                {!isNonMobileScreens && isMobileMenuToggled && (
                    <div className="header__nav__toggle">
                        <div className="header__nav__toggle__close">
                            <IconButton sx={{fontSize: "30px"}} onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                                <Close />
                            </IconButton>
                        </div>

                            <div className="header__nav--toggle">
                                <div className="home__profile">
                                    <UserCard userId={_id} handleChange={handleChange} picturePath={picturePath}/>
                                </div>
                                <FormControl variant="standard" value= {fullName}>
                                    <Select 
                                        className="header__nav__dropdown" 
                                        value={fullName} 
                                        input={<InputBase />}
                                    >
                                        <MenuItem value={fullName}>
                                            <span className="header__nav__dropdown__user">{fullName}</span>
                                        </MenuItem>
                                        <MenuItem onClick={() => dispatch(setLogout())}>Odjava</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                    </div>
                )}
        </div>
      );
    };
    
    export default Navbar;
    