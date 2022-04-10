import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { ItemHexagon } from "components/common";
import { ButtonProps } from "components/common/button";
import { IconCupmd, IconMedel } from "components/common/icon";
import ModalCommon from "components/common/ModalCommon";
import InnerLayout from "components/layouts/InnerLayout/InnerLayout";
import router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionSaga } from "services/action.saga";
import { AchievementActions } from "stores/achievements/achievements.action";
// import { IAward } from "stores/achievements/achievements.reducer";
import { IStates } from "stores/root.reducer";
import prefix from "utils/path";
import html2canvas from "html2canvas";

const useStyles = makeStyles((theme: any) => ({
  boxTop: {
    backgroundColor: "#449AE3",
    minHeight: 100,
    borderRadius: 5,
    position: "relative",
    backgroundImage: `url(${prefix}/images/bg_small.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top",
    backgroundSize: "auto",
    maxWidth: 700,
    margin: "0 auto 30px",
    display: "flex",
    alignItems: "center",
    padding: "0 15px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: 10,
    },
  },
  boxBottom: {
    backgroundColor: "#449AE3",
    padding: "20px 20px 40px 20px",
    backgroundImage: `url(${prefix}/images/bg_big.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right top 25px",
    backgroundSize: "auto",
    borderRadius: 5,
    maxWidth: 700,
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 15px 40px 15px",
    },
    "& h3": {
      fontSize: 30,
      lineHeight: "30px",
      color: "#fff",
      marginBottom: 15,
      textAlign: "center",
    },
  },
  textModal: {
    fontSize: 34,
    lineHeight: "32px",
    color: "#fff",
    textAlign: "center",
    margin: "15px 0",
  },
  controlHex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    "& div": {
      width: 125,
      height: 145,
      "& img": {
        width: "auto",
        maxWidth: "inherit",
      },
    },
    "& img:hover": {
      transition: "none",
      transform: "none",
    },
  },
  print: {
    lineHeight: 0,
    width: 1250,
    height: 880,
    top: "100vw",
    left: "100vw",
    position: "absolute",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    "& .boxRelative": {
      position: "relative",
    },
    "& .nameUser": {
      position: "absolute",
      fontFamily: "DBHeavent_BoldCond",
      fontSize: 60,
      lineHeight: "58px",
      fontStyle: "italic",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, 10%)",
    },
    "& .imgUser": {
      width: 190,
      height: 190,
      borderRadius: "100%",
      backgroundColor: "#888",
      border: "4px solid #fff",
      position: "absolute",
      top: "50%",
      left: "20%",
      transform: "translate(-65%, -65%)",
      boxShadow: "0 10px 12px rgba(0,0,0,0.20)",
      "& img": {
        borderRadius: "100%",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
}));

const achievements = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { profile } = useSelector((state: IStates) => state.profileReducer);
  const { awardList } = useSelector(
    (state: IStates) => state.achievementReducer
  );
  // const [selectedItem, setSelected] = useState<IAward | null>(null);
  const [showItem, setShowItem] = useState({
    img: "",
    detail: "",
  });

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      dispatch(
        ActionSaga({
          type: AchievementActions.FETCH_AWARD_R,
          payload: null,
        })
      );
    }
  }, [profile]);

  const handleClickModal = (image: any, detail: string) => {
    // setSelected(item);
    setShowItem({ img: image, detail: detail });
    setOpen(true);
  };
  const handleClose = () => {
    setShowItem({
      img: "",
      detail: "",
    });
    // setSelected(null);
    setOpen(false);
  };
  const saveCanvas = async () => {
    const element = document.getElementById("capture");
    var newCanvas = document.createElement("canvas");
    if (element?.clientWidth && element?.clientHeight) {
      newCanvas.width = element?.clientWidth;
      newCanvas.height = element?.clientHeight;
    }
    var option = {
      allowTaint: true,
      useCORS: true,
    };
    if (element !== null) {
      html2canvas(element, option).then((canvas) => {
        var image = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = image;
        a.download = "Certificate.png";
        a.click();
      });
    }
  };

  return (
    <InnerLayout titlepage="รางวัลและความสำเร็จ">
      <Box className={classes.boxTop}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ButtonProps
              titlebutton="e-Certificate"
              widthbtn="100%"
              background="linear-gradient(to top, #674EEF, #68D5E5)"
              startIcon={<IconMedel />}
              onClick={saveCanvas}
            />
          </Grid>
          <Grid item xs={6}>
            <ButtonProps
              titlebutton="แลกของรางวัล"
              widthbtn="100%"
              backgroundcolorbtn="#E96189"
              startIcon={<IconCupmd />}
              onClick={() => router.push("/health-point/redemption")}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.boxBottom}>
        <Typography variant="h3">ความสำเร็จ</Typography>
        <Box className="hexagon-gallery">
          {awardList.map((item: any, index: number) => {
            const BImg = `${prefix}/badge/bd${item.type}-${item.icon + 1}.png`;
            return (
              <ItemHexagon
                key={index}
                image={BImg}
                onClick={() => handleClickModal(BImg, item.detail)}
              />
            );
          })}
          {/* {listHexagon.map((item: any, index: number) => {
            return (
              <ItemHexagon
                key={index}
                image={item.image}
                onClick={() => handleClickModal(item.image)}
              />
            );
          })} */}
        </Box>
        {/* <Grid container spacing={2}>
          {awardList.map((item: IAward, index: number) => {
            return (
              <Grid item sm={2} xs={4} key={index}>
                <ItemAward
                  backgroundimage={`url(${item.thumbnail})`}
                  onClick={() => handleClickModal(item)}
                  background={item.status_pass ? "linear-gradient(to top, #8CA51E,  #D0FD08) !important" : ''}
                />
              </Grid>
            );
          })}
        </Grid> */}
      </Box>
      <ModalCommon open={open} onClose={handleClose} minheight="369px">
        <Box className={classes.controlHex}>
          <ItemHexagon image={`${prefix}${showItem.img}`} />
        </Box>
        {/* <ItemAward
          backgroundimage={`url(${selectedItem?.thumbnail})`}
          background="linear-gradient(to top, #8CA51E,  #D0FD08) !important"
          width="132px"
          height="132px"
        /> */}
        <Typography variant="h4" className={classes.textModal}>
          {showItem.detail}
          {/* {selectedItem?.detail} */}
          {/* {showItem.img} */}
        </Typography>
        <ButtonProps
          titlebutton="ปิด"
          maxwidthbtn="167px"
          widthbtn="100%"
          marginbtn="0 auto"
          heightbtn="40px"
          background="linear-gradient(to top, #8CA51E,  #D0FD08)"
          onClick={handleClose}
        />
      </ModalCommon>
      <Box className={classes.print} id="capture">
        <Box className="boxRelative">
          <img src={`${prefix}/images/certificate.png`} alt="" />
          <Box className="imgUser">
            <img src={`${prefix}/images/user_certificate.jpeg`} alt="" />
          </Box>
          <Box className="nameUser">นายก้าวท้าใจ ใจท้าก้าว</Box>
        </Box>
      </Box>
    </InnerLayout>
  );
};

export default achievements;
