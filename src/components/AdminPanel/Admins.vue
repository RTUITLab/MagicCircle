<script>
import api from '@/services/api'

export default {
  data() {
    return {
      adminFields: [
        'Логин',
        'Институт',
        'Действия'
      ],
      adminLogin: null,
      adminPassword: null,
      selectedInstitute: null,

      superAdminLogin: null,
      superAdminPassword: null,
    }
  },
  computed: {
    institutes () {
        return this.$store.state.institutes
    }
  },
  mounted() {
    console.log('localStorage', this.$store.state.token);
  },
  methods: {
    addAdmin() {
      api.addAdminToApi(this.selectedInstitute.id, this.adminLogin, this.adminPassword).then(data => {
        if (data.status === 201) {
          this.$notify({
            type: 'success',
            text: `Админ с логином ${data.data.login} успешно создан!`
          })
        }
        if (data.status === 400) {
          this.$notify({
            type: 'error',
            text: data.data
          })
        }
      })
    },
    addSuperAdmin() {
      api.addSuperAdminToApi(this.superAdminLogin, this.superAdminPassword).then(data => {
        if (data.status === 201) {
          this.$notify({
            type: 'success',
            text: `Суперадмин с логином ${data.data.login} успешно создан!`
          })
        }
        if (data.status === 400) {
          this.$notify({
            type: 'error',
            text: data.data
          })
        }
      })
    }
  }
}
</script>
<template>
  <div>
    <!-- TODO Только СУПЕРАДМИН-->
    <div class="header" v-if="true">

      <!-- Modals -->
      <b-modal id="modal-add-superadmin" 
            size="xl"
            cancel-title="Отмена"
            title="Создание суперадмина"
            header-class="header-preview"
            centered
            content-class="modal-add"
            ok-title="Создать"
            @ok="addSuperAdmin()"
          >
          <b-form-input v-model="superAdminLogin" placeholder="Логин" required/>
          <b-form-input v-model="superAdminPassword" placeholder="Пароль" type="password" required/>
    </b-modal>
      <b-modal id="modal-add-admin" 
            size="xl"
            cancel-title="Отмена"
            title="Создание админа"
            header-class="header-preview"
            centered
            content-class="modal-add"
            ok-title="Создать"
            @ok="addAdmin()"
          >
          <multiselect 
            v-model="selectedInstitute" 
            tag-placeholder="Выберите профиль" 
            placeholder="Выберите институт" 
            label="name"
            track-by="id"
            :options="institutes"
          />
          <b-form-input v-model="adminLogin" placeholder="Логин" required/>
          <b-form-input v-model="adminPassword" placeholder="Пароль" type="password" required/>
    </b-modal>
      <button class="btn btn-primary" v-b-modal="'modal-add-admin'"> Создать Админа </button>
      <button class="btn btn-primary" v-b-modal="'modal-add-superadmin'"> Создать суперадмина </button>
    </div>
    <div class="admin-table">
      <div class="admin-table__name">
        Админы
      </div>
      <table border="1px">
        <tr class="admin-table__header">
          <th class="table-item" v-for="item in adminFields" :key="item"> {{item}} </th>
        </tr>
      </table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
table {
  width: 100%;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  button {
    margin-right: 20px;
  }
}

.admin-table {

		&__name {
      margin: 20px auto;
      text-align: center;
      font-weight: 700;
      font-size: 28px;
      line-height: 34px;
      color: #000000;
		}

		&__header {
		}
}

.table-item {
  padding: 10px;

}

</style>