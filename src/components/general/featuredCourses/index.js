import React from 'react';
import HomeFeaturedCourseCard from '../../cards/homeFeaturedCourseCard';
import { list } from 'postcss';

const FeaturedCoursesSection = props => {
    const [data, setData] = React.useState([]);
    const [priority, setPriority] = React.useState([]);

    React.useEffect(() => {
        const results = props.data.coursesFeatured.nodes;
        const datas = [];

        results.map((item, i) => {
            const lists = item.featured_list.nodes;

            let end_date = item.end_date;
            let show = true;
            if (end_date) {
                end_date = new Date(end_date);
                const today = new Date();
                if (today > end_date) show = false;
            }

            if (show) {
                lists.map((subitem, i) => {
                    if (datas.length < 6) {
                        datas.push(subitem);
                    }
                });
            }
        });

        setData(datas);
    }, [props.data]);

    return (
        <div className={props.sectionClassName}>
            <div className="container mx-auto px-4">
                <h3 className={`font-medium text-custom-primary_2 text-center mt-5 md:mb-10 ${props.titleClassName}`}>{props.title}</h3>

                <div className="mt-5 md:mt-10 space-y-4 md:space-y-0 md:grid md:grid-cols-3 grid-cols-none gap-x-4 gap-y-2 md:gap-y-6 grid-flow-row auto-cols-fr">
                    {data.map((item, i) => {
                        return <HomeFeaturedCourseCard data={item} key={i} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeaturedCoursesSection;
