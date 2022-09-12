import React from "react";
import { useMails } from "../MailsContext";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { translations } from "../../translations/translations";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

import "./homePage.scss";

const { homepage: homepageTrans } = translations;
const username = "User";

const HomePage = () => {
  const { filteredMails, isLoading, unread } = useMails();
  const navigate = useNavigate();

  const handlerViewOnClick = () => {
    navigate("/inbox");
  };

  return (
    <div className="page">
      {isLoading && !filteredMails ? (
        <CircularProgress disableShrink />
      ) : (
        <>
          <Typography variant="h3" component="div" style={{ marginBottom: 40 }}>
            {homepageTrans.title.replace("$1", username)}
          </Typography>
          <Typography variant="h5" component="div" style={{ margin: 40 }}>
            {filteredMails &&
              unread &&
              homepageTrans.unread
                .replace("$1", unread.length > 0 ? unread.length : "")
                .replace(
                  "$2",
                  filteredMails.length > 0 ? filteredMails.length : ""
                )}
          </Typography>
          <Button
            variant="contained"
            onClick={handlerViewOnClick}
            style={{ marginRight: 20, height: 70, width: 200 }}
          >
            {homepageTrans.view}
          </Button>
        </>
      )}
    </div>
  );
};

export default HomePage;
