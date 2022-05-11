<template>
<div class="admin-panel">
  <div class="admin-panel__header">
    <span> Панель управления</span>
  </div>
  <div class="wrapper-panel">
    <div class="nav-row">
      <b-link  to="/admin/addSector" title="First" active>
        Добавление сектора
      </b-link>
      <b-link  to="/admin/addProfile" title="second" active>
        Добавление института
      </b-link>
      <!-- <b-link  to="/admin/updProfile" title="second" active>
        Изменить
      </b-link> -->
      <b-link to="/admin/del" title="second" active>
        Удалить
      </b-link>
    </div>
    <router-view/>
  </div>
</div>
</template>

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
  methods: {},
  mounted() {}
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
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
}

.admin-panel__header {
  font-weight: 700;
  font-size: 64px;
  line-height: 77px;
  color: #000000;
}
</style>
