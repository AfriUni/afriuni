import React from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt, faPlayCircle} from "@fortawesome/free-solid-svg-icons";


const CountryUniversityCard = (props) => {

    console.log(props.data)

    return <div className="bg-white border border-gray-200 md:p-4 py-2 px-4">
        <div className="flex justify-between space-x-4">
            <div className="flex-none">
                <img src={props.data.logo} alt="" className="object-cover w-20 h-full rounded-md"/>
            </div>
            <div className="flex-1">
                <Link href={`/university/${props.data.slug}`}>
                    <a className="md:text-xl font-normal text-custom-primary truncate-2-lines max-h-14 leading-6">
                        {props.data.title}
                    </a>
                </Link>
                <div className="flex items-center justify-between my-2 text-gray-600 text-xs md:text-base">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="md:w-3 w-2.5" />
                        {props.data.locations.nodes.map((loc, i) => {
                            if(loc.is_country) return ""
                            return <span key={i} className={"lowercase capitalize"}>
                                {loc.name}
                            </span>
                        })}
                    </div>
                    <div>{props.data.course_count} Courses</div>
                </div>
                <div className="flex justify-between items-center text-gray-600 text-xs md:text-base">
                    <div className="w-28">{props.data.gallery?.length} photos</div>
                    <div className="text-gray-400 italic">Featured</div>
                </div>
            </div>

        </div>

    </div>
};


export default CountryUniversityCard;
