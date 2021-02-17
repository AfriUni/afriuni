import React from 'react';
import Link from 'next/link';
import { ButtonRedPrimary } from '../styleComponent/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

const Footer = props => {
    return (
        <div className="bg-black md:pt-8 z-10 pt-12 md:pt-20">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-y-10 md:gap-4 py-5">
                    <div className="text-white flex flex-col text-center md:text-left md:space-y-5 space-y-2 col-span-1">
                        <h2 className="text-xl md:text-3xl font-medium mb-3 md:mb-3">Your Education, Your Future</h2>
                        <div className="text-sm md:text-lg">Showcasing Education Opportunities across Africa</div>
                        <div className="text-sm md:text-lg">Helping students find the right Course at the right University</div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex md:items-center md:space-x-20">
                            <div className="flex flex-col space-y-2 md:space-y-6 w-1/2 text-center md:text-left">
                                <Link href="/">
                                    <a className="text-base md:text-2xl text-custom-secondary font-normal block">About Us</a>
                                </Link>
                                <Link href="/">
                                    <a className="text-base md:text-2xl text-custom-secondary font-normal block">Our Core Values</a>
                                </Link>
                                <div className="text-sm md:text-xl text-gray-400 block">Copyright ©2021</div>
                            </div>
                            <div className="flex flex-col space-y-2 md:space-y-6 w-1/2 text-center md:text-left">
                                <Link href="/">
                                    <a className="text-base md:text-2xl text-custom-secondary font-normal block">Contact Us</a>
                                </Link>
                                <Link href="/">
                                    <a className="text-base md:text-2xl text-custom-secondary font-normal block">Give us Feedback</a>
                                </Link>

                                <Link href="/">
                                    <a className="text-sm md:text-xl text-gray-400 block">Terms & Privacy Policy</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-400 mt-5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 py-4 md:pt-6">
                        <div className="hidden md:block" />
                        <div className="flex items-center justify-center space-x-5">
                            <Link href="/">
                                <a className="bg-blue-700 text-white text-xl px-4 py-3 rounded-full">
                                    <FontAwesomeIcon icon={faFacebookF} className="w-3" />
                                </a>
                            </Link>
                        </div>
                        <div className="text-right">
                            <ButtonRedPrimary className="rounded-lg text-xs md:text-sm">+ Add your university</ButtonRedPrimary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
