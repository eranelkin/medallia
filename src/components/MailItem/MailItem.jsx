import React, { useState } from "react";
import { translations } from "../../translations/translations";
import { StyledTypography } from "../StyledTypography/StyledTypography";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { useMails } from "../MailsContext";
import DraftsIcon from "@mui/icons-material/Drafts";
import MarkunreadIcon from "@mui/icons-material/Markunread";

import "./mailItem.scss";

const { mailItem: mailTrans } = translations;

const MailItem = ({ mail, handlerMessageOnClick }) => {
  const handlerCardOnClick = (id) => (ev) => {
    handlerMessageOnClick(id);
  };

  const tooltipFrom = (
    <div>
      <span>{mailTrans.from}</span>
      <span>{`${mail.full_name} (${mail.email})`}</span>
    </div>
  );
  const tooltipSubject = (
    <div>
      <span>{mailTrans.subject}</span>
      <span>{mail.subject}</span>
    </div>
  );

  return (
    <Card className="mail">
      <CardActionArea onClick={handlerCardOnClick(mail.id)}>
        <CardContent>
          <Tooltip title={tooltipFrom} placement="bottom-start">
            <div style={{ display: "flex" }}>
              <StyledTypography className="from-label" isRead={mail.read}>
                {mailTrans.from}
              </StyledTypography>
              <StyledTypography isRead={mail.read}>
                {`${mail.full_name} (${mail.email})`}
              </StyledTypography>
              <div style={{ marginLeft: "auto" }}>
                {mail.read ? (
                  <DraftsIcon style={{ color: "green" }} />
                ) : (
                  <MarkunreadIcon style={{ color: "red" }} />
                )}
              </div>
            </div>
          </Tooltip>
          <Tooltip title={tooltipSubject} placement="bottom-start">
            <div style={{ display: "flex" }}>
              <StyledTypography isRead={mail.read} className="from-label">
                {mailTrans.subject}
              </StyledTypography>
              <StyledTypography isRead={mail.read} className="subject">
                {mail.subject}
              </StyledTypography>
            </div>
          </Tooltip>
          <StyledTypography isRead={mail.read} className="subject content">
            {mail.content}
          </StyledTypography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MailItem;
