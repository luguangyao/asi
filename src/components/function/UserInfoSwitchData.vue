<template>
    <div class="root">
        <div v-if="type == 0">
            <label :for="item.name">{{this.$t(item.display)}} : </label>
            <input :name="item.name" type='text' v-model='item.value' @change="udf" class="infoInput" />
        </div>
        <div v-else-if="type == 1">
            <label :for="item.name">{{this.$t(item.display)}} : </label>
            <a-input-password size="default" v-model="item.value" @change="udf" class = "infoInput">
              <a-icon type="safety" slot="prefix"></a-icon>
            </a-input-password>
        </div>
        <div v-else-if="type == 3">
            <a-radio-group v-model="item.value" @change="udf">
              <a-radio v-for="selectItem in item.selectList" :value="selectItem.value" :key="selectItem.key">
              {{$t(`m.${selectItem.display}`)}}
               </a-radio>
            </a-radio-group>
        </div>
        <div v-else-if="type == 2">
            <h1>{{this.$t(item.display)}} : {{item.cVal(item.value)}}</h1>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['type', 'item'],
        methods: {
            udf() {
                this.$emit('update:item', this.item);
            }
        },
        created() {
            if (!this.item) {
                this.item = {};
            }
        }
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