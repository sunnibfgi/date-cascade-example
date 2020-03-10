// date-cascade.js
class DateCascade {
    constructor(options = {}) {
      let date = new Date()
      this.options = Object.assign({}, options)
      this.el = document.getElementById(this.options.el)
      this.startYear = this.options.startYear
      this.endYear = this.options.endYear
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentDate = date.getDate()
      this.monthDays = [31, this.isLeapYear(this.currentYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
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
      let { dateSelect } = this
      this.monthDays.splice(1, 1, this.isLeapYear(target.value) ? 29 : 28)
      this.currentYear = +target.value
      this.renderDateSelect(dateSelect)
    }

    handleMonthSelectChange({ target }) {
      let { dateSelect } = this
      this.currentMonth = +target.value
      this.renderDateSelect(dateSelect)
    }
    handleDateSelectChange({ target }) {
      this.currentDate = +target.value
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

    setDefaultSelected(select, current) {
      let index = Array.from(select.options).findIndex(options => +options.value === current)
      select.options[~index ? index : 0].selected = true
      this.currentDate = ~index ? this.currentDate : 1
    }

    renderYearSelect(select) {
      let { startYear, endYear } = this
      let options = ''
      for (let i = startYear; i <= endYear; i++) {
        options += `<option value="${i}">${i}</option>`
      }
      select.innerHTML = options
      this.setDefaultSelected(select, this.currentYear)
    }

    renderMonthSelect(select) {
      let options = ''
      let monthDays = this.monthDays
      for (let i = 0; i < monthDays.length; i++) {
        options += `<option value="${i+1}">${i+1}</option>`
      }
      select.innerHTML = options
      this.setDefaultSelected(select, this.currentMonth)
    }

    renderDateSelect(select) {
      let options = ''
      let days = this.monthDays[this.currentMonth - 1]
      for (let i = 0; i < days; i++) {
        options += `<option value="${i+1}">${i+1}</option>`
      }
      select.innerHTML = options
      this.setDefaultSelected(select, this.currentDate)
    }

  }
