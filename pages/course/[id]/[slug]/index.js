import React from 'react';
import Head from "next/dist/next-server/lib/head";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronLeft,
    faChevronRight,
    faMapMarkerAlt, faMinus,
    faPlayCircle, faPlus,
    faShare,
    faThumbsUp,
    faUniversity
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../../styles/globals.module.scss";
import {
    Accordion, AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState
} from "react-accessible-accordion";
import {faBell, faEnvelope, faImage} from "@fortawesome/free-regular-svg-icons";
import {Button, ButtonDefault, ButtonRedSecondary} from "../../../../src/components/styleComponent/button";
import TabSimilarSection from "../../../../src/components/sections/course/tabSimilar";
import {useRouter} from "next/router";
import {useMediaQuery} from "react-responsive";


const CoursesPage = (props) => {

    const router = useRouter();
    const [isPremium, setIsPremium] = React.useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);

    React.useEffect(() => {
        if(isMobile){
            setIsCurrentMobile(true)
        }else{
            setIsCurrentMobile(false);
        }
    }, [isMobile]);

    React.useEffect(() => {
        if(router.query?.q) setIsPremium(true);
    }, [router.query])

    return <div>
        <Head>
            <title>Courses Page - Afriuni</title>
        </Head>

        <div className="bg-white">
            <div className="container mx-auto px-4 py-5">
                <div className="flex flex-wrap items-center justify-start space-x-3 text-sm text-custom-primary">
                    <Link href="/">
                        <a>
                            Home
                        </a>
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} className="w-2"/>
                    <Link href="/country">
                        <a>
                            Courses
                        </a>
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} className="w-2"/>
                    <span>
                        American University in Cairo
                    </span>
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
                                    Computer Technology, BSc
                                </h1>
                                <div className="md:flex justify-between w-full">
                                    <div className="flex items-center space-x-2 md:space-x-3 mt-3 md:mt-3 text-custom-primary md:text-base font-normal">
                                        <FontAwesomeIcon icon={faUniversity} className="md:w-4 w-3 text-black" /> <span>American University in Cairo</span>
                                    </div>
                                    <div className="flex md:block items-center justify-between">
                                        <div className="flex items-center space-x-2 md:space-x-2 mt-3 md:mt-3 text-gray-600 md:text-base">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="md:w-4 w-3" /> <span>Cairo,</span><span className="text-custom-primary">Egypt</span>
                                        </div>
                                        <div className="flex-1 md:hidden text-right mt-3">
                                            Taught in English
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center md:space-x-8 w-full justify-between md:justify-start">
                            <div>
                                <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                    <FontAwesomeIcon icon={faThumbsUp} className="md:w-3 w-3" /> <span>Like</span>
                                </div>
                            </div>
                            <div>
                                <div className="bg-gray-200 hover:bg-red-200 hover:text-red-600 text-black text-xs md:text-base md:px-4 px-4 py-2 flex items-center space-x-2 rounded-lg cursor-pointer">
                                    <FontAwesomeIcon icon={faShare} className="md:w-3 w-3" /> <span>Share</span>
                                </div>
                            </div>
                            <div className="md:flex-1 hidden text-right">
                                Taught in English
                            </div>
                        </div>

                        <div className="grid md:grid-cols-4 grid-cols-2 items-center w-full text-sm md:text-base gap-6 md:pt-6 pt-3 md:grid-rows-1 grid-rows-2">
                            <div className="bg-gray-100 flex flex-col gap-1 justify-center items-center text-center md:px-2 px-4 md:py-3 py-1 md:text-lg rounded-lg w-full h-full">
                                <span className="text-gray-700 font-normal">Program Type</span>
                                <span className="font-medium md:text-xl">Bachelors</span>
                            </div>
                            <div className="bg-gray-100 flex flex-col gap-1 justify-center items-center text-center md:px-2 px-4 md:py-3 py-1 md:text-lg rounded-lg w-full h-full">
                                <span className="text-gray-700 font-normal">Tuition fees/year</span>
                                <span className="font-medium md:text-xl">KSh 100,000</span>
                            </div>
                            <div className="bg-gray-100 flex flex-col gap-1 justify-center items-center text-center md:px-2 px-4 md:py-3 py-1 md:text-lg rounded-lg w-full h-full">
                                <span className="text-gray-700 font-normal">Class Begin</span>
                                <span className="font-medium md:text-xl flex flex-col"><span>Jan 2021</span> <span>Aug 2021</span></span>
                            </div>
                            <div className="bg-gray-100 flex flex-col gap-1 justify-center items-center text-center md:px-2 px-4 md:py-3 py-1 md:text-lg rounded-lg w-full h-full">
                                <span className="text-gray-700 font-normal">Admission</span>
                                <span className="font-medium md:text-xl text-green-600">Current Open</span>
                            </div>
                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 mb-6">
                        <table className="min-w-full text-sm md:text-base font-normal">
                            <tbody className="divide-y divide-gray-200">
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium md:text-lg px-4 py-4">
                                    Duration
                                </td>
                                <td className="px-4 py-4">3 Years (Full-time)</td>
                            </tr>
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium md:text-lg px-4 py-4">
                                    Academic Unit
                                </td>
                                <td className="px-4 py-4">Faculty  of Technology</td>
                            </tr>
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium md:text-lg px-4 py-4">
                                    Campus
                                </td>
                                <td className="px-4 py-4">New Cairo Campus</td>
                            </tr>
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium md:text-lg px-4 py-4">
                                    Final Award
                                </td>
                                <td className="px-4 py-4">Bachelor of Science in Computer Technology</td>
                            </tr>
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium md:text-lg px-4 py-4 flex items-start">
                                    <span>Key Dates</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="italic underline mb-2">Session 1</div>
                                    <ul className="list-outside ml-4 list-disc">
                                        <li>Application deadline: <span className="font-medium">Jan 2021</span></li>
                                        <li>Applications start in: <span className="font-medium">Jan 2021</span></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium text-lg px-4 py-4 flex items-start">
                                    <span>Tuition fees</span>
                                </td>
                                <td className="px-4 py-4">
                                    <ul className="list-outside ml-4 list-disc">
                                        <li>For Egyptian Students: <span className="font-medium">Fcfa 500,000</span></li>
                                        <li>For Foreign Students:  <span className="font-medium">Fcfa 800,000</span></li>
                                    </ul>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white border border-gray-200 mb-6 relative">
                        <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 flex items-center space-x-3">
                            <span>Full-time Study</span>
                        </div>

                        <table className="min-w-full text-sm md:text-base font-normal">
                            <tbody className="divide-y divide-gray-200">
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium md:text-lg px-4 py-4">
                                    Duration
                                </td>
                                <td className="px-4 py-4">3 Years (Full-time)</td>
                            </tr>
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium md:text-lg px-4 py-4 flex items-start">
                                    <span>Key Dates</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="italic underline mb-2">Session 1</div>
                                    <ul className="list-outside ml-4 list-disc">
                                        <li>Application deadline: <span className="font-medium">Jan 2021</span></li>
                                        <li>Applications start in: <span className="font-medium">Jan 2021</span></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr className="divide-x divide-gray-200">
                                <td className="font-medium md:text-lg px-4 py-4 flex items-start">
                                    <span>Tuition fees</span>
                                </td>
                                <td className="px-4 py-4">
                                    <ul className="list-outside ml-4 list-disc">
                                        <li>For Egyptian Students: <span className="font-medium">Fcfa 500,000</span></li>
                                        <li>For Foreign Students:  <span className="font-medium">Fcfa 800,000</span></li>
                                    </ul>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="md:mb-6 mb-4 px-3 md:px-0">
                        <Accordion className={styles.accordion_3 + " md:space-y-6 space-y-4"} preExpanded={[1]}>
                            <AccordionItem activeClassName="bg-black text-white rounded-t-xl font-normal" uuid={1} className={"bg-custom-primary bg-opacity-25 text-black rounded-xl"}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className={styles.accordion_heading_3}>
                                        <div className={`font-normal text-2xl`}>
                                            Programme Overview
                                        </div>
                                        <div className="w-1/5 flex justify-end pr-6">
                                            <AccordionItemState>
                                                {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faChevronDown} className="mt-2 w-4 h-4 text-base text-white" /> : <FontAwesomeIcon icon={faChevronLeft} className="mt-2 w-4 h-4 text-base text-custom-secondary" />)}
                                            </AccordionItemState>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi at aut consequuntur dolorem enim, esse eveniet facere, fugiat in minus nobis non nostrum quis quod similique suscipit tempora voluptate!
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem activeClassName="bg-black text-white rounded-t-xl font-normal" uuid={2} className={"bg-custom-primary bg-opacity-25 text-black rounded-xl"}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className={styles.accordion_heading_3}>
                                        <div className={`font-normal text-2xl`}>
                                            Curriculum
                                        </div>
                                        <div className="w-1/5 flex justify-end pr-6">
                                            <AccordionItemState>
                                                {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faChevronDown} className="mt-2 w-4 h-4 text-base text-white" /> : <FontAwesomeIcon icon={faChevronLeft} className="mt-2 w-4 h-4 text-base text-custom-secondary" />)}
                                            </AccordionItemState>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi at aut consequuntur dolorem enim, esse eveniet facere, fugiat in minus nobis non nostrum quis quod similique suscipit tempora voluptate!
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem activeClassName="bg-black text-white rounded-t-xl font-normal" uuid={3} className={"bg-custom-primary bg-opacity-25 text-black rounded-xl"}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className={styles.accordion_heading_3}>
                                        <div className={`font-normal text-2xl`}>
                                            Admission Requirements
                                        </div>
                                        <div className="w-1/5 flex justify-end pr-6">
                                            <AccordionItemState>
                                                {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faChevronDown} className="mt-2 w-4 h-4 text-base text-white" /> : <FontAwesomeIcon icon={faChevronLeft} className="mt-2 w-4 h-4 text-base text-custom-secondary" />)}
                                            </AccordionItemState>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi at aut consequuntur dolorem enim, esse eveniet facere, fugiat in minus nobis non nostrum quis quod similique suscipit tempora voluptate!
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem activeClassName="bg-black text-white rounded-t-xl font-normal" uuid={4} className={"bg-custom-primary bg-opacity-25 text-black rounded-xl"}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className={styles.accordion_heading_3}>
                                        <div className={`font-normal text-2xl`}>
                                            Application Process
                                        </div>
                                        <div className="w-1/5 flex justify-end pr-6">
                                            <AccordionItemState>
                                                {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faChevronDown} className="mt-2 w-4 h-4 text-base text-white" /> : <FontAwesomeIcon icon={faChevronLeft} className="mt-2 w-4 h-4 text-base text-custom-secondary" />)}
                                            </AccordionItemState>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi at aut consequuntur dolorem enim, esse eveniet facere, fugiat in minus nobis non nostrum quis quod similique suscipit tempora voluptate!
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem activeClassName="bg-black text-white rounded-t-xl font-normal" uuid={5} className={"bg-custom-primary bg-opacity-25 text-black rounded-xl"}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className={styles.accordion_heading_3}>
                                        <div className={`font-normal text-2xl`}>
                                            Career Opportunities
                                        </div>
                                        <div className="w-1/5 flex justify-end pr-6">
                                            <AccordionItemState>
                                                {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faChevronDown} className="mt-2 w-4 h-4 text-base text-white" /> : <FontAwesomeIcon icon={faChevronLeft} className="mt-2 w-4 h-4 text-base text-custom-secondary" />)}
                                            </AccordionItemState>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi at aut consequuntur dolorem enim, esse eveniet facere, fugiat in minus nobis non nostrum quis quod similique suscipit tempora voluptate!
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem activeClassName="bg-black text-white rounded-t-xl font-normal" uuid={6} className={"bg-custom-primary bg-opacity-25 text-black rounded-xl"}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className={styles.accordion_heading_3}>
                                        <div className={`font-normal text-2xl`}>
                                            Tuition Fees Details
                                        </div>
                                        <div className="w-1/5 flex justify-end pr-6">
                                            <AccordionItemState>
                                                {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faChevronDown} className="mt-2 w-4 h-4 text-base text-white" /> : <FontAwesomeIcon icon={faChevronLeft} className="mt-2 w-4 h-4 text-base text-custom-secondary" />)}
                                            </AccordionItemState>
                                        </div>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="bg-white text-custom-body px-6 py-6 w-full border border-gray-200">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi at aut consequuntur dolorem enim, esse eveniet facere, fugiat in minus nobis non nostrum quis quod similique suscipit tempora voluptate!
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>

                        </Accordion>
                    </div>

                    <div className="bg-white border border-gray-200 md:p-4 py-4 px-4 md:mb-6 mb-4">

                        <div className="flex justify-between">
                            <div className="">
                                <h1 className="text-2xl md:text-3xl font-medium text-black">
                                    American University in Cairo
                                </h1>
                                <div className="flex items-center space-x-2 md:space-x-3 my-5 md:my-3 text-gray-600 text-xs md:text-base">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="md:w-4 w-3" /> <span>AUC Avenue, PO Box 74 New Cairo, Cairo</span>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="border border-gray-200 rounded-xl p-1">
                                    <img src="../../../logoUniv.jpg" alt="" className="object-contain"/>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center md:space-x-8 justify-between font-normal mb-6 md:w-2/3">
                            <div>
                                6600 Students
                            </div>
                            <div>
                                Private Institution
                            </div>
                            <div className="text-custom-secondary">
                                75 Courses
                            </div>
                        </div>

                        <div className="flex items-center md:space-x-8 md:w-2/3 justify-between">
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
                                    <FontAwesomeIcon icon={faImage} className="md:w-5 w-3" /> <span>15 photos</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="col-span-1">

                    <div className="bg-white border border-gray-200 mb-6 relative">
                        <div className="md:p-4 py-2 px-4 font-medium text-xl md:text-2xl border-b border-dotted border-gray-200 flex items-center justify-center space-x-3">
                            <span className="relative">
                                    <span
                                        className="absolute -top-1.5 inline-flex rounded-full text-white bg-custom-secondary p-1">
                                        <FontAwesomeIcon icon={faPlus} className="w-2"/>
                                    </span>
                                    <FontAwesomeIcon icon={faBell} className="md:w-6 w-4 text-custom-secondary" />
                                </span>
                            <span>Receive Course Alerts</span>
                        </div>
                        <div className="p-4 font-normal text-xl text-justify">
                            Every time we add new <Link href={"/"}>
                                <a className="text-custom-primary">Computer Science</a>
                            </Link>   courses in <Link href={"/"}>
                            <a className="text-custom-primary">Egypt</a>
                        </Link>, you will be notified.

                            <div className="mt-5 flex items-center justify-between">
                                <input type="text" className="border-0 h-12 bg-gray-200 text-black outline-none focus:outline-none w-full" placeholder="Your email adresse"/>
                                <button type="submit" className="p-2 bg-black text-white w-2/5 h-12 text-xs md:text-base outline-none focus:outline-none rounded-r-lg">
                                    Get Alerts
                                </button>
                            </div>
                        </div>
                    </div>

                    {isPremium && (
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
                                    <Button className="text-white rounded-lg" style={{ backgroundColor : "#085F56" }}>Chat now</Button>
                                </div>
                            </div>

                        </div>
                    )}

                    <div className="bg-white border border-gray-200 mb-6 relative">
                        <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 flex items-center space-x-3">
                            <span> Course Contact</span>
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

                    <div className="bg-white border border-gray-200 mb-6 relative">
                        <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 flex items-center space-x-3">
                            <span> Similar Programmes</span>
                        </div>
                        <div className="h-full">

                            <TabSimilarSection />

                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
}

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

    // Pass post data to the page via props
    return {
        props: { id: params.id, slug: params.slug },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
    }
}

export default CoursesPage;