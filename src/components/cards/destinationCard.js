import React from 'react';
import Link from 'next/link';

const DestinationCard = props => {
    return (
        <div className="relative z-10">
            <Link href={`/country/${props.slug}`}>
                <a className="block relative">
                    <img src={props.image} alt={props.name} className="h-32 w-full md:h-48 rounded-xl" />

                    <div className="tracking-wide absolute bottom-0 left-0 right-0 text-center font-medium text-white bg-black md:text-xl py-2 md:py-4 rounded-b-xl uppercase">
                        {props.name}
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default DestinationCard;
