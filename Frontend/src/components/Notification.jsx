import React, { useContext, useEffect } from "react";
import { Notificationcontext } from "../context/Notification";
import { Authcontext } from "../context/Authuser";
import axios from "axios";
function Notification() {
  const { allNotification,setAllNotification } = useContext(Notificationcontext);
const{user}=useContext(Authcontext);
 
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/notify/getallnotificationsofloginuser",
        { withCredentials: true }
      );
      if (response.data.notifications) {
        setAllNotification(response.data.notifications || []);
      }
    } catch (error) {
      //console.log("Error fetching notifications:", error);
    }
  };
  fetchNotifications();
}, [user]);


  // const notifications = allNotification.filter((notif) => notif.receiver === user._id);

  if (!user || !user._id) return <p>Loading...</p>;

  return (
   <div className="bg-cover" style={{ backgroundImage: `url("/public/2.jpg")` }}>

  
    <div className=" max-w-md mx-auto p-5 bg-blue-400 shadow-lg rounded-lg h-screen m-1">
     <h2 className="text-lg font-semibold text-gray-900 mb-3">Notifications</h2>
    {allNotification.length === 0 ? (
      <p className="text-gray-500 text-center">No new notifications</p>
    ) : (
      <div
        className="h-[80vh] overflow-y-auto p-2 pr-4 scrollbar-custom"
      >
        {allNotification.map((notif, index) => (
          <div key={index} className="border-b last:border-none py-2 px-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-800">{notif.message}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  </div>
 

  );
}

export default Notification;

