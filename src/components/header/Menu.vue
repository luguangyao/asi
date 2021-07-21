<template>
    <div>
        <a-menu mode="horizontal" class="menu">
            
            <template v-for="(item,key) in menu" >
                <a-menu-item :key="key"><a-icon :type='item.icon'></a-icon> {{item.name}} </a-menu-item>
            </template>

        </a-menu>
  </div>
</template>

<script>
export default{
    name:"Menu",
    data() {
    return {
      menu:[
          {
          name:'Message',
          icon:'bell'
          },
          {
          name:'Flight',
          icon:'yuque'
          },
          {
          name:'Hotel',
          icon:'credit-card'
          },
          {
          name:'Personal',
          icon:'user'
          },
          {
          name:'F&Q',
          icon:'question-circle'
          }
      ]
    }
    }
}
</script>

<style scoped>

</style>
