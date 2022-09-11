import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import InboxPage from "./components/InboxPage/InboxPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { MailsProvider } from "./components/MailsContext";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MailsProvider>
            <HomePage />
          </MailsProvider>
        }
      />
      <Route
        path="/inbox"
        element={
          <MailsProvider>
            <InboxPage />
          </MailsProvider>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
