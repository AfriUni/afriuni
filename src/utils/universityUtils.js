/* eslint-disable nonblock-statement-body-position */
/* eslint-disable implicit-arrow-linebreak */
import string_to_slug from "./slugify";
import {compareArray} from "./compare";

export const getLocationData = (nodes) => {
  const payload = {
    databaseIdCountry : '',
    city: '',
    country: '',
    flag: '',
  };

  if (!nodes) return payload;

  payload.city = nodes.find((x) => !x.is_country)?.name;
  payload.country = nodes.find((x) => x.is_country)?.name;
  payload.slug = nodes.find((x) => x.is_country)?.slug;
  payload.flag = nodes.find((x) => x.is_country)?.flag;
  payload.databaseIdCountry = nodes.find((x) => x.is_country)?.databaseId;

  return payload;
};

export const getCategoryList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.specialisations.nodes && course.specialisations.nodes.length > 0) {
      course.specialisations.nodes.map((spec) => {
        // checking whether if it has a parent category
        if (!spec.parent) return;

        const index = mainCategories.findIndex((x) => x.name === spec.parent?.node.name);

        if (mainCategories.length > 0 && mainCategories[index]) {
          const subIndex = mainCategories[index].subMenu.findIndex((x) => x.name === spec.name);
          if (subIndex >= 0) return;
          mainCategories[index].subMenu.push({
            name: spec.name,
            id: spec.databaseId,
            slug: spec.slug,
          });
          mainCategories[index].subMenu.sort(compareArray)
        } else {
          const payload = {
            name: spec.parent.node.name,
            subMenu: [
              {
                name: spec.name,
                id: spec.databaseId,
                slug: spec.slug,
              },
            ],
          };

          mainCategories.push(payload);
        }
      });
    }
  });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories.sort(compareArray));

  return [...uniqueCategories];
};

export const getDurationList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course, index) => {
    const duration = course.duration_time;
    if(duration.time_month && duration.time_number){
      const name = duration.time_number+" "+duration.time_month;
      if(!mainCategories.find((x) => x.name === name)){
        mainCategories.push({
          compared : parseInt(duration.time_number),
          id : index,
          name : name,
          slug : string_to_slug(name)
        });
      }
    }
  });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories.sort(compareArray));

  return [...uniqueCategories];
};

export const getStudyLvlList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.studiesLevel.nodes && course.studiesLevel.nodes.length > 0) {
      course.studiesLevel.nodes.map((lvl) => {
        if(!mainCategories.find((x) => x.id === lvl.databaseId)){
          mainCategories.push({
            name : lvl.name,
            id : lvl.databaseId,
            slug : lvl.slug
          });
        }
      });
    }
  });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories.sort(compareArray));

  return [...uniqueCategories];
};

// export const getTableData = (courses) => {
//   const header = [
//     {
//       key: 'programme',
//       value: 'Programmes',
//     },
//     {
//       key: 'studyLevel',
//       value: 'Study Level',
//     },
//     {
//       key: 'duration',
//       value: 'Duration',
//     },
//   ];
//
//   const body = [];
//
//   if (!courses || courses.length === 0) return [header, body];
//
//   courses.map((course) => {
//     // handling the spec
//     const row = {
//       isHeading: false,
//       programme: '',
//       studyLevel: course.studiesLevel.nodes ? course.studiesLevel.nodes[0].name : '',
//       duration: course.duration_time
//         ? `${course.duration_time.time_number} ${course.duration_time.time_month}`
//         : '',
//     };
//
//     if (course.specialisations.nodes && course.specialisations.nodes.length > 0) {
//       course.specialisations.nodes.map((spec) => {
//         // checking whether if it has a parent category
//         if (!spec.ancestors) return;
//
//         const payload = {
//           isHeading: true,
//           programme: spec.ancestors?.nodes[0].name,
//           studyLevel: '',
//           duration: '',
//         };
//
//         body.push(payload);
//         body.push({ ...row, programme: spec.name });
//       });
//     }
//   });
//
//   return [header, body];
// };
//
// export const multiFilter = (arr, filters) => {
//   const filterKeys = Object.keys(filters);
//   return arr.filter((eachObj) =>
//     filterKeys.every((eachKey) => {
//       if (!filters[eachKey].length) {
//         return true; // passing an empty filter means that filter is ignored.
//       }
//       return eachObj[eachKey].includes(filters[eachKey]);
//     }),
//   );
// };
//
// export const filterTableData = ({ body, category, duration, studyLevel, defaultState }) => {
//   if (
//     category === defaultState.category &&
//     duration === defaultState.duration &&
//     studyLevel === defaultState.studyLevel
//   )
//     return body;
//
//   const filters = {
//     programme: category === defaultState.category ? '' : category,
//     studyLevel: studyLevel === defaultState.studyLevel ? '' : studyLevel,
//     duration: duration === defaultState.duration ? '' : duration,
//   };
//
//   return multiFilter(body, filters);
// };
