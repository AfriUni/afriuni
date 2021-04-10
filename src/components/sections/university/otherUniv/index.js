import React from 'react';
import client from "../../../../apollo/client";
import GET_UNIVERSITY_SEARCH from "../../../../queries/university/get-search-university";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faCircle, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {ButtonDefault} from "../../../styleComponent/button";
import {getLocationData} from "../../../../utils/universityUtils";

const OtherUniv = ({location}) => {

    const [data, setData] = React.useState([]);
    const [showCount, setShowCount] = React.useState(5);
    const [showMore, setShowMore] = React.useState(false)

    React.useEffect(async () => {
        if (location.slug) {
            const queryData = await client.query({
                query: GET_UNIVERSITY_SEARCH,
                variables: {
                    search: location.slug,
                },
            });

            if (queryData?.data) setData(queryData?.data?.universities?.nodes);
        }
    }, [location]);

    const showUp = () => {
        if(showMore){
            setShowCount(5)
        }else{
            setShowCount(data.length)
        }
        setShowMore(!showMore);
    }

    return (
        <>

            {data.slice(0, showCount).map((item, index) => {

                const location = getLocationData(item.locations?.nodes);

                return <div className="flex items-start border-t border-gray-400 md:py-5 py-3" key={index}>
                    <div className="w-1/12 pt-2 text-gray-400"><FontAwesomeIcon icon={faCircle} className="w-3" /></div>
                    <div className="w-11/12">
                        <Link href={`/university/${item.slug}`}>
                            <a className="md:text-xl text-lg font-normal text-custom-primary truncate-2-lines max-h-16 leading-6">
                                {item.title}
                            </a>
                        </Link>
                        <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                            <div>{item?.schoolTypes?.nodes && item?.schoolTypes.nodes[0].name}</div>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" /> <span>{location.city}</span>
                            </div>
                            <div>{item.course_count} Courses</div>
                        </div>
                    </div>
                </div>

            })}

            <div className="flex justify-center mt-4">
                <ButtonDefault className="flex items-center rounded-lg space-x-2 text-sm" onClick={showUp}>
                    {showMore ? (
                        <><FontAwesomeIcon icon={faChevronUp} className="w-4 h-4" /><span>See Less</span></>
                    ) : (
                        <><FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" /><span>See More</span></>
                    )}
                </ButtonDefault>
            </div>

        </>
    )

};

export default OtherUniv;
