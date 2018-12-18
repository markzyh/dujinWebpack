<template>
  <div class="block">
    <el-date-picker
      v-model="dateRangeValue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions"
      @change="emitDate"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  methods: {
    emitDate() {
      this.$emit('screenDate',this.dateRangeValue)
    }
  },
  data() {
    return {
      dateRangeValue: "",//數組
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss">
.el-popper[x-placement^="bottom"] .popper__arrow:after {
  content: "";
}
</style>
