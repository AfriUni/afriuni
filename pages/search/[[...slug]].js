import React from 'react';
import Head from 'next/dist/next-server/lib/head';
import { useRouter } from 'next/router';
import styles from '../../styles/globals.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterSection from '../../src/components/sections/search/Filter';
import CoursesResultCard from '../../src/components/cards/coursesResultCard';
import { faFilter, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ButtonDefault, ButtonDefaultSecondary, ButtonRedPrimary, ButtonRedSecondary } from '../../src/components/styleComponent/button';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { useMediaQuery } from 'react-responsive';
import Pagination from '../../src/components/general/pagination';

const SearchPage = props => {
    const router = useRouter();

    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isCurrentMobile, setIsCurrentMobile] = React.useState(false);
    const [isOpenFilter, setIsOpenFilter] = React.useState(false);

    React.useEffect(() => {
        setIsCurrentMobile(isMobile);
    }, [isMobile]);

    const toggleFilter = (value = undefined) => {
        if (value !== undefined) {
            setIsOpenFilter(value);
        } else {
            setIsOpenFilter(!isOpenFilter);
        }
    };

    // console.log(router.query);

    return (
        <div>
            <Head>
                <title>Name search page - Afriuni</title>
            </Head>

            <div className="container mx-auto md:px-6 px-3 md:py-14 py-6">
                <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6">
                    <div className="md:col-span-1">
                        <FilterSection openFilter={isOpenFilter} toggleFilter={toggleFilter} />
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <div className="grid grid-cols-3 gap-2 w-full text-base md:border-b border-gray-400 md:pb-3 pb-2 items-center">
                                <div className="font-medium hidden md:block">158 Computer Engineering Courses</div>
                                <div className="flex justify-center">
                                    <ButtonDefaultSecondary className="flex items-center justify-center md:space-x-2 space-x-2 rounded-lg w-full md:w-auto">
                                        <span className="relative">
                                            <span className="absolute -top-1.5 inline-flex rounded-full text-white bg-custom-secondary p-1">
                                                <FontAwesomeIcon icon={faPlus} className="w-1" />
                                            </span>
                                            <FontAwesomeIcon icon={faBell} className="md:w-5 w-4 text-custom-secondary" />
                                        </span>
                                        <span className="md:text-sm text-xs">Create Alert</span>
                                    </ButtonDefaultSecondary>
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1 items-center md:space-x-2 font-normal">
                                    <span className="block text-right hidden md:inline-block">Sorted by</span>
                                    <select
                                        name=""
                                        id=""
                                        className="text-xs py-2 md:text-sm block w-full md:mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        {isCurrentMobile && <option value="">Sorted By</option>}
                                        <option value="revelance">Revelance</option>
                                    </select>
                                </div>
                                <div className="flex md:hidden justify-center" onClick={toggleFilter}>
                                    <ButtonRedPrimary className="block w-full rounded-lg flex items-center justify-center space-x-1 font-medium">
                                        <FontAwesomeIcon icon={faFilter} className="w-4" />
                                        <span className="text-xs">Filters</span>
                                        <span className="bg-white px-1 py-0.5 rounded-full text-custom-secondary text-xs text-center flex items-center">
                                            10
                                        </span>
                                    </ButtonRedPrimary>
                                </div>
                            </div>

                            <div className="font-normal pl-1 md:hidden block">158 Computer Engineering Courses</div>

                            <div className="flex items-center space-x-2 text-sm md:text-xs mt-2 md:mt-4">
                                <span className="font-medium hidden md:inline-block">Filter :</span>{' '}
                                <span className="cursor-pointer bg-white border border-gray-400 py-1 px-3 rounded-full flex space-x-2">
                                    <span>Computer Engineering</span> <FontAwesomeIcon icon={faTimes} className="w-2" />
                                </span>
                            </div>
                        </div>

                        <CoursesResultCard premium={true} />
                        <CoursesResultCard premium={true} />
                        <CoursesResultCard premium={true} />
                        <CoursesResultCard />
                        <CoursesResultCard />
                        <CoursesResultCard />
                        <CoursesResultCard />

                        <Pagination totalRecords={150} pageLimit={10} pageNeighbours={2} onPageChanged={data => console.log(data)} pageCurrent={3} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// This function gets called at build time
export async function getStaticPaths() {
    return {
        // Only `/posts/1` and `/posts/2` are generated at build time
        paths: [],
        // Enable statically generating additional pages
        // For example: `/posts/3`
        fallback: true,
    };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // console.log(params)
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    // const res = await fetch(`https://.../posts/${params.id}`)
    const post = [];

    // Pass post data to the page via props
    return {
        props: { post },
        // Re-generate the post at most once per second
        // if a request comes in
        revalidate: 1,
    };
}

export default SearchPage;
