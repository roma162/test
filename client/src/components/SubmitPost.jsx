import React from 'react'
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import {
    Divider,
    InputBase,
    Button,
    IconButton,
  } from "@mui/material";
  import DateTimePicker from 'react-datetime-picker';
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";


const SubmitPost = ({ picturePath, location }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [isDate, setIsDate] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const [place, setPlace] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [value, onChange] = useState(new Date());

    const handlePost = async () => {
        const formData = new FormData();
        const time = value?.toString().substring(0, 21);
        formData.append("userId", _id);
        formData.append("description", post);
        formData.append("location", place);
        if (time) {
            formData.append("date", time);
        } else formData.append("date", "Bilo kada!");

        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        const response = await fetch(`https://tripplanner-zavrsni.onrender.com/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setIsImage(null);
        setIsDate(false);
        onChange(null);
        setPost("");
        setPlace("");
    };

    return (
        <div className='mypost mt-4 '>
            <div className='flex gap'>
                <UserImage image={picturePath} />
                <InputBase
                    placeholder="Preporučite lokaciju za posjetiti..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        borderRadius: "2rem",
                        backgroundColor: "#F6F2F4",
                        padding: "1rem 2rem",
                    }}
                />
            </div>
            <div className='flex gap'>
            {isDate && (
                <div className='mypost__date mt-3'>
                    
                    <InputBase
                        placeholder="Gdje?"
                        onChange={(e) => setPlace(e.target.value)}
                        value={place}
                        sx={{
                            width: "100%",
                            borderRadius: "2rem",
                            backgroundColor: "#F6F2F4",
                            padding: "1rem 2rem",
                        }}
                    />
                    <div className='mypost__date--user-location'>
                        <i className='icons icons--location-user icons--xsm mr-2'/>
                        <span>{location}</span>
                    </div>
                    <DateTimePicker onChange={onChange} value={value} format={"dd-MMMM HH:mm"} locale={"hr"}/>
                </div>
            )}
            </div>
            {isImage && (
                <div className='mypost__dropzone'>
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                        <div className='flex'>
                            <div className='mypost__dropzone--image'
                                {...getRootProps()}
                            >
                            <input {...getInputProps()} />
                            {!image ? (
                                <span>Add Image Here</span>
                            ) : (
                                <div className='flex mr-2'>
                                    <span>{image.name}</span>
                                    <i className='icons icons--edit icons--xsm ml-2'/>
                                </div>
                            )}
                            </div>
                            {image && (
                            <IconButton
                                onClick={() => setImage(null)}
                            >
                                <i className='icons icons--delete icons--xsm'/>
                            </IconButton>
                            )}
                        </div>
                        )}
                    </Dropzone>
                </div>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <div className='flex'>
                <div className='flex' onClick={() => setIsImage(!isImage)}>
                    <i className='icons icons--image icons--xsm mr-2'/> 
                    <span
                        sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                        <span>Slika</span>
                    </span>
                </div>
                <div className='flex' onClick={() => setIsDate(!isDate)}>
                    <i className='icons icons--calendar icons--xsm mr-2'/> 
                    <span
                        sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                        <span>Kada i gdje?</span>
                    </span>
                </div>

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        borderRadius: "3rem",
                        color: "#756eff",
                        backgroundColor: "white",
                    }}
                >
                POŠALJI
                </Button>
            </div>
            </div>
        );
    };

export default SubmitPost