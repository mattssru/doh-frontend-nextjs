import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import Link from 'next/link';
const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '24px',
    lineHeight: '24px',
    display: 'inline-block',
    paddingRight: '80px',
    fontFamily: 'DBHeavent_BoldCond',
    backgroundImage: (props: any) => props.bgimg || `/images/ic-readmore.png`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '21px',
    backgroundPosition: 'left center',
    position: `relative`,
    color: (props: any) => props.colorlink || `#5A5A5A`,
    margin: (props: any) => props.marginlink || `0px`,
    textAlign: (props: any) => props.textalignlink || `left`,
    [theme.breakpoints.down('xs')]: {
      paddingRight: 40,
    },
    '& span': {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      right: '0',
      display: 'flex',
      width: '60px',
      height: '60px',
      backgroundColor: (props: any) => props.bgbtncolor || `#C9D0FF`,
      borderRadius: '100%',
      WebkitTransition: 'all 0.2s ease-in',

      [theme.breakpoints.down('xs')]: {
        width: '30px',
        height: '30px',
        '& img': {
          width: 10,
          height: 10,
        },
      },
    },
    '&:hover': {
      color: (props: any) => props.colorhoverlink || `#313490`,
      '& span': {
        backgroundColor: (props: any) => props.bgbtncolorhover || `#FFB01F`,
      },
    },
  },
}));

const ButtonReadmore = (props: any) => {
  const { root } = useStyles(props);
  const { onClick, textlink, link, ...rest } = props;
  return (
    <Link href={link || '/'} {...rest}>
      <a onClick={onClick} className={`${root}`} color="primary">
        {textlink}
        <Box component="span">
          <img src="/images/ic-readmore.png" alt="" />
        </Box>
      </a>
    </Link>
  );
};
ButtonReadmore.defaultProps = {
  bgimg: `/images/ic-readmore.png`,
};
export default ButtonReadmore;
