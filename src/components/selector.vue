<template>
<div>
  <v-select placeholder="Направление" v-model="selectDirection" multiple :options=directionList class="selects-row__item"></v-select>
</div>
</template>

<script>
export default {
  name: "selector",
  data () {
    return {
      directionList: ['Прикладная информатика', 'Программная инженерия', 'Информатика и вычислительная техника'],
      selectDirection: [],

    }
  }
}
</script>

<style scoped>
.selects-row__item{
  margin-right: 30px;
  width: 33.333%;
}
</style>
