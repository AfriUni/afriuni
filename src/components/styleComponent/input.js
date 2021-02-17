import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Input = styled.input.attrs(() => ({ autoComplete: 'off' }))`
    ${tw`bg-white focus:outline-none text-ease-primary focus:bg-white inline-block
       max-w-full w-full px-4 align-middle overflow-visible
    `}

    transition: .2s ease-in-out;
    transition-property: color, background-color, border;
`;

// export const Input = styled.input.attrs(() => ({ autoComplete: 'off', className : 'input uk-form-large'}))`
//     ${tw`bg-input-primary border-0 md:rounded-md focus:bg-input-primary focus:outline-none text-ease-primary text-xs font-normal focus:bg-white
//     focus:border-2 focus:border-solid focus:border-ease-primary inline-block
//        max-w-full w-full px-2 align-middle overflow-visible pr-3
//     `}
//
//     transition: .2s ease-in-out;
//     transition-property: color,background-color,border;
// `;

export const InputWhite = styled.input.attrs(() => ({ autoComplete: 'off', className: 'input uk-form-large' }))`
    ${tw`bg-transparent border-2 border-gray-300 md:rounded-md focus:bg-input-primary focus:outline-none text-ease-primary text-xs font-normal focus:bg-white 
    focus:border-2 focus:border-solid focus:border-ease-primary inline-block
       max-w-full w-full px-2 align-middle overflow-visible pr-3
    `}
`;

export const Radio = styled.input.attrs(() => ({
    type: 'radio',
    className: 'uk-radio',
}))`
    ${tw`w-5 h-5 bg-input-primary border-gray-200 mr-1`}

    &:checked {
        ${tw`bg-ease-primary border-4 border-gray-200`}
        background-image: none !important;

        &:focus {
            ${tw`bg-ease-primary border-4 border-gray-200`}
        }
    }
`;

export const RadioIcon = styled.input.attrs(() => ({
    type: 'radio',
}))`
    & + label {
        ${tw`bg-white border border-ease-texte text-ease-texte w-15 p-6 h-10 text-2xl`}

        &.left {
            ${tw`rounded-l-xl rounded-r-none`}
        }

        &.right {
            ${tw`rounded-r-xl rounded-l-none`}
        }
    }

    &:checked + label {
        ${tw`bg-ease-barre60 border border-ease-barre60 text-black`}

        &.left {
            ${tw`rounded-l-xl`}
        }

        &.right {
            ${tw`rounded-r-xl`}
        }
    }
`;
