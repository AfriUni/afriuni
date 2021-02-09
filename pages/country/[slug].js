import React from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faChevronDown,
    faChevronLeft,
    faChevronRight, faPlay,
    faPlayCircle,
    faUniversity
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/globals.module.scss";
import Head from "next/dist/next-server/lib/head";
import CountryUniversityCard from "../../src/components/cards/countryUniversityCard";
import Dropdown, {ItemDropdown} from "../../src/components/general/dropdown";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
} from 'react-accessible-accordion';

import {useMediaQuery} from "react-responsive";
import DestinationCard from "../../src/components/cards/destinationCard";
import client from "../../src/apollo/client";
import {GET_LOCATION_BY} from "../../src/queries/location/get-location";
import {GET_COUNTRIES} from "../../src/queries/get-countries";
import {GET_FEATURED_UNIVERSITY} from "../../src/queries/home/get-featuredUniversities";



const CountryPage = (props) => {

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);
    const [data, setData] = React.useState({});
    const [studyLevel, setStudyLevel] = React.useState([]);
    const [studyMobileLevel, setStudyMobileLevel] = React.useState([]);

    const [city, setCity] = React.useState([]);
    const [schoolType, setSchoolType] = React.useState([]);
    const [children, setChildren] = React.useState([]);
    const [categoryCourse, setCategoryCourse] = React.useState([]);

    const [featured, setFeatured] = React.useState([]);

    const [changedCity, setChangedCity] = React.useState("");
    const [changedSchoolType, setChangedSchoolType] = React.useState("");

    React.useEffect(() => {
        if(isMobile){
            setIsCurrentMobile(true)
        }else{
            setIsCurrentMobile(false);
        }
    }, [isMobile]);

    React.useEffect(() => {
        const currentData = props.data?.data.location || [];
        setData(currentData);

        const studiesLevel = currentData?.studyLevel || [];
        const studyData = [];
        const studyDataMobile = [];
        let indexStudy = 0;
        let indexStudyMobile = 0;

        studiesLevel.map((item, i) => {
            const study = item;

            if(!studyData[indexStudy]){
                studyData[indexStudy] = [];
            }

            if(!studyDataMobile[indexStudyMobile]){
                studyDataMobile[indexStudyMobile] = [];
            }

            studyData[indexStudy].push(study);
            studyDataMobile[indexStudyMobile].push(study);

            if(studyData[indexStudy].length === 2){
                indexStudy += 1;
            }

            if(studyDataMobile[indexStudyMobile].length === 3){
                indexStudyMobile += 1;
            }
        });

        setStudyLevel(studyData);
        setStudyMobileLevel(studyDataMobile)

    }, [props.data]);

    React.useEffect(() => {

        if(Object.entries(data).length){
            const cities = [];
            const schooTypes = [];
            data.children?.nodes.map((item, i) => {
                cities.push({
                    id : item.databaseId,
                    name : item.name,
                    slug: item.slug
                });

                item.universities.nodes.map((subItem, i) => {
                    subItem.schoolTypes.nodes.map((school, i) => {
                        const checkSchoolType = schooTypes.filter(order => order.id === school.databaseId)
                        if(!checkSchoolType.length){
                            schooTypes.push({
                                id : school.databaseId,
                                name : school.name,
                                slug: school.slug
                            })
                        }
                    })
                })
            });

            const listCourses = [];
            const category = [];

            data.courses?.nodes.map((item, i) => {

                item.specialisations.nodes.map((cat, i) => {
                    if(cat.parent){
                        if(!category.includes(cat.parent.node.id)) {
                            category.push(cat.parent.node.id);
                            const currentCourse = [];
                            currentCourse.push(item);
                            listCourses.push({...cat.parent.node, courses: currentCourse})
                        }else{
                            const index = category.indexOf(cat.parent.node.id);
                            listCourses[index].courses.push(item);
                        }
                    }else{
                        if(!category.includes(cat.id)) {
                            category.push(cat.id);
                            const currentCourse = [];
                            currentCourse.push(item);
                            listCourses.push({...cat, courses: currentCourse})
                        }else{
                            const index = category.indexOf(cat.id);
                            listCourses[index].courses.push(item);
                        }
                    }
                });

            });



            setCategoryCourse(listCourses.sort(compareSpecialisation));
            setCity(cities);
            setSchoolType(schooTypes);
            setChildren(data.children.nodes);
        }

    }, [data]);

    React.useEffect(() => {

        const featUniv = [];

        if(props.featuredUniversity && Object.entries(props.featuredUniversity.data).length !== 0) {

            props.featuredUniversity.data.universitiesFeatured.nodes.map((item, i) => {
                const university = item.featured_list.nodes;
                university.map((subItem, i) => {
                    const check = subItem.locations.nodes.filter(order => order.name === data.name);
                    if(check.length > 0) featUniv.push(subItem);
                })
            });

            shuffle(featUniv);
            setFeatured(featUniv);
        }

    }, [props.featuredUniversity, data])

    const shuffle = (array) => {
        array.sort(() => Math.random() - 0.5);
    }

    const compareSpecialisation = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const bandA = a.name.toUpperCase();
        const bandB = b.name.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    const compareCourses = (a, b) => {
        // Use toUpperCase() to ignore character casing
        const bandA = a.title.toUpperCase();
        const bandB = b.title.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    const onChangeCity = (slug, link = false, dataChildren = []) => {

        let currentChildren = children;
        if(!link) currentChildren = data.children.nodes;
        if(dataChildren.length) currentChildren = dataChildren;

        if(slug){
            const childrenChanged = currentChildren.filter(order => order.slug === slug);
            setChildren(childrenChanged);

            if(changedSchoolType && !link) onChangeSchoolType(changedSchoolType, true, childrenChanged);
        }else{
            setChildren(currentChildren);
            if(changedSchoolType && !link) onChangeSchoolType(changedSchoolType, true, currentChildren);
        }

        setChangedCity(slug);
    }

    const onChangeSchoolType = (slug, link= false, dataChildren = []) => {

        let currentChildren = children;
        if(!link) currentChildren = [...data.children.nodes];
        if(dataChildren.length) currentChildren = dataChildren;

        if(slug){
            const childrenChanged = [];

            currentChildren.map((item, i) => {

                const universities = [];

                item.universities.nodes.map((subItem, ii) => {
                    const schoolTypeChanged = subItem.schoolTypes.nodes.filter((order) => order.slug === slug);

                    if(schoolTypeChanged.length > 0){
                        universities.push(subItem);
                    }
                });

                if(universities.length > 0){
                    const currentItem = {
                        universities : {
                            nodes :  universities
                        }
                    }
                    childrenChanged.push({...item, ...currentItem});
                }
            });

            setChildren(childrenChanged);

            if(changedCity && !link) onChangeCity(changedCity, true, childrenChanged);
        }else{
            setChildren(currentChildren);
            if(changedCity && !link) onChangeCity(changedCity, true, currentChildren);
        }
        setChangedSchoolType(slug);
    }

    if(Object.entries(data).length === 0) return <div>Loading</div>

    return <div>
        <Head>
            <title>{data.name} - Country - Afriuni</title>
        </Head>

        <div className="bg-white">
            <div className="container mx-auto px-4 py-5">
                <div className="flex items-center justify-start space-x-3 text-sm text-custom-primary">
                    <Link href="/">
                        <a>
                            Home
                        </a>
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} className="w-2"/>
                    <Link href="/country">
                        <a>
                            Countries
                        </a>
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} className="w-2"/>
                    <span className={'capitalize'}>
                        {data.name.toLowerCase()}
                    </span>
                </div>
            </div>
        </div>

        <div className="container mx-auto md:px-4 md:my-10">
            <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-0">

                <div className="md:col-span-2">

                    <div className="bg-white border border-gray-200 md:py-4 md:px-6 py-4 px-4 md:mb-6 mb-4">
                        <div className="flex justify-between">
                            <div className="md:w-full w-10/12">
                                <h1 className="text-3xl font-medium text-black capitalize">
                                    {data.name.toLowerCase()}
                                </h1>
                                {!isCurrentMobile && (
                                    <div className="md:flex items-center my-4 space-x-20 font-normal hidden">
                                        <div className="flex items-center space-x-3">
                                            <FontAwesomeIcon icon={faBookOpen} className="w-6" /> <span className="text-custom-primary text-lg">{data.total_courses} Course(s)</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <FontAwesomeIcon icon={faUniversity} className="w-6"/> <span className="text-custom-primary text-lg">{data.total_universities} Universitie(s)</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-2/12 md:w-auto">
                                <img src={data.flag} alt="" className="object-fill md:h-20"/>
                            </div>
                        </div>
                        {isCurrentMobile && (
                            <div className="flex items-center text-lg my-4 w-full justify-between font-normal md:hidden">
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faBookOpen} className="w-4" /> <span className="text-sm text-custom-primary">{data.total_courses} Course(s)</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faUniversity} className="w-4"/> <span className="text-sm text-custom-primary">{data.total_universities} Universitie(s)</span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center md:space-x-8 w-full justify-between md:justify-start">
                            <div className="md:text-lg text-sm font-normal"><span className="font-medium">Academy year</span> : {data.academic_year}</div>
                            {data.video && (
                                <div>
                                    <div className="text-black text-sm md:text-base flex items-center space-x-2 rounded-lg">
                                    <span className="md:px-2 px-1.5 md:py-1.5 py-1.5 rounded-full border border-black">
                                        <FontAwesomeIcon icon={faPlay} className="md:w-2 w-1.5" />
                                    </span>
                                        <Link href={data.video}>
                                            <a target={"_blank"}>
                                                <span className="underline font-normal">Watch Video</span>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    {featured.length > 0 && (
                        <div className="md:mb-6 mb-4">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                {featured.slice(0, 2).map((item, i) => {
                                    return <CountryUniversityCard key={i} data={item}/>
                                })}
                            </div>
                        </div>
                    )}

                    {isCurrentMobile && (
                        <div className="mb-4 bg-white">

                            {studyMobileLevel.map((item, i) => {

                                return <div className="grid grid-cols-3 divide-x divide-gray-200 border-b border-gray-200" key={i}>

                                    {item.map((subItem, i) => {
                                        return <div className="py-3 px-2 break-words items-center text-center text-xs" key={i}>
                                            <div className="break-words inline text-custom-primary font-normal">{subItem.name}</div>
                                            <div className="text-gray-400 mt-1">({subItem.count} Course(s))</div>
                                        </div>
                                    })}

                                    {item.length % 3 !== 0 && (
                                        <div className="py-3 px-2 break-words items-center text-center text-xs" />
                                    )}
                                </div>
                            })}

                        </div>
                    )}

                    <div className="bg-white border border-gray-200 mb-6">
                        <div className="md:p-4 py-2 px-4 font-normal text-2xl border-b border-gray-200 text-black text-custom-secondary">
                            University in <span className="capitalize">{data.name.toLowerCase()}</span> <span>({data.total_universities})</span>
                        </div>
                        <div className="md:p-6 p-4">

                            <div className="flex items-center space-x-6">
                                <div className="md:w-1/3 w-1/2">
                                    <Dropdown title={"City/Province"}
                                              className="bg-gray-200 flex md:pl-4 pl-2 justify-between items-center text-black font-normal truncate rounded-lg md:text-base text-sm"
                                              maxHeight="250px"
                                              classChevron="md:p-4 p-3 bg-custom-primary text-white"
                                              classDropdown="mt-1 rounded-md shadow-lg"
                                              position="center"
                                              onChange={(data) => onChangeCity(data)}>
                                        <ItemDropdown title={"Select city/province"} value={""} classInactive="font-medium text-custom-primary">Select city/province</ItemDropdown>
                                        {city.map((item, i) => {
                                            return <ItemDropdown title={item.name} value={item.slug} classInactive="text-custom-primary" key={item.id}>{item.name}</ItemDropdown>
                                        })}

                                    </Dropdown>
                                </div>
                                <div className="w-1/2 md:w-1/3">
                                    <Dropdown title={"School Type"}
                                              className="bg-gray-200 md:pl-4 pl-2 flex justify-between items-center font-normal text-black truncate rounded-lg md:text-base text-sm"
                                              maxHeight="250px"
                                              classChevron="md:p-4 p-3 bg-custom-primary text-white"
                                              classDropdown="mt-1 rounded-md shadow-lg"
                                              position="center"
                                              onChange={(data) => onChangeSchoolType(data)}>
                                        <ItemDropdown title={"Select School Type"} value={""} classInactive="font-medium text-custom-primary">Select School Type</ItemDropdown>
                                        {schoolType.map((item, i) => {
                                            return <ItemDropdown title={item.name} value={item.slug} classInactive="text-custom-primary" key={item.id}>{item.name}</ItemDropdown>
                                        })}
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="">

                                {children.map((item, i) => {
                                    return <div key={i}>
                                        <div className="md:text-2xl text-xl font-normal text-black mt-5 md:mt-12 mb-3">
                                            {item.name}
                                        </div>
                                        <div className="md:pl-5 md:text-lg text-custom-primary font-normal">
                                            <ul className="space-y-2">
                                                {item.universities.nodes.map((subItem, i) => {
                                                    return <li key={i}><Link href={`/university/${subItem.slug}`}><a>{subItem.title}</a></Link> <span className="text-gray-400 text-xs md:text-base ml-2 md:ml-5 font-thin italic">({subItem.course_count} Course(s))</span></li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                })}

                            </div>

                        </div>

                    </div>

                </div>
                <div className="md:col-span-1">

                    {!isCurrentMobile && (

                        <div className="bg-white border border-gray-200 mb-6 text-black text-sm leading-6">

                            {studyLevel.map((item, i) => {

                                return <div className="grid grid-cols-2 divide-x divide-gray-200 border-b border-gray-200" key={i}>

                                    {item.map((subItem, i) => {
                                        return <div className="p-4 flex flex-col items-center text-center" key={i}>
                                            <div className="text-custom-primary font-medium">{subItem.name}</div>
                                            <div className="text-gray-600">({subItem.count} Courses)</div>
                                        </div>
                                    })}

                                    {item.length % 2 !== 0 && (
                                        <div className="p-4 flex flex-col items-center text-center" />
                                    )}

                                </div>
                            })}

                        </div>
                    )}

                    <div className="bg-white border border-gray-200 mb-6">
                        <div className="md:p-4 py-2 px-4 font-normal md:text-2xl text-xl border-b border-gray-200 text-custom-secondary">
                            Courses in <span className="capitalize">{data.name.toLowerCase()}</span>
                        </div>
                        <div>
                            <Accordion className={styles.accordion} allowZeroExpanded>
                                {categoryCourse.map((item, i) => {

                                    return <AccordionItem activeClassName="bg-custom-primary bg-opacity-10 text-black font-normal" uuid={item.id} key={i}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className={styles.accordion_heading}>
                                                <div className="text-base md:text-xl capitalize">
                                                    {item.name.toLowerCase()} ({item.courses.length})
                                                </div>
                                                <div className="px-6 md:py-4 py-3 w-auto flex justify-center">
                                                    <AccordionItemState>
                                                        {({ expanded }) => (expanded ? <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 text-base text-gray-600" /> : <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-base text-custom-secondary" />)}
                                                    </AccordionItemState>
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className="px-8 md:py-5 py-3">
                                            <ul className="list-disc leading-relaxed space-y-2 list-inside font-light text-sm md:text-base">
                                                {item.courses.sort(compareCourses).map((course, i) => {
                                                    return <li key={i}><Link href={`/course/${course.databaseId}/${course.slug}`}><a>{course.title}</a></Link></li>
                                                })}

                                            </ul>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                })}
                            </Accordion>

                        </div>
                    </div>

                    {isCurrentMobile && (
                        <div className="bg-white border border-gray-200 mb-6">
                            <div className="md:p-4 py-2 px-4 font-normal text-xl border-b border-gray-200 text-custom-secondary">
                                Other Countries in Africa
                            </div>
                            <div>
                                <div className="px-2 py-3 grid md:grid-cols-5 grid-cols-2 gap-x-3 md:gap-x-6 gap-y-4 md:gap-y-8">
                                    {props.destination.data.countries.nodes.map((item, i) => {
                                        if(item.slug === data.slug) return ""
                                        return <DestinationCard image={item.image} name={item.name} slug={item.slug} key={i}/>
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </div>
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

    const data = await client.query({
        query : GET_LOCATION_BY,
        variables : {
            id : params.slug
        }
    });

    const destination = await client.query({
        query : GET_COUNTRIES
    });

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = yyyy + '/' + mm + '/' + dd;

    const featuredUniversity = await client.query({
        query : GET_FEATURED_UNIVERSITY,
        variables: {
            type: "country",
            start_date : today
        },
    });

    // Pass post data to the page via props
    return {
        props: { data, destination, featuredUniversity },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
    }
}


export default CountryPage;
