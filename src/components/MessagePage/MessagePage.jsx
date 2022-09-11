import React, { memo } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useMails } from "../MailsContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

import { translations } from "../../translations/translations";

import "./messagePage.scss";
const { message: messageTrans } = translations;

const MessagePage = ({ selectedMessageId }) => {
  console.log("XXX: ", selectedMessageId);
  const { filteredMails, toggleShowMessage, resetMails } = useMails();
  const navigate = useNavigate();
  const selectedMail = filteredMails.find(
    (mail) => mail.id === selectedMessageId
  );

  const handlerViewOnClick = (key) => (ev) => {
    if (key === "home") {
      resetMails();
      navigate("/");
    }
    toggleShowMessage();
  };

  return (
    <div>
      <div className="message-actions">
        <ArrowBackIcon
          onClick={handlerViewOnClick("back")}
          fontSize="large"
          className="action"
        />
        <HomeIcon
          onClick={handlerViewOnClick("home")}
          fontSize="large"
          className="action"
        />
      </div>
      <Card className="message">
        <CardContent className="card-content">
          <div>
            <div style={{ display: "flex" }}>
              <Typography
                className="message-label"
                variant="body1"
                component="div"
                fontWeight="bolder"
              >
                {messageTrans.from}
              </Typography>
              <Typography className="" variant="body1" component="div">
                {selectedMail.full_name}
              </Typography>
            </div>
            <div>
              <Typography variant="body1" component="div" fontWeight="bolder">
                {messageTrans.subject}
              </Typography>
              <Typography variant="body1" component="div">
                {selectedMail.subject}
              </Typography>
            </div>
          </div>
          <div className="message-content">
            <Typography variant="body2" component="div">
              {selectedMail.content}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(MessagePage);
