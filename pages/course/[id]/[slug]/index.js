import React from 'react';
import Head from 'next/dist/next-server/lib/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
  faMinus, faPhone, faPhoneAlt,
  faPlayCircle,
  faPlus,
  faShare,
  faThumbsUp,
  faUniversity,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../../../../styles/globals.module.scss';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { faBell, faEnvelope, faImage } from '@fortawesome/free-regular-svg-icons';
import {
  Button,
  ButtonDefault, ButtonDefaultSecondary,
  ButtonRedSecondary,
} from '../../../../src/components/styleComponent/button';
import TabSimilarSection from '../../../../src/components/sections/course/tabSimilar';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import client from "../../../../src/apollo/client";
import GET_COURSE_BY from "../../../../src/queries/course/get-course";
import {getLocationData} from "../../../../src/utils/universityUtils";
import moment from "moment";

// moment.locale('fr');

const CoursesPage = (props) => {
  const router = useRouter();
  const [isPremium, setIsPremium] = React.useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);

  const [data, setData] = React.useState({});
  const [location, setLocation] = React.useState({});
  const [university, setUniversity] = React.useState({});

  let reload = false;

  if(props.data){
    reload = data.id !== undefined && data.id !== props.data?.id;
  }

  React.useEffect(() => {
    if (isMobile) {
      setIsCurrentMobile(true);
    } else {
      setIsCurrentMobile(false);
    }
  }, [isMobile]);

  React.useEffect(() => {
    if(reload) {
      router.push('/course/'+props.data.databaseId+"/"+props.data.slug);
    }
  }, []);

  React.useEffect(() => {

    const currentData = props.data || {};

    setData(currentData);

    setLocation(getLocationData(currentData.locations?.nodes));
    setUniversity(currentData.university?.nodes[0]);

    if(currentData.is_premium) {
      setIsPremium(true);
    }else{
      setIsPremium(false);
    }

    // si la date start_application a ete defini,
    // on verifie que la difference de la date du jour avec cette date est positive
    // si c'est positif, on verifie que la date de fin d'application est defini
    // si c'est defini, on verifie la difference de la date jour avec cette date est positive
    // si c'est positif, on dit que les admissions sont ferme
    // si c'est negatif, on dit que les adminission sont ouvert
    // si ce n'est pas defini, on dit que les adminssions sont ouvert
    // si c'est negatif, on dit que la date de la prochaine admission
    // si la date n'est pas defini, on dit que les dates ne sont pas encore defini

  }, [props.data]);

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

  // let intVal = '1,300,000';
  // intVal = intVal.toString().replace(/,/g, " ");
  // console.log(intVal);

  if (Object.entries(data).length === 0) return <div>Loading</div>;

  return (
    <div>
      <Head>
        <title>{ data.seo.title } - Courses</title>
      </Head>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-start space-x-3 text-sm text-custom-primary">
            <Link href="/">
              <a>Home</a>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2" />
            <Link href="/country">
              <a>Country</a>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2" />
            <Link href={`/country/${location.slug}`}>
              <a>{location.country}</a>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 hidden md:inline" />
            <Link href={`/university/${university.slug}`}>
              <a className="hidden md:inline">{university.title}</a>
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="w-2 h-2 hidden md:inline" />
            <span className="hidden md:inline">{data.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto md:px-4 md:my-10">
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-0">
          <div className="col-span-2">
            <div className="bg-white border border-gray-200 md:p-4 py-4 px-4 md:mb-6 mb-4 md:space-y-5 space-y-3">
              <div className="flex justify-between">
                <div className="w-full">
                  <h1 className="text-2xl md:text-3xl font-medium text-black">
                    {data.title}
                  </h1>
                  <div className="md:flex items-start justify-between w-full">
                    <div className="flex items-center space-x-2 md:space-x-3 mt-3 md:mt-3 text-custom-primary md:text-base font-normal">
                      <FontAwesomeIcon icon={faUniversity} className="md:w-4 w-3 text-black" />{' '}
                      <Link href={`/university/${university.slug}`}>
                        <a>
                          <span>{university.title}</span>
                        </a>
                      </Link>
                    </div>
                    <div className="flex md:block items-center justify-between">
                      <div className="flex items-center space-x-2 md:space-x-2 mt-3 md:mt-3 text-gray-600 md:text-base">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="md:w-4 w-3" />{' '}
                        <span>{location.city},</span>
                        <span className="text-custom-primary">{location.country}</span>
                      </div>
                      <div className="flex-1 text-right mt-3">Taught in {data.language}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center w-full justify-between md:justify-start">
              {/*<div className="flex items-center md:space-x-8 w-full justify-between md:justify-start">*/}
                {/*<div>*/}
                {/*  <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">*/}
                {/*    <FontAwesomeIcon icon={faThumbsUp} className="md:w-3 w-3" /> <span>Like</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className={"md:hidden"}>
                  <div
                      onClick={() => shareuniversity()}
                      className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                    <FontAwesomeIcon icon={faShare} className="md:w-3 w-3" /> <span>Share</span>
                  </div>
                </div>
                <div className="md:flex-1 hidden text-right">Taught in {data.language}</div>
              </div>

              <div className="grid md:grid-cols-4 grid-cols-2 items-center w-full text-sm md:text-base gap-6 md:pt-6 pt-3 md:grid-rows-1 grid-rows-2">
                <div className="bg-gray-100 flex flex-col gap-1 justify-center items-center text-center md:px-2 px-4 md:py-3 py-1 md:text-lg rounded-lg w-full h-full">
                  <span className="text-gray-700 font-normal">Program Type</span>
                  <span className="font-medium md:text-lg">{data.studiesLevel.nodes[0].name}</span>
                </div>
                <div className="bg-gray-100 flex flex-col gap-1 justify-center items-center text-center md:px-2 px-4 md:py-3 py-1 md:text-lg rounded-lg w-full h-full">
                  <span className="text-gray-700 font-normal">Tuition fees{data.fees_duration}</span>

                  <span className="font-medium md:text-lg">{data.national_fees.currency} {data.national_fees.tuition_fees}</span>
                </div>
                <div className="bg-gray-100 flex flex-col gap-1 justify-center items-center text-center md:px-2 px-4 md:py-3 py-1 md:text-lg rounded-lg w-full h-full">
                  <span className="text-gray-700 font-normal">Class Begin</span>
                  <span className="font-medium md:text-lg flex flex-col">
                    {data.sessions.slice(0,2).map((item, i) => {
                        let date = '';
                        let format = '';
                        let formatShow = '';
                        if(item.classes_begin.day > 0) {
                          date += item.classes_begin.day;
                          format += 'DD-';
                          formatShow += 'Do ';
                        }
                        if(item.classes_begin.month) {
                          date += moment().month(item.classes_begin.month).format("M")+'-';
                          format += 'MM-';
                          formatShow += 'MMM ';
                        }
                        if(item.classes_begin.year) {
                          date += item.classes_begin.year;
                          format += 'YYYY';
                          formatShow += 'YYYY';
                        }

                        if(!item.classes_begin.month && !item.classes_begin.year) return <span key={i}>Under research</span>;

                        date = moment(date, format).format(formatShow);
                        return <span key={i}>{date}</span>
                    })}
                  </span>
                </div>
                <div className="bg-gray-100 flex flex-col gap-1 justify-center items-center text-center md:px-2 px-4 md:py-3 py-1 md:text-lg rounded-lg w-full h-full">
                  <span className="text-gray-700 font-normal">Admission</span>
                  <span className="font-medium md:text-lg flex flex-col">
                    {data.all_open ? (
                        <span className="text-green-600">Current Open</span>
                    ) : (
                        <>
                          {data.admission.slice(0,2).map((item, i) => {

                            const session_name = data.admission.length > 1 ? <span className={"text-xs italic"}>({item.name || 'Session '+(i + 1)})</span> : "";

                            if(item.type === 'coming') return <span key={i} className="">Coming soon {session_name}</span>
                            if(item.type === 'future') return <span key={i}>{moment(item.date).format(item.format)} {session_name}</span>
                            if(item.type === 'current') return <span key={i} className="text-green-600">Current Open {session_name}</span>
                            if(item.type === 'end') return <span key={i} className="text-red-600">Closed {session_name}</span>

                          })}
                        </>
                    )}
                  </span>

                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 mb-6">
              <table className="min-w-full text-sm md:text-base font-normal">
                <tbody className="divide-y divide-gray-200">
                  <tr className="divide-x divide-gray-200">
                    <td className="font-medium md:text-lg px-4 py-4">Duration</td>
                    <td className="px-4 py-4">{data.duration_time?.time_number} {data.duration_time.time_month} ({data.attendant === 'full_time' ? 'Full-time' : 'Part-Time'})</td>
                  </tr>
                  <tr className="divide-x divide-gray-200">
                    <td className="font-medium md:text-lg px-4 py-4">Academic Unit</td>
                    <td className="px-4 py-4">{data.academic_unit}</td>
                  </tr>
                  <tr className="divide-x divide-gray-200">
                    <td className="font-medium md:text-lg px-4 py-4">Campus</td>
                    <td className="px-4 py-4">{data.campus}</td>
                  </tr>
                  <tr className="divide-x divide-gray-200">
                    <td className="font-medium md:text-lg px-4 py-4">Final Award</td>
                    <td className="px-4 py-4">{data.final_award}</td>
                  </tr>
                  <tr className="divide-x divide-gray-200">
                    <td className="font-medium md:text-lg px-4 py-4 flex items-start">
                      <span>Key Dates</span>
                    </td>
                    <td className="px-4 py-4">
                      {data.sessions.slice(0,2).map((item, i) => {

                        let date_class_begin = '';
                        let formatClassBegin = '';
                        let formatShowClassBegin = '';
                        if(item.classes_begin.day > 0) {
                          date_class_begin += item.classes_begin.day;
                          formatClassBegin += 'DD-';
                          formatShowClassBegin += 'Do ';
                        }
                        if(item.classes_begin.month) {
                          date_class_begin += moment().month(item.classes_begin.month).format("M")+'-';
                          formatClassBegin += 'MM-';
                          formatShowClassBegin += 'MMM ';
                        }
                        if(item.classes_begin.year) {
                          date_class_begin += item.classes_begin.year;
                          formatClassBegin += 'YYYY';
                          formatShowClassBegin += 'YYYY';
                        }


                        if(item.classes_begin.month && item.classes_begin.year){
                          date_class_begin = moment(date_class_begin, formatClassBegin).format(formatShowClassBegin);
                        }else{
                          date_class_begin = 'Under research';
                        }


                        let date_start_application = '';
                        let formatStartApplication = '';
                        let formatShowStartApplication = '';
                        if(item.start_application.day > 0) {
                          date_start_application += item.start_application.day;
                          formatStartApplication += 'DD-';
                          formatShowStartApplication += 'Do ';
                        }
                        if(item.start_application.month) {
                          date_start_application += moment().month(item.start_application.month).format("M")+'-';
                          formatStartApplication += 'MM-';
                          formatShowStartApplication += 'MMM ';
                        }
                        if(item.start_application.year) {
                          date_start_application += item.start_application.year;
                          formatStartApplication += 'YYYY';
                          formatShowStartApplication += 'YYYY';
                        }

                        if(item.start_application.month && item.start_application.year){
                          date_start_application = moment(date_start_application, formatStartApplication).format(formatShowStartApplication);
                        }else{
                          date_start_application = 'Under research';
                        }


                        let date_deadline_application = '';
                        let formatDeadlineApplication = '';
                        let formatShowDeadlineApplication = '';
                        if(item.deadline_application.day > 0) {
                          date_deadline_application += item.deadline_application.day;
                          formatDeadlineApplication += 'DD-';
                          formatShowDeadlineApplication += 'Do ';
                        }
                        if(item.deadline_application.month) {
                          date_deadline_application += moment().month(item.deadline_application.month).format("M")+'-';
                          formatDeadlineApplication += 'MM-';
                          formatShowDeadlineApplication += 'MMM ';
                        }
                        if(item.deadline_application.year) {
                          date_deadline_application += item.deadline_application.year;
                          formatDeadlineApplication += 'YYYY';
                          formatShowDeadlineApplication += 'YYYY';
                        }

                        if(item.deadline_application.month && item.deadline_application.year){
                          date_deadline_application = moment(date_deadline_application, formatDeadlineApplication).format(formatShowDeadlineApplication);
                        }else{
                          date_deadline_application = 'Under research'
                        }


                        return (
                            <React.Fragment key={i}>
                              {data.sessions.length > 1 && (<div className="italic underline mb-2">{item.name || 'Session '+(i +1)}</div>)}
                              <ul className="list-outside ml-4 list-disc">
                                <li>
                                  Classe begin : <span className="font-medium">{date_class_begin}</span>
                                </li>
                                {!data.all_open && (
                                    <>
                                      <li>
                                        Applications start in: <span className="font-medium">{date_start_application}</span>
                                      </li>
                                      <li>
                                        Application deadline: <span className="font-medium">{date_deadline_application}</span>
                                      </li>
                                    </>
                                )}
                              </ul>
                            </React.Fragment>
                        )
                      })}

                    </td>
                  </tr>
                  <tr className="divide-x divide-gray-200">
                    <td className="font-medium md:text-lg px-4 py-4 flex items-start">
                      <span>Application fees</span>
                    </td>
                    <td className="px-4 py-4">
                      <ul className="list-outside ml-4 list-disc">
                        <li>
                          For {data.fees_apply_to_national} : <span className="font-medium">{data.national_application_fees.currency} {data.national_application_fees.tuition_fees}</span>
                        </li>
                        <li>
                          For {data.fees_apply_to_international} : <span className="font-medium">{data.international_application_fees.currency} {data.international_application_fees.tuition_fees}</span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="divide-x divide-gray-200">
                    <td className="font-medium md:text-lg px-4 py-4 flex items-start">
                      <span>Tuition fees</span>
                    </td>
                    <td className="px-4 py-4">
                      <ul className="list-outside ml-4 list-disc">
                        <li>
                          For {data.fees_apply_to_national} : <span className="font-medium">{data.national_fees.currency} {data.national_fees.tuition_fees} {data.fees_duration}</span>
                        </li>
                        <li>
                          For {data.fees_apply_to_international} : <span className="font-medium">{data.national_fees.currency} {data.international_fees.tuition_fees} {data.fees_duration}</span>
                        </li>
                      </ul>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className="md:mb-6 mb-4 px-3 md:px-0">
              <Accordion
                className={styles.accordion_3 + ' md:space-y-6 space-y-4'}
                preExpanded={[1]}
              >
                {data?.content && (
                    <AccordionItem
                        activeClassName="bg-black text-white rounded-t-xl font-normal"
                        uuid={1}
                        className={'bg-custom-primary bg-opacity-25 text-black rounded-xl'}
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton className={styles.accordion_heading_3}>
                          <div className={`font-normal text-2xl`}>Programme Overview</div>
                          <div className="w-1/5 flex justify-end pr-6">
                            <AccordionItemState>
                              {({ expanded }) =>
                                  expanded ? (
                                      <FontAwesomeIcon
                                          icon={faChevronDown}
                                          className="mt-2 w-4 h-4 text-base text-white"
                                      />
                                  ) : (
                                      <FontAwesomeIcon
                                          icon={faChevronLeft}
                                          className="mt-2 w-4 h-4 text-base text-custom-secondary"
                                      />
                                  )
                              }
                            </AccordionItemState>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                        <div
                            dangerouslySetInnerHTML={{
                              __html: data?.content,
                            }}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                )}

                {data?.curriculum_detail && (
                    <AccordionItem
                        activeClassName="bg-black text-white rounded-t-xl font-normal"
                        uuid={2}
                        className={'bg-custom-primary bg-opacity-25 text-black rounded-xl'}
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton className={styles.accordion_heading_3}>
                          <div className={`font-normal text-2xl`}>Curriculum</div>
                          <div className="w-1/5 flex justify-end pr-6">
                            <AccordionItemState>
                              {({ expanded }) =>
                                  expanded ? (
                                      <FontAwesomeIcon
                                          icon={faChevronDown}
                                          className="mt-2 w-4 h-4 text-base text-white"
                                      />
                                  ) : (
                                      <FontAwesomeIcon
                                          icon={faChevronLeft}
                                          className="mt-2 w-4 h-4 text-base text-custom-secondary"
                                      />
                                  )
                              }
                            </AccordionItemState>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                        <div
                            dangerouslySetInnerHTML={{
                              __html: data?.curriculum_detail,
                            }}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                )}

                {data?.admission_detail && (
                    <AccordionItem
                        activeClassName="bg-black text-white rounded-t-xl font-normal"
                        uuid={3}
                        className={'bg-custom-primary bg-opacity-25 text-black rounded-xl'}
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton className={styles.accordion_heading_3}>
                          <div className={`font-normal text-2xl`}>Admission Requirements</div>
                          <div className="w-1/5 flex justify-end pr-6">
                            <AccordionItemState>
                              {({ expanded }) =>
                                  expanded ? (
                                      <FontAwesomeIcon
                                          icon={faChevronDown}
                                          className="mt-2 w-4 h-4 text-base text-white"
                                      />
                                  ) : (
                                      <FontAwesomeIcon
                                          icon={faChevronLeft}
                                          className="mt-2 w-4 h-4 text-base text-custom-secondary"
                                      />
                                  )
                              }
                            </AccordionItemState>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                        <div
                            dangerouslySetInnerHTML={{
                              __html: data?.admission_detail,
                            }}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                )}

                {data?.application_detail && (
                    <AccordionItem
                        activeClassName="bg-black text-white rounded-t-xl font-normal"
                        uuid={4}
                        className={'bg-custom-primary bg-opacity-25 text-black rounded-xl'}
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton className={styles.accordion_heading_3}>
                          <div className={`font-normal text-2xl`}>Application Process</div>
                          <div className="w-1/5 flex justify-end pr-6">
                            <AccordionItemState>
                              {({ expanded }) =>
                                  expanded ? (
                                      <FontAwesomeIcon
                                          icon={faChevronDown}
                                          className="mt-2 w-4 h-4 text-base text-white"
                                      />
                                  ) : (
                                      <FontAwesomeIcon
                                          icon={faChevronLeft}
                                          className="mt-2 w-4 h-4 text-base text-custom-secondary"
                                      />
                                  )
                              }
                            </AccordionItemState>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                        <div
                            dangerouslySetInnerHTML={{
                              __html: data?.application_detail,
                            }}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                )}

                {data?.career_detail && (
                    <AccordionItem
                        activeClassName="bg-black text-white rounded-t-xl font-normal"
                        uuid={5}
                        className={'bg-custom-primary bg-opacity-25 text-black rounded-xl'}
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton className={styles.accordion_heading_3}>
                          <div className={`font-normal text-2xl`}>Career Opportunities</div>
                          <div className="w-1/5 flex justify-end pr-6">
                            <AccordionItemState>
                              {({ expanded }) =>
                                  expanded ? (
                                      <FontAwesomeIcon
                                          icon={faChevronDown}
                                          className="mt-2 w-4 h-4 text-base text-white"
                                      />
                                  ) : (
                                      <FontAwesomeIcon
                                          icon={faChevronLeft}
                                          className="mt-2 w-4 h-4 text-base text-custom-secondary"
                                      />
                                  )
                              }
                            </AccordionItemState>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                        <div
                            dangerouslySetInnerHTML={{
                              __html: data?.career_detail,
                            }}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                )}


                {data?.tuition_fees_detail && (
                    <AccordionItem
                        activeClassName="bg-black text-white rounded-t-xl font-normal"
                        uuid={6}
                        className={'bg-custom-primary bg-opacity-25 text-black rounded-xl'}
                    >
                      <AccordionItemHeading>
                        <AccordionItemButton className={styles.accordion_heading_3}>
                          <div className={`font-normal text-2xl`}>Tuition Fees Details</div>
                          <div className="w-1/5 flex justify-end pr-6">
                            <AccordionItemState>
                              {({ expanded }) =>
                                  expanded ? (
                                      <FontAwesomeIcon
                                          icon={faChevronDown}
                                          className="mt-2 w-4 h-4 text-base text-white"
                                      />
                                  ) : (
                                      <FontAwesomeIcon
                                          icon={faChevronLeft}
                                          className="mt-2 w-4 h-4 text-base text-custom-secondary"
                                      />
                                  )
                              }
                            </AccordionItemState>
                          </div>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                        <div
                            dangerouslySetInnerHTML={{
                              __html: data?.tuition_fees_detail,
                            }}
                        />
                      </AccordionItemPanel>
                    </AccordionItem>
                )}

              </Accordion>
            </div>

            <div className="bg-white border border-gray-200 md:p-4 py-4 px-4 md:mb-6 mb-4">
              <div className="flex justify-between">
                <div className="">
                  <h1 className="text-2xl md:text-3xl font-medium text-black">
                    <Link href={`/university/${university.slug}`}>
                      <a>
                        {university.title}
                      </a>
                    </Link>
                  </h1>
                  <div className="flex items-center space-x-2 md:space-x-3 my-5 md:my-3 text-gray-600 text-xs md:text-base">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="md:w-4 w-3" />{' '}
                    <span>{university.address}</span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="border border-gray-200 rounded-xl p-1">
                    <img src={university.logo} alt="" className="object-contain h-32 w-32" />
                  </div>
                </div>
              </div>

              <div className="flex items-center md:space-x-8 justify-between font-normal mb-6 md:w-2/3">
                <div>{university.number_student} Students</div>
                <div>{university.schoolTypes.nodes[0].name}</div>
                <div className="text-custom-secondary">{university.course_count} Courses</div>
              </div>

              <div className="flex items-center md:w-2/3 justify-between">
              {/*<div className="flex items-center md:space-x-8 md:w-2/3 justify-between">*/}
                {/*<div>*/}
                {/*  <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">*/}
                {/*    <FontAwesomeIcon icon={faThumbsUp} className="md:w-5 w-3" /> <span>Like</span>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <div className={"md:hidden"}>
                  <div
                      onClick={() => shareuniversity()}
                      className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                    <FontAwesomeIcon icon={faShare} className="md:w-5 w-3" /> <span>Share</span>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-3 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                    <FontAwesomeIcon icon={faImage} className="md:w-5 w-3" /> <span>{university.gallery.length} photos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            {/*<div className="bg-white border border-gray-200 mb-6 relative">*/}
            {/*  <div className="md:p-4 py-2 px-4 font-medium text-xl md:text-2xl border-b border-dotted border-gray-200 flex items-center justify-center space-x-3">*/}
            {/*    <span className="relative">*/}
            {/*      <span className="absolute -top-1.5 inline-flex rounded-full text-white bg-custom-secondary p-1">*/}
            {/*        <FontAwesomeIcon icon={faPlus} className="w-2 h-2" />*/}
            {/*      </span>*/}
            {/*      <FontAwesomeIcon icon={faBell} className="md:w-6 w-4 text-custom-secondary" />*/}
            {/*    </span>*/}
            {/*    <span>Receive Course Alerts</span>*/}
            {/*  </div>*/}
            {/*  <div className="p-4 font-normal text-xl text-justify">*/}
            {/*    Every time we add new{' '}*/}
            {/*    <Link href={'/'}>*/}
            {/*      <a className="text-custom-primary">Computer Science</a>*/}
            {/*    </Link>{' '}*/}
            {/*    courses in{' '}*/}
            {/*    <Link href={'/'}>*/}
            {/*      <a className="text-custom-primary">Egypt</a>*/}
            {/*    </Link>*/}
            {/*    , you will be notified.*/}
            {/*    <div className="mt-5 flex items-center justify-between">*/}
            {/*      <input*/}
            {/*        type="text"*/}
            {/*        className="border-0 h-12 bg-gray-200 text-black outline-none focus:outline-none w-full"*/}
            {/*        placeholder="Your email adresse"*/}
            {/*      />*/}
            {/*      <button*/}
            {/*        type="submit"*/}
            {/*        className="p-2 bg-black text-white w-2/5 h-12 text-xs md:text-base outline-none focus:outline-none rounded-r-lg"*/}
            {/*      >*/}
            {/*        Get Alerts*/}
            {/*      </button>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {(isPremium && data.whatsapp_number) && (
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
                    <div className="text-gray-800 mb-4">
                      Be directly connected to this University via WhatsApp
                    </div>
                    <Link href={`https://wa.me/${data.whatsapp_number}?text=I want to know about this course.`} >
                      <a className="text-white rounded-lg px-5 py-3" target={'_blank'} style={{ backgroundColor : "#085F56" }}>Chat now </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 mb-6 relative">
              <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 flex items-center space-x-3">
                <span> Course Contact</span>
              </div>
              <div className="p-6 space-y-5">
                {data.contacts.map((item, i) => {
                  return <div key={i}>
                    <div className="text-xl font-normal text-black">{item.name}</div>
                    <div className="text-gray-400 py-3">
                      {' '}
                      {item.post}
                    </div>
                    <div className="flex space-x-5 items-center">
                      <ButtonRedSecondary
                          onClick={() =>
                              item.emails ? (window.location = `mailto:${item.emails[0]}`) : {}
                          }
                          className="flex items-center space-x-2 rounded-lg">
                        <FontAwesomeIcon icon={faEnvelope} className="w-6 h-4" />{' '}
                        <span>Send a Message</span>
                      </ButtonRedSecondary>
                        {(item.phone && isPremium) && (
                            <ButtonDefaultSecondary
                                className="flex items-center space-x-2 rounded-lg">
                              <FontAwesomeIcon icon={faPhoneAlt} className="w-6 h-4" />{' '}
                              <span>Call Now</span>
                            </ButtonDefaultSecondary>
                        )}

                    </div>
                  </div>
                })}
              </div>
            </div>

            <div className="bg-white border border-gray-200 mb-6 relative">
              <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 flex items-center space-x-3">
                <span> Similar Programmes</span>
              </div>
              <div className="h-full">
                <TabSimilarSection currentCourseId={data.databaseId} data={data.specialisations.nodes} country={location}/>
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

  const data = await client.query({
    query: GET_COURSE_BY,
    variables: {
      id: params.id,
    },
  });

  // Pass post data to the page via props
  return {
    props: { data : data?.data.course, id: params.id, slug: params.slug },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}

export default CoursesPage;
