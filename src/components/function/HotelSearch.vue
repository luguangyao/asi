<template>
  <div>
    <div class="contain">
      <a-row>
        <a-col :span="6">
          <a-input>
            <a-icon slot="prefix" type="environment" />
          </a-input>
        </a-col>
        <a-col :offset="1" :span="6">
          <a-date-picker></a-date-picker>
        </a-col>
        <a-col :offset="1" :span="2" >
            <a-select default-value="1">
                <a-select-option value="1"><a-icon type="user"></a-icon> 1 </a-select-option>
                <a-select-option value="2"><a-icon type="user"></a-icon> 2 </a-select-option>
            </a-select>
        </a-col>
        <a-col :offset="1" :span="6" >
            <a-slider range :marks="marks" :default-value="[26, 37]" ></a-slider>
        </a-col>
      </a-row>
      <a-row>
          <a-col :span="6">
              <a-button-group compact>
                  <a-button >
                      度假民宿
                  </a-button>
                  <a-button>
                      酒店
                  </a-button>
              </a-button-group>
          </a-col>
          <a-col :offset="1" :span="2" >
            <a-select default-value="评分">
                <a-select-option value="1"><a-icon type="star"></a-icon> 1 </a-select-option>
                <a-select-option value="2"><a-icon type="user"></a-icon> 2 </a-select-option>
                <a-select-option value="3"><a-icon type="user"></a-icon> 3 </a-select-option>
                <a-select-option value="4"><a-icon type="user"></a-icon> 4 </a-select-option>
                <a-select-option value="5"><a-icon type="user"></a-icon> 5 </a-select-option>
            </a-select>
          </a-col>
          <a-col :offset="1" :span="2" >
            <a-select default-value="设施">
                <a-select-option value="1"><a-icon type="star"></a-icon> 1 </a-select-option>
                <a-select-option value="2"><a-icon type="star"></a-icon> 2 </a-select-option>
                <a-select-option value="3"><a-icon type="star"></a-icon> 3 </a-select-option>
                <a-select-option value="4"><a-icon type="star"></a-icon> 4 </a-select-option>
                <a-select-option value="5"><a-icon type="star"></a-icon> 5 </a-select-option>
            </a-select>
          </a-col>
          <a-col :offset="2" :span="5" >
            <a-select default-value="退订不需要付费">
                <a-select-option value="1"> 退订不需要付费 </a-select-option>
                <a-select-option value="5"> 退订需要付费 </a-select-option>
            </a-select>
          </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "HotelSearch",
  data(){
      return{
          marks:{
              0:"$0",
              100:{
                  style: {
                    color: '#f50',
                  },
                  label:<strong>$100</strong>
              }
          }
      }
  }
};
</script>
<style scoped>
</style>