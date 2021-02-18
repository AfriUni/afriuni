export const getLocationData = (nodes) => {
  const payload = {
    city: '',
    country: '',
    flag: '',
  };

  if (!nodes) return payload;

  payload.city = nodes.find((x) => !x.is_country)?.name;
  payload.country = nodes.find((x) => x.is_country)?.name;
  payload.countrySlug = nodes.find((x) => x.is_country)?.slug;
  payload.flag = nodes.find((x) => x.is_country)?.flag;

  return payload;
};

export const getCategoryList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.specialisations.nodes && course.specialisations.nodes.length > 0) {
      course.specialisations.nodes.map((spec) => {
        // checking whether if it has a parent category
        if (!spec.ancestors) return;

        const index = mainCategories.findIndex((x) => x.name === spec.ancestors?.nodes[0].name);

        if (index && mainCategories.length > 0 && mainCategories[index]) {
          const subIndex = mainCategories[index].subMenu.findIndex((x) => x.name === spec.name);
          if (subIndex) return;
          mainCategories[index].subMenu.push({ name: spec.name });
        } else {
          const payload = {
            name: spec.ancestors?.nodes[0].name,
            subMenu: [
              {
                name: spec.name,
              },
            ],
          };

          mainCategories.push(payload);
        }
      });
    }
  });

  // courses.map((course) => {
  //   if (course.specialisations?.nodes && course.specialisations?.nodes.length > 0) {
  //     course.specialisations?.nodes.map((spec) => {
  //       mainCategories.push(spec.name);
  //     });
  //   }
  // });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories);

  return [...uniqueCategories];
};

export const getDurationList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.duration_time) {
      mainCategories.push(`${course.duration_time.time_number} ${course.duration_time.time_month}`);
    }
  });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories);

  return [...uniqueCategories];
};

export const getStudyLvlList = (courses) => {
  if (!courses || courses.length === 0) return null;

  const mainCategories = [];

  courses.map((course) => {
    if (course.studiesLevel.nodes && course.studiesLevel.nodes.length > 0) {
      course.studiesLevel.nodes.map((lvl) => {
        mainCategories.push(lvl.name);
      });
    }
  });

  // removing duplicates
  const uniqueCategories = new Set(mainCategories);

  return [...uniqueCategories];
};

export const getTableData = (courses) => {
  const header = [
    {
      key: 'programme',
      value: 'Programmes',
    },
    {
      key: 'studyLevel',
      value: 'Study Level',
    },
    {
      key: 'duration',
      value: 'Duration',
    },
  ];

  const body = [];

  if (!courses || courses.length === 0) return [header, body];

  courses.map((course) => {
    // handling the spec
    const row = {
      isHeading: false,
      programme: '',
      studyLevel: course.studiesLevel.nodes ? course.studiesLevel.nodes[0].name : '',
      duration: course.duration_time
        ? `${course.duration_time.time_number} ${course.duration_time.time_month}`
        : '',
    };

    if (course.specialisations.nodes && course.specialisations.nodes.length > 0) {
      course.specialisations.nodes.map((spec) => {
        // checking whether if it has a parent category
        if (!spec.ancestors) return;

        const payload = {
          isHeading: true,
          programme: spec.ancestors?.nodes[0].name,
          studyLevel: '',
          duration: '',
        };

        body.push(payload);
        body.push({ ...row, programme: spec.name });
      });
    }
  });

  return [header, body];
};
