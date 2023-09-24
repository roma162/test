import {  Divider, IconButton, InputBase, Button } from "@mui/material";
import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import UserImage from "./UserImage";

const PostCard = ({
  postId,
  postUserId,
  name,
  role,
  description,
  userLocation,
  location,
  date,
  picturePath,
  userPicturePath,
  likes,
  comments,
  isProfile,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const { firstName, lastName} = useSelector((state) => state.user);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [newComment, setNewComment] = useState("");

  const patchLike = async () => {
    const response = await fetch(`https://tripplanner-zavrsni.onrender.com/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));

  };

  const postComment = async () => {
    const response = await fetch(`https://tripplanner-zavrsni.onrender.com/posts/${postId}/comments`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: firstName + " " + lastName + ":  " + newComment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  }
  
  const postDelete = async () => {
    if(window.confirm('Potvrdite brisanje ove objave!')){
      console.log(postId)
      try {
        const response = await fetch(`https://tripplanner-zavrsni.onrender.com/posts/${postId}`, {
          method: 'DELETE',
          headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          }
        });
        if (response.status === 204) {
          window.location.reload();
        } else {
          console.error('Error deleting post');
        }
      } catch (error) {
        console.error('Error deleting post', error);
      }
    }
  }
  
  return (
    <div className="posts mt-4" key={postId}>
      <div className="posts__info">
        
        <UserImage image={userPicturePath} size="55px" />
        <div className="posts__name ml-4">
        
          <div className="mt-4">
            <h4>
              {name} {role}
            </h4>
            <div className="flex-o ml-4 mb-4">
              <i className='icons icons--location icons--xxsm mr-1 mb-4'/>
              <h5>{userLocation}</h5>
            </div>
          </div>
          <div className="flex-o">
            <div className="block"> 
            { location &&
            <>
              <Divider sx={{ color: "#9B9A9C" }} textAlign="left"><h6>Lokacija</h6></Divider>
              <div>
                
                <span>
                  {location}  
                </span>
              </div>
            </>
            }
            <Divider sx={{ color: "#9B9A9C" }} textAlign="left"><h6>Datum</h6></Divider>
              <div>
                {date}
              </div>
            </div>
            {isProfile && postUserId === loggedInUserId ? 
              <IconButton onClick={postDelete} className="posts__iconbtn">
                <i className="icons icons--x-delete"/>
              </IconButton> : null
            }
          </div>
        </div>   
      </div>
      <Divider sx={{ color: "#9B9A9C" }} textAlign="left"><h6>Opis</h6></Divider>
      <div className="posts__desc">
        <span>{description}</span>
      </div>
      {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem", borderTop: "0.75px solid #d5d5d5"}}
            src={picturePath}
          />
      )}
      <div>
        <div className="flex">
          <div>
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <i className="icons icons--heart-minus icons--sm"/>
            ) : (
              <i className="icons icons--heart-plus icons--sm"/>
            )}
          </IconButton>
          <span>{likeCount}</span>
            </div>
          <div>
          <IconButton onClick={() => setIsComments(!isComments)}>
              <i className="icons icons--comment icons--sm"/>
          </IconButton>
          </div>
      </div>

      {isComments && (  
        <div className="posts__comment" mt="0.5rem">
          <InputBase
            placeholder="Podjelite što mislite o ovome..."
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            sx={{
                width: "100%",
                borderRadius: "2rem",
                backgroundColor: "#F6F2F4",
                padding: "1rem 2rem",
            }}
          />
          <Button
            disabled={!newComment}
            onClick={postComment}
            sx={{
                borderRadius: "3rem",
                color: "#756eff",
                backgroundColor: "white",
            }}
          >
            Komentiraj
          </Button>
          {Object.keys(comments)?.slice(0).reverse().map((comment, i) => (
            <div key={`${name}-${i}`}>
              <Divider />
              <span>
                {comment}
              </span>
            </div>
          ))}
      
          <Divider />
        </div>
      )}

      </div>
      
    </div>
  );
};

export default memo(PostCard);
