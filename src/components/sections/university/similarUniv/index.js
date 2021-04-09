import React from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import client from "../../../../apollo/client";
import GET_SIMILAR_UNIVERSITY from "../../../../queries/university/get-similar-universities";

const SimilarUniv = (props) => {

    const [data, setData] = React.useState([]);

    React.useEffect(async () => {

        if(props.idCat.length){

            const idCat = props.idCat.join(",");

            const queryData = await client.query({
                query: GET_SIMILAR_UNIVERSITY,
                variables: {
                    similar: idCat,
                    count : 10
                },
            });

            if (queryData?.data) setData(queryData?.data?.universities?.nodes);
        }

    }, [props.idCat])


    if(!props.idCat || !props.idCat.length) return null;

    return <div className="bg-white border border-gray-200 mb-6 relative">
        <div className="md:p-4 py-2 px-4 font-normal text-xl md:text-2xl border-b border-dotted border-gray-200 text-custom-secondary flex items-center space-x-3">
            <span> Similar Universities </span>
        </div>
        <div className="md:p-6 px-4 py-2">

            {data.map((item, i) => {


                return (
                    <>
                        {i >= 1 && (<hr className="my-4 md:my-6"/>)}
                        <div className="flex justify-between space-x-4">
                            <div className="flex-1">
                                <Link href={`/university/${item.slug}`}>
                                    <a className="md:text-xl font-normal text-black truncate-2-lines max-h-13 leading-7">
                                        {item.title}
                                    </a>
                                </Link>
                                <div className="flex items-center justify-between mt-2 text-gray-600 text-sm md:text-base">
                                    <div className="flex items-start space-x-2">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 mt-1" /> <span>{item.address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-none">
                                <img src={item.featuredImage.node.link} alt="" className="object-cover w-28 rounded-md h-full"/>
                            </div>
                        </div>
                    </>
                )

            })}
        </div>
    </div>
}

export default SimilarUniv;
