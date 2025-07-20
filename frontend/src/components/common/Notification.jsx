"use client"

import { Toast, ToastContainer } from "react-bootstrap"
import { useNotification } from "../../context/NotificationContext"

const Notification = () => {
  const { notifications, removeNotification } = useNotification()

  const getVariant = (type) => {
    switch (type) {
      case "success":
        return "success"
      case "error":
        return "danger"
      case "warning":
        return "warning"
      default:
        return "info"
    }
  }

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          onClose={() => removeNotification(notification.id)}
          show={true}
          delay={5000}
          autohide
          bg={getVariant(notification.type)}
        >
          <Toast.Header>
            <strong className="me-auto">DocSpot</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{notification.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  )
}

export default Notification
