// date-cascade.js
class DateCascade {
    constructor(options = {}) {
      this.options = Object.assign({}, options)
      this.el = document.getElementById(this.options.el)
      this.startYear = this.options.startYear
      this.endYear = this.options.endYear
      this.monthDays = [31, this.isLeapYear(this.startYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      this.currentYear = this.startYear
      this.currentMonth = this.currentDate = 1
      this.yearSelect = this.monthSelect = this.dateSelect = null
      this.init()
    }

    init() {
      this.createSelectContainer()
      this.handleSelectChange()
      this.observer()
    }
  
    observer() {
      this.currentState = {
        currentYear: this.currentYear,
        currentMonth: this.currentMonth,
        currentDate: this.currentDate
      }

      Object.keys(this.currentState).forEach(props => {
        Object.defineProperty(this, props, {
          get() {
            return this.currentState[props]
          },
          set(val) {
            this.currentState[props] = val
            DateCascade.changeCallback(this.currentState)
          }
        })
      })
    }
  
    isLeapYear(year) {
      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
    }

    handleSelectChange() {
      let { yearSelect, monthSelect, dateSelect } = this
      yearSelect.addEventListener('change', this.handleYearSelectChange.bind(this))
      monthSelect.addEventListener('change', this.handleMonthSelectChange.bind(this))
      dateSelect.addEventListener('change', this.handleDateSelectChange.bind(this))
    }

    handleYearSelectChange({ target }) {
      let { monthSelect, dateSelect } = this
      this.monthDays.splice(1, 1, !this.isLeapYear(target.value) ? 28 : 29)
      this.currentYear = +target.value
      this.currentMonth = this.prevMonth || 1
      this.currentDate = this.prevDate || 1
      this.renderMonthSelect(this.monthSelect)
      this.renderDateSelect(this.dateSelect)
      monthSelect.options[this.currentMonth - 1].selected = true
      dateSelect.options[this.currentDate - 1].selected = true
    }

    handleMonthSelectChange({ target }) {
      let { dateSelect } = this
      this.currentMonth = +target.value
      this.prevMonth = this.currentMonth
      this.renderDateSelect(this.dateSelect)
      dateSelect.options[this.currentDate - 1].selected = true
    }
    handleDateSelectChange({ target }) {
      this.currentDate = +target.value
      this.prevDate = this.currentDate
    }

    createSelectContainer() {
      let d = document
      let yearSelect = d.createElement('select')
      let monthSelect = d.createElement('select')
      let dateSelect = d.createElement('select')

      yearSelect.setAttribute('data-type', 'year')
      monthSelect.setAttribute('data-type', 'month')
      dateSelect.setAttribute('data-type', 'date')

      this.el.appendChild(yearSelect)
      this.el.appendChild(monthSelect)
      this.el.appendChild(dateSelect)

      this.renderYearSelect(yearSelect)
      this.renderMonthSelect(monthSelect)
      this.renderDateSelect(dateSelect)
      this.yearSelect = yearSelect
      this.monthSelect = monthSelect
      this.dateSelect = dateSelect
    }

    renderYearSelect(select) {
      let { startYear, endYear } = this
      let options = ''
      for (let i = startYear; i <= endYear; i++) {
        options += `<option value="${i}">${i}</option>`
      }
      select.innerHTML = options
    }
  
    renderMonthSelect(select) {
      let options = ''
      let monthDays = this.monthDays
      for (let i = 0; i < monthDays.length; i++) {
        options += `<option value="${i+1}">${i+1}</option>`
      }
      select.innerHTML = options
    }

    renderDateSelect(select) {
      let options = ''
      let days = this.monthDays[this.currentMonth - 1]
      for (let i = 0; i < days; i++) {
        options += `<option value="${i+1}">${i+1}</option>`
      }
      select.innerHTML = options
    }

  }
