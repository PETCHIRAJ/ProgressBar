import styled from 'styled-components';

export const Progressbar = styled.progress`
  appearance: none;
  border: #dcd8d8 1px solid;
  width: 100%;
  height: 40px;
  position: relative;
  margin-bottom: 10px;

  &::-webkit-progress-bar {
    background-color: white;
  }

  &::-webkit-progress-value {
    position: relative;
    background-color: ${(props) => (props.perc > 100 ? 'red' : 'lightblue')};
    transition: width 0.2s ease-in-out;
  }
  &::after {
    content: ${(props) => props.perc && `'${props.perc}%'`};
    position: absolute;
    width: 5px;
    height: 5px;
    top: 10px;
    right: 50%;
  }

  &::-moz-progress-bar {
    background-image: -moz-linear-gradient(
        135deg,
        transparent,
        transparent 33%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.1) 66%,
        transparent 66%
      ),
      -moz-linear-gradient(top, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0.2)),
      -moz-linear-gradient(left, #09c, #f44);

    background-size: 35px 20px, 100% 100%, 100% 100%;
    border-radius: 3px;
  }
`;

export default Progressbar;
