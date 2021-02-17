import React from 'react';
import styles from '../../../styles/globals.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ButtonRedPrimary } from '../styleComponent/button';
import Dropdown, { ItemDropdown } from '../general/dropdown';
import CategoryMenu from './category';
import CountryMenu from './country';
import { useMediaQuery } from 'react-responsive';
import { ContainerNavStyle } from './styles';
import OthersMenu from './others';
import Link from 'next/link';

import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';

const Header = props => {
    const [openCategory, setOpenCategory] = React.useState(false);
    const [openCountry, setOpenCountry] = React.useState(false);
    const [openOther, setOpenOther] = React.useState(false);

    const container = React.useRef('');

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isOpen, setIsOpen] = React.useState(false);
    const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);

    const [categories, setCategories] = React.useState([]);
    const [locations, setLocations] = React.useState([]);

    const getCategories = async () => {
        const cat = props.header.getCategories();
        return cat;
    };

    const getLocations = async () => {
        const loc = props.header.getLocation();
        return loc;
    };

    React.useEffect(() => {
        getCategories().then(r => {
            setCategories(r.data);
        });

        getLocations().then(r => {
            setLocations(r.data);
        });
        // setCategories();
    }, []);

    React.useEffect(() => {
        const elements = document.querySelector('body');
        if (isOpen) {
            if (isMobile) {
                elements.classList.add('overflow-hidden');
                setOpenCategory(true);
                setOpenCountry(false);
            } else {
                setIsOpen(false);
            }
        } else {
            elements.classList.remove('overflow-hidden');
            setOpenCategory(false);
            setOpenCountry(false);
            setIsOpen(false);
        }

        if (isMobile) {
            setIsCurrentMobile(true);
        } else {
            setIsCurrentMobile(false);
        }
    }, [isOpen, isMobile]);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    React.useEffect(() => {
        if (!isOpen && isCurrentMobile) {
            isOpenCategory();
        }
    }, [isOpen, isCurrentMobile]);

    React.useEffect(() => {
        window.addEventListener('click', addBackDrop);

        return () => {
            window.removeEventListener('click', addBackDrop);
        };
    }, [openCategory, openCountry, openOther]);

    const addBackDrop = e => {
        const currentClick = e.target;

        if (container.current !== null) {
            const checkContainer = container.current.contains(currentClick);
            if (container && !checkContainer) {
                if (!isCurrentMobile) {
                    setOpenOther(false);
                    setOpenCategory(false);
                    setOpenCountry(false);
                }
            }
        }
    };

    const isOpenCategory = () => {
        if (isMobile) {
            setOpenCategory(true);
        } else {
            setOpenCategory(!openCategory);
        }
        setOpenCountry(false);
        setOpenOther(false);
    };

    const isOpenCountry = () => {
        if (isMobile) {
            setOpenCountry(true);
        } else {
            setOpenCountry(!openCountry);
        }
        setOpenCategory(false);
        setOpenOther(false);
    };

    const isOpenOther = () => {
        if (isMobile) {
            setOpenOther(true);
        } else {
            setOpenOther(!openOther);
        }
        setOpenCategory(false);
        setOpenCountry(false);
    };

    return (
        <>
            <ContainerNavStyle className={`${isOpen ? 'openNav' : ''} bg-white shadow-md fixed w-full relative inline-block`}>
                <div className="container mx-auto px-4 text-sm py-4 md:py-0">
                    <nav className="flex justify-between items-center">
                        <div className="md:w-4/5 block md:flex justify-start md:space-x-10 items-center">
                            <div>
                                <Link href="/">
                                    <a>
                                        <img src="../../logo.png" alt="" className="md:h-8 h-8" />
                                    </a>
                                </Link>
                            </div>
                            <div
                                className={`menuMobile ${
                                    isOpen ? 'open' : ''
                                } md:fixed md:relative z-30 bg-custom-menu md:bg-white left-0 right-0 top-0 md:h-auto md:w-4/5 h-screen`}
                                ref={container}
                            >
                                <div className="md:flex justify-between items-center md:space-x-20">
                                    <div className="flex items-center">
                                        <div className={`${styles.tabMenu} ${openCategory ? styles.tabMenuOpen : ''}`} onClick={isOpenCategory}>
                                            Courses
                                            <span className="hidden md:inline">
                                                <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-3 w-3" />
                                            </span>
                                        </div>
                                        <div className={`${styles.tabMenu} ${openCountry ? styles.tabMenuOpen : ''}`} onClick={isOpenCountry}>
                                            Countries
                                            <span className="hidden md:inline">
                                                <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-3 w-3" />
                                            </span>
                                        </div>
                                        {isCurrentMobile && (
                                            <div className={`${styles.tabMenu} ${openOther ? styles.tabMenuOpen : ''}`} onClick={isOpenOther}>
                                                Others
                                            </div>
                                        )}
                                    </div>
                                    <div onClick={toggleNav} className="absolute top-0 right-0 py-6 px-6 md:hidden">
                                        <FontAwesomeIcon icon={faTimes} className="w-3 text-custom-primary" />
                                    </div>
                                </div>
                                {(openCategory || openCountry || openOther) && (
                                    <div className="md:border-t border-gray-200 shadow-xl md:rounded-b-lg absolute right-0 left-0 md:h-auto md:bg-white origin-top z-30 h-full overflow-y-scroll md:overflow-hidden">
                                        <div className="container mx-auto md:px-6 md:py-4 text-sm">
                                            {openCategory && <CategoryMenu data={categories} />}

                                            {openCountry && <CountryMenu data={locations} />}

                                            {openOther && <OthersMenu />}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-5 items-center">
                            <Dropdown
                                title={'XAF'}
                                classDropdown="mt-1 w-auto rounded-md shadow-lg"
                                className="space-x-2 font-semibold text-custom-primary_2 cursor-pointer inline-flex justify-center items-center py-6 hidden md:flex"
                            >
                                <ItemDropdown value={'XAF'}>XAF</ItemDropdown>
                                <ItemDropdown value={'EURO'}>EURO</ItemDropdown>
                                <ItemDropdown value={'USD'}>USD</ItemDropdown>
                            </Dropdown>
                            <ButtonRedPrimary className="rounded-lg text-sm hidden md:inline-block">+ Add your university</ButtonRedPrimary>
                            <div className="md:hidden" onClick={toggleNav}>
                                <FontAwesomeIcon icon={faBars} className="w-5 text-custom-primary" />
                            </div>
                        </div>
                    </nav>
                </div>
            </ContainerNavStyle>

            {/*<div className="absolute inset-0">*/}
            {/*</div>*/}
        </>
    );
};

// export default Header;
export default compose(inject('header'), observer)(Header);
