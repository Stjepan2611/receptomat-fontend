<template>
  <div>
    <h3>UNOS VAŠEG RECEPTA</h3>
    <div class="container">
      <form @submit="validateAndSubmit">
        <div v-if="errors.length">
          <div
            class="alert alert-danger"
            v-bind:key="index"
            v-for="(error, index) in errors"
          >
            {{ error }}
          </div>
        </div>
        <fieldset class="form-group">
          <label>NASLOV</label>
          <input type="text" class="form-control" v-model="naslov" />
        </fieldset>
        <fieldset class="form-group">
          <label>VRSTA HRANE</label>
          <input type="text" class="form-control" v-model="vrsta" />
        </fieldset>
        <fieldset class="form-group">
          <label>KUHAR/ICA</label>
          <input type="text" class="form-control" v-model="kuhar" />
        </fieldset>
        <button class="btn btn-success" type="submit">Spremi</button>
      </form>
    </div>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";
export default {
  name: "User",
  data() {
    return {
      naslov: "",
      vrsta: "",
      kuhar: "",
      errors: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    refreshUserDetails() {
      UserDataService.retrieveUser(this.id).then((res) => {
        this.naslov = res.data.naslov;
        this.vrsta = res.data.vrsta;
        this.kuhar = res.data.kuhar;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.naslov) {
        this.errors.push("Enter valid values");
      } else if (this.naslov.length < 5) {
        this.errors.push("Unesit 5 znakova ili više u polje ime!");
      }
      if (!this.vrsta) {
        this.errors.push("Enter valid values");
      } else if (this.vrsta.length < 5) {
        this.errors.push("Unesit 5 znakova ili više u polje prezime!");
      }
      if (this.errors.length === 0) {
        if (this.id == -1) {
          UserDataService.createUser({
            naslov: this.naslov,
            vrsta: this.vrsta,
            kuhar: this.kuhar,
          }).then(() => {
            this.$router.push("/users");
          });
        } else {
          UserDataService.updateUser(this.id, {
            id: this.id,
            naslov: this.naslov,
            vrsta: this.vrsta,
            kuhar: this.kuhar,
          }).then(() => {
            this.$router.push("/users");
          });
        }
      }
    },
  },
  created() {
    this.refreshUserDetails();
  },
};
</script>