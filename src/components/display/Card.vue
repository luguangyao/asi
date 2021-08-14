<template>
  <div class="wrapper" @click="clickF(item)">
    <RotateImg :title="item.info.pname" 
    :text="`<img src='${computSrc}'
      object-fit='cover'
      style='width:100%;border-radius:10px;'
      />`"/>
    <a-card :title="item.info.aname" :bordered="false" class="card">
      <!-- <a slot="extra" href="#">more</a> -->
      <p>{{$t("m.longitude")}} : {{item.info.py}}</p>
      <p>{{$t("m.latitude") }}: {{item.info.px}}</p>
      <p></p>
    </a-card>
  </div>
</template>
<script>
  import RotateImg from "../../components/function/RotateImg.vue";
  export default {
    name: "Card",
    props: ['item', 'clickF'],
    components: {
      RotateImg,
    },
    data() {
      return {
        imgs: [
          require('@/common/images/airport/airport8_010.jpg'),
          require('@/common/images/airport/airport9_210.jpg'),
          require('@/common/images/airport/airport63900.jpg'),
          require('@/common/images/airport/airporta8773.jpg'),
          require('@/common/images/airport/airportdcaf9.jpg'),
          require('@/common/images/airport/airporte824b.jpg'),
        ]
      }
    },
    methods: {
      randomSrc () {
        return this.imgs[Math.floor(Math.random() * 13 * 97) % this.imgs.length];
      }
    },
    computed: {
      computSrc(){
        return this.randomSrc();
      }
    }
  };
</script>
<style scoped>
  .wrapper {
    display: flex;
    border: 1px solid grey;
    border-radius: 10px;
    margin: 0%;
    padding: 0%;
    width: 100%;
  }

  .card {
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    height: 150px;
  }
</style>