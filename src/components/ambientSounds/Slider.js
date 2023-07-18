import styled from "styled-components";
import { themeContext } from "../../homepage/home";
import { useContext } from "react";
import { newShade } from "../../App";


export const StyledSlider = styled.input`
  /*Range Reset*/
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  height: 13px;
  max-width: 50px;

  /* If isVertical is true, adjust to vertical orientation */
  transform: ${({ isVertical }) =>
    isVertical === true ? "rotate(270deg)" : ""};

  /******** Chrome, Safari, Opera and Edge Chromium styles ********/
  &::-webkit-slider-runnable-track {
    height: 13px;
    background-color: transparent;
    border-radius: 5px;
    filter: brightness(85%);
    border: 1px solid  ${({ theme }) => newShade(theme, -50)};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    width: 1px;
    outline: none;
    background-color: ${({ value }) =>
      value === 0 ? "transparent" : "gray"};
    box-shadow: -80px 0 0 80px ${({ theme }) => newShade(theme, -50)};
  }

  /******** Firefox styles ********/
  &::-moz-range-track {
    height: 13px;
    border: 1px solid  ${({ theme }) => newShade(theme, -50)};
    border-radius: 5px;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    border: none;
    height: 13px;
    width: 13px;
    border-radius: 50%;
    margin-top: -6px;
    background-color:  ${({ theme }) => newShade(theme, -50)};
    box-shadow: -80px 0 0 80px ${({ theme }) => newShade(theme, -50)};
  }
`;


const VolumeSlider = ({ value, min, max, step, onChange, isVertical }=false) => {
  const contextData = useContext(themeContext);
  const theme = contextData.themes;
  const handleEvent = (event) => {
    onChange(Number(event.target.value));
  };
  return (
    <StyledSlider
    isVertical={isVertical}
    type="range"
    value={value}
    min={min}
    max={max}
    step={step}
    onChange={handleEvent}
    theme={theme}
  />

  );
};


export default VolumeSlider;