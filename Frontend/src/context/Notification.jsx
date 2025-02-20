import React, { useEffect, useState, useContext, createContext } from "react";
import { Authcontext } from "./Authuser";
import { SocketContext } from "./Socketcontext";

export const Notificationcontext = createContext();

export const Notificationprovider = (props) => {
  const [allNotification, setAllNotification] = useState([]);
  const { user, isAuthenticate } = useContext(Authcontext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket || !isAuthenticate || !user || !user._id) return; // ✅ Ensure socket exists

   // console.log("🔗 Registering user:", user._id);
    socket.emit("registerUser", user._id);

    const handleNewNotification = (newNotification) => {
      setAllNotification((prev) => {
        
        const isAlreadyPresent = prev.some(
          (notif) => notif._id === newNotification._id
        );
        return isAlreadyPresent ? prev : [newNotification, ...prev];
      });
    };

    socket.on("newNotification", handleNewNotification);
//console.log("allNotification",allNotification)
    return () => {
    //  console.log("🔄 Cleaning up notification listener");
      socket.off("newNotification", handleNewNotification);
    };
  }, [socket, isAuthenticate, user]); 

  return (
    <Notificationcontext.Provider value={{ allNotification, setAllNotification }}>
      {props.children}
    </Notificationcontext.Provider>
  );
};
