import React from 'react';
import Fade from 'react-reveal/Fade';
import ImageGallery from 'react-image-gallery';
import Picture0 from '../assets/images/sp.jpg';
import Picture1 from '../assets/images/zg1.jpg';
import Picture2 from '../assets/images/zg2.jpg';
import Picture3 from '../assets/images/db1.jpg';
import Picture4 from '../assets/images/db2.jpg';
import Picture5 from '../assets/images/os.jpg';
import Picture6 from '../assets/images/sp2.jpg';


const images = [
  {
    original: Picture2,
    thumbnail: Picture2,
  },
  {
    original: Picture1,
    thumbnail: Picture1,

  },
  {
    original: Picture0,
    thumbnail: Picture0,
  },
  {
    original: Picture3,
    thumbnail: Picture3,
  },
  {
    original: Picture4,
    thumbnail: Picture4,
  },
  {
    original: Picture5,
    thumbnail: Picture5,
  },
  {
    original: Picture6,
    thumbnail: Picture6,
  },
];

const Gallery = () => {
  return (
    
    <div>
      <Fade bottom>
        <div className='gallery'>
          <h1>Galerija</h1>
          <h4>Posjetite neke od ovih lokacija!</h4>
          <ImageGallery items={images} />
        </div>
      </Fade>
    </div>
  )
  
};

export default Gallery;