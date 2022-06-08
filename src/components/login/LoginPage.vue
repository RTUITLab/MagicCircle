<script>
import apiAuth from '@/services/apiAuth';

export default {
  data() {
    return {
      login: '',
      password: '',
      errorMessage: null,
    }
  },
  methods: {
    fetchLogin() {
      apiAuth.signIn(this.login, this.password).then(data => {
        // TODO data.status === 200
        if (data.token) {
          this.$router.push('/admin/addSector')
        }
        else  {
          this.errorMessage = 'Неверный логин или пароль'
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
  }
}
</script>
<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="login-header"> Вход в панель администратора</div>
      <div class="login-form">
        <input type="text" class="login-form__name" placeholder="Логин" v-model="login" v-on:keyup.enter="fetchLogin">
        <input type="password" class="login-form__password" placeholder="Пароль" v-model="password" v-on:keyup.enter="fetchLogin">
        <div v-if="errorMessage" class="login-form__error">{{errorMessage}}</div>
        <!-- <div>
          <input type="checkbox" class="login-form__remember" name="is_remember" id="is_remember">
          <label for="is_remember"> Запомнить</label>
        </div> -->
        <button class="btn btn-primary" v-text="'Войти'" @click="fetchLogin" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-wrapper {
  padding: 30px 60px;
  background-color: #fff;
  box-shadow: 0px 4px 30px rgba(90, 96, 127, 0.15);
  border-radius: 10px;
  max-width: 370px;
}
.login-header {
  font-weight: 700;
  display: flex;
  flex-direction: column;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  color: #131523;
  margin-bottom: 25px;
}
.login-form {
  text-align: left;
  &__name {
    margin-bottom: 20px;
  }

  &__password {
    margin-bottom: 10px;
  }
  &__error {
    color: red;
    transition: color .3s cubic-bezier(.215,.61,.355,1);
    transition: 1s;
    animation: show 0.3s 1;
    animation-fill-mode: forwards;
    @keyframes show{
      0%{
        margin-top: -20px;
      }
      100% {
        margin-top: 4px;
        margin-bottom: 10px;
      }
    }
  }
  &__remember {
    margin-bottom: 20px;
  }

  input {
    padding: 8px 16px;
    
    border: 1px solid #D9E1EC;
    border-radius: 6px;
  }
}
.btn {
}
.btn-primary {
}

</style>