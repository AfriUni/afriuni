import React from 'react';
import Link from "next/link";

const CountryMenu = (props) => {

    return <>

        <h3 className="bg-custom-primary md:bg-white text-white md:text-custom-primary_2 text-base font-medium md:font-normal md:text-xl  md:mt-6 py-4 px-5 md:p-0">African Country</h3>

        <div className="flex flex-col md:block md:space-y-5 md:py-5 bg-white h-full">
            {props.data.map((item, i) => {
                return  <Link href={`/country/${item.slug}`} key={i}>
                    <a className="mr-10 font-medium md:font-normal hover:text-custom-secondary inline-block py-4 border-b border-gray-400 md:border-0 md:py-0 px-5 md:px-0 uppercase">
                        {item.name}
                    </a>
                </Link>
            })}
        </div>

    </>


};

export default CountryMenu;
