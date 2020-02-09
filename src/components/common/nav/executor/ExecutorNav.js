import React,{useState} from 'react';
import styled from 'styled-components';
import {color} from 'styles/__utils';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import SpeedDial from '@material-ui/lab/SpeedDial';
import {useImmer} from 'use-immer';

import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const actions = [
  { icon: <FileCopyIcon />, name: 'SNAP Scan' ,isActive:false},
  { icon: <SaveIcon />, name: 'Smile Design' ,isActive:false},
  { icon: <PrintIcon />, name: 'Scan App' ,isActive:false},
  { icon: <ShareIcon />, name: 'IOS' ,isActive:false},
  { icon: <FavoriteIcon />, name: 'Design Platform' ,isActive:false},
];

function ExecutorNav(props) {
  const classes = useStyles();
  const [hidden] = useState(false);
  const [dialIconList, setDialIconList] = useImmer(actions);
  const {isOpen,handleToggle} = props;
  
  // const handleVisibility = () => {
  //   setHidden(prevHidden => !prevHidden);
  // };

  const onToggle = ()=>{
    handleToggle()
  }

  const handleClickDialItem = (value) => {
    setDialIconList(draft=>{
      draft.forEach(item=> item.isActive = false)
      draft.find(item=>item.name === value).isActive = true;
    });
  };

  return (
    <Styled.ExecutorNav>
    <div className={classes.root}>
    {/* <Button onClick={handleVisibility}>Toggle Speed Dial</Button> */}
    <SpeedDial
      // onClick={(e)=>onToggle(e,'dial')}
      transitionDuration={0}
      ariaLabel="SpeedDial tooltip example"
      className={cx(classes.speedDial,'SpeedDial')}
      hidden={hidden}
      icon={<SpeedDialIcon className={cx('speedDialIcon')}/>}
      FabProps = {{onClick:onToggle }}
      open={isOpen}
      direction="down"
    >
    {dialIconList.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          className={cx('speedDialAction__icon',{active:action.isActive})}
          tooltipTitle={<span className={classes.tooltip}>{action.name}</span>}
          onClick={(e)=>handleClickDialItem(action.name)}
        />
      ))} 
    </SpeedDial>
    
  </div>
  </Styled.ExecutorNav>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    width:100,
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
    position:`fixed`,
    top:50,
    right:0
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    transition:0
  },
  tooltip:{
    fontSize:12,
    padding:5
  }
}));

const Styled ={
  ExecutorNav:styled.div`
    width:100px;
    .SpeedDial{
      
      margin-top:20px;
    }
    .MuiSpeedDialIcon-root{
      height:40px;
    }
    
    
    .MuiButtonBase-root.MuiFab-root.MuiSpeedDial-fab.MuiFab-primary{
      background:${color.blue};
      
    }
    .MuiSvgIcon-root.MuiSpeedDialIcon-icon{
      font-size:40px;
    }
    .MuiFab-sizeSmall{
      width:50px;
      height:50px;
      margin:6px;
    }
    .speedDialAction__icon{
      transition:.3s;
      /* background:black; */
      /* color:white; */
      &:hover{
        /* background:${color.blue}; */
      }
      &.active{
        background:${color.blue};
        color:white;
      }
    }
  `
}



// import React from 'react';
// import styled from 'styled-components';
// import { color } from 'styles/__utils';
// import { icon_plus } from 'components/base/images';
// import {PlainDim} from 'components/common/dim';
// import { useImmer } from "use-immer";


// function ExecutorNav(props) {
//   const [value,setValue] = useImmer({
//     dim:false
//   });


//   return (
//     <Styled.ExecutorNav>
//       {/* <PlainDim  view={value.dim} /> */}
//       <div className="dim"></div>
//       <div className="executor__menu_box" >
//         <span className="menu__icon_con" >
//           <div className="menu__icon_box">
//             <img src={icon_plus} alt="icon_plus" className="menu__icon" />
//           </div>
//         </span>
//       </div>
//     </Styled.ExecutorNav>
//   );
// }

// const Styled = {
//   ExecutorNav: styled.div`
//   width:100px;
//   padding-top:20px;
//   .executor__menu_box{
//     text-align:center;
//   }
//     .menu__icon_con{
//       position:relative;
//       display:inline-block;
//       width:60px;
//       height:60px;
//       border-radius:100%;
//       background:${color.blue};
//       cursor: pointer;
//     }
//     .menu__icon_box{
//       display:inline-block;
//       position:absolute;
//       left:50%;
//       top:50%;
//       transform:translate(-50%,-50%);
//       font-size:37px;
//       color:white;
//     }
//     .menu__icon{
//       display:inline-block;
//       width:100%;
//       height:100%;
//     }
//   `
// }

export default ExecutorNav;