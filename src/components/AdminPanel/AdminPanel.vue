<script>

export default {
  name: "AdminPanel",
  data () {
    return {
      optionItem: '',
      addDelChange: true,
      instituteList: [],
      directionList: [],
      profileList: [],
      selectInst: '',
      selectDirection: '',
      selectProfile: '',
      sectorList: []
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('signOut')
      this.$router.push('/')
    }
  },
  mounted() {}
}
</script>
<template>
<div class="admin-panel">
  <div class="admin-panel__header">
    <span> Панель управления</span>
  </div>
  <div class="wrapper-panel">
    <div class="wrapper-panel__header">
     <router-link to="/" style="padding: 0">
        <button class="btn btn-enter"> На главную</button>
      </router-link>
      <div class="nav-row">
        <b-link v-if="$store.state.role !=='super.admin'" to="/admin/addSector" title="First" active >
          Добавление сектора
        </b-link>
        <!-- <b-link  to="/admin/addProfile" title="second" active>
          Добавление института
        </b-link> -->
        <!-- <b-link  to="/admin/updProfile" title="second" active>
          Изменить
        </b-link> -->
        <b-link to="/admin/del" title="second" active>
          Направления и профили
        </b-link>
        <b-link to="/admin/users" title="second" active>
          Администраторы
        </b-link>
      </div>
      <div>
        <button class="btn btn-enter" @click="logout()"> Выйти</button>
      </div>
    </div>
    <router-view/>
  </div>
</div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped lang="scss">
a{
  text-decoration: none;
  color: black;
  padding: 10px;
  border: 1px solid #f7f7f7;
  border-radius: 3px;
}
a.router-link-active {
  color: #5692de;
}
.nav-row{
  margin-bottom: 10px;
  text-align: center;
}
.wrapper-panel {
  margin: 50px auto 0;
  max-width: 66.666%;
  text-align: left;
  &__header {
    display: flex;
    justify-content: space-between;
  }
}

.admin-panel__header {
  font-weight: 700;
  font-size: 64px;
  line-height: 77px;
  color: #000000;
}
</style>
