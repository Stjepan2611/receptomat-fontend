<template>
  <div class="container">
    <h2>
      <b>{{ naslov }}</b>
    </h2>
    <br />
    <h4>
      <p>{{ sastojci }}</p>
    </h4>
    <div class="container"></div>
    <br />
    <br />
    <div class="text-center">
      <h4>Ostavi lajkić/dislajkić i svoje mišljenje</h4>
      <vue-like-dislike-buttons
        :likes="likes"
        :dislikes="dislikes"
        :likeChecked="likeChecked"
        :dislikeChecked="dislikeChecked"
        @like="like"
        @dislike="dislike"
      />
    </div>

    <br />
    <div class="text-center">
      <textarea
        id="w3review"
        name="w3review"
        rows="4"
        cols="50"
        v-model="koment"
      ></textarea>
      <br />
      <button class="btn btn-info" v-on:click="postKomentar()">submit</button>
      <!--da vidimo -->
      <br />
      <br />
      <div
        class="card text-white bg-dark mb-3"
        style="max-width: 20rem text-align: center"
        v-for="k in comentars"
        v-bind:key="k.koment"
      >
        <div class="card-body">
          <p class="card-text">
            {{ k.koment }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueLikeDislikeButtons from "vue-like-dislike-buttons";
import UserDataService from "../service/UserDataService";

export default {
  name: "App",
  components: {
    VueLikeDislikeButtons,
  },
  data() {
    return {
      likes: 0,
      dislikes: 0,
      likeChecked: false,
      dislikeChecked: false,
      naslov: "",
      vrsta: "",
      kuhar: "",
      sastojci: "",
      errors: [],
      koment: "",
      komentars: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    comentars() {
      return this.komentars;
    },
  },
  methods: {
    like() {
      if (this.likeChecked) {
        this.likes -= 1;
        this.likeChecked = false;
      } else {
        this.likes += 1;
        this.likeChecked = true;
      }
      UserDataService.createLikeDislike(this.id, {
        like: this.likes,
        dislike: this.dislikes,
      });
    },
    dislike() {
      if (this.dislikeChecked) {
        this.dislikes -= 1;
        this.dislikeChecked = false;
      } else {
        this.dislikes += 1;
        this.dislikeChecked = true;
      }
      UserDataService.createLikeDislike(this.id, {
        like: this.likes,
        dislike: this.dislikes,
      });
    },
    postKomentar() {
      if (this.koment !== "") {
        UserDataService.createKoment(this.id, { koment: this.koment });
        this.komentars.push({ koment: this.koment });
        this.koment = "";
      }
    },
    refreshUserDetails() {
      UserDataService.retrieveUser(this.id).then((res) => {
        this.naslov = res.data.naslov;
        this.vrsta = res.data.vrsta;
        this.kuhar = res.data.kuhar;
        this.sastojci = res.data.sastojci;
        this.likes = Number(res.data.like);
        this.dislikes = Number(res.data.dislike);
      });
      UserDataService.retrieveKoments(this.id).then((res) => {
        this.komentars = res.data;
      });
    },
  },
  created() {
    this.refreshUserDetails();
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.text-center {
  text-align: center;
}
</style>