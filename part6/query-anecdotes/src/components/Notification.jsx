import {
  useNotificationValue,
  useNotificationDispatch,
} from "../NotificationContext";
import { useEffect } from "react";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
