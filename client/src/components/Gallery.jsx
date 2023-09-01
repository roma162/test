import React from 'react';
import Fade from 'react-reveal/Fade';
import { Carousel } from 'react-carousel-minimal';
import Picture0 from '../assets/images/sp.jpg';
import Picture1 from '../assets/images/zg1.jpg';
import Picture2 from '../assets/images/zg2.jpg';
import Picture3 from '../assets/images/db1.jpg';
import Picture4 from '../assets/images/db2.jpg';
import Picture5 from '../assets/images/os.jpg';
import Picture6 from '../assets/images/sp2.jpg';


const data = [
  {
    image: Picture2,
    caption: "Zagreb",
  },
  {
    image: Picture1,
    caption: "Zagreb",

  },
  {
    image: Picture0,
    caption: "Split",
  },
  {
    image: Picture3,
    caption: "Split   ",
  },
  {
    image: Picture4,
    caption: "Dubrovnik",
  },
  {
    image: Picture5,
    caption: "Osijek",
  },
  {
    image: Picture6,
    caption: "Plitvice",
  },
];

const Gallery = () => {
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div>
      <Fade bottom> 
      <div className="gallery">
          <h1>Galerija</h1>
          <h4>Posjetite neke od sljedećih lokacija!</h4>
          <div style={{ textAlign: "center" }}>
          <div style={{
            padding: "0 20px"
          }}>
            <Carousel
              data={data}
              time={2000}
              width="850px"
              height="400px"
              captionStyle={captionStyle}
              radius="10px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={true}
              thumbnailWidth="100px"
              style={{
                textAlign: "center",
                maxWidth: "850px",
                maxHeight: "500px",
                margin: "40px auto",
              }}
            />
          </div>
        </div>
      </div>
    </Fade>
    </div>
  );
}

export default Gallery;
