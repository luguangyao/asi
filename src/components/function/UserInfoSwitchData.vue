<template>
    <div class="root">
        <div v-if="type==0">
            <label :for="item.name">{{item.display}} : </label>
            <input :name="item.name" type='text' v-model='item.value' class="infoInput"/>
        </div>
        <div v-else>
            <h1>{{item.display}} : {{item.value}}</h1>
        </div>
    </div>
</template>
<script>
export default {
    props: ['type','item']
}
</script>
<style scoped>
.root {
    width: 100%;
    overflow: hidden;
    border: none;
    border-radius: 5px;
    margin: 1vw;
    padding: 3px;
}
.infoInput {
    width: auto;
    height: auto;
    border: 0.1px solid;
    border-radius: 3px;
}
</style>