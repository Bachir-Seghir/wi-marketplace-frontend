import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import ReactImageMagnify from 'react-image-magnify';
import imgsrc from '../public/AC_SX466_.jpg';
import imgsrclarge from '../public/AC_SL1500_.jpg';
//import reactImageSize from 'react-image-size';
function GaleryMagnifier() {
  const [selectedImage, setSelectedImage] = useState();

  const [dimensions, setDimensions] = useState({ width: 1203, height: 1274 });

  // get dimension of the selected image in galery
  /* async function getDimension(imgSrc) {
    const { width, height } = await reactImageSize(imgSrc);
    setDimensions({ width, height });
  }

  useEffect(() => {
    getDimension(selectedImage.largeSrc);
  }, [selectedImage]); */
  return (
    <div className='galery'>
      <div className='galery__magnify'>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: 'Wristwatch by Ted Baker London',
              isFluidWidth: true,
              src: imgsrc,
            },
            largeImage: {
              src: imgsrclarge,
              width: dimensions.width,
              height: dimensions.height,
            },
            enlargedImageContainerDimensions: {
              width: '205%',
              height: '200%',
            },
            shouldUsePositiveSpaceLens: true,
            lensStyle: {
              'background-size': '3px 3px',
              'background-image':
                'linear-gradient(to right, grey 1px, transparent 1px)linear-gradient(to bottom, grey 1px, transparent 1px',
            },
          }}
        />
      </div>
      <div className='galery__list'>
        <ul>
          {/* {images.map((item) => (
            <li
              onClick={() => setSelectedImage(item)}
              key={item.id}
              className={classNames('galery__list__item', {
                'is-active': selectedImage.id === item.id,
              })}>
              <image src={item.thumbSrc} alt='' />
            </li>
          ))} */}
          <li className='galery__list__item' key='1'>
            <img src={imgsrc} alt='' />
          </li>
          <li className='galery__list__item' key='2'>
            <img src={imgsrc} alt='' />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GaleryMagnifier;
