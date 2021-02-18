/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
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
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import ShowMoreText from 'react-show-more-text';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

Modal.defaultStyles.overlay.zIndex = '2000';
Modal.defaultStyles.overlay.backgroundColor = '#0000004d';

// components
import Caroussel from '../../src/components/general/carousel';
import {
  Button,
  ButtonDefault,
  ButtonRedSecondary,
} from '../../src/components/styleComponent/button';
import OfficialSection from '../../src/components/sections/university/official';
import UniversityCoursesCard from '../../src/components/cards/universityCoursesCard';

import styles from '../../styles/globals.module.scss';

// apollo
import client from '../../src/apollo/client';
import GET_UNIVERSITY from '../../src/queries/university/get-university';
import GET_UNIVERSITY_SEARCH from '../../src/queries/university/get-search-university';

// utils
import { getLocationData } from '../../src/utils/universityUtils';

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

  const [customStyles, setCustomStyles] = React.useState(defaultStyles);
  const [isPremium, setIsPremium] = React.useState(false);

  const [data, setData] = useState(null);
  const [location, setLocation] = useState({
    city: '',
    countrySlug: '',
    country: '',
    flag: '',
  });
  const [otherUniversities, setOtherUniversities] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (props.data?.data) {
      setData(props.data?.data?.university);
      setLocation(getLocationData(props.data?.data?.university?.locations?.nodes));
    }
  }, [props.data]);

  useEffect(async () => {
    if (location.countrySlug) {
      const queryData = await client.query({
        query: GET_UNIVERSITY_SEARCH,
        variables: {
          search: location.countrySlug,
        },
      });

      if (queryData?.data) setOtherUniversities(queryData?.data?.universities?.nodes);
    }
  }, [location]);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);

  React.useEffect(() => {
    if (isMobile) {
      setIsCurrentMobile(true);
      setCustomStyles(mobileStyles);
    } else {
      setIsCurrentMobile(false);
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (router.query?.q) setIsPremium(true);
  }, [router.query]);

  return (
    <div>
      <Head>
        <title>{data?.seo?.title}</title>
      </Head>

      <div className="bg-white">
        <div className="container px-4 py-5 mx-auto">
          <div className="flex flex-wrap items-center justify-start space-x-3 text-sm text-custom-primary">
            <Link href="/">
              <a>Home</a>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="w-2" />
            <Link href="/country">
              <a>Countries</a>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="w-2" />
            <Link href={`/country/${location.countrySlug}`}>
              <a>{location.country}</a>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="hidden w-2 md:inline" />
            <span className="hidden md:inline">{data?.title}</span>
          </div>
        </div>
      </div>

      {isPremium && !isCurrentMobile && (
        <div className="container px-4 mx-auto">
          <div className="relative">
            <img src="../bgUniv.jpg" alt="" className="object-cover h-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 bg-transparent">
              <div className="flex items-center px-10 py-10 space-x-10">
                <div>
                  <div className="p-1 bg-white rounded-xl">
                    <img src={data?.logo} alt="" className="object-contain w-32 h-full" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-medium text-white">{data?.title}</h1>
                  <div className="flex my-5 mt-2 space-x-3 text-sm text-white md:mb-4 md: md:text-lg">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4" />{' '}
                    <span>{data?.address}</span>
                  </div>

                  <div className="flex items-center justify-between w-full md:space-x-8 md:justify-start">
                    <div>
                      <div className="flex items-center px-2 py-2 space-x-2 text-xs text-black bg-gray-200 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-600 md:text-base md:px-4">
                        <FontAwesomeIcon icon={faThumbsUp} className="w-3 md:w-5" />{' '}
                        <span>Like</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center px-2 py-2 space-x-2 text-xs text-black bg-gray-200 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-600 md:text-base md:px-4">
                        <FontAwesomeIcon icon={faShare} className="w-3 md:w-5" /> <span>Share</span>
                      </div>
                    </div>
                    <div>
                      <div
                        className="flex items-center px-2 py-2 space-x-2 text-xs text-black bg-gray-200 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-600 md:text-base md:px-4"
                        onClick={() => setIsOpen(true)}
                      >
                        <FontAwesomeIcon icon={faPlayCircle} className="w-3 md:w-5" />{' '}
                        <span>Watch Video</span>
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
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-6">
          <div className="col-span-2">
            {((isPremium && isCurrentMobile) || !isPremium) && (
              <div className="px-4 py-4 mb-4 bg-white border border-gray-200 md:p-4 md:mb-6">
                <div className="flex justify-between">
                  <div className="">
                    <h1 className="text-2xl font-medium text-black md:text-3xl">{data?.title}</h1>
                    <div className="flex items-center my-5 space-x-2 text-xs text-gray-600 md:space-x-3 md:my-3 md:text-base">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 md:w-4" />{' '}
                      <span>{data?.address}</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="p-1 border border-gray-200 rounded-xl">
                      <img src={data?.logo} alt="" className="object-contain w-32 h-full" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:space-x-8 md:justify-start">
                  <div>
                    <div className="flex items-center px-4 py-2 space-x-2 text-xs text-black bg-gray-200 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-600 md:text-base md:px-4">
                      <FontAwesomeIcon icon={faThumbsUp} className="w-3 md:w-5" /> <span>Like</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center px-4 py-2 space-x-2 text-xs text-black bg-gray-200 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-600 md:text-base md:px-4">
                      <FontAwesomeIcon icon={faShare} className="w-3 md:w-5" /> <span>Share</span>
                    </div>
                  </div>
                  <div>
                    <div
                      className="flex items-center px-3 py-2 space-x-2 text-xs text-black bg-gray-200 rounded-lg cursor-pointer hover:bg-red-200 hover:text-red-600 md:text-base md:px-4"
                      onClick={() => setIsOpen(true)}
                    >
                      <FontAwesomeIcon icon={faPlayCircle} className="w-3 md:w-5" />{' '}
                      <span>Watch Video</span>
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
              <div className="flex items-center justify-center px-2 py-2 text-center bg-white border-t border-l border-r border-gray-200 cursor-pointer md:px-4 md:py-3 rounded-t-xl">
                <span className="font-normal text-red-400 md:text-lg">Overview</span>
              </div>
              <div className="flex items-center justify-center px-2 py-2 text-center bg-opacity-25 cursor-pointer md:px-4 md:py-3 rounded-t-xl bg-custom-primary_3">
                <span className="text-xs font-normal text-black md:text-base">Courses (75)</span>
              </div>
              <div className="flex items-center justify-center px-2 py-2 text-center bg-opacity-25 cursor-pointer md:px-4 md:py-3 rounded-t-xl bg-custom-primary_3">
                <span className="text-xs font-normal text-black md:text-base">Admission</span>
              </div>
              <div className="flex items-center justify-center px-2 py-2 text-center bg-opacity-25 cursor-pointer md:px-4 md:py-3 rounded-t-xl bg-custom-primary_3">
                <span className="text-xs font-normal text-black md:text-base">
                  Faculties <span className="hidden md:inline"> & Departments</span>
                </span>
              </div>
            </div>
            <div className="p-0 mb-0 border border-gray-200 md:bg-white md:p-8 md:mb-6">
              <div className="grid grid-cols-1 divide-gray-200 md:grid-cols-3 md:divide-x">
                <div className="col-span-2 p-6 mb-4 bg-white border border-gray-200 md:bg-transparent md:p-0 md:border-0 md:mb-0">
                  <div className="text-justify md:pr-6">
                    <ShowMoreText
                      lines={10}
                      more="Read more"
                      less="Show less"
                      className="text-justify"
                      anchorClass="text-custom-primary font-normal"
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
                <div className="col-span-1 p-4 bg-white border border-gray-200 md:p-0 md:border-0">
                  <div className="pl-2 space-y-2 md:pl-6">
                    <div className="flex items-start space-x-1 text-base">
                      <span className="w-1/12 pt-2">
                        <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                      </span>{' '}
                      <span className="w-11/12">
                        {data?.schoolTypes?.nodes && data?.schoolTypes.nodes[0].name}
                      </span>
                    </div>
                    <div className="flex items-start space-x-1 text-base">
                      <span className="w-1/12 pt-2">
                        <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                      </span>{' '}
                      <span className="w-11/12">{data?.number_student} Students</span>
                    </div>
                    <div className="flex items-start space-x-1 text-base">
                      <span className="w-1/12 pt-2">
                        <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                      </span>{' '}
                      <span className="w-11/12">
                        {`${location.city},${location.country}`}{' '}
                        <img src={location.flag} alt="" className="inline-block w-6 h-6 ml-2" />
                      </span>
                    </div>
                    <div className="flex items-start space-x-1 text-base">
                      <span className="w-1/12 pt-2">
                        <FontAwesomeIcon icon={faCircle} className="w-2 text-gray-400" />
                      </span>{' '}
                      <span className="w-11/12">
                        Undergraduate Tuition Fees 15,528 - 17, 640 USD
                      </span>
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
                      <span className="w-11/12">
                        Ranking: 3rd in Africa (QsUniversity Rankings)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-0 mb-4 bg-white border border-gray-200 md:p-6 md:mb-6">
              <Caroussel images={data?.gallery} />
            </div>

            <UniversityCoursesCard
              count={data?.course_count}
              title={data?.title}
              isCurrentMobile={isCurrentMobile}
            />

            <div className="relative mb-6 bg-white border border-gray-200">
              <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
                <span>Admission</span>
              </div>
              <div className="px-4 py-6 md:p-6">
                <div className="mb-6 md:pl-10">
                  <ShowMoreText
                    /* Default options */
                    lines={5}
                    more="Read more"
                    less="Show less"
                    className="text-justify"
                    anchorClass="text-custom-primary font-normal"
                    expanded={false}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.admission_detail,
                      }}
                    />
                  </ShowMoreText>
                </div>
              </div>
            </div>

            <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal text-black border-b border-gray-200 border-dotted md:p-4 md:text-2xl">
              <span>Faculties & Departments</span>
            </div>

            <div className="px-2 mb-6 md:p-0">
              <Accordion className={styles.accordion_2} allowZeroExpanded allowMultipleExpanded>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {data?.faculties &&
                    data?.faculties.length > 0 &&
                    data?.faculties.map((faculty) => (
                      <AccordionItem>
                        <AccordionItemHeading>
                          <AccordionItemButton className={styles.accordion_heading_2}>
                            <div className={`font-normal`}>{faculty.name}</div>
                            <div className="flex justify-center w-1/5 pr-6 text-custom-primary">
                              <AccordionItemState>
                                {({ expanded }) =>
                                  expanded ? (
                                    <FontAwesomeIcon
                                      icon={faMinus}
                                      className="w-4 h-4 mt-2 text-base"
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faPlus}
                                      className="w-4 h-4 mt-2 text-base"
                                    />
                                  )
                                }
                              </AccordionItemState>
                            </div>
                          </AccordionItemButton>
                        </AccordionItemHeading>

                        <AccordionItemPanel className="w-full px-6 pb-6 bg-white">
                          <Accordion className={styles.accordion_2} allowZeroExpanded>
                            {faculty?.subFaculty &&
                              faculty?.subFaculty.length > 0 &&
                              faculty?.subFaculty.map((mainSub) => (
                                <AccordionItem>
                                  <>
                                    <AccordionItemHeading>
                                      <AccordionItemButton className={styles.accordion_subheading}>
                                        <div className="text-sm font-normal text-black">
                                          {mainSub?.name}
                                        </div>
                                        {mainSub?.subFaculty && mainSub?.subFaculty.length > 0 && (
                                          <div className="flex justify-center w-auto px-1 py-0 text-red-400 border border-red-400">
                                            <AccordionItemState>
                                              {({ expanded }) =>
                                                expanded ? (
                                                  <FontAwesomeIcon
                                                    icon={faMinus}
                                                    className="w-2 text-base"
                                                  />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    icon={faPlus}
                                                    className="w-2 text-base"
                                                  />
                                                )
                                              }
                                            </AccordionItemState>
                                          </div>
                                        )}
                                      </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel className="px-4 py-1">
                                      {mainSub?.subFaculty &&
                                        mainSub?.subFaculty.length > 0 &&
                                        mainSub?.subFaculty.map((subsubFaculty) => (
                                          <Link href={'/'}>
                                            <a className="inline-block px-4 py-2 font-normal text-left text-black">
                                              {subsubFaculty?.name}
                                            </a>
                                          </Link>
                                        ))}
                                    </AccordionItemPanel>
                                  </>
                                </AccordionItem>
                              ))}
                          </Accordion>
                        </AccordionItemPanel>
                      </AccordionItem>
                    ))}
                </div>
              </Accordion>
            </div>

            {data?.scholarship_detail && (
              <div className="relative mb-6 bg-white border border-gray-200">
                <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
                  <span> Scholarships</span>
                </div>
                <div className="p-6">
                  <ShowMoreText
                    lines={8}
                    more="Read more"
                    less="Show less"
                    className="text-justify"
                    anchorClass="text-custom-primary font-normal"
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

            <div className="relative mb-6 bg-white border border-gray-200">
              <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
                <span>Location</span>
              </div>
              <div className="p-6">
                <ShowMoreText
                  lines={8}
                  more="Read more"
                  less="Show less"
                  className="text-justify"
                  anchorClass="text-custom-primary font-normal"
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

            {isPremium && (
              <div className="relative mb-6 bg-white border border-gray-200">
                <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
                  <span>Senior Officials</span>
                </div>
                <div className="py-6 md:p-6">
                  <OfficialSection />
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1">
            {isPremium && (
              <div className="relative p-4 mb-6 bg-white border border-gray-200 md:p-6">
                <div className="flex items-start space-x-4">
                  <div>
                    <div className="bg-transparent">
                      <img src="../whatsapp.png" alt="" className="object-contain h-10" />
                    </div>
                  </div>
                  <div>
                    <div className="my-1 text-2xl font-medium" style={{ color: '#085F56' }}>
                      Chat on WhatsApp
                    </div>
                    <div className="mb-4 text-gray-800">
                      Be directly connected to this University via WhatsApp
                    </div>
                    <Button
                      className="text-white rounded-lg"
                      style={{ backgroundColor: '#085F56' }}
                    >
                      Chat now
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="relative mb-6 bg-white border border-gray-200">
              <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
                <span> Contact this University</span>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <div className="text-xl font-normal text-black">Admissions Office</div>
                  <div className="py-3 text-gray-400">
                    {' '}
                    Responsible for Admission & Application Enquiries
                  </div>
                  <ButtonRedSecondary className="flex items-center space-x-2 rounded-lg">
                    <FontAwesomeIcon icon={faEnvelope} className="w-6" />{' '}
                    <span>Send a Message</span>
                  </ButtonRedSecondary>
                </div>
                <div>
                  <div className="text-xl font-normal text-black">Admissions Office</div>
                  <div className="py-3 text-gray-400">
                    {' '}
                    Responsible for Admission & Application Enquiries
                  </div>
                  <ButtonRedSecondary className="flex items-center space-x-2 rounded-lg">
                    <FontAwesomeIcon icon={faEnvelope} className="w-6" />{' '}
                    <span>Send a Message</span>
                  </ButtonRedSecondary>
                </div>
              </div>
            </div>

            {!isPremium ? (
              <div className="relative mb-6 bg-white border border-gray-200">
                <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
                  <span> Other Universities in Egypt</span>
                </div>
                <div className="p-4 md:p-6">
                  {otherUniversities &&
                    otherUniversities.map((uni) => (
                      <div className="pb-4">
                        <div className="flex justify-between space-x-4">
                          <div className="flex-none">
                            <img
                              src={uni?.logo}
                              alt=""
                              className="object-cover h-full rounded-md w-28"
                            />
                          </div>
                          <div className="flex-1">
                            <Link href="/university/pretoria">
                              <a className="text-base font-normal leading-7 md:text-xl text-custom-primary truncate-2-lines max-h-13">
                                {uni?.title}
                              </a>
                            </Link>
                            <div className="flex items-center justify-between mt-2 text-sm text-gray-600 md:text-base">
                              <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" />{' '}
                                <span>{uni?.address}</span>
                              </div>
                              <div>{uni?.course_count} Courses</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-sm text-gray-600 md:mt-3 md:text-base">
                          <div className="text-center w-28">
                            {uni?.gallery ? uni?.gallery.length : 0} photos
                          </div>
                          <div className="text-xs italic text-gray-400">Featured</div>
                        </div>
                      </div>
                    ))}

                  <div className="flex justify-center mt-4">
                    <ButtonDefault className="flex items-center space-x-2 text-sm rounded-lg">
                      <FontAwesomeIcon icon={faChevronDown} className="w-4" />
                      <span>See More</span>
                    </ButtonDefault>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative mb-6 bg-white border border-gray-200">
                <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
                  <span> Why Study at this University</span>
                </div>
                <div className="p-4 md:p-6">
                  <div className="mb-5">
                    <div className="flex space-x-3">
                      <FontAwesomeIcon icon={faCheck} className="w-5" />{' '}
                      <span className="text-xl font-normal">Top Notch Professors</span>{' '}
                    </div>
                    <div className="mt-2 text-base">
                      The Professors at the American University in Cairo are professionally active
                      in their respective fields as leaders and senior executives.
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="flex space-x-3">
                      <FontAwesomeIcon icon={faCheck} className="w-5" />{' '}
                      <span className="text-xl font-normal">Top Notch Professors</span>{' '}
                    </div>
                    <div className="mt-2 text-base">
                      The Professors at the American University in Cairo are professionally active
                      in their respective fields as leaders and senior executives.
                    </div>
                  </div>
                  <div className="">
                    <div className="flex space-x-3">
                      <FontAwesomeIcon icon={faCheck} className="w-5" />{' '}
                      <span className="text-xl font-normal">Top Notch Professors</span>{' '}
                    </div>
                    <div className="mt-2 text-base">
                      The Professors at the American University in Cairo are professionally active
                      in their respective fields as leaders and senior executives.
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="relative mb-6 bg-white border border-gray-200">
              <div className="flex items-center px-4 py-2 space-x-3 text-xl font-normal border-b border-gray-200 border-dotted md:p-4 md:text-2xl text-custom-secondary">
                <span> Similar Universities</span>
              </div>
              <div className="px-4 py-2 md:p-6">
                <div className="flex justify-between space-x-4">
                  <div className="flex-1">
                    <Link href="/university/pretoria">
                      <a className="font-normal leading-7 text-black md:text-xl truncate-2-lines max-h-13">
                        Institut Universitaire de la Cote
                      </a>
                    </Link>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-600 md:text-base">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" />{' '}
                        <span>Johannesburg, South Africa</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-none">
                    <img
                      src="../univAshesi.jpeg"
                      alt=""
                      className="object-cover h-full rounded-md w-28"
                    />
                  </div>
                </div>
                <hr className="my-4 md:my-6" />
                <div className="flex justify-between space-x-4">
                  <div className="flex-1">
                    <Link href="/university/pretoria">
                      <a className="font-normal leading-7 text-black md:text-xl truncate-2-lines max-h-13">
                        Institut Universitaire de la Cote
                      </a>
                    </Link>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-600 md:text-base">
                      <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" />{' '}
                        <span>Johannesburg, South Africa</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-none">
                    <img
                      src="../univAshesi.jpeg"
                      alt=""
                      className="object-cover h-full rounded-md w-28"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

  const data = await client.query({
    query: GET_UNIVERSITY,
    variables: {
      id: params.slug,
    },
  });

  // Pass post data to the page via props
  return {
    props: { data },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}

export default UniversityPage;
