import {
  Box,
  Dialog,
  DialogActions,
  Grid,
  makeStyles,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import router from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { ProfileAction } from "stores/profile/profile.action";
import { RadioFixd, SelectFixd } from "./common";
import { ButtonProps } from "./common/button";

const useStyles = makeStyles((theme) => ({
  boxConditions: {
    // height: 350,
    overflow: "auto",
    padding: 10,
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#E7EEF0 !important",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#E96189 !important",
    },
    "& h3": {
      color: "#1688C4",
      fontSize: 28,
      lineHeight: "30px",
      textAlign: "center",
    },
    "& h4": {
      fontSize: 20,
      lineHeight: "30px",
      color: "#1688C4",
      textAlign: "center",
    },
    "& p": {
      fontSize: 20,
      lineHeight: "22px",
      marginBottom: 10,
    },
  },
  desPopup: {
    margin: "15px 0",
  },
  formModal: {
    "& h3": {
      fontSize: 24,
      lineHeight: "29px",
      color: "#70B642",
      textAlign: "left",
      margin: "30px 0 15px 0",
    },
  },
  itemModal: {
    fontSize: 20,
    lineHeight: "20px",
    marginBottom: 30,
    paddingLeft: 5,

  },
  question: {
    marginBottom: 15,
  },
  itemIn: {
    marginTop: 10,
    position: "relative",
  },
  textAbsolute: {
    display: "inline-block",
    bottom: 20,
    position: "absolute",
    // top: 43,
    // left: "20vh",
    fontSize: 22,
    lineHeight: "26px",
  },
  dialog: {
    margin: "20px",
    textAlign: "center",
    width: "300px",
    "& button": {
      background: "linear-gradient(to bottom, #68D5E5, #674EEF)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "250px",
    },
  },
}));

const ModalQuestionnaire = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  // 1= yes 2=no
  const [ans, setAns] = useState({
    q1: 0,
    q2: 0,
    q3h: 0,
    q3m: 0,
    q4: 0,
    q5: 0,
    q6h: 0,
    q6m: 0,
    q7: 0,
    q8: 0,
    q9h: 0,
    q9m: 0,
    q10: 0,
    q11: 0,
    q12h: 0,
    q12m: 0,
    q13: 0,
    q14: 0,
    q15h: 0,
    q15m: 0,
    q16h: 0,
    q16m: 0,
    q17h: 0,
    q17m: 0,
    q18h: 0,
    q18m: 0,
    q19: 0,
  })
  const ChangeYesNoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === '1') {
      setAns({ ...ans, [name]: 1 })
    } else {
      setAns({ ...ans, [name]: 2 })
    }
  }
  const ChangeOptionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAns({ ...ans, [id]: parseInt(value) })
  }
  const hourOption = () => {
    return (
      <>
        <option disabled selected>กรุณาเลือกชั่วโมง</option>
        {Array.from(
          new Array(25),
          (_val: number, index: number) => index
        ).map((value: number, _key: number) => {
          return (
            <option value={value}>
              {value}
            </option>
          );
        })}
      </>
    )
  }
  const timeOption = () => {
    return (
      <>
        <option disabled selected>กรุณาเลือกชั่วโมง</option>
        {Array.from(
          new Array(24),
          (_val: number, index: number) => index
        ).map((value: number, _key: number) => {
          return (
            <option value={value}>
              {value}
            </option>
          );
        })}
      </>
    )
  }
  const minuteOption = () => {
    return (
      <>
        <option disabled selected>กรุณาเลือกนาที</option>
        {Array.from(
          new Array(12),
          (_val: number, index: number) => 1 + index
        ).map((value: number, _key: number) => {
          return (
            <option value={value * 5 - 5}>
              {value * 5 - 5}
            </option>
          );
        })}
      </>
    )
  }
  const dateOption = () => {
    return (
      <>
        <option disabled selected>กรุณาเลือกวัน</option>
        {Array.from(
          new Array(7),
          (_val: number, index: number) => 1 + index
        ).map((value: number, _key: number) => {
          return (
            <option value={value}>
              {value}
            </option>
          );
        })}
      </>
    )
  }
  const ClickSubmit = () => {
    // console.log(ans)
    let data = [
      ans.q1,
      ans.q2,
      (ans.q3h * 60 + ans.q3m),
      ans.q4,
      ans.q5,
      (ans.q6h * 60 + ans.q6m),
      ans.q7,
      ans.q8,
      (ans.q9h * 60 + ans.q9m),
      ans.q10,
      ans.q11,
      (ans.q12h * 60 + ans.q12m),
      ans.q13,
      ans.q14,
      (ans.q15h * 60 + ans.q15m),
      (ans.q16h * 60 + ans.q16m),
      (ans.q17h + ans.q17m * 0.01),
      (ans.q18h + ans.q18m * 0.01),
      ans.q19,
    ]
    dispatch(
      ActionSaga({
        type: ProfileAction.Q_SURVAY_R,
        payload: data
      })
    )
    setOpenDialog(true);
  }

  const CloseDialog = () => {
    setOpenDialog(false);
    router.push('/')
  };
  return (
    <Box className={classes.boxConditions}>
      <Typography variant="h3">แบบสอบถามกิจกรรมทางกายระดับโลก</Typography>
      <Typography variant="h4">
        (Global Physical Activity Questionnaire: GPAQ)
      </Typography>
      <Box className={classes.desPopup}>
        <p>
          <strong>ก้าวท้าใจ</strong>&nbsp;
          จะขอสอบถามเกี่ยวกับเวลาที่คุณใช้ทำกิจกรรมทางกายเพื่อสุขภาพ (Physical
          Activity) หรือการเคลื่อนไหวออกแรง/ออกกำลัง ภายในสัปดาห์หนึ่งๆ
          ขอความกรุณาในการตอบคำถามต่อไปนี้ ถึงแม้คุณจะคิดว่าตัวคุณเอง
          จะไม่ค่อยได้เคลื่อนไหวกระฉับกระเฉงก็ตาม
          ก่อนอื่นขอให้คิดถึงเวลาที่ใช้ในการทำงาน
        </p>
        <p>
          <strong>การทำงาน</strong>&nbsp; หมายถึง
          การทำงานทั้งที่ได้รับหรือไม่ได้รับผลตอบแทน การเรียน / การอบรม
          กิจกรรมการทำงาน บ้าน การเพาะปลูกและเก็บเกี่ยว การหาปลา / หาอาหาร
          การแสวงหางาน เป็นต้น
        </p>
        <p>
          <strong>กิจกรรมทางกายระดับหนัก</strong>&nbsp; หมายถึง
          กิจกรรมที่ต้องใช้ พละกำลังอย่างหนัก จนทำให้ หายใจแรง
          หรือหัวใจเต้นเร็วขึ้นมาก
        </p>
        <p>
          <strong>กิจกรรมทางกายระดับปานกลาง</strong>&nbsp; หมายถึง
          กิจกรรมที่ต้องใช้ พละกำลังในระดับปานกลาง ทำให้หายใจเร็ว
          หรือหัวใจเต้นเร็วขึ้นจากปกติเล็กน้อย
        </p>
      </Box>
      <Box className={classes.formModal}>
        <Box className={classes.itemModal}>
          <Typography variant="h3">
            ส่วนที่ 1 กิจกรรมทางกายในการทำงาน
          </Typography>
          <Box className={classes.question}>
            1. ท่านมีกิจกรรมทางกายระดับหนัก ซึ่งทำให้หายใจ
            แรงและเร็วกว่าปกติมากหรือหอบ ติดต่อกันเป็น ระยะเวลา อย่างน้อย 10
            นาที เช่น การยกหรือแบกของหนักๆ การขุดดิน งานก่อสร้าง เป็นต้น
            ใช่หรือไม่
            <Box className={classes.itemIn}>
              <RadioGroup name="q1" defaultValue="" onChange={ChangeYesNoInput}>
                <RadioFixd label="ใช่" value="1" fontsize="20px" />
                <RadioFixd
                  label="ไม่ใช่ (ถ้าตอบไม่ใช้ให้ข้ามตอบข้อ 4)"
                  value="2"
                  fontsize="20px"
                />
              </RadioGroup>
            </Box>
          </Box>
          {ans.q1 !== 2 &&
            <>
              <Box className={classes.question}>
                2. โดยปกติท่านมีกิจกรรมทางกายระดับหนัก
                ในแต่ละสัปดาห์เป็นจำนวนกี่วัน
                <Box className={classes.itemIn}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <SelectFixd label="จำนวน" id="q2" onChange={ChangeOptionInput}>
                        {dateOption()}
                      </SelectFixd>
                    </Grid>
                    <Grid item xs={6}>
                      <span className={classes.textAbsolute}>วัน ต่อสัปดาห์</span>
                      {/* <SelectFixd label="นาที" id='q6m' onChange={ChangeOptionInput}>
                            {minuteOption()}
                          </SelectFixd> */}
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box className={classes.question}>
                3. โดยปกติท่านมีกิจกรรมทางกายระดับหนักนั้น
                ในแต่ละวันท่านทำเป็นระยะเวลานานเท่าไร นึกถึงเฉพาะงานที่ติดต่อกัน
                10 นาทีขึ้นไป
                <Box className={classes.itemIn}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <SelectFixd label="ชั่วโมง" id='q3h' onChange={ChangeOptionInput} >
                        {hourOption()}
                      </SelectFixd>
                    </Grid>
                    <Grid item xs={6}>
                      <SelectFixd label="นาที" id='q3m' onChange={ChangeOptionInput}>
                        {minuteOption()}
                      </SelectFixd>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </>
          }
          <Box className={classes.question}>
            4. ท่านมีกิจกรรมทางกายระดับปานกลาง ซึ่งทำให้หายใจ
            เร็วขึ้นพอควรไม่ถึงกับหอบติดต่อกันเป็นระยะเวลาอย่างน้อย 10 นาที
            เช่น การก้าวเดินเร็ว ๆ หรือการยกถือของเบาๆ เป็นต้น ใช่หรือไม่
            <Box className={classes.itemIn}>
              <RadioGroup name="q4" defaultValue="" onChange={ChangeYesNoInput}>
                <RadioFixd label="ใช่" value="1" fontsize="20px" />
                <RadioFixd
                  label="ไม่ใช่ (ถ้าตอบไม่ใช้ให้ข้ามตอบข้อ 7)"
                  value="2"
                  fontsize="20px"
                />
              </RadioGroup>
            </Box>
          </Box>
          {ans.q4 !== 2 &&
            <Box className={classes.question}>
              5. โดยปกติท่านมีกิจกรรมทางกายระดับปานกลาง
              ในแต่ละสัปดาห์เป็นจำนวนกี่วัน
              <Box className={classes.itemIn}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <SelectFixd label="จำนวน" id="q5" onChange={ChangeOptionInput}>
                      {dateOption()}
                    </SelectFixd>
                  </Grid>
                  <Grid item xs={6}>
                    <span className={classes.textAbsolute}>วัน ต่อสัปดาห์</span>
                    {/* <SelectFixd label="นาที" id='q6m' onChange={ChangeOptionInput}>
                            {minuteOption()}
                          </SelectFixd> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          {ans.q4 !== 2 &&
            <Box className={classes.question}>
              6. โดยปกติท่านมีกิจกรรมทางกายระดับปานกลางนั้น
              ในแต่ละวันท่านทำเป็นระยะเวลานานเท่าไร นึกถึงเฉพาะ
              งานที่ติดต่อกัน 10 นาทีขึ้นไป
              <Box className={classes.itemIn}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SelectFixd label="ชั่วโมง" id="q6h" onChange={ChangeOptionInput}>
                      {hourOption()}
                    </SelectFixd>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFixd label="นาที" id='q6m' onChange={ChangeOptionInput}>
                      {minuteOption()}
                    </SelectFixd>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          <Typography variant="h3">
            ส่วนที่ 2 กิจกรรมทางกายในการเดินทางจากที่หนึ่งไปยังอีกที่หนึ่ง
          </Typography>
          <Box className={classes.question}>
            7. ท่านเดินหรือถีบจักรยานจากที่หนึ่งไปยังอีกที่หนึ่ง
            ติดต่อกันเป็นระยะเวลาอย่างน้อย 10 นาที ใช่หรือไม่
            <Box className={classes.itemIn}>
              <RadioGroup name="q7" defaultValue="" onChange={ChangeYesNoInput}>
                <RadioFixd label="ใช่" value="1" fontsize="20px" />
                <RadioFixd
                  label="ไม่ใช่ (ถ้าตอบไม่ใช้ให้ข้ามตอบข้อ 10)"
                  value="2"
                  fontsize="20px"
                />
              </RadioGroup>
            </Box>
          </Box>
          {ans.q7 !== 2 &&
            <Box className={classes.question}>
              8. โดยปกติท่านเดินหรือถีบจักรยานจากที่หนึ่งไปยังอีกที่หนึ่งติดต่อกันเป็นระยะเวลาอย่างน้อย
              10 นาที ในแต่ละสัปดาห์เป็นจำนวนกี่วัน
              <Box className={classes.itemIn}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <SelectFixd label="จำนวน" id="q8" onChange={ChangeOptionInput}>
                      {dateOption()}
                    </SelectFixd>
                  </Grid>
                  <Grid item xs={6}>
                    <span className={classes.textAbsolute}>วัน ต่อสัปดาห์</span>
                    {/* <SelectFixd label="นาที" id='q6m' onChange={ChangeOptionInput}>
                            {minuteOption()}
                          </SelectFixd> */}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          {ans.q7 !== 2 &&
            <Box className={classes.question}>
              9. โดยปกติท่านเดินหรือถีบจักรยานนั้น
              ในแต่ละวันท่านทำเป็นระยะเวลานานเท่าไร
              <Box className={classes.itemIn}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SelectFixd label="ชั่วโมง" id='q9h' onChange={ChangeOptionInput}>
                      {hourOption()}
                    </SelectFixd>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFixd label="นาที" id='q9m' onChange={ChangeOptionInput}>
                      {minuteOption()}
                    </SelectFixd>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          <Typography variant="h3">
            ส่วนที่ 3 กิจกรรมทางกายที่ทำในเวลาว่างเพื่อ พักผ่อนหย่อนใจ /
            นันทนาการ
          </Typography>
          <Box className={classes.question}>
            10. ท่านเล่นกีฬา ออกกำลังกายหรือทำกิจกรรม นันทนาการระดับหนัก
            ซึ่งทำให้หายใจแรงและเร็วกว่าปกติมาก
            หรือหอบติดต่อกันเป็นระยะเวลาอย่างน้อย 10 นาที เช่น วิ่ง
            หรือเล่นฟุตบอล ใช่หรือไม่
            <Box className={classes.itemIn}>
              <RadioGroup name="q10" defaultValue="" onChange={ChangeYesNoInput}>
                <RadioFixd label="ใช่" value="1" fontsize="20px" />
                <RadioFixd
                  label="ไม่ใช่ (ถ้าตอบไม่ใช้ให้ข้ามตอบข้อ 13)"
                  value="2"
                  fontsize="20px"
                />
              </RadioGroup>
            </Box>
          </Box>
          {ans.q10 !== 2 &&
            <Box className={classes.question}>
              11. โดยปกติท่านเล่นกีฬา ออกกำลังกายหรือทำกิจกรรม
              นันทนาการระดับหนักนั้น ในแต่ละวันท่านทำเป็นระยะ เวลานานเท่าไร
              <Box className={classes.itemIn}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <SelectFixd label="จำนวน" id="q11" onChange={ChangeOptionInput}>
                      {dateOption()}
                    </SelectFixd>
                  </Grid>
                  <Grid item xs={6}>
                    <span className={classes.textAbsolute}>วัน ต่อสัปดาห์</span>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          {ans.q10 !== 2 &&
            <Box className={classes.question}>
              12. โดยปกติท่านเล่นกีฬา ออกกำลังกายหรือทำกิจกรรม
              นันทนาการระดับหนักนั้น ในแต่ละวันท่านทำเป็นระยะ เวลานานเท่าไร
              <Box className={classes.itemIn}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SelectFixd label="ชั่วโมง" id="q12h" onChange={ChangeOptionInput}>
                      {hourOption()}
                    </SelectFixd>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFixd label="นาที" id="q12m" onChange={ChangeOptionInput}>
                      {minuteOption()}
                    </SelectFixd>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          <Box className={classes.question}>
            13. ท่านเล่นกีฬา ออกกำลังกายหรือทำกิจกรรม นันทนาการระดับปานกลาง
            ซึ่งทำให้หายใจเร็วขึ้น พอควรไม่ถึงกับหอบ
            ติดต่อกันเป็นระยะเวลาอย่างน้อย 10 นาที เช่น การก้าวเดิน
            ถีบจักรยาน ว่ายน้ำ เล่นวอลเล่ย์บอล
            <Box className={classes.itemIn}>
              <RadioGroup name="q13" defaultValue="" onChange={ChangeYesNoInput}>
                <RadioFixd label="ใช่" value="1" fontsize="20px" />
                <RadioFixd
                  label="ไม่ใช่ (ถ้าตอบไม่ใช้ให้ข้ามตอบข้อ 16)"
                  value="2"
                  fontsize="20px"
                />
              </RadioGroup>
            </Box>
          </Box>

          {ans.q13 !== 2 &&
            <Box className={classes.question}>
              14. โดยปกติท่านเล่นกีฬา ออกกำลังกายหรือทำกิจกรรม
              นันทนาการระดับปานกลาง ในแต่ละสัปดาห์เป็นจำนวนกี่วัน
              <Box className={classes.itemIn}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <SelectFixd label="จำนวน" id="q14" onChange={ChangeOptionInput}>
                      {dateOption()}
                    </SelectFixd>
                  </Grid>
                  <Grid item xs={6}>
                    <span className={classes.textAbsolute}>วัน ต่อสัปดาห์</span>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          {ans.q13 !== 2 &&
            <Box className={classes.question}>
              15. โดยปกติท่านเล่นกีฬา ออกกำลังกายหรือทำกิจกรรม
              นันทนาการระดับปานกลางนั้น ในแต่ละวันท่านทำเป็นระยะ เวลานานเท่าไร
              <Box className={classes.itemIn}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <SelectFixd label="ชั่วโมง" id="q15h" onChange={ChangeOptionInput}>
                      {hourOption()}
                    </SelectFixd>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFixd label="นาที" id="q15m" onChange={ChangeOptionInput}>
                      {minuteOption()}
                    </SelectFixd>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          }
          <Typography variant="h3">ส่วนที่ 4 พฤติกรรมนั่งๆ นอนๆ</Typography>
          <Box className={classes.question}>
            16. โดยปกติในแต่ละวัน ท่านใช้เวลานั่งเอนกายรวมแล้วเป็น
            ระยะเวลานานเท่าไร
            <Box className={classes.itemIn}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SelectFixd label="ชั่วโมง" id="q16h" onChange={ChangeOptionInput}>
                    {hourOption()}
                  </SelectFixd>
                </Grid>
                <Grid item xs={6}>
                  <SelectFixd label="นาที/ต่อวัน" id="q16m" onChange={ChangeOptionInput}>
                    {minuteOption()}
                  </SelectFixd>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className={classes.question}>
            17. โดยปกติในแต่ละวัน ท่านเข้านอนหลับเวลาเท่าใด
            <Box className={classes.itemIn}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SelectFixd label="นาฬิกา" id='q17h' onChange={ChangeOptionInput}>
                    {timeOption()}
                  </SelectFixd>
                </Grid>
                <Grid item xs={6}>
                  <SelectFixd label="นาที" id="q17m" onChange={ChangeOptionInput}>
                    {minuteOption()}
                  </SelectFixd>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className={classes.question}>
            18. โดยปกติในแต่ละวัน ท่านตื่นนอนเวลาเท่าใด
            <Box className={classes.itemIn}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SelectFixd label="นาฬิกา" id='q18h' onChange={ChangeOptionInput}>
                    {timeOption()}
                  </SelectFixd>
                </Grid>
                <Grid item xs={6}>
                  <SelectFixd label="นาที" id='q18m' onChange={ChangeOptionInput}>
                    {minuteOption()}
                  </SelectFixd>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box className={classes.question}>
            19. โดยปกติหลังตื่นนอนตอนเช้า คุณรู้สึกสดชื่นหรือไม่
            <Box className={classes.itemIn}>
              <RadioGroup name="q19" defaultValue="" onChange={ChangeYesNoInput}>
                <RadioFixd label="ใช่" value="1" fontsize="20px" />
                <RadioFixd label="ไม่ใช่" value="2" fontsize="20px" />
              </RadioGroup>
            </Box>
          </Box>

        </Box>
      </Box>
      <ButtonProps
        titlebutton="ส่งคำตอบ"
        maxwidthbtn="167px"
        widthbtn="100%"
        marginbtn="0 auto"
        heightbtn="40px"
        background="linear-gradient(to top, #8CA51E,  #D0FD08)"
        onClick={ClickSubmit}
        actionBtn={
          ans.q1 === 0 ||
          ans.q4 === 0 ||
          ans.q7 === 0 ||
          ans.q10 === 0 ||
          ans.q13 === 0 ||
          ans.q19 === 0
        }
      />
      <Dialog open={openDialog} maxWidth="md" onClose={CloseDialog}>
        <Box className={classes.dialog}>
          <Typography variant="h4">
            ขอบคุณสำหรับการทำแบบสอบถาม
          </Typography>
          <DialogActions>
            <ButtonProps
              variant="contained"
              color="primary"
              marginbtn="10px 0"
              titlebutton="ปิด"
              maxwidthbtn="100%"
              onClick={CloseDialog}
            />
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ModalQuestionnaire;
