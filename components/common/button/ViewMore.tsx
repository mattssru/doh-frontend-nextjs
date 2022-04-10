import { Link, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    height: 'auto',
    color: '#000000',
    fontSize: 24,
    fontFamily: 'DBHeavent_BoldCond',
    '&:hover': {
      color: '#495BDE',
    },
    '& span': {
      width: 60,
      height: 60,
      backgroundColor: '#C9D0FF',
      borderRadius: '100%',
      display: 'flex',
      marginLeft: 12,
      alignItems: 'center',
      justifyContent: 'center',
      '& img': {
        height: 15,
      },
      [theme.breakpoints.down('xs')]: {
        width: 50,
        height: 50,
      },
    },
  },
}));

const ViewMore = (props: any) => {
  const classes = useStyles();
  const { link } = props;
  return (
    <Link href={link} className={classes.root}>
      ดูทั้งหมด
      <span>
        <img src="/images/ic_viewmore.svg" alt="" />
      </span>
    </Link>
  );
};

export default ViewMore;
