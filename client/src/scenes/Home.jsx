import Header from "components/Header";
import UserCard from "components/UserCard";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import SubmitPost from "components/SubmitPost";
import PostsList from "components/PostsList";
import { useState } from "react";

const Home = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const { _id, picturePath, location, role} = useSelector((state) => state.user);
  const [filterLocation, setFilterLocation] = useState("");

  const handleChange = (e) => {
    setFilterLocation(e.target.value);
  };

  return (
    <div className="color-gray ">
      <div className="header--color">
        <Header userId={_id} handleChange={handleChange} picturePath={picturePath}/>
      </div>
      <div className="space"></div>
      <div className="home__content">
        { isNonMobileScreens &&
          <div className="home__profile">
            <UserCard userId={_id} handleChange={handleChange} picturePath={picturePath} />
          </div>
        }
        <div className="home__mypost">
          {role === "Recenzent" ? (
            <SubmitPost picturePath={picturePath} location={location} role={role}/>
          ): null }
          
          <PostsList userId={_id} loc={filterLocation} filterList={filterLocation} userRole={role} />
        </div>  
      </div>
    </div>
    
  )
}

export default Home;