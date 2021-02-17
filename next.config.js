const withImages = require('next-images');
const withSVGR = require('next-svgr');

const config = {
    images: {
        domains: ['wordpress-502086-1591393.cloudwaysapps.com'],
    },
};

module.exports = withImages(config);
