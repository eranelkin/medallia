import React from "react";
import HomePage from "../HomePage/HomePage";
import Button from "@mui/material/Button";
import { useMails } from "../MailsContext";
import CircularProgress from "@mui/material/CircularProgress";

import "./employeesContainer.scss";

const MailsContainer = () => {
  const { filteredMails, isLoading } = useMails();

  return (
    <div className="">
      {isLoading && !filteredMails ? (
        <div className="loading">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <>
          <HomePage />
        </>
      )}
    </div>
  );
};

export default MailsContainer;
