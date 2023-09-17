import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostCard from "./PostCard";

const PostsList = ({ userId, isProfile = false, filterList, userRole }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const filtered = posts?.post?.filter(filteredPost => {
    if (filterList && filterList !== "Clear Filter") {
      return filteredPost.userLocation === filterList;
    }
    return posts.post;
  });

  useEffect(() => {
    if (isProfile) {
      if (userRole === "Putnik") {
        getPosts();
      } else {
        getUserPosts();
      }
    } else {
      getPosts();
    }
  }, [JSON.stringify(filtered)]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      { filtered?.length !== 0 ? filtered?.slice(0).reverse().map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          role,
          description,
          userLocation,
          location,
          date,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <div key={_id}>
            {isProfile && JSON.stringify(likes).includes(JSON.stringify(loggedInUserId)) && userRole==="Putnik" ? (
              <PostCard
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                role={role}
                description={description}
                userLocation={userLocation}
                location={location}
                date={date}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                isProfile={isProfile}
              />
            ) : !isProfile ? ( 
              <PostCard
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                role={role}
                description={description}
                userLocation={userLocation}
                location={location}
                date={date}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                isProfile={isProfile}
              />
            ) : userRole==="Recenzent" ? (
            
            <PostCard
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`${firstName} ${lastName}`}
                role={role}
                description={description}
                userLocation={userLocation}
                location={location}
                date={date}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                isProfile={isProfile}
              />
            ) : null
            }
          </div>
          
        )
      ) : <p className="empty">There are no posts for this location!</p>} 
    </>
  );
};

export default memo(PostsList);