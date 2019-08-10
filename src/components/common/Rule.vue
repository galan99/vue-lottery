<!--竖版规则-->
<template>
  <div class="rule-floor smico" v-if="ruleUrl.rule">
    <div class="rule-foot">
      <div class="rule-middle">
        <div class="rule-box">
          <img :src="ruleUrl.rule" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ruleUrl: {
      type: Object,
      default: function () {
        return {
          rule: ''
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.rule-floor{
  width:6.92rem;
  background: url('@{url}rule/hyshu/t.png') center top no-repeat;
  background-size: 100% auto;
  position: relative;
  margin:0 auto;
  padding-top:.9rem;
  .rule-foot{
    padding-bottom:.5rem;
    background: url('@{url}rule/hyshu/f.png') center bottom no-repeat;
    background-size: 100% auto;
  }
  .rule-middle{
    background: url('@{url}rule/hyshu/m.png') repeat-y;
    background-size: 100% auto;
    padding:.2rem .3rem 0;
  }
  .rule-box{
    width:100%;
  }
  img{
    max-width: 100%;
  }
}
</style>
