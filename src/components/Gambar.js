import styled from 'styled-components';

const Gambar = styled.img`
  object-fit: cover;
  width: ${(props) => (props.width ? props.width : '100px')};
  height: ${(props) => (props.width ? props.width : '100px')};
`;

export default Gambar;