import React from 'react';
import Head from 'next/dist/next-server/lib/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faChevronDown,
    faChevronRight,
    faCircle,
    faMapMarkerAlt,
    faMinus,
    faPlayCircle,
    faPlus,
    faShare,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import Caroussel from '../../src/components/general/carousel';
import Dropdown, { ItemDropdown } from '../../src/components/general/dropdown';
import styles from '../../styles/globals.module.scss';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';
import { Button, ButtonDefault, ButtonRedSecondary } from '../../src/components/styleComponent/button';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import DropdownMulti from '../../src/components/general/dropdownMulti';
import ShowMoreText from 'react-show-more-text';
import OfficialSection from '../../src/components/sections/university/official';

const UniversityPage = props => {
    const router = useRouter();
    const [isPremium, setIsPremium] = React.useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);
    const [listData, setListData] = React.useState([]);

    React.useEffect(() => {
        if (isMobile) {
            setIsCurrentMobile(true);
        } else {
            setIsCurrentMobile(false);
        }
    }, [isMobile]);

    React.useEffect(() => {
        if (router.query?.q) setIsPremium(true);
    }, [router.query]);

    React.useEffect(() => {
        const list = [
            {
                name: 'Ingenierie',
                subMenu: [
                    {
                        name: 'subcategory',
                    },
                    {
                        name: 'subcategory',
                    },
                    {
                        name: 'subcategory',
                    },
                    {
                        name: 'subcategory',
                    },
                    {
                        name: 'subcategory',
                    },
                    {
                        name: 'subcategory',
                    },
                ],
            },
            {
                name: 'Information Technology',
                subMenu: [
                    {
                        name: 'subcategory 2',
                    },
                    {
                        name: 'subcategory 2',
                    },
                    {
                        name: 'subcategory 2',
                    },
                    {
                        name: 'subcategory 2',
                    },
                    {
                        name: 'subcategory 2',
                    },
                    {
                        name: 'subcategory 2',
                    },
                ],
            },
            {
                name: 'Science',
                subMenu: [
                    {
                        name: 'subcategory 3',
                    },
                    {
                        name: 'subcategory 3',
                    },
                    {
                        name: 'subcategory 3',
                    },
                    {
                        name: 'subcategory 3',
                    },
                    {
                        name: 'subcategory 3',
                    },
                    {
                        name: 'subcategory 3',
                    },
                ],
            },
        ];

        // const content = "The American University of Cairo is Located in Cairo, Cairo Governorate. Cairo is the political and economic capital of Egypt. Cairo has a population of over 10 million inhabitants. The population of Cairo is predominantly muslim and Cairo is the birth place of the Arab league. Cairo accounts for 10% of Egypt’s population and 22% of its economy. Cairo’s economy is largely based on government functions, trade, tourism";
        //
        // console.log(content.length);

        setListData(list);
    }, []);

    return (
        <div>
            <Head>
                <title>University - Afriuni</title>
            </Head>

            <div className="bg-white">
                <div className="container mx-auto px-4 py-5">
                    <div className="flex flex-wrap items-center justify-start space-x-3 text-sm text-custom-primary">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                        <FontAwesomeIcon icon={faChevronRight} className="w-2" />
                        <Link href="/country">
                            <a>Countries</a>
                        </Link>
                        <FontAwesomeIcon icon={faChevronRight} className="w-2" />
                        <Link href="/country/south-africa">
                            <a>South Africa</a>
                        </Link>
                        <FontAwesomeIcon icon={faChevronRight} className="w-2 hidden md:inline" />
                        <span className="hidden md:inline">American University in Cairo</span>
                    </div>
                </div>
            </div>

            {isPremium && !isCurrentMobile && (
                <div className="container mx-auto px-4">
                    <div className="relative">
                        <img src="../bgUniv.jpg" alt="" className="object-cover h-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute left-0 right-0 bottom-0 bg-transparent">
                            <div className="flex px-10 py-10 space-x-10 items-center">
                                <div>
                                    <div className="bg-white rounded-xl p-1">
                                        <img src="../logoUniv.jpg" alt="" className="object-contain h-full w-32" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-4xl font-medium text-white">American University in Cairo</h1>
                                    <div className="flex space-x-3 my-5 md:mb-4 md: mt-2 text-white text-sm md:text-lg">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4" /> <span>AUC Avenue, PO Box 74 New Cairo, Cairo</span>
                                    </div>

                                    <div className="flex items-center md:space-x-8 w-full justify-between md:justify-start">
                                        <div>
                                            <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-2 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                                <FontAwesomeIcon icon={faThumbsUp} className="md:w-5 w-3" /> <span>Like</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-2 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                                <FontAwesomeIcon icon={faShare} className="md:w-5 w-3" /> <span>Share</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-2 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                                <FontAwesomeIcon icon={faPlayCircle} className="md:w-5 w-3" /> <span>Watch Video</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto md:px-4 md:my-10">
                <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-0">
                    <div className="col-span-2">
                        {((isPremium && isCurrentMobile) || !isPremium) && (
                            <div className="bg-white border border-gray-200 md:p-4 py-4 px-4 md:mb-6 mb-4">
                                <div className="flex justify-between">
                                    <div className="">
                                        <h1 className="text-2xl md:text-3xl font-medium text-black">American University in Cairo</h1>
                                        <div className="flex items-center space-x-2 md:space-x-3 my-5 md:my-3 text-gray-600 text-xs md:text-base">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="md:w-4 w-3" />{' '}
                                            <span>AUC Avenue, PO Box 74 New Cairo, Cairo</span>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="border border-gray-200 rounded-xl p-1">
                                            <img src="../logoUniv.jpg" alt="" className="object-contain" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center md:space-x-8 w-full justify-between md:justify-start">
                                    <div>
                                        <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                            <FontAwesomeIcon icon={faThumbsUp} className="md:w-5 w-3" /> <span>Like</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                            <FontAwesomeIcon icon={faShare} className="md:w-5 w-3" /> <span>Share</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-3 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                            <FontAwesomeIcon icon={faPlayCircle} className="md:w-5 w-3" /> <span>Watch Video</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isPremium && isCurrentMobile && (
                            <div className="mb-6 -mt-4">
                                <img src="../bgUniv.jpg" alt="" className="object-cover h-64" />
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-1 md:gap-2">
                            <div className="px-2 md:px-4 md:py-3 py-2 rounded-t-xl border-l border-r border-t border-gray-200 bg-white flex items-center justify-center text-center cursor-pointer">
                                <span className="text-red-400 md:text-lg font-normal">Overview</span>
                            </div>
                            <div className="px-2 md:px-4 md:py-3 py-2 rounded-t-xl bg-custom-primary_3 bg-opacity-25 flex items-center justify-center text-center cursor-pointer">
                                <span className="text-black text-xs md:text-base font-normal">Courses (75)</span>
                            </div>
                            <div className="px-2 md:px-4 md:py-3 py-2 rounded-t-xl bg-custom-primary_3 bg-opacity-25 flex items-center justify-center text-center cursor-pointer">
                                <span className="text-black text-xs md:text-base font-normal">Admission</span>
                            </div>
                            <div className="px-2 md:px-4 md:py-3 py-2 rounded-t-xl bg-custom-primary_3 bg-opacity-25 flex items-center justify-center text-center cursor-pointer">
                                <span className="text-black text-xs md:text-base font-normal">
                                    Faculties <span className="hidden md:inline"> & Departments</span>
                                </span>
                            </div>
                        </div>
                        <div className="md:bg-white border border-gray-200 md:p-8 p-0 md:mb-6 mb-0">
                            <div className="grid md:grid-cols-3 grid-cols-1 md:divide-x divide-gray-200">
                                <div className="col-span-2 bg-white md:bg-transparent p-6 md:p-0 border border-gray-200 md:border-0 mb-4 md:mb-0">
                                    <div className="text-justify md:pr-6">
                                        <ShowMoreText
                                            /* Default options */
                                            lines={10}
                                            more="Read more"
                                            less="Show less"
                                            className="text-justify"
                                            anchorClass="text-custom-primary font-normal"
                                            expanded={false}
                                        >
                                            <p>
                                                Overview of American University in Cairo. The American University in Cairo (AUC) is an Independent,
                                                English Language private research University in Cairo, Egypt. The University was founded in 1414 by
                                                Americans devated to education and service in the Middle East.
                                            </p>

                                            <p>
                                                The founding president, Charles Watson, sought to create an english language University based on high
                                                Standard of conduct and University did based on high Standard of conduct and University based on high
                                                Standard of University based on high Standard of conduct
                                            </p>
                                        </ShowMoreText>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white p-4 md:p-0 border border-gray-200 md:border-0">
                                    <div className="md:pl-6 pl-2 space-y-2">
                                        <div className="flex items-start space-x-1 text-base">
                                            <span className="w-1/12 pt-2">
                                                <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                                            </span>{' '}
                                            <span className="w-11/12">Private Institution</span>
                                        </div>
                                        <div className="flex items-start space-x-1 text-base">
                                            <span className="w-1/12 pt-2">
                                                <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                                            </span>{' '}
                                            <span className="w-11/12">6,600 Students</span>
                                        </div>
                                        <div className="flex items-start space-x-1 text-base">
                                            <span className="w-1/12 pt-2">
                                                <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                                            </span>{' '}
                                            <span className="w-11/12">
                                                Cairo, Egypt <img src="../Flag_of_South_Africa.svg" alt="" className="w-6 h-6 inline-block ml-2" />
                                            </span>
                                        </div>
                                        <div className="flex items-start space-x-1 text-base">
                                            <span className="w-1/12 pt-2">
                                                <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                                            </span>{' '}
                                            <span className="w-11/12">Undergraduate Tuition Fees 15,528 - 17, 640 USD</span>
                                        </div>
                                        <div className="flex items-start space-x-1 text-base">
                                            <span className="w-1/12 pt-2">
                                                <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                                            </span>{' '}
                                            <span className="w-11/12">Postgraduate Tuition fees 6,450 - 17,640 USD</span>
                                        </div>
                                        <div className="flex items-start space-x-1 text-base">
                                            <span className="w-1/12 pt-2">
                                                <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                                            </span>{' '}
                                            <span className="w-11/12">Ranking: 3rd in Africa (QsUniversity Rankings)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 md:p-6 p-0 md:mb-6 mb-4">
                            <Caroussel />
                        </div>

                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                {/*<FontAwesomeIcon icon={faBookOpen} className="w-6" /> */}
                                <span>Study Programmes (75)</span>
                            </div>
                            <div className="md:p-6 p-4">
                                <div className="flex items-center space-x-6">
                                    <div className="md:w-1/3 w-1/2">
                                        <DropdownMulti
                                            title={'Courses Catégories'}
                                            className="bg-gray-200 flex md:pl-4 pl-3 justify-between items-center text-black font-normal truncate rounded-lg md:text-base text-xs"
                                            maxHeight="100%"
                                            classChevron="ml-4 md:p-4 px-2 py-3 bg-custom-primary text-white"
                                            classDropdown="mt-1 rounded-md shadow-lg md:w-700 w-300"
                                            position="center"
                                            data={listData}
                                        />
                                    </div>
                                    <div className="w-1/2 md:w-1/3">
                                        <Dropdown
                                            title={'Study Level'}
                                            className="bg-gray-200 md:pl-4 pl-3 flex justify-between items-center font-normal text-black truncate rounded-lg md:text-base text-xs"
                                            maxHeight="250px"
                                            classChevron="ml-4 md:p-4 px-2 py-3 bg-custom-primary text-white"
                                            classDropdown="mt-1 rounded-md shadow-lg"
                                            position="center"
                                        >
                                            <ItemDropdown value={'Country'} classInactive="font-medium text-custom-primary">
                                                All Study Level
                                            </ItemDropdown>
                                            <ItemDropdown value={'Cameroon'} classInactive="text-custom-primary">
                                                Cameroon
                                            </ItemDropdown>
                                            <ItemDropdown value={'South Africa'} classInactive="text-custom-primary">
                                                South Africa
                                            </ItemDropdown>
                                            <ItemDropdown value={'France'} classInactive="text-custom-primary">
                                                France
                                            </ItemDropdown>
                                        </Dropdown>
                                    </div>
                                    <div className="hidden md:block md:w-1/3">
                                        <Dropdown
                                            title={'Durations'}
                                            className="bg-gray-200 md:pl-4 pl-2 flex justify-between items-center font-normal text-black truncate rounded-lg md:text-base text-sm"
                                            maxHeight="250px"
                                            classChevron="md:p-4 p-3 bg-custom-primary text-white"
                                            classDropdown="mt-1 rounded-md shadow-lg"
                                            position="center"
                                        >
                                            <ItemDropdown value={'Country'} classInactive="font-medium text-custom-primary">
                                                All Durations
                                            </ItemDropdown>
                                            <ItemDropdown value={'Cameroon'} classInactive="text-custom-primary">
                                                Cameroon
                                            </ItemDropdown>
                                            <ItemDropdown value={'South Africa'} classInactive="text-custom-primary">
                                                South Africa
                                            </ItemDropdown>
                                            <ItemDropdown value={'France'} classInactive="text-custom-primary">
                                                France
                                            </ItemDropdown>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div className="m-3 md:m-6">
                                <table className="min-w-full">
                                    {!isCurrentMobile && (
                                        <thead className="text-xl text-gray-400 uppercase font-normal">
                                            <tr>
                                                <td className="hidden md:table-cell">Programmes</td>
                                                <td className="hidden md:table-cell">Study Level</td>
                                                <td className="text-right hidden md:table-cell">Duration</td>
                                            </tr>
                                        </thead>
                                    )}
                                    <tbody>
                                        <tr>
                                            <td colSpan={3} className="md:text-2xl text-xl font-normal text-black pt-4 md:pt-6 pb-3">
                                                Agriculture
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={3} className="md:text-2xl text-xl font-normal text-black pt-4 md:pt-6 pb-3">
                                                Agriculture
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-2 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>

                                        <tr>
                                            <td colSpan={3} className="md:text-2xl text-xl font-normal text-black pt-4 md:pt-6 pb-3">
                                                Agriculture
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                        <tr>
                                            <td className="pl-5 py-1 md:text-lg text-custom-primary font-normal">Agronomy - BSc</td>
                                            <td className="hidden md:table-cell">Bachelor's</td>
                                            <td className="text-right hidden md:table-cell">4 years</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center my-4">
                                <ButtonDefault className="flex items-center rounded-lg space-x-2 text-sm">
                                    <FontAwesomeIcon icon={faChevronDown} className="w-3" />
                                    <span>Show More</span>
                                </ButtonDefault>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                <span>Admission</span>
                            </div>
                            <div className="px-4 py-6 md:p-6">
                                <div className="text-black font-normal text-lg mb-3">Key infos :</div>
                                <div className=" md:pl-10 mb-6">
                                    <ShowMoreText
                                        /* Default options */
                                        lines={5}
                                        more="Read more"
                                        less="Show less"
                                        className="text-justify"
                                        anchorClass="text-custom-primary font-normal"
                                        expanded={false}
                                    >
                                        <ul>
                                            <li>The Application fee for egyptians is 500 EGP</li>
                                            <li>The tution fees for undergraduates usually far between 60,000 to 10,0000 EGP.</li>
                                            <li>The main application period is between Feb - May</li>
                                            <li>Scholarship are available for very smart student</li>
                                        </ul>
                                    </ShowMoreText>
                                </div>
                                <div className="text-black font-normal text-lg mb-3">Admission Requirements:</div>
                                <div className=" md:pl-10 mb-6">
                                    <ShowMoreText
                                        /* Default options */
                                        lines={5}
                                        more="Read more"
                                        less="Show less"
                                        className="text-justify"
                                        anchorClass="text-custom-primary font-normal"
                                        expanded={false}
                                    >
                                        <ul>
                                            <li>The Application fee for egyptians is 500 EGP</li>
                                            <li>The tution fees for undergraduates usually far between 60,000 to 10,0000 EGP.</li>
                                            <li>The main application period is between Feb - May</li>
                                            <li>Scholarship are available for very smart student</li>
                                        </ul>
                                    </ShowMoreText>
                                </div>
                                <div className="text-black font-normal text-lg mb-3">How to Apply:</div>
                                <div className=" md:pl-10 mb-6">
                                    <ShowMoreText
                                        /* Default options */
                                        lines={5}
                                        more="Read more"
                                        less="Show less"
                                        className="text-justify"
                                        anchorClass="text-custom-primary font-normal"
                                        expanded={true}
                                    >
                                        <ul>
                                            <li>The Application fee for egyptians is 500 EGP</li>
                                            <li>The tution fees for undergraduates usually far between 60,000 to 10,0000 EGP.</li>
                                            <li>The main application period is between Feb - May</li>
                                            <li>Scholarship are available for very smart student</li>
                                        </ul>
                                    </ShowMoreText>
                                </div>
                                <div className="text-black font-normal text-lg mb-3">Foreign Students:</div>
                                <div className=" md:pl-10 mb-6">
                                    <ShowMoreText
                                        /* Default options */
                                        lines={5}
                                        more="Read more"
                                        less="Show less"
                                        className="text-justify"
                                        anchorClass="text-custom-primary font-normal"
                                        expanded={true}
                                    >
                                        <ul>
                                            <li>The Application fee for egyptians is 500 EGP</li>
                                            <li>The tution fees for undergraduates usually far between 60,000 to 10,0000 EGP.</li>
                                            <li>The main application period is between Feb - May</li>
                                            <li>Scholarship are available for very smart student</li>
                                        </ul>
                                    </ShowMoreText>
                                </div>
                            </div>
                        </div>

                        <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-black flex items-center space-x-3">
                            <span>Faculties & Departments</span>
                        </div>

                        <div className=" mb-6 px-2 md:p-0">
                            <Accordion className={styles.accordion_2} allowZeroExpanded allowMultipleExpanded>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className={styles.accordion_heading_2}>
                                                <div className={`font-normal`}>Faculty of Information Technology and Computing</div>
                                                <div className="w-1/5 flex justify-center text-custom-primary pr-6">
                                                    <AccordionItemState>
                                                        {({ expanded }) =>
                                                            expanded ? (
                                                                <FontAwesomeIcon icon={faMinus} className="mt-2 w-4 h-4 text-base" />
                                                            ) : (
                                                                <FontAwesomeIcon icon={faPlus} className="mt-2 w-4 h-4 text-base" />
                                                            )
                                                        }
                                                    </AccordionItemState>
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className="bg-white px-6 pb-6 w-full">
                                            <Link href={'/'}>
                                                <a className="text-left py-2 px-0 text-black font-normal inline-block w-full">
                                                    Institute of Public Health
                                                </a>
                                            </Link>
                                            <Accordion className={styles.accordion_2} allowZeroExpanded>
                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className={styles.accordion_subheading}>
                                                            <div className="text-sm text-black font-normal">Faculty of Information</div>
                                                            <div className="w-auto flex justify-center text-red-400 border border-red-400 px-1 py-0">
                                                                <AccordionItemState>
                                                                    {({ expanded }) =>
                                                                        expanded ? (
                                                                            <FontAwesomeIcon icon={faMinus} className="w-2 text-base" />
                                                                        ) : (
                                                                            <FontAwesomeIcon icon={faPlus} className="w-2 text-base" />
                                                                        )
                                                                    }
                                                                </AccordionItemState>
                                                            </div>
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel className="px-4 py-1">
                                                        <Link href={'/'}>
                                                            <a className="text-left py-2 px-4 text-black font-normal inline-block">
                                                                Institute of Public Health
                                                            </a>
                                                        </Link>
                                                    </AccordionItemPanel>
                                                </AccordionItem>
                                            </Accordion>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className={styles.accordion_heading_2}>
                                                <div className={`font-normal`}>Faculty of Information Technology and Computing</div>
                                                <div className="w-1/5 flex justify-center text-custom-primary pr-6">
                                                    <AccordionItemState>
                                                        {({ expanded }) =>
                                                            expanded ? (
                                                                <FontAwesomeIcon icon={faMinus} className="mt-2 w-4 h-4 text-base" />
                                                            ) : (
                                                                <FontAwesomeIcon icon={faPlus} className="mt-2 w-4 h-4 text-base" />
                                                            )
                                                        }
                                                    </AccordionItemState>
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className="bg-white px-6 pb-6 w-full">
                                            <Link href={'/'}>
                                                <a className="text-left py-2 px-0 text-black font-normal inline-block w-full">
                                                    Institute of Public Health
                                                </a>
                                            </Link>
                                            <Accordion className={styles.accordion_2} allowZeroExpanded>
                                                <AccordionItem>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton className={styles.accordion_subheading}>
                                                            <div className="text-sm text-black font-normal">Faculty of Information</div>
                                                            <div className="w-auto flex justify-center text-red-400 border border-red-400 px-1 py-0">
                                                                <AccordionItemState>
                                                                    {({ expanded }) =>
                                                                        expanded ? (
                                                                            <FontAwesomeIcon icon={faMinus} className="w-2 text-base" />
                                                                        ) : (
                                                                            <FontAwesomeIcon icon={faPlus} className="w-2 text-base" />
                                                                        )
                                                                    }
                                                                </AccordionItemState>
                                                            </div>
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel className="px-4 py-1">
                                                        <Link href={'/'}>
                                                            <a className="text-left py-2 px-4 text-black font-normal inline-block">
                                                                Institute of Public Health
                                                            </a>
                                                        </Link>
                                                    </AccordionItemPanel>
                                                </AccordionItem>
                                            </Accordion>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                </div>
                            </Accordion>
                        </div>

                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                {/*<FontAwesomeIcon icon={faGraduationCap} className="w-6" /> */}
                                <span> Scholarships</span>
                            </div>
                            <div className="p-6">
                                <ShowMoreText
                                    /* Default options */
                                    lines={8}
                                    more="Read more"
                                    less="Show less"
                                    className="text-justify"
                                    anchorClass="text-custom-primary font-normal"
                                    expanded={false}
                                >
                                    <p>
                                        The American University of Cairo is Located in Cairo, Cairo Governorate. Cairo is the political and economic
                                        capital of Egypt. Cairo has a population of over 10 million inhabitants. The population of Cairo is
                                        predominantly muslim and Cairo is the birth place of the Arab league. Cairo accounts for 10% of Egypt’s
                                        population and 22% of its economy. Cairo’s economy is largely based on government functions, trade, tourism
                                    </p>
                                </ShowMoreText>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                {/*<FontAwesomeIcon icon={faMapMarkerAlt} className="w-4" />*/}
                                <span>Location</span>
                            </div>
                            <div className="p-6">
                                <ShowMoreText
                                    /* Default options */
                                    lines={8}
                                    more="Read more"
                                    less="Show less"
                                    className="text-justify"
                                    anchorClass="text-custom-primary font-normal"
                                    expanded={false}
                                >
                                    <p>
                                        The American University of Cairo is Located in Cairo, Cairo Governorate. Cairo is the political and economic
                                        capital of Egypt. Cairo has a population of over 10 million inhabitants. The population of Cairo is
                                        predominantly muslim and Cairo is the birth place of the Arab league. Cairo accounts for 10% of Egypt’s
                                        population and 22% of its economy. Cairo’s economy is largely based on government functions, trade, tourism
                                    </p>
                                </ShowMoreText>
                            </div>
                        </div>

                        {isPremium && (
                            <div className="bg-white border border-gray-200 mb-6 relative">
                                <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                    {/*<FontAwesomeIcon icon={faMapMarkerAlt} className="w-4" />*/}
                                    <span>Senior Officials</span>
                                </div>
                                <div className="md:p-6 py-6">
                                    <OfficialSection />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-span-1">
                        {isPremium && (
                            <div className="bg-white border border-gray-200 mb-6 relative md:p-6 p-4">
                                <div className="flex items-start space-x-4">
                                    <div>
                                        <div className="bg-transparent">
                                            <img src="../whatsapp.png" alt="" className="object-contain h-10" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-medium my-1" style={{ color: '#085F56' }}>
                                            Chat on WhatsApp
                                        </div>
                                        <div className="text-gray-800 mb-4">Be directly connected to this University via WhatsApp</div>
                                        <Button className="text-white rounded-lg" style={{ backgroundColor: '#085F56' }}>
                                            Chat now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                <span> Contact this University</span>
                            </div>
                            <div className="p-6 space-y-5">
                                <div>
                                    <div className="text-xl font-normal text-black">Admissions Office</div>
                                    <div className="text-gray-400 py-3"> Responsible for Admission & Application Enquiries</div>
                                    <ButtonRedSecondary className="flex items-center space-x-2 rounded-lg">
                                        <FontAwesomeIcon icon={faEnvelope} className="w-6" /> <span>Send a Message</span>
                                    </ButtonRedSecondary>
                                </div>
                                <div>
                                    <div className="text-xl font-normal text-black">Admissions Office</div>
                                    <div className="text-gray-400 py-3"> Responsible for Admission & Application Enquiries</div>
                                    <ButtonRedSecondary className="flex items-center space-x-2 rounded-lg">
                                        <FontAwesomeIcon icon={faEnvelope} className="w-6" /> <span>Send a Message</span>
                                    </ButtonRedSecondary>
                                </div>
                            </div>
                        </div>

                        {!isPremium ? (
                            <div className="bg-white border border-gray-200 mb-6 relative">
                                <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                    <span> Other Universities in Egypt</span>
                                </div>
                                <div className="md:p-6 p-4">
                                    <div className="pb-4">
                                        <div className="flex justify-between space-x-4">
                                            <div className="flex-none">
                                                <img src="../univAshesi.jpeg" alt="" className="object-cover w-28 h-full rounded-md" />
                                            </div>
                                            <div className="flex-1">
                                                <Link href="/university/pretoria">
                                                    <a className="md:text-xl text-base font-normal text-custom-primary truncate-2-lines max-h-13 leading-7">
                                                        Institut Universitaire de la Cote
                                                    </a>
                                                </Link>
                                                <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                                    <div className="flex items-center space-x-2">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>Douala</span>
                                                    </div>
                                                    <div>30 Courses</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center md:mt-3 mt-2 text-gray-600 text-sm md:text-base">
                                            <div className="w-28 text-center">10 photos</div>
                                            <div className="text-gray-400 italic text-xs">Featured</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start border-t border-gray-400 md:py-5 py-3">
                                        <div className="w-1/12 pt-2 text-gray-400">
                                            <FontAwesomeIcon icon={faCircle} className="w-3" />
                                        </div>
                                        <div className="w-11/12">
                                            <Link href="/">
                                                <a className="md:text-xl text-lg font-normal text-custom-primary truncate-2-lines max-h-12 leading-6">
                                                    Institut Universitaire de la Cote
                                                </a>
                                            </Link>
                                            <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                                <div>Public</div>
                                                <div className="flex items-center space-x-2">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>Douala</span>
                                                </div>
                                                <div>30 Courses</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start border-t border-gray-400 md:py-5 py-3">
                                        <div className="w-1/12 pt-2 text-gray-400">
                                            <FontAwesomeIcon icon={faCircle} className="w-3" />
                                        </div>
                                        <div className="w-11/12">
                                            <Link href="/">
                                                <a className="md:text-xl text-lg font-normal text-custom-primary truncate-2-lines max-h-12 leading-6">
                                                    Institut Universitaire de la Cote
                                                </a>
                                            </Link>
                                            <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                                <div>Public</div>
                                                <div className="flex items-center space-x-2">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>Douala</span>
                                                </div>
                                                <div>30 Courses</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start border-t border-gray-400 md:py-5 py-3">
                                        <div className="w-1/12 pt-2 text-gray-400">
                                            <FontAwesomeIcon icon={faCircle} className="w-3" />
                                        </div>
                                        <div className="w-11/12">
                                            <Link href="/">
                                                <a className="md:text-xl text-lg font-normal text-custom-primary truncate-2-lines max-h-12 leading-6">
                                                    Institut Universitaire de la Cote
                                                </a>
                                            </Link>
                                            <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                                <div>Public</div>
                                                <div className="flex items-center space-x-2">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>Douala</span>
                                                </div>
                                                <div>30 Courses</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start border-t border-gray-400 md:py-5 py-3">
                                        <div className="w-1/12 pt-2 text-gray-400">
                                            <FontAwesomeIcon icon={faCircle} className="w-3" />
                                        </div>
                                        <div className="w-11/12">
                                            <Link href="/">
                                                <a className="md:text-xl text-lg font-normal text-custom-primary truncate-2-lines max-h-12 leading-6">
                                                    Institut Universitaire de la Cote
                                                </a>
                                            </Link>
                                            <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                                <div>Public</div>
                                                <div className="flex items-center space-x-2">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>Douala</span>
                                                </div>
                                                <div>30 Courses</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-4">
                                        <ButtonDefault className="flex items-center rounded-lg space-x-2 text-sm">
                                            <FontAwesomeIcon icon={faChevronDown} className="w-4" />
                                            <span>See More</span>
                                        </ButtonDefault>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-200 mb-6 relative">
                                <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                    <span> Why Study at this University</span>
                                </div>
                                <div className="md:p-6 p-4">
                                    <div className="mb-5">
                                        <div className="flex space-x-3">
                                            <FontAwesomeIcon icon={faCheck} className="w-5" />{' '}
                                            <span className="text-xl font-normal">Top Notch Professors</span>{' '}
                                        </div>
                                        <div className="mt-2 text-base">
                                            The Professors at the American University in Cairo are professionally active in their respective fields as
                                            leaders and senior executives.
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div className="flex space-x-3">
                                            <FontAwesomeIcon icon={faCheck} className="w-5" />{' '}
                                            <span className="text-xl font-normal">Top Notch Professors</span>{' '}
                                        </div>
                                        <div className="mt-2 text-base">
                                            The Professors at the American University in Cairo are professionally active in their respective fields as
                                            leaders and senior executives.
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex space-x-3">
                                            <FontAwesomeIcon icon={faCheck} className="w-5" />{' '}
                                            <span className="text-xl font-normal">Top Notch Professors</span>{' '}
                                        </div>
                                        <div className="mt-2 text-base">
                                            The Professors at the American University in Cairo are professionally active in their respective fields as
                                            leaders and senior executives.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                <span> Similar Universities</span>
                            </div>
                            <div className="md:p-6 px-4 py-2">
                                <div className="flex justify-between space-x-4">
                                    <div className="flex-1">
                                        <Link href="/university/pretoria">
                                            <a className="md:text-xl font-normal text-black truncate-2-lines max-h-13 leading-7">
                                                Institut Universitaire de la Cote
                                            </a>
                                        </Link>
                                        <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                            <div className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>Johannesburg, South Africa</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-none">
                                        <img src="../univAshesi.jpeg" alt="" className="object-cover w-28 rounded-md h-full" />
                                    </div>
                                </div>
                                <hr className="my-4 md:my-6" />
                                <div className="flex justify-between space-x-4">
                                    <div className="flex-1">
                                        <Link href="/university/pretoria">
                                            <a className="md:text-xl font-normal text-black truncate-2-lines max-h-13 leading-7">
                                                Institut Universitaire de la Cote
                                            </a>
                                        </Link>
                                        <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                            <div className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>Johannesburg, South Africa</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-none">
                                        <img src="../univAshesi.jpeg" alt="" className="object-cover w-28 rounded-md h-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// This function gets called at build time
export async function getStaticPaths() {
    return {
        // Only `/posts/1` and `/posts/2` are generated at build time
        paths: [],
        // Enable statically generating additional pages
        // For example: `/posts/3`
        fallback: true,
    };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1

    // Pass post data to the page via props
    return {
        props: { type: params.slug },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
    };
}

export default UniversityPage;
