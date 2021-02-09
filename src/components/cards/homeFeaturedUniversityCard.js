import React from 'react';
import Link from "next/link";

const HomeFeaturedUniversityCard = (props) => {

    return <div className="bg-white rounded-xl flex flex-col justify-between h-full">

        <img src={props.data.featuredImage ? props.data.featuredImage.node.sourceUrl : ""} alt="" className="h-24 md:h-48 w-full rounded-t-xl flex-none"/>
        <div className="border-l border-r border-b border-gray-200 rounded-b-xl p-2 md:p-6 -mt-10 md:-mt-16 flex-1 flex-col flex">
            <div className="flex-none">
                <div className="border border-gray-200 p-2 inline-block bg-white rounded-xl md:mb-2">
                    <img src={props.data.logo} alt="" className="h-10 md:h-14 w-10 md:w-12"/>
                </div>
            </div>
            <Link href={`/university/${props.data.slug}`}>
                <a className="text-custom-primary font-medium block text-sm md:text-2xl mb-2 md:my-2 truncate-2-lines h-8 leading-4 md:h-20 md:leading-7 flex-1">
                    {props.data.title}
                </a>
            </Link>
            <div className="flex md:flex-row flex-col space-y-1 md:space-y-0 md:justify-between md:items-center flex-1">
                <div className="text-gray-400 text-xs md:text-sm">
                    {props.data.locations.nodes.map((loc, i) => {
                        let coma = "";
                        if(i > 0) coma += ", "
                        return <span key={i} className={"capitalize"}>
                                {coma}{loc.name}
                            </span>
                    })}
                </div>
                <div className="text-custom-secondary text-xs md:text-sm">{props.data.course_count} Courses</div>
            </div>
        </div>
    </div>
};

export default HomeFeaturedUniversityCard
