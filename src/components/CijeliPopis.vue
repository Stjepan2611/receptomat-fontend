<template>
  <div class="container">
    <h3>POPIS ZA KUPNJU</h3>
    <div v-if="message" class="alert alert-success">{{ this.message }}</div>
    <div class="container">
      <div class="search-wrapper panel-heading col-sm-12">
        <input
          type="text"
          v-model="search"
          placeholder="Pretažite po naslovu"
        />
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>STAVKA</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="popis in filterdPopis" v-bind:key="popis.id">
            <td>
              <b>{{ popis.stavka }}</b>
            </td>
            <td>
              <button
                class="btn btn-warning"
                v-on:click="updatePopis(popis.id)"
              >
                Update
              </button>
            </td>
            <td>
              <button class="btn btn-danger" v-on:click="deletePopis(popis.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row mx-3">
        |
        <button class="btn btn-success" v-on:click="addPopis()">Dodaj</button>
        |
        <button class="btn btn-info" v-on:click="goBack()">Natrag</button>
        |
      </div>
    </div>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";
export default {
  name: "CijeliPopis",
  data() {
    return {
      popisi: [],
      message: "",
      search: "",
    };
  },

  // search bar
  computed: {
    filterdPopis() {
      return this.popisi.filter((p) => {
        return p.stavka.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      });
    },
  },
  methods: {
    refreshPopis() {
      UserDataService.retrieveAllPopis().then((res) => {
        this.popisi = res.data;
      });
    },
    addPopis() {
      this.$router.push(`/popis/-1`);
    },
    updatePopis(id) {
      this.$router.push(`/popis/${id}`);
    },
    deletePopis(id) {
      UserDataService.deletePopis(id).then(() => {
        this.refreshPopis();
      });
    },
    goBack() {
      this.$router.push(`/users`);
    },
  },
  created() {
    this.refreshPopis();
  },
};
</script>