import { createContext, useContext, useState, useEffect } from "react";

const MailsContext = createContext();

export const MailsProvider = ({ children }) => {
  const [mails, setMails] = useState(null);
  const [filteredMails, setFilteredMails] = useState(null);
  const [unread, setUnread] = useState(null);
  const [read, setRead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const enrichMails = (mails) => {
    return mails.map((mail) => {
      return {
        ...mail,
        avatarSrc: `https://avatars.dicebear.com/api/avataaars/${mail.id}.svg`,
      };
    });
  };

  const setReadMessageById = (id) => {
    const mail = mails.find((mail) => mail.id === id);
    mail.read = true;

    const updatedMails = [mail, ...mails.filter((mail) => mail.id !== id)];
    setMails(updatedMails);
    setFilteredMails(updatedMails);
  };

  const filterMailsBySubject = (search) => {
    const filtered = mails.filter((mail) => mail.subject.includes(search));
    setFilteredMails(filtered);
  };

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const data = await fetch(
          "https://run.mocky.io/v3/8856838a-1ba9-424f-9768-6ee4209aed67"
        );
        const response = await data.json();
        const enrichedMails = enrichMails(response);

        setMails(enrichedMails);
        setFilteredMails(enrichedMails);
        setIsLoading(false);
      } catch (err) {
        console.log("#ERR: ", err.message);
        setIsLoading(false);
      }
    };

    fetchMail();
  }, []);

  useEffect(() => {
    if (mails) {
      const unreadMails = mails.filter((mail) => !mail.read);
      const readMails = mails.filter((mail) => mail.read);

      setUnread(unreadMails);
      setRead(readMails);
    }
  }, [mails]);

  const toggleShowMessage = () => {
    setShowMessage((show) => !show);
  };

  return (
    <MailsContext.Provider
      value={{
        filteredMails,
        unread,
        read,
        isLoading,
        toggleShowMessage,
        showMessage,
        setReadMessageById,
        filterMailsBySubject,
      }}
    >
      {children}
    </MailsContext.Provider>
  );
};

export const useMails = () => {
  return useContext(MailsContext);
};
