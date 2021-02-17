import styled from 'styled-components';
import tw from 'tailwind.macro';

export const SlideShowContainer = styled.div`
    ${tw`relative`}

    & .slick-dots {
        bottom: 10px;

        & li button {
            &::before {
                ${tw`text-xs md:text-sm text-white`}
            }
        }

        & li.slick-active button:before {
            ${tw`text-white`}
        }
    }
`;
