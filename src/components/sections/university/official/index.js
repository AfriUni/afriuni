import React from 'react';
import Slider from 'react-slick';
import OfficialCard from '../../../cards/officialCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const OfficialSection = (props) => {
  const slideshow = React.useRef(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    pauseOnHover: false,
    slidesToShow: 3.5,
    slidesToScroll: 2,
    autoplay: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          swipeToSlide: true,
        },
      },
    ],
  };

  const onLeftClick = (event) => {
    event.preventDefault();
    slideshow.current.slickPrev();
  };

  const onRightClick = (event) => {
    event.preventDefault();
    slideshow.current.slickNext();
  };

  return (
    <div className="relative">
      <Slider
        {...settings}
        ref={slideshow}
        className="overflow-hidden grid-flow-row auto-rows-fr auto-cols-fr"
      >
        <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none">
          <OfficialCard />
        </div>
        <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none">
          <OfficialCard />
        </div>
        <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none">
          <OfficialCard />
        </div>
        <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none">
          <OfficialCard />
        </div>
        <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none">
          <OfficialCard />
        </div>
        <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none">
          <OfficialCard />
        </div>
      </Slider>

      <div className="absolute left-0 bottom-0 top-0 flex items-center justify-between">
        <a
          className="text-white md:ml-2 bg-black hover:bg-opacity-25 md:p-4 flex items-center p-2 ml-2 rounded-full hover:text-white"
          href="#"
          onClick={(event) => onLeftClick(event)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="md:h-4 md:w-4 w-4 h-4 fill-current block"
          />{' '}
        </a>
      </div>
      <div className="absolute right-0 top-0 bottom-0 flex items-center justify-between">
        <a
          className="text-white md:mr-2 bg-black hover:bg-opacity-25 md:p-4 flex items-center p-2 mr-2 rounded-full hover:text-white"
          href="#"
          onClick={(event) => onRightClick(event)}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="md:h-4 md:w-4 w-4 h-4 fill-current block"
          />{' '}
        </a>
      </div>
    </div>
  );
};

export default OfficialSection;
