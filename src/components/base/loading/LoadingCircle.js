import React from 'react';
import {  makeStyles,withStyles  } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {color} from 'styles/__utils';
import cx from 'classnames';

// Inspired by the Facebook spinners.
const useStylesFacebook = makeStyles({
  colorPrimary:{
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
  root: {
    position: 'relative',
  },
  top: {
    color: color.gray,
  },
  bottom: {
    color: color.white,
    animationDuration: '550ms',
    position: 'absolute',
    left: 0,
  },
});

const ColorCircularProgress = withStyles({
  root: {
    color: color.blue,
  },
})(CircularProgress);



function FacebookProgress(props) {
  const classes = useStylesFacebook();
  const {size} = props;
  return (
    <div className={classes.root}>
      <ColorCircularProgress 
        value={100}
        className={classes.top}
        size={size?size:24}
        thickness={4}
        {...props}
      />
      {/* <CircularProgress
        // variant="determinate"
        value={100}
        className={classes.top}
        size={size?size:24}
        thickness={4}
        {...props}
      /> */}
      {/* <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={size?size:24}
        thickness={4}
        {...props}
      /> */}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
  },
  margin: {
    // margin: theme.spacing(1),
  },
}));

export default function CustomizedProgressBars(props) {
  const classes = useStyles();
  const {className,size} = props;

  return (
    <div className={cx(classes.root,className)}>
      <FacebookProgress size={size}/>
    </div>
  );
}