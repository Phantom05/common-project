import {css} from 'styled-components';
import {_color,_deviceSize} from 'styles/__common';


export const color = _color;
export const device = _deviceSize;


export const floatClear = css`
  &:after{
    content:'';
    display:block;
    clear: both;
  }
`;

export const positionCenterCenter = css`
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
`;

export const positionWidthCenter = css`
  position:absolute;
  left:50%;
  transform:translateX(-50%);
`;

export const positionHeightCenter = css`
  position:absolute;
  top:50%;
  transform:translateY(-50%);
`;

export const font = (size=14,color='black') => {
  return css`
  color: ${color};
  font-size: ${size}px;
  font-family: 'Noto Sans', sans-serif;
  & :hover{ color: $clr; } 
  /* @content; */
  `;
};


export const buttonBlue = css`
      background:${color.blue};
      color:${color.white};
      transition:.3s;
      border:0;
      padding:5px 15px;
      border-radius:3px;
      cursor: pointer;
      ${font(16,color.white)};
      &:hover{
        background:${color.blue_hover};
      }
`;

export const dotdotdot = css`
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
`;



