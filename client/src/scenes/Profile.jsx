import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "components/Header";
import UserCard from "components/UserCard";
import PostsList from "components/PostsList";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const { role, picturePath} = useSelector((state) => state.user);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;
    
  return (
    <div className="color-gray">
      <div className="header--color">
        <Header picturePath={picturePath}/>
      </div>
      <div className="space"></div>
      <div className="home__content">
        {isNonMobileScreens &&
          <div className="home__profile">
            <UserCard userId={userId} picturePath={picturePath} />
          </div>
        }
        <div className="home__mypost">     
          <PostsList userId={userId} isProfile userRole={role} />
        </div>  
      </div>
    </div>
  );
};

export default ProfilePage;