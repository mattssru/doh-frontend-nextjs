import React from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    margin: "20px 0",
    "& .MuiCircularProgress-colorPrimary": {
      width: "120px !important",
      height: "120px !important",
      position: "relative",
      color: "#70B642",
      "&:after": {
        content: '""',
        width: "120px",
        height: "120px",
        border: "10px solid #ECEFF0",
        borderRadius: "100%",
        position: "absolute",
        zIndex: "-1",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
      },
    },
    "& .MuiTypography-colorTextSecondary": {
      fontSize: "50px",
      color: "#1688C4",
    },
    "& .MuiCircularProgress-circle": {
      strokeWidth: "4px",
    },
  },
}));

function CircularProgressWithLabel(props: any) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
const ProgressDoughnut = (props: any) => {
  const classes = useStyles();
  const { progress } = props;
  // const [progress, setProgress] = React.useState(40);
  React.useEffect(() => {
    const timer = setInterval(() => {
      // setProgress((prevProgress) =>
      //   prevProgress >= 100 ? 0 : prevProgress + 10
      // );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box className={classes.root}>
      <CircularProgressWithLabel value={progress} />
      {/* <img src="/static/images/img-test-ring.png" alt=""></img> */}
    </Box>
  );
};

export default ProgressDoughnut;
