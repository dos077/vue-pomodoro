import Vue from 'vue';
import App from './App.vue';
import store from './store';

new Vue({
  store,
  render: h => h(App),
  created() {
    if (sessionStorage.redirect) {
      const { redirect } = sessionStorage;
      delete sessionStorage.redirect;
      this.$router.push(redirect);
    }
  }
}).$mount('#app');
