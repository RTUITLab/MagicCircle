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
      superAdminFields: [
        'Логин',
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
    api.getAdmins();
    api.getSuperAdmins();
  },
  methods: {
    addAdmin() {
      api.addAdminToApi(this.selectedInstitute.id, this.adminLogin, this.adminPassword).then(data => {
        if (data.status === 201) {
          this.$notify({
            type: 'success',
            text: `Админ с логином ${data.data.login} успешно создан!`
          })
          api.getAdmins();
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
          api.getSuperAdmins();
        }
        if (data.status === 400) {
          this.$notify({
            type: 'error',
            text: data.data
          })
        }
      })
    },
    deleteAdmin(idAdmin) {
      api.deleteAdmin(idAdmin);
    },
    deleteSuperAdmin(idSuperAdmin) {
      api.deleteSuperAdmin(idSuperAdmin);
    },
    findInstituteByID(id) {
      return this.$store.state.institutes.find((institute) => institute.id === id)
    }
  }
}
</script>
<template>
  <div>
      <!-- Modals -->
      <b-modal id="modal-add-superadmin" 
            size="lg"
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
            size="lg"
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

    <div class="admin-table">
      <div class="admin-table__name">
        Админы
        <span style="width:34px">
          <img src="@/assets/add.svg" alt="" class="add-form__iconadd" v-b-modal="'modal-add-admin'">
        </span>
      </div>
      <table border="1px">
        <tr class="admin-table__header">
          <th class="table-item" v-for="item in adminFields" :key="item"> {{item}} </th>
        </tr>
        <tr v-for="admin in $store.state.adminList" :key="admin.id">
          <th>{{admin.login}}</th>
          <th>{{findInstituteByID(admin.institute_id).name}}</th>
          <th class="table-item__delete" @click="deleteAdmin(admin.id)"> <img src="@/assets/delete.svg" style="margin-right: 10px"> Удалить </th>
        </tr>
      </table>
    </div>

    <div class="admin-table">
      <div class="admin-table__name">
        Суперадмины
        <span style="width:34px">
          <img src="@/assets/add.svg" alt="" class="add-form__iconadd" v-b-modal="'modal-add-superadmin'">
        </span>
      </div>
      <table border="1px">
        <tr class="admin-table__header">
          <th class="table-item" v-for="item in superAdminFields" :key="item"> {{item}} </th>
        </tr>
        <tr v-for="superadmin in $store.state.superAdminList" :key="superadmin.id">
          <th>{{superadmin.login}}</th>
          <th class="table-item__delete" @click="deleteSuperAdmin(superadmin.id)"> <img src="@/assets/delete.svg" style="margin-right: 10px"> Удалить </th>
        </tr>
      </table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
table {
  width: 100%;
  th {
    border: 1px solid #D7DBEC;
    padding: 15px 30px;
    text-align: center;
    color: #333752;
  }
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
      th {
        background: #F5F6FA;
      }
		}
}

.table-item {
  padding: 10px;
  &__delete {
    color: #F12B43;
    cursor: pointer;
  }
}

</style>