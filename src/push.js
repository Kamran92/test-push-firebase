import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBZJtSLYvWibuAiTzzLpY5slyPgnlFQubs",
  authDomain: "push-37d3d.firebaseapp.com",
  projectId: "push-37d3d",
  storageBucket: "push-37d3d.appspot.com",
  messagingSenderId: "1084432615496",
  appId: "1:1084432615496:web:c851663189c3580f60b07d",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onMessage(function(payload) {
  console.log("push-уведомление пришло в onMessage", payload);
  payload.data.data = JSON.parse(JSON.stringify(payload.data));
  const notification = new Notification(payload.data.title, payload.data);
  notification.onclick = function(event) {
    const target = event.target.data.click_action || "/";
    notification.close();
    window.open(target, "_blank");
  };
});

export function initializationPush() {
  if ("Notification" in window && !localStorage.getItem("token")) {
    messaging
      .requestPermission()
      .then(() => {
        console.log("Разрешено получение push-уведомленний");
        return messaging.getToken();
      })
      .then((token) => {
        localStorage.setItem("token", String(token));
      })
      .catch((error) => {
        if (error.code === "messaging/permission-blocked") {
          console.log("push-уведомления не разрешены");
        } else {
          console.log(
            "Не отменил и не подвердил push-уведомления(нажал крестик)",
            error
          );
        }
      });
  } else {
    if (Notification.permission !== "granted") {
      localStorage.removeItem("token");
    }
  }
}
export function deleteFirebaseToken() {
  messaging
    .deleteToken(localStorage.getItem("token"))
    .then(() => {
      console.log("Токен удален");
      localStorage.removeItem("token");
    })
    .catch((err) => {
      console.error("Ошибка токен не удален:", err);
    });
}
