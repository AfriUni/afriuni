import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HomeFieldStudyCard = props => {
    return (
        <div className={'flex-1 flex justify-center bg-white shadow-xl p-3 md:p-6 rounded-xl'}>
            <Link href={`/disciplines/${props.slug}`}>
                <a className={'flex items-center flex-col space-y-4 relative'}>
                    <div className="relative">
                        <img className="w-full h-16 md:h-40 object-cover" src={props.image} alt={props.title} />
                    </div>
                    <div className="font-bold text-sm md:text-2xl text-center break-words">{props.title}</div>
                </a>
            </Link>
        </div>
    );
};

export default HomeFieldStudyCard;
