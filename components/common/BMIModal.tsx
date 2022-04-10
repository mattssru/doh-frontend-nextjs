import { Box, Dialog, Typography, makeStyles, Grid, TextField, Button } from "@material-ui/core";
import prefix from 'utils/path';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { IStates } from "stores/root.reducer";
import { ActionSaga } from "services/action.saga";
import { BMIActions } from "stores/bmi/bmi.action";
import { ICreateBMI } from 'stores/bmi/bmi.reducer';
import * as yup from 'yup';


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paperScrollPaper": {
      margin: 15,
      minHeight: (props: any) => props.minheight,
      backgroundColor: "#449AE3",

      borderRadius: 5,
      position: "relative",
      backgroundImage: `url(${prefix}/images/bmi_dec.png)`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right top",
      backgroundSize: "auto",
      padding: 15
    },
    "& .MuiDialogContent-root": {
      padding: "50px 30px 30px 30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      marginTop: 20,
      [theme.breakpoints.down("xs")]: {
        padding: "50px 20px 20px 20px",
      },
    },
    "& ::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& :: -webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
  boxConditions: {
    height: 350,
    overflow: "auto",
    border: "1px solid #eee",
    marginBottom: 30,
    padding: 20,
    "& h3": {
      color: "#70B642",
      fontSize: 34,
      lineHeight: "34px",
      textAlign: "center",
      marginBottom: 15,
    },
    "& h4": {
      fontSize: 34,
    },
    "& p": {
      textIndent: "30px",
      marginBottom: 10,
    },
  },
  inputField: {
    borderRadius: 5,
    // background: "white",
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: 40,
      color: "#449AE3",
      fontSize: 22,
      borderRadius: 5,
    },
    [theme.breakpoints.down("xs")]: {},
    "& .Mui-focused": {
      color: "#449AE3",
      border: "none",
      order: "none",
    },
    "&$cssFocused $notchedOutline": {
      borderColor: `red !important`,
    },
    "& input": {
      background: 'white',
      padding: "7px 10px",
      borderRadius: '7px',
    }
  },
  buttonSave: {
    color: "white",
    background:
      "linear-gradient(180deg, rgba(208,253,8,1) 0%, rgba(140,165,16,1) 100%)",
    fontSize: "22px",
    width: "100%",
    height: "40px",
    lineHeight: "30px",
    borderRadius: "5px",
    margin: "20px 0 0 0",

  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 400,
    fontSize: 40,
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
    }
  }
}))
interface IForm {
  weight: number | undefined
  height: number | undefined
}

const BMIModal = (props: any) => {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  // const [openModal, setOpenModal] = useState(true);
  const { profile } = useSelector((states: IStates) => states.profileReducer);
  // const { openBMI } = props;
  const { openModal, handleCloseModal } = props;
  const initialValues: IForm = {
    weight: undefined,
    height: undefined,
  }
  const formValidate = yup.object().shape({
    weight: yup.number().required('กรุณากรอกข้อมูลน้ำหนัก').min(10, 'น้ำหนักต้องไม่น้อยกว่า 10 กก.').max(200, "น้ำหนักต้องไม่เกิน 200 กก."),
    height: yup.number().required('กรุณากรอกข้อมูลส่วนสูง').min(90, 'ส่วนสูงต้องไม่น้อยกว่า 90 ซม.').max(250, 'ส่วนสูงต้องไม่เกิน 250 ซม.')
  })

  const onFormSubmit = (values: IForm) => {
    const data: ICreateBMI = {
      height: values.height!,
      weight: values.weight!,
      getBmi: Number((values.weight! / ((values.height! / 100) * (values.height! / 100))).toFixed(2)),
      user_id: profile.user_id
    }
    dispatch(
      ActionSaga({
        type: BMIActions.BMI_SAVE_R,
        payload: data
      })
    )
    handleCloseModal()
  }
  return (

    <Dialog
      open={openModal}
      maxWidth='sm'
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <Box>
        <Typography variant="h4" className={classes.title}>บันทึกข้อมูล เพื่อดู BMI ล่าสุดของท่าน</Typography>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          validationSchema={formValidate}
        >
          {({ values, dirty, handleChange, handleBlur, handleSubmit, errors }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="weight"
                    name="weight"
                    type="number"
                    variant="outlined"
                    placeholder="กรอกน้ำหนัก"
                    className={classes.inputField}
                    value={values.weight}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.weight}
                    error={!!errors.weight}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="height"
                    name="height"
                    type="number"
                    variant="outlined"
                    placeholder="กรอกส่วนสูง"
                    className={classes.inputField}
                    value={values.height}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.height}
                    error={!!errors.height}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Button type="submit" className={classes.buttonSave} disabled={!dirty || Object.keys(errors).length > 0}>บันทึก</Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>

  )

}
export default BMIModal;
