<template>
  <div>
    <h3>UNOS STAVKE POPISA</h3>
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
          <label>STAVKA</label>
          <input type="text" class="form-control" v-model="stavka" />
        </fieldset>
        <button class="btn btn-success" type="submit">Spremi</button>
      </form>
    </div>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";
export default {
  name: "Popis",
  data() {
    return {
      stavka: "",
      errors: [],
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    refreshPopisDetails() {
      UserDataService.retrievePopis(this.id).then((res) => {
        this.stavka = res.data.stavka;
      });
    },
    validateAndSubmit(e) {
      e.preventDefault();
      this.errors = [];
      if (!this.stavka) {
        this.errors.push("Enter valid values");
      } else if (this.stavka.length < 3) {
        this.errors.push("Unesit 3 znakova ili više");
      }
      if (this.errors.length === 0) {
        if (this.id == -1) {
          UserDataService.createPopis({
            stavka: this.stavka,
          }).then(() => {
            this.$router.push("/CijeliPopis");
          });
        } else {
          UserDataService.updatePopis(this.id, {
            stavka: this.stavka,
          }).then(() => {
            this.$router.push("/CijeliPopis");
          });
        }
      }
    },
  },
  created() {
    this.refreshPopisDetails();
  },
};
</script>

<style>
.text-center {
  text-align: center;
}
</style>



