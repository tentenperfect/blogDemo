export const time = {
  data () {
    return {
      year: null,
      month: null, //0-11
      day: null
    }

  },
  computed: {
    dateMonth () {
      const Month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      if (this.year % 4 === 0 && this.year % 100 !== 0 || this.year % 400 === 0) {
        Month[1] = 29
      }
      return Month
    },

    //当前月一号是星期几
    targetDay () {
      return new Date(this.year, this.month, 1).getDay()
    },
    //从上个月的第几号开始
    startDecrip () {
      let start = 0
      if (this.month == 0) {
        start = this.dateMonth[11] - targetDay + 1
      } else {
        start = this.dateMonth[this.month - 1] - this.targetDay + 1
      }
      return start
    },
    calendar () {
      let calendarList = []
      this.preMonth(calendarList)
      this.thisMonth(calendarList)
      this.nextMonth(calendarList)
      for (let i = 0; i < calendarList.length; i++) {
        this.addYear(calendarList, i)
        calendarList[i].id = i
        this.addTimestamp(calendarList, i);
      }
      return calendarList
    },
  },
  methods: {
    preMonth (calendarList) {
      if (this.targetDay > 0) {
        let startDecrip = this.startDecrip
        for (let i = 0; i < this.targetDay; i++) {
          let obj = {
            type: 'pre',
            content: startDecrip
          }
          if (this.month == 0) {
            obj.month = this.dateMonth[11]
          }
          obj.month = this.month - 1
          startDecrip++
          calendarList.push(obj)
        }
      }
    },
    thisMonth (calendarList) {
      for (let i = 0; i < this.dateMonth[this.month]; i++) {
        let obj = {
          type: "normal",
          content: i + 1,
          month: this.month
        }
        calendarList.push(obj)

      }
    },
    nextMonth (calendarList) {
      //次月要显示几天
      if (calendarList.length > 35)
        var nextNum = 42 - calendarList.length
      else {
        nextNum = 35 - calendarList.length
      }
      for (let i = 0; i < nextNum; i++) {
        let obj = {
          type: "next",
          content: i + 1,
        }
        if (this.month == 11)
          obj.month = 0
        else {
          obj.month = this.month + 1
        }
        calendarList.push(obj)
      }
    },
    addYear (calendarList, i) {
      if (calendarList[i].month == 11 && calendarList[i].type == 'pre') {
        calendarList[i].year = this.year - 1
      } else if (calendarList[i].month == 0 && calendarList[i].type == 'next') {
        calendarList[i].year = this.year + 1
      } else {
        calendarList[i].year = this.year
      }
    },
    addTimestamp (calendarList, i) {
      let date = new Date(
        this.year,
        this.month,
        this.day + 1
      )
      calendarList.isDay = date.getDay() - 1
      calendarList[i].timestamp = date.valueOf()
      calendarList[i].formatDate = date.toLocaleString()
    }

  }


}