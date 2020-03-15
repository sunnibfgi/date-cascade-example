import DateCascade from './date-cascade'

const result: DateCascade = new DateCascade({
   el: 'demo',
   startYear: 2010,
   endYear: 2040
 })
const trigger = document.getElementById('trigger') as HTMLElement
DateCascade.changeCallback = function(o) {
    trigger.innerHTML = `${o.currentYear}-${o.currentMonth}-${o.currentDate}`
  }
trigger.innerHTML = `${(result.currentState).currentYear}-${result.currentState.currentMonth}-${result.currentState.currentDate}`