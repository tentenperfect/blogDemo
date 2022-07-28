<template>
  <div class="calendar-box">
    <div class="box">
      <div class="body">
        <div class="calender-title">
          <i class="el-icon-arrow-left el-icon--left"
             @click="handlePreMonth"></i>
          <div class="text">
            {{ year + "年" + (month + 1) + "月" + day + "日" }}
          </div>
          <i class="el-icon-arrow-right el-icon--right"
             @click="handleNextMonth"></i>
        </div>
        <div class="week">
          <span class="week-title"
                v-for="week in Week"
                :key="week.id">{{
            week
          }}</span>
        </div>
        <div class="calender">
          <div class="time"
               v-for="item in calendar"
               :key="item.id"
               @click="selectDay(item)">
            <span class="timeLine"
                  :class="{ selected: highlight == item.id }">
              <!--当highlight==index为真引用这个样式-->
              {{ item.content }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { time } from "./time";
export default {
  mixins: [time],
  data () {
    return {
      list: [],
      Week: ["日", "一", "二", "三", "四", "五", "六"],
      highlight: null,
      calendarIsOpen: true,
      declaration: document.styleSheets[1].cssRules[0].style,
    };
  },
  mounted () {
    this.dayInit();
  },
  computed: {
    selectTime () {
      console.log(
        "选中了" + new Date(this.year, this.month, this.day).valueOf()
      );
      return new Date(this.year, this.month, this.day).valueOf();
    },
  },
  methods: {
    switchBox () {
      this.calendarIsOpen = !this.calendarIsOpen;
    },
    handlePreMonth () {
      if (this.month === 0) {
        this.year = this.year - 1;
        this.month = 11;
      } else {
        this.month = this.month - 1;
      }
      this.day = 1;
      this.highlight = this.targetDay;
      // this.$store.commit("updateSelected", this.selectTime);
    },
    handleNextMonth () {
      if (this.month === 11) {
        this.year = this.year + 1;
        this.month = 0;
      } else {
        this.month = this.month + 1;
      }
      this.day = 1;
      this.highlight = this.targetDay;
      // this.$store.commit("updateSelected", this.selectTime);
    },
    //选中 的日期
    selectDay (item) {
      this.year = item.year;
      this.month = item.month;
      this.day = item.content;
      this.highlight = this.day + this.targetDay - 1;
      // this.$store.commit("updateSelected", this.selectTime);
    },
    dayInit () {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth();
      this.day = new Date().getDate();
      this.highlight = this.day + this.targetDay - 1;
      const today = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
      };
    },
  },
};
</script>

<style scoped>
.box {
  position: relative;
  top: 1rem;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  width: 320px;
  height: 320px;
  padding-bottom: 1rem;
  background: #b5b6b9;
  border-radius: 10px;
  transition: 0.6s ease-in-out;
}
.body {
  position: relative;
  top: 30px;
  width: 100%;
  height: 100%;
  justify-content: center;
  transition: 0.6s ease-in-out;
}
.calender {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.calender-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
}
.el-icon-arrow-right {
  cursor: pointer;
}
.week {
  display: flex;
  height: 40px;
  width: 300px;
  align-items: center;
  flex-wrap: nowrap;
  background: #b5b6b9;
  transition: 0.6s ease-in-out;
}
.week-title {
  flex-shrink: 0;
  display: flex;
  color: #fff;
  justify-content: center;
  font-size: 1rem;
  margin: 15px;
}
.time {
  display: inline-flex;
  flex-direction: column;
}
.timeLine {
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 2rem;
  margin: 5px 6.8px;
  line-height: 32px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
.timeLine:hover {
  background: #fff;
}
.selected {
  background: #fff;
}
</style>