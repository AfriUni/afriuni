import React from 'react';
import Link from "next/link";

const HomeFeaturedCourseCard = (props) => {


    return <div className="bg-white p-2 md:p-6 rounded-xl inline-block md:flex flex-col">
        <div className="flex-none">
            <div className="border border-custom-primary text-custom-primary text-xs px-4 py-1 md:inline-block rounded hidden">
                {props.data.studiesLevel.nodes[0].name}
            </div>
        </div>
        <Link href={`/course/${props.data.databaseId}/${props.data.slug}`}>
            <a className="text-custom-secondary md:text-xl font-medium mb-3 md:mt-5 block break-words truncate-2-lines max-h-12 leading-6 md:max-h-16 md:leading-8 flex-1">
                {props.data.title}
            </a>
        </Link>
        <div className="flex justify-between items-end w-full flex-1">
            <div className="w-full">
                <div className="text-custom-primary md:text-custom-primary_2 font-medium text-sm md:text-lg">
                    <Link href={`/university/${props.data.university.nodes[0].slug}`}>
                        <a>
                            {props.data.university.nodes[0].title}
                        </a>
                    </Link>
                </div>
                <div className="flex justify-between items-center w-full font-medium md:font-normal mt-1 md:mt-0">

                    <div className="text-gray-400 text-xs md:text-base">
                        {props.data.university.nodes[0].locations.nodes.map((loc, i) => {
                            let coma = "";
                            if(i > 0) coma += ", "
                            return <span key={i} className={"lowercase capitalize"}>
                                {coma}{loc.name}
                            </span>
                        })}
                    </div>
                    <div className="text-gray-400 text-xs md:text-base md:hidden ml-4">
                        {props.data.studiesLevel.nodes[0].name}
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
                <img src={props.data.university.nodes[0].logo} alt="" className="object-contain h-20 w-20"/>
            </div>
        </div>


    </div>
}

export default HomeFeaturedCourseCard;
