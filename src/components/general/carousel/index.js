import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useMediaQuery } from 'react-responsive';

Modal.setAppElement('#__next');

Modal.defaultStyles.overlay.zIndex = '2000';
Modal.defaultStyles.overlay.backgroundColor = '#0000004d';

const Caroussel = props => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const slideshow = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [currentSlide, setCurrentSlide] = React.useState(0);
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

    React.useEffect(() => {}, []);

    const onClose = () => {
        setIsOpen(!isOpen);
    };

    const onOpenModal = index => {
        setIsOpen(!isOpen);
        setInitModalShow(index);
    };

    const onLeftClick = event => {
        event.preventDefault();
        slideshow.current.slickPrev();
    };

    const onRightClick = event => {
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
                <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none" onClick={() => onOpenModal(1)}>
                    <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-full" />
                </div>

                <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none" onClick={() => onOpenModal(2)}>
                    <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-full" />
                </div>

                <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none" onClick={() => onOpenModal(3)}>
                    <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-full" />
                </div>

                <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none" onClick={() => onOpenModal(4)}>
                    <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-full" />
                </div>

                <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none" onClick={() => onOpenModal(5)}>
                    <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-full" />
                </div>

                <div className="relative px-1 md:px-2 pt-2 cursor-pointer outline-none focus:outline-none" onClick={() => onOpenModal(6)}>
                    <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-full" />
                </div>
            </Slider>

            <div className="absolute left-0 bottom-0 top-0 hidden md:flex items-center justify-between">
                <a
                    className="text-white md:ml-2 bg-black hover:bg-opacity-25 md:p-4 flex items-center p-2 ml-2 rounded-full hover:text-white"
                    href="#"
                    onClick={event => onLeftClick(event)}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="md:h-4 md:w-4 w-4 h-4 fill-current block" />{' '}
                </a>
            </div>
            <div className="absolute right-0 top-0 bottom-0 hidden md:flex items-center justify-between">
                <a
                    className="text-white md:mr-2 bg-black hover:bg-opacity-25 md:p-4 flex items-center p-2 mr-2 rounded-full hover:text-white"
                    href="#"
                    onClick={event => onRightClick(event)}
                >
                    <FontAwesomeIcon icon={faChevronRight} className="md:h-4 md:w-4 w-4 h-4 fill-current block" />{' '}
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
                <div className="relative h-full w-full">
                    <div className="mb-5 md:p-0 p-4 relative">
                        <button onClick={onClose} className="absolute text-xs right-0 top-0 bottom-0 flex rounded-xl items-center py-2 px-3">
                            <FontAwesomeIcon icon={faTimes} className="h-3 h-3 text-custom-primary mr-2" />
                        </button>
                        <h2 className="text-xl font-semibold mt-2 mb-4">Gallery of american university</h2>
                        <hr />
                    </div>

                    <div className="h-miniscreen overflow-hidden">
                        <Slider {...settingsModal} initialSlide={initModalShow} className="overflow-hidden">
                            <div className="relative px-1 md:px-2 pt-2 outline-none focus:outline-none">
                                <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-miniscreen" />
                            </div>

                            <div className="relative px-1 md:px-2 pt-2 outline-none focus:outline-none">
                                <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-miniscreen" />
                            </div>

                            <div className="relative px-1 md:px-2 pt-2 outline-none focus:outline-none">
                                <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-miniscreen" />
                            </div>

                            <div className="relative px-1 md:px-2 pt-2 outline-none focus:outline-none">
                                <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-miniscreen" />
                            </div>

                            <div className="relative px-1 md:px-2 pt-2 outline-none focus:outline-none">
                                <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-miniscreen" />
                            </div>

                            <div className="relative px-1 md:px-2 pt-2 outline-none focus:outline-none">
                                <img src="../slider/gallery.jpg" alt="" className="object-contain w-full h-miniscreen" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Caroussel;
