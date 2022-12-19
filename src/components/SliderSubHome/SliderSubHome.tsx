import React, { useEffect, useState } from 'react';
import css from './SliderSubHome.module.scss';
import './slick.scss';
import './slick-theme.scss';
import Slider from 'react-slick';

function SliderSubHome() {
  let settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 981,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [imageBanner, setImageBanner] = useState([]);

  useEffect(() => {
    fetch('./data/CompanyCard.json')
      .then(res => res.json())
      .then(data => setImageBanner(data.companyCard));
  }, []);
  return (
    <div>
      <Slider {...settings}>
        {imageBanner.map(({ feed_id, logo_img }) => (
          <div className={css.cardContainer} key={feed_id}>
            <div className={css.imageContainer}>
              <img className={css.cardImage} src={logo_img} alt="회사 이미지" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderSubHome;
