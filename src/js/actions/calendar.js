export function calendarToday() {
  return {
    type: "CALENDAR_TODAY",
  }
}

export function calendarNext() {
  return {
    type: "CALENDAR_NEXT",
  }
}

export function calendarPrev() {
  return {
    type: "CALENDAR_PREV"
  }
}

export function calendarSelect(year, month, day) {
  return {
    type: "CALENDAR_DAY_SELECT",
    payload: {
      month: month,
      year: year,
      day: day
    }
  }
}
