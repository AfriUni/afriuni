import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Button = styled.button`
  ${tw`normal-case font-normal py-2 md:px-4 px-2 outline-none focus:outline-none`}
`;

export const ButtonRedPrimary = styled(Button)`
  ${tw`bg-custom-secondary text-white`}
`;

export const ButtonRedSecondary = styled(Button)`
  ${tw`text-custom-secondary border border-custom-secondary hover:bg-custom-secondary hover:text-white`}
`;

export const ButtonDefault = styled(Button)`
  ${tw`bg-gray-400 text-black hover:text-white hover:bg-black`}
`;

export const ButtonDefaultSecondary = styled(Button)`
  ${tw`bg-white border border-gray-400`}
`;
