import React from "react";

import {calendarToday, calendarPrev, calendarNext, calendarSelect} from "../actions/calendar";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.nextMonth = this.nextMonth.bind(this);
    this.today = this.today.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.select = this.select.bind(this);
    let now = new Date();
    this.now = {
      month: now.getMonth(),
      year: now.getFullYear(),
      day: now.getDate()
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: 'LOAD_DATA' });
  }

    _getWeek() {
        let week = [];
        for (let dayOfWeek=0; dayOfWeek <= 6; dayOfWeek++) {
            this.monthDay++;
            let classToday = this.props.calendar.thisMonthNow && (this.now.day == this.monthDay) ? " today" : "";
            let classSelected =  this.props.calendar.thisMonthSelected && (this.props.calendar.selected.day == this.monthDay) ? " selected" : "";
            if ((this.monthDay > 0) && (this.monthDay <= this.lastDayOfMonth)) {
                let key = `${this.props.calendar.year}-${this.props.calendar.month.toString().length === 1 ? '0' + this.props.calendar.month : this.props.calendar.month}-${this.monthDay.toString().length === 1 ? '0' + this.monthDay : this.monthDay}`;

                week.push(<div className={`day ${classSelected} ${classToday}`}
                                    key={"day" + this.monthDay}
                                    onClick={this.select}
                                    data={key}>
                    {this.monthDay}
                  <div className="calendarEvents">
                      {this.props.eventsCalendar[key] ? this.props.eventsCalendar[key].length +  (this.props.eventsCalendar[key].length === 1 ? ' event' : ' events') : ''}
                  </div>
                </div>);
            } else {
                week.push(<div className="day" key={"day" + this.monthDay}>&nbsp;</div>)
            }
        }
        return week;
    }

  select(event) {
    event.stopPropagation();
    event.preventDefault();
    let dateString = event.target.getAttribute("data") || event.target.parentElement.getAttribute("data") || event.target.parentElement.parentElement.getAttribute("data");
    if (!dateString) return;
    let arrayDates = dateString.split("-");
    this.props.dispatch(calendarSelect(arrayDates[0], arrayDates[1], arrayDates[2]));
  }

  today(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarToday());
  }
  prevMonth(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarPrev());
  }
  nextMonth(event) {
    event.stopPropagation();
    event.preventDefault();
    this.props.dispatch(calendarNext());
  }

  render() {
    let firstCurrentDay = new Date(this.props.calendar.year, this.props.calendar.month, 1);
    let lastCurrentDay = new Date(this.props.calendar.year, this.props.calendar.month +1, 0);
    this.monthDay = -firstCurrentDay.getDay(); // offset day of month
    this.lastDayOfMonth = lastCurrentDay.getDate();
    let monthArray = [];

    let numberOfWeeks = 0;
    while (this.monthDay < this.lastDayOfMonth) {
      numberOfWeeks++;
      monthArray.push(<div className="week" key={"week" + numberOfWeeks}>{this._getWeek()}</div>);
    }
    let dayOfWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let nowShow = new Date(this.props.calendar.year, this.props.calendar.month, 1);
    let options = {year: 'numeric', month: 'long'};
    return (
      <div className="month">
        <div className="month-nav-bar">
          <label className="month-nav">
            {nowShow.toLocaleString("en-US", options)}
          </label>
          <div>
            <button className="btn btn-default" onClick={this.prevMonth}>
              <span className="glyphicon glyphicon-arrow-left"/>
            </button>
            <button className="btn btn-default" onClick={this.today}>Today</button>
            <button className="btn btn-default" onClick={this.nextMonth}>
              <span className="glyphicon glyphicon-arrow-right"/>
            </button>
          </div>
        </div>
        <div className="dow-container">
          {dayOfWeeks.map(dayString => <div className="text-muted dow" key={dayString}>{dayString}</div>)}
        </div>
        {monthArray}
      </div>
    )
  }
}