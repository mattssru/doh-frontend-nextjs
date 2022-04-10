import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles: any = makeStyles(() => ({
    root: {
        position: "fixed",
        left:0,
        top:0,
        zIndex:10,
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.3)"
    },
    spinner: {
        color: "#70b642",
        fontSize: "20px",
        width: "1em",
        height: "1em",
        borderRadius: "50%",
        position: "absolute",
        textIndent: "-9999em",
        WebkitAnimation: "$load4 1.1s infinite linear",
        animation: "$load4 1.1s infinite linear",
        WebkitTransform: 'translateZ(0)',
        msTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        left: 'calc(50% - 0.5em)',
        top: 'calc(50% - 0.5em)',
        zIndex: 9999
    },
    "@keyframes load4": {
        "0%": {
            boxShadow: '0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0',
        },
        "100%":{
            boxShadow: '0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0',
        },
        "12.5%":{
            boxShadow: '0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em',
        },
        "25%":{
            boxShadow: '0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em',
        },
        "37.5%":{
            boxShadow: '0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em',
        },
        "50%":{
            boxShadow: '0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em',
        },
        "62.5%":{
            boxShadow: '0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em',
        },
        "75%":{
            boxShadow: '0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0',
        },
        "87.5%":{
            boxShadow: '0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em',
        }

    }
}));

const SplashScreen = (props: any) => {

    const { isLoading } = props
    const classes:any = useStyles();
    return (
            <>
            {
                isLoading ? 
                <Box className={classes.root}>
                    <Box className={classes.spinner}/>
                </Box>
                : <></>
            }
                
            </>
    )
}

export default SplashScreen;

