const app = Vue.createApp({
  data() {
    return {
      count: 0,
      users: [],
      age: "all",
      date: "",
      convertedDate: "",
      showNav: false,
      navItems: [
        { name: "Show Products" },
        { name: "About Us" },
        { name: "Live Better" },
        { name: "Claims and Support" },
        { name: "My Account" },
      ],
    };
  },
  computed: {
    formatDate() {
      return moment(this.date).format("DD/MM/YYYY");
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    countMe() {
      this.interval = setInterval(() => {
        console.log(this.count);
        this.count++;
        if (this.count % 3 === 0) {
          console.log("Foo");
          this.count++;
        }
        if (this.count % 5 === 0) {
          console.log("Bar");
          this.count++;
        }
      }, 1000);
    },
    convertDate() {
      this.convertedDate = moment(this.date).format("YYYY-MM-DD");
    },
    async fetchUsers() {
      await axios
        .get("http://www.mocky.io/v2/5d73bf3d3300003733081869")
        .then((response) => {
          if (this.age === "all") {
            this.users = [];
            response.data.forEach((user) => {
              this.users.push(user);
            });
          }

          if (this.age === "below20") {
            this.users = [];
            response.data.forEach((user) => {
              if (user.age <= 20) {
                this.users.push(user);
              }
            });
          }

          if (this.age === "21-39") {
            this.users = [];
            response.data.forEach((user) => {
              if (user.age > 20 && user.age < 40) {
                this.users.push(user);
              }
            });
          }

          if (this.age === "40above") {
            this.users = [];
            response.data.forEach((user) => {
              if (user.age >= 40) {
                this.users.push(user);
              }
            });
          }
        })
        .catch((error) => console.log(error));
    },
  },
});

app.mount("#app");
