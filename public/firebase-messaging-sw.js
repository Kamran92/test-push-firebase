importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBZJtSLYvWibuAiTzzLpY5slyPgnlFQubs",
  authDomain: "push-37d3d.firebaseapp.com",
  projectId: "push-37d3d",
  storageBucket: "push-37d3d.appspot.com",
  messagingSenderId: "1084432615496",
  appId: "1:1084432615496:web:c851663189c3580f60b07d"
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log("push-уведомление пришло в server worker", payload);
  payload.data.data = JSON.parse(JSON.stringify(payload.data));
  return self.registration.showNotification(payload.data.title, payload.data);
})

self.addEventListener('notificationclick', function(event) {
  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(function(clientList) {
    // clientList always is empty?!
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === target && 'focus' in client) {
        return client.focus();
      }
    }

    return clients.openWindow(target);
  }));
});