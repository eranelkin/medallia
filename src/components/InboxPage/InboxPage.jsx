import React, { useState, useEffect, useCallback } from "react";
import { useMails } from "../MailsContext";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { translations } from "../../translations/translations";
import { StyledTypography } from "../StyledTypography/StyledTypography";
import { useNavigate } from "react-router-dom";
import MailItem from "../MailItem/MailItem";
import MessagePage from "../MessagePage/MessagePage";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./inboxPage.scss";

const { inbox: inboxTrans } = translations;

const InboxPage = () => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [search, setSearch] = useState("");
  const [showInput, setShowInput] = useState(false);
  const {
    filteredMails,
    isLoading,
    toggleShowMessage,
    showMessage,
    setReadMessageById,
    filterMailsBySubject,
    resetMails,
  } = useMails();
  const navigate = useNavigate();

  const handlerViewOnClick = (key) => (ev) => {
    if (key === "home") {
      resetMails();
      navigate("/");
    }
    if (key === "search") {
      setShowInput((show) => !show);
    }
  };

  const handlerMessageOnClick = useCallback(
    (id) => {
      setSelectedMessageId(id);
      setReadMessageById(id);
      toggleShowMessage();
    },
    [toggleShowMessage, setReadMessageById]
  );

  const handlerSearchOnChange = (ev) => {
    setSearch(ev.target.value);
    filterMailsBySubject(ev.target.value);
  };
  const filteredUnread =
    (filteredMails && filteredMails.filter((mail) => !mail.read)) || [];

  return (
    <div className="page">
      {isLoading && !filteredMails ? (
        <div className="loading">
          <CircularProgress disableShrink />
        </div>
      ) : !showMessage ? (
        <div className="container">
          <div className="inbox-actions">
            <div className="search">
              <SearchOutlinedIcon
                onClick={handlerViewOnClick("search")}
                fontSize="large"
                className="action"
              />
              {showInput && (
                <input
                  placeholder="Serach by Subject..."
                  type="text"
                  value={search}
                  onChange={handlerSearchOnChange}
                />
              )}
            </div>
            <div style={{ paddingLeft: 20, width: 225 }}>
              <span className="title">{`${inboxTrans.title}`} </span>
              <span>
                {`(${filteredUnread.length} / ${filteredMails.length})`}
              </span>
            </div>
            <HomeIcon
              onClick={handlerViewOnClick("home")}
              fontSize="large"
              className="action"
            />
          </div>
          {filteredMails && filteredMails.length > 0 && (
            <div className="inbox">
              {filteredMails.map((mail) => (
                <MailItem
                  key={mail.id}
                  mail={mail}
                  handlerMessageOnClick={handlerMessageOnClick}
                />
              ))}
            </div>
          )}
          {filteredMails && filteredMails.length === 0 && (
            <div className="empty-state">
              <Typography variant="body1" component="div" fontWeight="bolder">
                No mails to display
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <MessagePage selectedMessageId={selectedMessageId} />
        </div>
      )}
    </div>
  );
};

export default InboxPage;
