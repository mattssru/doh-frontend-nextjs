import { FormControl, FormHelperText, InputLabel, Select as MuiSelect, makeStyles ,Box} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    root: {
      width: `100%`,
      marginBottom: "15px",
      "& .MuiInputBase-root , & .MuiSelect-selectMenu": {
        borderRadius: `25px`,
        width: `100%`,
        backgroundColor: `#fff`,
      },
      "& .MuiInputBase-root": {
        fontSize: `30px`,
        lineHeight: `45px;`,
      },
      "& .MuiSelect-select": {
        padding: `0 14px`,
        height: "50px",
        fontSize: "22px",
        lineHeight: "24px",
        fontFamily: "DBHeavent_Cond",
        color: "#000",
      },
  
      "& .MuiSelect-select:focus": {
        borderColor: `#d8d8d8`,
        backgroundColor: "transparent",
      },
      "& .MuiSelect-icon": {
        color: `rgba(0, 0, 0, 1)`,
      },
      "& $label": {
        fontSize: "24px",
        lineHeight: "30px",
        color: "#000",
        fontFamily: "DBHeavent_Cond",
        position: "relative",
        transform: "none",
        marginBottom: "3px",
      },
    },
    listWeek: {
      fontSize: `30px`,
      lineHeight: `45px;`,
    },
    label: {
      fontSize: "24px",
      lineHeight: "30px",
      color: "#000",
      fontFamily: "DBHeavent_Cond",
      marginBottom: "3px",
    },
    labelrequired:{
      position:`relative`,
      '&::after':{
          position:`absolute`,
          content:`'*'`,
          right:`-15px`,
          top:`0`,
          color:`red`,
          display:(props) => props.displayrequired,
      }
    },
});

const Select = (props) => {
    const { name, label, variant, onChange, error=null, renderOptions, titleDefault, disabled, ...rest } = props
    const classes = useStyles()

    const { labelrequired } = useStyles(props);
    return (
        <FormControl
            className={classes.root}
            {...(error && {error:true})}
            disabled={disabled || false}
        >
            <InputLabel className={classes.label}>
              <Box component="span" className={`${labelrequired}`}>
                {label}
              </Box>
            </InputLabel>
            <MuiSelect
                select={'true'}
                native
                name={name}
                onChange={onChange}
                variant={ variant || 'outlined' }
                {...rest}
            >
                <option value=''>{ titleDefault  || 'กรุณาเลือก' }</option>
                {renderOptions}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

Select.defaultProps ={
  displayrequired: 'none'
}

export default Select
