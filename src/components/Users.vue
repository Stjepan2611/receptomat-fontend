<template>
  <div class="container">
    <h3>Svi recepti</h3>
    <div v-if="message" class="alert alert-success">{{ this.message }}</div>
    <div class="container">
      <!-- search bar pocetak-->
      <div class="search-wrapper panel-heading col-sm-12">
        <input
          type="text"
          v-model="search"
          placeholder="Pretražite recepte ;-)"
        />
      </div>
      <!-- search bar kraj-->
      <br />
      <br />
      <table class="table">
        <thead>
          <tr>
            <th>NASLOV</th>
            <th>VRSTA HRANE</th>
            <th>KUHAR/ICA</th>
            <th>UPDATE</th>
            <th>DELETE</th>
            <th>DETALJI</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filterdUsers" v-bind:key="user.id">
            <td>
              <b>{{ user.naslov }}</b>
            </td>
            <td>
              <b>{{ user.vrsta }}</b>
            </td>
            <td>
              <b>{{ user.kuhar }}</b>
            </td>
            <td>
              <button class="btn btn-warning" v-on:click="updateUser(user.id)">
                Update
              </button>
            </td>
            <td>
              <button class="btn btn-danger" v-on:click="deleteUser(user.id)">
                Delete
              </button>
            </td>
            <td>
              <button class="btn btn-info" v-on:click="detailsRecept(user.id)">
                Detalji
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        |
        <button class="btn btn-success" v-on:click="addUser()">Add</button>
        |
        <button class="btn btn-warning" v-on:click="goToShopping()">
          Šoping lista
        </button>
        |
      </div>
    </div>
  </div>
</template>
<script>
import UserDataService from "../service/UserDataService";
export default {
  name: "Users",
  data() {
    return {
      users: [],
      message: "",
      search: "",
    };
  },

  // search bar
  computed: {
    filterdUsers() {
      const filter = this.users.filter((u) => {
        return u.naslov.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      });
      if (filter.length > 0) {
        return filter;
      }
      return this.users.filter((u) => {
        return u.kuhar.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
      });
    },
  },

  methods: {
    refreshUsers() {
      UserDataService.retrieveAllUsers().then((res) => {
        this.users = res.data;
      });
    },
    addUser() {
      this.$router.push(`/user/-1`);
    },
    updateUser(id) {
      this.$router.push(`/user/${id}`);
    },
    deleteUser(id) {
      UserDataService.deleteUser(id).then(() => {
        this.refreshUsers();
      });
    },
    detailsRecept(id) {
      this.$router.push(`/rejting/${id}`);
    },
    goToShopping() {
      this.$router.push(`/CijeliPopis`);
    },
  },
  created() {
    this.refreshUsers();
  },
};
</script>

