/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';

Modal.setAppElement('#__next');

Modal.defaultStyles.overlay.zIndex = '2000';
Modal.defaultStyles.overlay.backgroundColor = '#0000004d';

const Carousel = ({ images, images_medium,  title }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const slideshow = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [initModalShow, setInitModalShow] = React.useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    pauseOnHover: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
    ],
  };

  const settingsModal = {
    dots: false,
    infinite: false,
    speed: 500,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    swipeToSlide: true,
  };

  const defaultStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '30px',
      width: '80%',
    },
  };
  const [customStyles, setCustomStyles] = React.useState(defaultStyles);
  const [isScreenMobile, setIsScreenMobile] = React.useState(false);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  const onOpenModal = (index) => {
    setIsOpen(!isOpen);
    setInitModalShow(index);
  };

  const onLeftClick = (event) => {
    event.preventDefault();
    slideshow.current.slickPrev();
  };

  const onRightClick = (event) => {
    event.preventDefault();
    slideshow.current.slickNext();
  };

  React.useEffect(() => {
    if (isMobile) {
      const styles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          paddingTop: '0px',
          paddingBottom: '0px',
          paddingLeft: '0px',
          paddingRight: '0px',
          width: '100%',
          height: '100%',
        },
      };

      setCustomStyles(styles);
      setIsScreenMobile(true);
    } else {
      setCustomStyles(defaultStyles);
      setIsScreenMobile(false);
    }
  }, [isMobile]);

  return (
    <div className="relative">
      <Slider {...settings} ref={slideshow} className="overflow-hidden">
        {images_medium &&
        images_medium.length > 0 &&
        images_medium.map((img, index) => (
            <div
              className="relative px-1 pt-2 outline-none cursor-pointer md:px-2 focus:outline-none"
              onClick={() => onOpenModal(index)}
              key={index}
            >
              <img src={img} alt="" className="object-contain w-full h-32"/>
            </div>
          ))}
      </Slider>

      <div className="absolute top-0 bottom-0 left-0 items-center justify-between hidden md:flex">
        <a
          className="flex items-center p-2 ml-2 text-white bg-black rounded-full md:ml-2 hover:bg-opacity-25 md:p-4 hover:text-white"
          href="#"
          onClick={(event) => onLeftClick(event)}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="block w-4 h-4 fill-current md:h-4 md:w-4"
          />{' '}
        </a>
      </div>
      <div className="absolute top-0 bottom-0 right-0 items-center justify-between hidden md:flex">
        <a
          className="flex items-center p-2 mr-2 text-white bg-black rounded-full md:mr-2 hover:bg-opacity-25 md:p-4 hover:text-white"
          href="#"
          onClick={(event) => onRightClick(event)}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="block w-4 h-4 fill-current md:h-4 md:w-4"
          />
        </a>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel={'title modal'}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        bodyOpenClassName="modal"
      >
        <div className="relative w-full h-full">
          <div className="relative p-4 mb-5 md:p-0">
            <button
              onClick={onClose}
              className="absolute top-0 bottom-0 right-0 flex items-center px-3 py-2 text-xs rounded-xl"
            >
              <FontAwesomeIcon icon={faTimes} className="h-3 mr-2 text-custom-primary" />
            </button>
            <h2 className="mt-2 mb-4 text-xl font-semibold">Gallery of {title}</h2>
            <hr />
          </div>

          <div className="overflow-hidden h-miniscreen">
            <Slider {...settingsModal} initialSlide={initModalShow} className="overflow-hidden">
              {images &&
                images.length > 0 &&
                images.map((img, i) => (
                  <div className="relative px-1 pt-2 outline-none md:px-2 focus:outline-none" key={i}>
                    <img src={img} alt="" className="object-contain w-full h-miniscreen" />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Carousel;
