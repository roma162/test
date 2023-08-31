import React from 'react'

const UserImage = ({ image, size = "80px" }) => {
  return (
    <div className='userimage'>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`https://tripplanner-zavrsni.onrender.com/assets/${image}`}
      />
    </div>
  )
}

export default UserImage