import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import { Box, LinearProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *' : {
            marginTop: theme.spacing(2),
        },
        height: '300px'
    }
}))

const LoadingScreen = () => {

    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    })

    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Box>
                <LinearProgress color="secondary"/>
            </Box>
        </div>
    )
}

export default LoadingScreen
