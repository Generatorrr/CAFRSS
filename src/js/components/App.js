import React from "react";
import {connect} from "react-redux";
import Calendar from "./calendar";
import EventsList from "./events-list";

@connect(state => {
  return {
    calendar: state.calendar,
    eventsCalendar: state.eventsCalendar,
    trainers: state.trainers,
  }
})
export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <h2 className="text-center">RSS Calendar</h2>
        <div className="wrapper">
          <Calendar {...this.props} />
          <div className="col-wrapper">
            <label className="text-center" style={{width: "100%", marginTop: "16px"}}>
              {(new Date(this.props.calendar.selected.year, this.props.calendar.selected.month, this.props.calendar.selected.day)).toDateString()}
            </label>
            <EventsList {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
