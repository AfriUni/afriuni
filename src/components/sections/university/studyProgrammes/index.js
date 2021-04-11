import React from 'react';
import DropdownMulti from "../../../general/dropdownMulti";
import Dropdown, {ItemDropdown} from "../../../general/dropdown";
import Link from "next/link";
import {ButtonDefault} from "../../../styleComponent/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import string_to_slug from "../../../../utils/slugify";
import {useMediaQuery} from "react-responsive";
import {comparePostType, compareTaxonomy, sleep} from "../../../../utils/compare";

const StudyProgrammes = (props) => {

    const [categoryCourse, setCategoryCourse] = React.useState([]);
    const [studyLevel, setStudyLevel] = React.useState([]);
    const [duration, setDuration] = React.useState([]);
    const [children, setChildren] = React.useState([]);

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);

    const [showCount, setShowCount] = React.useState(5);
    const [showMore, setShowMore] = React.useState(false)

    const [changeCategory, setChangeCategory] = React.useState('');
    const [changeStudyLevel, setChangeStudyLevel] = React.useState('');
    const [changeDuration, setChangeDuration] = React.useState('');

    React.useEffect(() => {
        if(isMobile){
            setIsCurrentMobile(true);
        }else{
            setIsCurrentMobile(false);
        }
    }, [isMobile]);

    React.useEffect(() => {

        const currentData = props.data || {};

        if (Object.entries(currentData).length) {

            const coursesCategory = [];
            const studiesLevel = [];
            const durations = [];

            const parentCategory = [];
            const childCategoryId = []

            currentData.courses.nodes.map((item, index) => {

                // specialisation data
                const specialisation = item.specialisations.nodes;
                specialisation.map((i) => {
                    if(!i.parent){
                        if(!parentCategory.includes(i.databaseId)){
                            const saveCat = {
                                name : i.name,
                                subMenu : []
                            }
                            coursesCategory.push(saveCat);
                            parentCategory.push(i.databaseId);
                        }
                    }else{

                        if(!childCategoryId.includes(i.databaseId)){
                            childCategoryId.push(i.databaseId);
                        }

                        if(!parentCategory.includes(i.parent.node.databaseId)){

                            const saveCat = {
                                name : i.parent.node.name,
                                subMenu : []
                            }
                            saveCat.subMenu.push({
                                id: i.databaseId,
                                name: i.name,
                                slug: i.slug,
                            })

                            coursesCategory.push(saveCat);
                            parentCategory.push(i.parent.node.databaseId);

                        }else{

                            const index = parentCategory.indexOf(i.parent.node.databaseId);
                            const currentChildCat = coursesCategory[index].subMenu.find((x) => x.id === i.databaseId);

                            if(!currentChildCat){
                                coursesCategory[index].subMenu.push({
                                    id: i.databaseId,
                                    name: i.name,
                                    slug: i.slug,
                                });
                            }

                        }
                    }
                });

                // study Level data
                const studyLevel = item.studiesLevel.nodes;
                studyLevel.map((i) => {
                    if(!studiesLevel.find((x) => x.id === i.databaseId)){
                        studiesLevel.push({
                            id: i.databaseId,
                            name: i.name,
                            slug: i.slug,
                        })
                    }
                })

                // duration Data
                const duration = item.duration_time;
                if(duration.time_month && duration.time_number){
                    const name = duration.time_number+" "+duration.time_month;
                    if(!durations.find((x) => x.name === name)){
                        durations.push({
                            id : index,
                            name : name,
                            slug : string_to_slug(name)
                        });
                    }
                }

            });

            setCategoryCourse(coursesCategory);
            setStudyLevel(studiesLevel);
            setDuration(durations);

            const savedChildren = setChildrenData(props.data)
            setChildren(savedChildren);
        }

    }, [props.data]);

    const setChildrenData = (data) => {

        const childrenData = [];
        const childrenCatData = [];

        data.courses.nodes.map((item, index) => {

            // specialisation data
            const specialisation = item.specialisations.nodes;
            specialisation.map((i) => {
                   // data of course
                    if(!childrenCatData.includes(i.databaseId)){
                        const saveData = {
                            name : i.name,
                            slug : i.slug,
                            courses : []
                        };

                        saveData.courses.push(item)
                        childrenData.push(saveData);
                        childrenCatData.push(i.databaseId)
                    }else{
                        const index = childrenCatData.indexOf(i.databaseId);
                        const existCourse = childrenData[index].courses.find((x) => x.databaseId === item.databaseId);
                        if(!existCourse){
                            childrenData[index].courses.push(item);
                            childrenData[index].courses.sort(comparePostType);
                        }
                    }


            });
        });

        return childrenData.sort(compareTaxonomy);
    }

    const showUp = () => {
        if(showMore){
            setShowCount(5)
        }else{
            setShowCount(children.length)
        }
        setShowMore(!showMore);
    }

    React.useEffect(() => {
        filterCourses();
    }, [changeDuration, changeStudyLevel, changeCategory])

    const onChangeCategory = async (slug) => {
        setChangeCategory(slug);
    }

    const onChangeStudyLevel = (slug) => {
        setChangeStudyLevel(slug);
    }

    const onChangeDuration = (slug) => {
        setChangeDuration(slug);
    }

    const filterCourses = () => {

        let currentChildren = setChildrenData(props.data);

        if(changeCategory){
            currentChildren = currentChildren.filter((order) => order.slug === changeCategory);
        }

        if(changeStudyLevel){
            currentChildren = currentChildren.reduce((filter, order) => {
               const exist = order.courses.filter((sub) => sub.studiesLevel.nodes[0].slug === changeStudyLevel)
               if(exist.length){
                   filter.push({
                       name : order.name,
                       slug : order.slug,
                       courses : exist
                   });
               }
               return filter
            }, []);
        }

        if(changeDuration){
            const slugNumber = changeDuration.split('-')[0];
            const slugMonth = changeDuration.split('-')[1];

            currentChildren = currentChildren.reduce((filter, order) => {
                const exist = order.courses.filter((sub) => sub.duration_time.time_number === parseInt(slugNumber) && sub.duration_time.time_month === slugMonth);
                if(exist.length){
                    filter.push({
                        name : order.name,
                        slug : order.slug,
                        courses : exist
                    });
                }
                return filter
            }, []);
        }

        setChildren(currentChildren)
    }

    return (
        <>
            <div className="md:p-6 p-4">
                <div className="flex items-center space-x-6">
                    <div className="md:w-1/3 w-1/2">
                        <DropdownMulti title={"Courses Catégories"}
                                       className="bg-gray-200 flex md:pl-4 pl-3 justify-between items-center text-black font-normal truncate rounded-lg md:text-base text-xs"
                                       maxHeight="100%"
                                       classChevron="ml-4 md:p-4 px-2 py-3 bg-custom-primary text-white"
                                       classDropdown="mt-1 rounded-md shadow-lg md:w-700 w-300"
                                       onChange={(data) => onChangeCategory(data)}
                                       position="center" data={categoryCourse}/>
                    </div>
                    <div className="w-1/2 md:w-1/3">
                        <Dropdown title={"Study Level"}
                                  className="bg-gray-200 md:pl-4 pl-3 flex justify-between items-center font-normal text-black truncate rounded-lg md:text-base text-xs"
                                  maxHeight="250px"
                                  classChevron="ml-4 md:p-4 px-2 py-3 bg-custom-primary text-white"
                                  classDropdown="mt-1 rounded-md shadow-lg"
                                  position="center"
                                  onChange={(data) => onChangeStudyLevel(data)}
                        >
                            <ItemDropdown title={"All Study Level"} value={""} classInactive="font-medium text-custom-primary">All Study Level</ItemDropdown>
                            {studyLevel.map((item) => {
                                return <ItemDropdown title={item.name} value={item.slug} classInactive="font-medium text-custom-primary" key={item.id}>{item.name}</ItemDropdown>
                            })}

                        </Dropdown>
                    </div>
                    <div className="hidden md:block md:w-1/3">
                        <Dropdown title={"Durations"}
                                  className="bg-gray-200 md:pl-4 pl-2 flex justify-between items-center font-normal text-black truncate rounded-lg md:text-base text-sm"
                                  maxHeight="250px"
                                  classChevron="md:p-4 p-3 bg-custom-primary text-white"
                                  classDropdown="mt-1 rounded-md shadow-lg"
                                  onChange={(data) => onChangeDuration(data)}
                                  position="center">
                            <ItemDropdown title={"All Durations"} value={""} classInactive="font-medium text-custom-primary">All Durations</ItemDropdown>
                            {duration.map((item) => {
                                return <ItemDropdown title={item.name} value={item.slug} classInactive="font-medium text-custom-primary" key={item.id}>{item.name}</ItemDropdown>
                            })}
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
                    {children.slice(0, showCount).map((item, index) => {

                        return (
                            <React.Fragment key={index}>
                                <tr>
                                    <td colSpan={3} className="md:text-2xl text-xl font-normal text-black pt-4 md:pt-6 pb-3">{item.name}</td>
                                </tr>
                                {item.courses.map((subItem, i) => {
                                    return <tr key={i}>
                                        <td className="px-5 py-1 md:text-lg text-custom-primary font-normal md:w-1/2">
                                            <Link href={`/course/${subItem.databaseId}/${subItem.slug}`}>
                                                <a>{subItem.title}</a>
                                            </Link>
                                        </td>
                                        <td className="hidden md:table-cell md:w-1/4">{subItem.studiesLevel.nodes.length ? subItem.studiesLevel.nodes[0].name : ""}</td>
                                        <td className="text-right hidden md:table-cell md:w-1/4">
                                            {(subItem.duration_time.time_number && subItem.duration_time.time_month) ? (
                                                <>
                                                    {subItem.duration_time.time_number} {subItem.duration_time.time_month}
                                                </>
                                            ) : (
                                                <>---</>
                                            )}
                                        </td>
                                    </tr>
                                })}
                            </React.Fragment>
                        )

                    })}

                    </tbody>

                </table>
            </div>
            {children.length > 5 && (
                <div className="flex justify-center my-4">
                    <ButtonDefault className="flex items-center rounded-lg space-x-2 text-sm" onClick={showUp}>
                        {showMore ? (
                            <><FontAwesomeIcon icon={faChevronUp} className="w-4 h-4" /><span>Show Less</span></>
                        ) : (
                            <><FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" /><span>Show More</span></>
                        )}
                    </ButtonDefault>
                </div>
            )}

        </>
    )



}


export default StudyProgrammes;
