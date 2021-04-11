import React from 'react';
import Head from "next/dist/next-server/lib/head";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheck, faChevronDown,
    faChevronRight, faCircle,
    faMapMarkerAlt, faMinus,
    faPlayCircle, faPlus, faShare, faThumbsUp, faTimes
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "../../src/components/general/carousel";
import Dropdown, {ItemDropdown} from "../../src/components/general/dropdown";
import styles from "../../styles/globals.module.scss";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState
} from "react-accessible-accordion";
import {Button, ButtonDefault, ButtonRedSecondary} from "../../src/components/styleComponent/button";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";
import {useMediaQuery} from "react-responsive";
import DropdownMulti from "../../src/components/general/dropdownMulti";
import ShowMoreText from 'react-show-more-text';
import OfficialSection from "../../src/components/sections/university/official";
import GET_UNIVERSITY_BY from "../../src/queries/university/get-university";
import client from "../../src/apollo/client";
import {getLocationData} from "../../src/utils/universityUtils";
import Modal from "react-modal";
import OtherUniv from "../../src/components/sections/university/otherUniv";
import {GET_FEATURED_UNIVERSITY} from "../../src/queries/home/get-featuredUniversities";
import string_to_slug from "../../src/utils/slugify";
import StudyProgrammes from "../../src/components/sections/university/studyProgrammes";
import {shuffle} from "../../src/utils/compare";
import SimilarUniv from "../../src/components/sections/university/similarUniv";


Modal.setAppElement('#__next');

Modal.defaultStyles.overlay.zIndex = '2000';
Modal.defaultStyles.overlay.backgroundColor = '#0000004d';

const defaultStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '30px',
        width: '50%',
        display: 'grid',
        placeItems: 'center',
    },
};

const mobileStyles = {
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

const UniversityPage = (props) => {

    const router = useRouter();
    const [isPremium, setIsPremium] = React.useState(false);

    const [data, setData] = React.useState({});
    const [location, setLocation] = React.useState({});
    const [customStyles, setCustomStyles] = React.useState(defaultStyles);

    const [isOpen, setIsOpen] = React.useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);

    const [otherUnivFeat, setOtherUnivFeat] = React.useState([]);

    let reload = false;

    if(props.data){
        reload = data.id !== undefined && data.id !== props.data?.id;
    }

    React.useEffect(() => {
        if(isMobile){
            setIsCurrentMobile(true)
            setCustomStyles(mobileStyles);
        }else{
            setIsCurrentMobile(false);
            setCustomStyles(defaultStyles);
        }
    }, [isMobile]);

    React.useEffect(() => {
        if(reload) {
            router.push('/university/'+props.data.slug);
        }
    }, [])

    React.useEffect(() => {

        const currentData = props.data || {};

        setData(currentData);

        setLocation(getLocationData(currentData.locations?.nodes));

        if(currentData.is_premium) {
            setIsPremium(true);
        }else{
            setIsPremium(false);
        }

    }, [props.data]);

    React.useEffect(() => {
        const featUniv = [];

        if (props.featuredUniversity && Object.entries(props.featuredUniversity.data).length !== 0) {
            props.featuredUniversity.data.universitiesFeatured.nodes.map((item, i) => {
                const university = item.featured_list.nodes;
                university.map((subItem, i) => {
                    // const check = subItem.locations.nodes.filter((order) => order.name === location.country);
                    // if (check.length > 0) featUniv.push(subItem);
                    featUniv.push(subItem);
                });
            });

            shuffle(featUniv);
            setOtherUnivFeat(featUniv);
        }
    }, [props.featuredUniversity, data]);

    const shareuniversity = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `${data?.title} on AfriUni`,
                    text: `Check out detailed information about ${data?.title} on Afriuni.com`,
                    url: 'https://afriuni.com/',
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            console.log('Not supported 🙅‍');
        }
    };

    const onCloseModal = () => {
        setIsOpen(!isOpen);
    };

    if (Object.entries(data).length === 0) return <div>Loading</div>;

    return <div>
        <Head>
            <title>{ data.seo.title } - University - Afriuni</title>
        </Head>

        <div className="bg-white">
            <div className="container mx-auto px-4 py-5">
                <div className="flex flex-wrap items-center justify-start space-x-3 text-sm text-custom-primary">
                    <Link href="/">
                        <a>
                            Home
                        </a>
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2"/>
                    <Link href="/country">
                        <a>
                            Countries
                        </a>
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2"/>
                    <Link href={`/country/${location.slug}`}>
                        <a>
                            {location.country}
                        </a>
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 hidden md:inline"/>
                    <span className="hidden md:inline">
                        {data.title}
                    </span>
                </div>
            </div>
        </div>

        {(isPremium && !isCurrentMobile) && (
            <div className="container mx-auto px-4">
                <div className="relative">
                    <img src={data?.cover} alt="" className="object-cover h-500 w-full"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>
                    <div className="absolute left-0 right-0 bottom-0 bg-transparent">
                        <div className="flex px-10 py-10 space-x-10 items-center">
                            <div>
                                <div className="bg-white rounded-xl p-1">
                                    <img src={data?.logo} alt="" className="object-contain h-32 w-32"/>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-4xl font-medium text-white">
                                    {data.title}
                                </h1>
                                <div className="flex space-x-3 my-5 md:mb-4 md: mt-2 text-white text-sm md:text-lg">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" /> {' '}
                                    <span>{data?.address}</span>
                                </div>

                                <div className="flex items-center md:space-x-8 w-full justify-between md:justify-start">
                                    <div>
                                        <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-2 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                            <FontAwesomeIcon icon={faThumbsUp} className="md:w-5 w-3" /> <span>Like</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            onClick={() => shareuniversity()}
                                            className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-2 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                            <FontAwesomeIcon icon={faShare} className="md:w-5 w-3" /> <span>Share</span>
                                        </div>
                                    </div>
                                    {data.video_link && (
                                        <div>
                                            <div
                                                onClick={() => setIsOpen(true)}
                                                className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-2 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                                <FontAwesomeIcon icon={faPlayCircle} className="md:w-5 w-3" /> <span>Watch Video</span>
                                            </div>
                                        </div>
                                    )}
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
                                    <h1 className="text-2xl md:text-3xl font-medium text-black">
                                        {data.title}
                                    </h1>
                                    <div className="flex items-center space-x-2 md:space-x-3 my-5 md:my-3 text-gray-600 text-xs md:text-base">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="md:w-4 w-3" />{' '}
                                        <span>{data?.address}</span>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="border border-gray-200 rounded-xl p-1">
                                        <img src={data?.logo} alt="" className="object-contain w-32 h-32"/>
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
                                    <div
                                        onClick={() => shareuniversity()}
                                        className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                        <FontAwesomeIcon icon={faShare} className="md:w-5 w-3" /> <span>Share</span>
                                    </div>
                                </div>
                                {data.video_link && (
                                    <div>
                                        <div
                                            onClick={() => setIsOpen(true)}
                                            className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-3 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                            <FontAwesomeIcon icon={faPlayCircle} className="md:w-5 w-3" /> <span>Watch Video</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}

                    {(isPremium && isCurrentMobile) && (
                        <div className="mb-6 -mt-4">
                            <img src={data?.cover} alt="" className="object-cover h-64 w-full"/>
                        </div>
                    )}

                    <div className="grid grid-cols-4 gap-1 md:gap-2">
                        <Link href={`/university/${data.slug}#overview`}>
                            <div className="flex items-center justify-center px-2 py-2 text-center bg-white border-t border-l border-r border-gray-200 cursor-pointer md:px-4 md:py-3 rounded-t-xl">
                                <span className="font-normal text-red-400 md:text-lg">Overview</span>
                            </div>
                        </Link>
                        <Link href={`/university/${data.slug}#courses`}>
                            <div className="flex items-center justify-center px-2 py-2 text-center bg-opacity-25 cursor-pointer md:px-4 md:py-3 rounded-t-xl bg-custom-primary_3" >
                                <span className="text-xs font-normal text-black md:text-base">Courses ({data.course_count})</span>
                            </div>
                        </Link>
                        <Link href={`/university/${data.slug}#admission`}>
                            <div className="flex items-center justify-center px-2 py-2 text-center bg-opacity-25 cursor-pointer md:px-4 md:py-3 rounded-t-xl bg-custom-primary_3">
                                <span className="text-xs font-normal text-black md:text-base">Admission</span>
                            </div>
                        </Link>
                        <Link href={`/university/${data.slug}#faculties`}>
                            <div className="flex items-center justify-center px-2 py-2 text-center bg-opacity-25 cursor-pointer md:px-4 md:py-3 rounded-t-xl bg-custom-primary_3">
                              <span className="text-xs font-normal text-black md:text-base">
                                Faculties <span className="hidden md:inline"> & Departments</span>
                              </span>
                            </div>
                        </Link>
                    </div>
                    <div
                        id="overview"
                        className="md:bg-white border border-gray-200 md:p-8 p-0 md:mb-6 mb-0">

                        <div className="grid md:grid-cols-3 grid-cols-1 md:divide-x divide-gray-200">
                            <div className="col-span-2 bg-white md:bg-transparent p-6 md:p-0 border border-gray-200 md:border-0 mb-4 md:mb-0">

                                <div className="text-justify md:pr-6">
                                    <ShowMoreText
                                        /* Default options */
                                        lines={10}
                                        more='Read more'
                                        less='Show less'
                                        className='text-justify break-words'
                                        anchorClass='text-custom-primary font-normal'
                                        expanded={false}
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: data?.content,
                                            }}
                                        />

                                    </ShowMoreText>

                                </div>

                            </div>
                            <div className="col-span-1 bg-white p-4 md:p-0 border border-gray-200 md:border-0">
                                <div className="md:pl-6 pl-2 space-y-2">
                                    <div className="flex items-start space-x-1 text-base">
                                        <span className="w-1/12 pt-2"><FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" /></span> <span className="w-11/12">{data?.schoolTypes?.nodes && data?.schoolTypes.nodes[0].name}</span>
                                    </div>
                                    <div className="flex items-start space-x-1 text-base">
                                        <span className="w-1/12 pt-2"><FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" /></span> <span className="w-11/12">{data?.number_student} Students</span>
                                    </div>
                                    <div className="flex items-start space-x-1 text-base">
                                        <span className="w-1/12 pt-2"><FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" /></span> <span className="w-11/12">{`${location.city}, ${location.country}`} <img src={location.flag} alt="" className="w-6 h-4 inline-block ml-2"/></span>
                                    </div>
                                    {data.undergraduate_fees_min.tuition_fees > 0 && (
                                        <div className="flex items-start space-x-1 text-base">
                                            <span className="w-1/12 pt-2"><FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" /></span> <span className="w-11/12">Undergraduate Tuition Fees {data.undergraduate_fees_min.tuition_fees} {data.undergraduate_fees_min.currency} - {data.undergraduate_fees_max.tuition_fees} {data.undergraduate_fees_max.currency}</span>
                                        </div>
                                    )}

                                    {data.postgraduate_fees_min.tuition_fees > 0 && (
                                        <div className="flex items-start space-x-1 text-base">
                                            <span className="w-1/12 pt-2"><FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" /></span> <span className="w-11/12">Postgraduate Tuition Fees {data.postgraduate_fees_min.tuition_fees} {data.postgraduate_fees_min.currency} - {data.postgraduate_fees_max.tuition_fees} {data.postgraduate_fees_max.currency}</span>
                                        </div>
                                    )}

                                    <div className="flex items-start space-x-1 text-base">
                                        <span className="w-1/12 pt-2"><FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" /></span> <span className="w-11/12">Ranking: {data.ranking}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className="bg-white border border-gray-200 md:p-6 p-0 md:mb-6 mb-4">
                        <Carousel images={data?.gallery} images_medium={data?.gallery_medium} title={data.title}/>
                    </div>

                    <div className="bg-white border border-gray-200 mb-6 relative">
                        <div
                            id="courses"
                            className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                           {/*<FontAwesomeIcon icon={faBookOpen} className="w-6" /> */}
                           <span>Study Programmes ({data.course_count})</span>
                        </div>
                        <StudyProgrammes data={data}/>
                    </div>

                    <div className="bg-white border border-gray-200 mb-6 relative">
                        <div
                            id="admission"
                            className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                            <span>Admission</span>
                        </div>
                        <div className="px-4 py-6 md:p-6">

                            {data?.keyInfo_detail && (
                                <React.Fragment>
                                    <div className="text-black font-normal text-lg mb-3">Key infos :</div>
                                    <div className=" md:pl-10 mb-6">
                                        <ShowMoreText
                                            /* Default options */
                                            lines={5}
                                            more='Read more'
                                            less='Show less'
                                            className='text-justify break-words'
                                            anchorClass='text-custom-primary font-normal'
                                            expanded={false}
                                        >

                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: data?.keyInfo_detail,
                                                }}
                                            />
                                        </ShowMoreText>
                                    </div>
                                </React.Fragment>
                            )}

                            {data?.admission_detail && (
                                <React.Fragment>
                                    <div className="text-black font-normal text-lg mb-3">Admission Requirements:</div>
                                    <div className=" md:pl-10 mb-6">
                                        <ShowMoreText
                                            /* Default options */
                                            lines={5}
                                            more='Read more'
                                            less='Show less'
                                            className='text-justify break-words'
                                            anchorClass='text-custom-primary font-normal'
                                            expanded={false}
                                        >

                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: data?.admission_detail,
                                                }}
                                            />
                                        </ShowMoreText>
                                    </div>
                                </React.Fragment>
                            )}

                            {data?.howApply_detail && (
                                <>
                                    <div className="text-black font-normal text-lg mb-3">How to Apply:</div>
                                    <div className=" md:pl-10 mb-6">
                                        <ShowMoreText
                                            /* Default options */
                                            lines={5}
                                            more='Read more'
                                            less='Show less'
                                            className='text-justify break-words'
                                            anchorClass='text-custom-primary font-normal'
                                            expanded={false}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: data?.howApply_detail,
                                                }}
                                            />
                                        </ShowMoreText>
                                    </div>
                                </>
                            )}

                            {data?.foreignStudent_detail && (
                                <>
                                    <div className="text-black font-normal text-lg mb-3">Foreign Students:</div>
                                    <div className=" md:pl-10 mb-6">
                                        <ShowMoreText
                                            /* Default options */
                                            lines={5}
                                            more='Read more'
                                            less='Show less'
                                            className='text-justify break-words'
                                            anchorClass='text-custom-primary font-normal'
                                            expanded={false}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: data?.foreignStudent_detail,
                                                }}
                                            />
                                        </ShowMoreText>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>

                    <div
                        id="faculties"
                        className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-black flex items-center space-x-3">
                        <span>Faculties & Departments</span>
                    </div>


                     <div className=" mb-6 px-2 md:p-0">
                            <Accordion className={styles.accordion_2} allowZeroExpanded allowMultipleExpanded>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                                    {data?.faculties.length > 0 &&
                                        data?.faculties.map((faculty, index) => (
                                            <AccordionItem key={index}>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton className={styles.accordion_heading_2}>
                                                        <div className={`font-normal`}>
                                                            {faculty.name}
                                                        </div>
                                                        {faculty.subFaculty.length > 0 && (
                                                            <div className="flex justify-center text-custom-primary pr-6">
                                                                <AccordionItemState>
                                                                    {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faMinus} className="w-4 h-4 text-base" /> : <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-base" />)}
                                                                </AccordionItemState>
                                                            </div>
                                                        )}

                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                {faculty.subFaculty.length > 0 && (
                                                    <AccordionItemPanel className="bg-white px-6 pb-6 w-full">

                                                        {faculty.subFaculty.map((sub, inS1) => {

                                                            if(sub.subFaculty.length > 0) return (
                                                                <Accordion className={styles.accordion_2} allowZeroExpanded key={inS1}>
                                                                    <AccordionItem>
                                                                        <AccordionItemHeading>
                                                                            <AccordionItemButton className={styles.accordion_subheading}>
                                                                                <div className="text-base text-black font-normal py-2 px-0">
                                                                                    {sub.name}
                                                                                </div>

                                                                                {sub.subFaculty.length > 0 && (
                                                                                    <div className="w-auto h-5 flex justify-center items-center text-red-400 border border-red-400 px-1 py-0">
                                                                                        <AccordionItemState>
                                                                                            {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faMinus} className="w-2 h-2 text-base" /> : <FontAwesomeIcon icon={faPlus} className="w-2 h-2 text-base" />)}
                                                                                        </AccordionItemState>
                                                                                    </div>
                                                                                )}

                                                                            </AccordionItemButton>
                                                                        </AccordionItemHeading>
                                                                        {sub.subFaculty.length > 0 && (
                                                                            <AccordionItemPanel className="px-4 py-1">
                                                                                {sub.subFaculty.map((sub2, inS2) => (

                                                                                    <div className="text-left py-2 px-4 text-black font-normal" key={inS2} >
                                                                                        {sub2.name}
                                                                                    </div>

                                                                                ))}
                                                                            </AccordionItemPanel>
                                                                        )}

                                                                    </AccordionItem>
                                                                </Accordion>
                                                            )

                                                            if(!sub.subFaculty.length) return (
                                                                <div className="text-left py-2 px-0 text-black font-normal w-full" key={inS1}>
                                                                    {sub.name}
                                                                </div>
                                                            )

                                                        })}

                                                    </AccordionItemPanel>
                                                )}

                                            </AccordionItem>
                                        ))}
                                </div>
                            </Accordion>

                    </div>

                    {data.scholarship_detail && (
                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                {/*<FontAwesomeIcon icon={faGraduationCap} className="w-6" /> */}
                                <span> Scholarships</span>
                            </div>
                            <div className="p-6">
                                <ShowMoreText
                                    /* Default options */
                                    lines={8}
                                    more='Read more'
                                    less='Show less'
                                    className='text-justify break-words'
                                    anchorClass='text-custom-primary font-normal'
                                    expanded={false}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data?.scholarship_detail,
                                        }}
                                    />
                                </ShowMoreText>

                            </div>
                        </div>
                    )}


                    {data.location_detail && (
                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                {/*<FontAwesomeIcon icon={faMapMarkerAlt} className="w-4" />*/}
                                <span>Location</span>
                            </div>
                            <div className="p-6">
                                <ShowMoreText
                                    /* Default options */
                                    lines={8}
                                    more='Read more'
                                    less='Show less'
                                    className='text-justify break-words'
                                    anchorClass='text-custom-primary font-normal'
                                    expanded={false}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data?.location_detail,
                                        }}
                                    />
                                </ShowMoreText>
                            </div>
                        </div>
                    )}

                    {isPremium && (
                        <>
                            {data.officials.length && (
                                <div className="bg-white border border-gray-200 mb-6 relative">
                                    <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                        {/*<FontAwesomeIcon icon={faMapMarkerAlt} className="w-4" />*/}
                                        <span>Senior Officials</span>
                                    </div>
                                    <div className="md:p-6 py-6">
                                        <OfficialSection offical={data.officials}/>
                                    </div>
                                </div>
                            )}


                        </>

                    )}

                </div>

                <div className="col-span-1">
                    {(isPremium && data.whatsapp) && (
                        <div className="bg-white border border-gray-200 mb-6 relative md:p-6 p-4">

                            <div className="flex items-start space-x-4">
                                <div>
                                    <div className="bg-transparent">
                                        <img src="../whatsapp.png" alt="" className="object-contain h-10"/>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-2xl font-medium my-1" style={{color : "#085F56"}}>
                                        Chat on WhatsApp
                                    </div>
                                    <div className="text-gray-800 mb-4">
                                        Be directly connected to this University via
                                        WhatsApp
                                    </div>
                                    <Link href={`https://wa.me/${data.whatsapp}?text=I want to contact your university.`} >
                                        <a className="text-white rounded-lg px-5 py-3" target={'_blank'} style={{ backgroundColor : "#085F56" }}>Chat now </a>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    )}

                    {data.contacts.length > 0 && (
                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                <span> Contact this University</span>
                            </div>
                            <div className="p-6 space-y-5">
                                {data?.contacts.map((contact, index) => (
                                    <div key={index}>
                                        <div className="text-xl font-normal text-black">{contact.name}</div>
                                        <div className="py-3 text-gray-400"> {contact.post}</div>
                                        <ButtonRedSecondary
                                            onClick={() =>
                                                contact.emails ? (window.location = `mailto:${contact.emails[0]}`) : {}
                                            }
                                            className="flex items-center space-x-2 rounded-lg"
                                        >
                                            <FontAwesomeIcon icon={faEnvelope} className="w-6" />{' '}
                                            <span>Send a message</span>
                                        </ButtonRedSecondary>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}



                    {!isPremium ? (
                        <div className="bg-white border border-gray-200 mb-6 relative">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                <span> Others Universities in {location.country}</span>
                            </div>
                            <div className="md:p-6 p-4">
                                {otherUnivFeat.slice(0, 2).map((item, index) => {
                                    return <div className="pb-4" key={index}>
                                        <div className="flex justify-between space-x-4">
                                            <div className="flex-none">
                                                <img src={item.featuredImage ? item.featuredImage.node.sourceUrl : ''} alt="" className="object-cover w-28 h-14 h-full rounded-md"/>
                                            </div>
                                            <div className="flex-1">
                                                <Link href={`/university/${item.slug}`}>
                                                    <a className="md:text-xl text-base font-normal text-custom-primary truncate-2-lines max-h-13 leading-7">
                                                        {item.title}
                                                    </a>
                                                </Link>
                                                <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                                    <div className="flex items-center space-x-2">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>Douala</span>
                                                    </div>
                                                    <div>{item.course_count} Courses</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center md:mt-3 mt-2 text-gray-600 text-sm md:text-base">
                                            <div className="w-28 text-center">{item.gallery.length} photos</div>
                                            <div className="text-gray-400 italic text-xs">Featured</div>
                                        </div>
                                    </div>
                                })}
                                <OtherUniv location={location}/>
                            </div>
                        </div>
                    ) : (
                        <>
                        {data.whyStudy.length > 0 && (
                            <div className="bg-white border border-gray-200 mb-6 relative">
                                <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
                                    <span> Why Study at this University</span>
                                </div>
                                <div className="md:p-6 p-4">
                                    {data.whyStudy.map((item, index) => {
                                        return <div className="mb-5" key={index}>
                                            <div className="flex space-x-3"><FontAwesomeIcon icon={faCheck} className="w-5" /> <span className="text-xl font-normal">{item.title}</span> </div>
                                            <div className="mt-2 text-base">
                                                {item.content}
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                        )}
                        </>

                    )}

                    <SimilarUniv idCat={data?.schoolTypes?.nodes}/>

                </div>

            </div>
        </div>


        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel={'title modal'}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
            bodyOpenClassName="modal"
        >
            <div className="relative w-full h-full">
                <div className="relative p-4 mb-5 md:p-0">
                    <button
                        onClick={onCloseModal}
                        className="absolute top-0 bottom-0 right-0 flex items-center px-3 py-2 text-xs rounded-xl"
                    >
                        <FontAwesomeIcon icon={faTimes} className="h-3 mr-2 text-custom-primary" />
                    </button>
                    <h2 className="mt-2 mb-4 text-xl font-semibold">{data?.title}</h2>
                    <hr />
                </div>
                {data?.video_link ? (
                    <iframe width="100%" height="450" src={data?.video_link}></iframe>
                ) : (
                    <p>No Video attached</p>
                )}
            </div>
        </Modal>

    </div>
};

// This function gets called at build time
export async function getStaticPaths() {

    return {
        // Only `/posts/1` and `/posts/2` are generated at build time
        paths: [],
        // Enable statically generating additional pages
        // For example: `/posts/3`
        fallback: true,
    }
}

// This also gets called at build time
export async function getStaticProps({params}) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const data = await client.query({
        query: GET_UNIVERSITY_BY,
        variables: {
            id: params.slug,
        },
    });

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;

    const featuredUniversity = await client.query({
        query: GET_FEATURED_UNIVERSITY,
        variables: {
            type: 'otherUniv',
            start_date: today,
            random : true
        },
    });

    // Pass post data to the page via props
    return {
        props: { data : data?.data.university, featuredUniversity },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
    };
}

export default UniversityPage;
