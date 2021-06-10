<template>
  <div class="home">
    <template>
      <div class="item">
        <label for="title">Название уведомления:</label>
        <input id="title" type="text" v-model="title" />
      </div>
      <div class="item">
        <label for="body">Текст уведомления:</label>
        <input id="body" type="text" v-model="body" />
      </div>
      <div class="item">
        <label for="icon">Иконка уведомления:</label>
        <input id="icon" type="text" v-model="icon" />
      </div>
      <div class="item">
        <label for="image">Изображение уведомления:</label>
        <input id="image" type="text" v-model="image" />
      </div>
      <div class="item">
        <label for="click">Ссылка на переход:</label>
        <input id="click" type="text" v-model="click_action" />
      </div>
      <div class="item">
        <label for="time">Послать push через(в сек):</label>
        <input id="time" type="text" v-model="sec" />
      </div>
      <div class="item">
        <label for="id">Послать push по id:</label>
        <input id="id" type="text" v-model="idPush" />
      </div>
      <button @click="timer">Послать push</button>
      <select v-model="select">
        <option>data</option>
        <!--        <option>notification</option>-->
      </select>
    </template>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      title: "Победа над push",
      body: "Ура!!!",
      icon:
        "https://image1.thematicnews.com/uploads/topics/preview/00/07/57/11/69ec444946_256crop.jpg",
      image:
        "https://upload.wikimedia.org/wikipedia/ru/e/eb/%D0%97%D0%BD%D0%B0%D0%BC%D1%8F_%D0%9F%D0%BE%D0%B1%D0%B5%D0%B4%D1%8B_%D0%BD%D0%B0%D0%B4_%D1%80%D0%B5%D0%B9%D1%85%D1%81%D1%82%D0%B0%D0%B3%D0%BE%D0%BC.jpg",
      click_action:
        "https://novostipmr.com/sites/default/files/field/image/201804/den_pobedy_reihstag.jpg",
      sec: 3,
      select: "data",
      idPush: null,
    };
  },
  methods: {
    async sendPush() {
      const key =
        "AAAA_H04iEg:APA91bGteE9xcM6n_qIN_joY99Kj7YWq5276XNpb9d02sa6VMTvQjAEYsBM9sqQoiBiO2eDjXU_ABA1dZ44C-nu3PpBhnZYsNU6tdsP0uoflc--U-k8vkU8-RtpFDhYAvLNliRjKVMah";
      const to = this.idPush ? this.idPush : localStorage.getItem('token');
      const data = {
        title: this.title,
        body: this.body,
        icon: this.icon,
        image: this.image,
        click_action: this.click_action,
      };

      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization: "key=" + key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [this.select]: data,
          to: to,
        }),
      })
        .then(function(response) {
          if (response.ok) {
            console.log("сообщение отправили в браузер");
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    timer() {
      setTimeout(this.sendPush, +(this.sec + "000"));
    },
  },
};
</script>
<style>
.item {
  width: 500px;
  display: flex;
  justify-content: space-between;
}
</style>
