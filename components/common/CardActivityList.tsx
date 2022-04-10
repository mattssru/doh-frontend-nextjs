import { Box, Typography, makeStyles } from "@material-ui/core";
// import { makeStyles } from '@material-ui/styles';
import prefix from "utils/path";
import { ControlButton, ModalCommon, TextFieldFixd } from ".";
import SelectFixd from "./SelectFixdValidate";
import { ButtonProps } from "./button";
import { useForm } from "hooks/useForm";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { CommunitiesAction } from "stores/communities/communities.action";
import { IStates } from "stores/root.reducer";
import router from "next/router";

const initialValues = {
  commu_code: "",
  activity_id: "",
  title: "",
  display_type: "",
  dayStart: "",
  monthStart: "",
  yearStart: "",
  dayEnd: "",
  monthEnd: "",
  yearEnd: "",
};

const listDisplay = [
  { id: 1, name: "กิโลเมตร" },
  { id: 2, name: "ระยะเวลา" },
  { id: 3, name: "แคลอรี่" },
];

const listMonthTh = [
  { id: 1, name: "มกราคม" },
  { id: 2, name: "กุมภาพันธ์" },
  { id: 3, name: "มีนาคม" },
  { id: 4, name: "เมษายน" },
  { id: 5, name: "พฤษภาคม" },
  { id: 6, name: "มิถุนายน" },
  { id: 7, name: "กรกฎาคม" },
  { id: 8, name: "สิงหาคม" },
  { id: 9, name: "กันยายน" },
  { id: 10, name: "ตุลาคม" },
  { id: 11, name: "พฤศจิกายน" },
  { id: 12, name: "ธันวาคม" },
];

const useStyles = makeStyles(() => ({
  root: {},
  header: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #dbdbdb",
    paddingBottom: 12,
    "& img": {
      marginLeft: "auto",
      marginRight: 0,
      cursor: "pointer",
    },
    "& p": {
      color: "#000",
      fontSize: 30,
      lineHeight: "36px",
      // fontFamily: "DBHeavent_MedCond",
    },
  },
  body: {
    display: "flex",
    alignItems: "center",
    marginTop: 12,
    cursor: "pointer",
    "& img": {
      width: 40,
      height: 40,
      marginRight: 12,
    },
    "& .date": {
      color: "#000",
      fontSize: 18,
      lineHeight: "22px",
      // fontFamily: "DB Heavent",
    },
    "& .title": {
      color: "#000",
      fontSize: 24,
      lineHeight: "29px",
      // fontFamily: "DB Heavent",
    },
  },
  dialog: {
    backgroundColor: "#fff",
    backgroundImage: "unset !important",
    padding: "16px !important",
    justifyContent: "unset !important",
  },
  fieldGroup: {
    display: "flex",
    "& .center": {
      margin: "0 4px",
    },
  },
  buttonGroup: {
    marginTop: 20,
  },
}));

const CardActivityList = (props: any) => {
  const classes = useStyles();
  const { data, disableButtonMore, commuCode } = props;
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { listActivity } = useSelector(
    (state: IStates) => state.communitiesReducer
  );

  const validate = (fieldValues = values) => {
    console.log("fieldValues", fieldValues);
    let temp = { ...errors };
    if ("title" in fieldValues) {
      temp.title = fieldValues.title ? "" : "กรอกชื่อกิจกรรม";
    }
    if ("dayStart" in fieldValues) {
      temp.dayStart = fieldValues.dayStart ? "" : "เลือกวันที่";
    }
    if ("monthStart" in fieldValues) {
      temp.monthStart = fieldValues.monthStart ? "" : "เลือกเดือน";
    }
    if ("yearStart" in fieldValues) {
      temp.yearStart = fieldValues.yearStart ? "" : "เลือกปี";
    }
    if ("dayEnd" in fieldValues) {
      temp.dayEnd = fieldValues.dayEnd ? "" : "เลือกวันที่";
    }
    if ("monthEnd" in fieldValues) {
      temp.monthEnd = fieldValues.monthEnd ? "" : "เลือกเดือน";
    }
    if ("yearEnd" in fieldValues) {
      temp.yearEnd = fieldValues.yearEnd ? "" : "เลือกปี";
    }
    if ("activity_id" in fieldValues) {
      temp.activity_id = fieldValues.activity_id ? "" : "เลือกประเภทกีฬา";
    }
    if ("display_type" in fieldValues) {
      temp.display_type = fieldValues.display_type ? "" : "เลือกการนับผล";
    }
    setErrors({
      ...errors,
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors } = useForm(
    initialValues,
    true,
    validate
  );

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    if (checkStartEndDate(values)) {
      return;
    }

    if (validate()) {
      // dispatch(activities.actions.saveNewsActivity(values));
      console.log("values", values);
      const inputValue = {
        commu_code: values.commu_code,
        activity_id: values.activity_id,
        title: values.title,
        display_type: values.display_type,
        start_date:
          values.yearStart + "-" + values.monthStart + "-" + values.dayStart,
        end_date: values.yearEnd + "-" + values.monthEnd + "-" + values.dayEnd,
      };
      dispatch(
        ActionSaga({
          type: CommunitiesAction.SAVE_NEWS_ACTIVITY_R,
          payload: inputValue,
        })
      );
      setModal(false);
    }
  };

  const checkStartEndDate = (values: any) => {
    let now = Date.now();
    let start = `${values.monthStart}-${values.dayStart}-${values.yearStart}`;
    let dateStart = new Date(start);
    let end = `${values.monthEnd}-${values.dayEnd}-${values.yearEnd}`;
    let dateEnd = new Date(end);

    let validate = false;

    if (Date.parse(start) && Date.parse(end)) {
      if (Date.parse(start) < now) {
        let errorStartDate = { ...errors };
        errorStartDate.dayStart = "วันที่เริ่มต้นต้องไม่น้อยกว่าวันที่ปัจจุบัน";
        errorStartDate.monthStart =
          "วันที่เริ่มต้นต้องไม่น้อยกว่าวันที่ปัจจุบัน";
        errorStartDate.yearStart =
          "วันที่เริ่มต้นต้องไม่น้อยกว่าวันที่ปัจจุบัน";
        setErrors({
          ...errors,
          ...errorStartDate,
        });

        validate = true;
      }

      if (dateEnd < dateStart) {
        let errorEndDate = { ...errors };
        errorEndDate.dayEnd = "วันที่สิ้นสุดต้องไม่น้อยกว่าวันที่เริ่มต้น";
        errorEndDate.monthEnd = "วันที่สิ้นสุดต้องไม่น้อยกว่าวันที่เริ่มต้น";
        errorEndDate.yearEnd = "วันที่สิ้นสุดต้องไม่น้อยกว่าวันที่เริ่มต้น";
        setErrors({
          ...errors,
          ...errorEndDate,
        });

        validate = true;
      }
    }

    return validate;
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleOpen = () => {
    setModal(true);
  };

  // const toActivity = () => {
  //     window.location.href = "/activity"
  // }

  const renderDisplayType = () => {
    if (listDisplay !== undefined && listDisplay.length > 0) {
      return listDisplay.map((item: any, key: any) => {
        return (
          <option key={key} value={item.id}>
            {item.name}
          </option>
        );
      });
    } else {
      return [];
    }
  };

  const renderTypesport = () => {
    if (listActivity !== undefined && listActivity.length > 0) {
      return listActivity.map((item: any, key: any) => {
        return (
          <option key={key} data-type={item.calculate_type} value={item.id}>
            {item.name}
          </option>
        );
      });
    } else {
      return [];
    }
  };

  const renderDay = () => {
    let i,
      opt = [];
    if (
      values.monthStart == "" ||
      values.monthStart == "1" ||
      values.monthStart == "3" ||
      values.monthStart == "5" ||
      values.monthStart == "7" ||
      values.monthStart == "8" ||
      values.monthStart == "9" ||
      values.monthStart == "10" ||
      values.monthStart == "12"
    ) {
      for (i = 0; i < 31; i++) {
        opt[i] = i + 1;
      }
    } else if (
      values.monthStart == "4" ||
      values.monthStart == "6" ||
      values.monthStart == "11"
    ) {
      for (i = 0; i < 30; i++) {
        opt[i] = i + 1;
      }
    } else if (values.monthStart == "2") {
      for (i = 0; i < 29; i++) {
        opt[i] = i + 1;
      }
    }
    return opt.map((v, k) => {
      return (
        <option key={k} value={v}>
          {v}
        </option>
      );
    });
  };

  const renderYear = () => {
    let d = new Date();
    let n = d.getFullYear();
    let num = [];
    for (let index = n - 10; index < n + 100; index++) {
      num.push({ id: index, name: index + 543 });
    }
    return num.map((v, k) => {
      return (
        <option key={k} value={v.id}>
          {v.name}
        </option>
      );
    });
  };

  const renderMonth = () => {
    return listMonthTh.map((v, k) => {
      return (
        <option key={k} value={v.id}>
          {v.name}
        </option>
      );
    });
  };

  const handleInputChangeSelect = (e: any) => {
    const { value } = e.target;

    setValues({
      ...values,
      [e.target.id]: value,
    });
  };

  useEffect(() => {
    dispatch(
      ActionSaga({
        type: CommunitiesAction.FETCH_LIST_ACTIVITIES_R,
      })
    );
    setValues({
      ...values,
      ["commu_code"]: commuCode,
    });
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography>จัดกิจกรรม</Typography>
        {disableButtonMore ? (
          <img src={`${prefix}/icons/ic_add.svg`} alt="" onClick={handleOpen} />
        ) : (
          ""
        )}
      </Box>
      <Box>
        {data?.map((el: any, i: number) => (
          <Box
            className={classes.body}
            key={i}
            onClick={() => {
              router.push(`/community/${commuCode}/${el.eventId}`);
            }}
          >
            <img src={`${prefix}/icons/ic_activity.svg`} alt="" />
            <Box>
              <Typography className="title">{el?.title}</Typography>
              <Typography className="date">{`วันเริ่ม ${el?.dateStart} - ${el?.dateEnd}`}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <ModalCommon
        open={modal}
        onClose={handleClose}
        minheight="627px"
        classNameDialog={classes.dialog}
        header="จัดกิจกรรม"
      >
        <Box>
          ชื่อกิจกรรม
          <TextFieldFixd
            // label="ชื่อกิจกรรม"
            placeholder="กรอก..."
            margin="0 0 10px 0"
            name={"title"}
            id={"title"}
            value={values.title || ""}
            error={errors.title}
            onChange={handleInputChangeSelect}
          />
          วันเริ่ม
          <Box className={classes.fieldGroup}>
            <SelectFixd
              // label="วันเริ่ม"
              margin="0 0 10px 0"
              name={"dayStart"}
              id={"dayStart"}
              value={values.dayStart}
              error={errors.dayStart}
              onChange={handleInputChangeSelect}
            >
              <option value="">เลือกวันที่</option>
              {renderDay()}
            </SelectFixd>
            <SelectFixd
              classNameField="center"
              margin="0 0 10px 0"
              name={"monthStart"}
              id={"monthStart"}
              value={values.monthStart || 0}
              error={errors.monthStart}
              onChange={handleInputChangeSelect}
            >
              <option value="">เลือกเดือน</option>
              {renderMonth()}
            </SelectFixd>
            <SelectFixd
              margin="0 0 10px 0"
              name={"yearStart"}
              id={"yearStart"}
              value={values.yearStart || 0}
              error={errors.yearStart}
              onChange={handleInputChangeSelect}
            >
              <option value="">เลือกปี</option>
              {renderYear()}
            </SelectFixd>
          </Box>
          วันสิ้นสุด
          <Box className={classes.fieldGroup}>
            <SelectFixd
              // label="วันสิ้นสุด"
              margin="0 0 10px 0"
              name={"dayEnd"}
              id={"dayEnd"}
              value={values.dayEnd || 0}
              error={errors.dayEnd}
              onChange={handleInputChangeSelect}
            >
              <option value="">เลือกวัน</option>
              {renderDay()}
            </SelectFixd>
            <SelectFixd
              classNameField="center"
              margin="0 0 10px 0"
              name={"monthEnd"}
              id={"monthEnd"}
              value={values.monthEnd || 0}
              error={errors.monthEnd}
              onChange={handleInputChangeSelect}
            >
              <option value="">เลือกเดือน</option>
              {renderMonth()}
            </SelectFixd>
            <SelectFixd
              margin="0 0 10px 0"
              name={"yearEnd"}
              id={"yearEnd"}
              value={values.yearEnd || 0}
              error={errors.yearEnd}
              onChange={handleInputChangeSelect}
            >
              <option value="">เลือกปี</option>
              {renderYear()}
            </SelectFixd>
          </Box>
          ประเภทกีฬา
          <SelectFixd
            // label="ประเภทกีฬา"
            margin="0 0 10px 0"
            name={"activity_id"}
            id={"activity_id"}
            value={values.activity_id}
            error={errors.activity_id}
            onChange={handleInputChangeSelect}
          >
            <option value="">เลือกประเภทกีฬา</option>
            {renderTypesport()}
          </SelectFixd>
          การนับผล
          <SelectFixd
            // label="การนับผล"
            margin="0 0 10px 0"
            name={"display_type"}
            id={"display_type"}
            value={values.display_type}
            error={errors.display_type}
            // titleDefault={"เลือกการนับผล"}
            // renderOptions={renderDisplayType()}
            onChange={handleInputChangeSelect}
          >
            <option value="">เลือกการนับผล</option>
            {renderDisplayType()}
          </SelectFixd>
          <Box className={classes.buttonGroup}>
            <ControlButton justifycontent="center">
              <ButtonProps
                titlebutton="ยกเลิก"
                background="linear-gradient(to bottom, #68D5E5, #674EEF)"
                borderradiusbtn="10px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                onClick={() => router.back()}
              />
              <ButtonProps
                titlebutton="บันทึก"
                background="linear-gradient(to top, #8CA51E, #D0FD08)"
                borderradiusbtn="10px"
                boxshadowbtn="0 3px 6px rgba(0,0,0,0.16)"
                heightbtn="46px"
                fontsizebtn="26px"
                onClick={handleSubmitForm}
              />
            </ControlButton>
          </Box>
        </Box>
      </ModalCommon>
    </Box>
  );
};

export default CardActivityList;
