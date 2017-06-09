import React from "react";

export default class EventsList extends React.Component {
  constructor() {
    super();
  }

  render() {
    let eventsKey = `${this.props.calendar.selected.year}-${this.props.calendar.selected.month.toString().length === 1 ? '0' + this.props.calendar.selected.month : this.props.calendar.selected.month}-${this.props.calendar.selected.day.toString().length === 1 ? '0' + this.props.calendar.selected.day : this.props.calendar.selected.day}`;
    let eventsList = this.props.eventsCalendar[eventsKey] || [];
    if (eventsList.length) {
      return (
        <ul className="list-group">{eventsList.map((event, index) =>
          <li className="list-group-item" key={`event-${index}`} style={event.type === 'deadline' ? {background : '#EF9A9A'} : event.type === 'event' ? {background: '#A5D6A7'} : event.type === 'workshop' ? {background: '#FFCC80'} : event.type === 'webinar' ? {background: '#80DEEA'} : event.type === 'lecture' ? {background: '#B39DDB'} : null}>
            {event.type === 'deadline' ? <p style={{color: '#D50000'}}>DEADLINE <span class="glyphicon glyphicon-hourglass" aria-hidden="true"></span></p> : null}
            {event.type === 'event' ? <p style={{color: '#1B5E20'}}>EVENT <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></p> : null}
            {event.type === 'workshop' ? <p style={{color: '#E65100'}}>WORKSHOP <span class="glyphicon glyphicon-wrench" aria-hidden="true"></span></p> : null}
            {event.type === 'webinar' ? <p style={{color: '#006064'}}>WEBINAR <span class="glyphicon glyphicon-globe" aria-hidden="true"></span></p> : null}
            {event.type === 'lecture' ? <p style={{color: '#4A148C'}}>LECTURE <span class="glyphicon glyphicon-education" aria-hidden="true"></span></p> : null}
            <p><span className="eventListSpan">Title: </span>{event.title}</p>
            <p><span className="eventListSpan">Location: </span><a href={`https://www.google.com/maps/search/${event.location}`} target="_blank" className="calendarLinks">{event.location}</a></p>
            <p><span className="eventListSpan">Start: </span>{event.start.slice(11, 19)}</p>
            <div className="container" style={{display: 'inline'}}>
              <a href={`#${event.id}321`} className="btn btn-warning btn-xs" data-toggle="collapse">Speakers</a>
              <div id={`${event.id}321`} className="collapse">
                  {event.speakers.map((speaker, index) =>
                      <div  key={`speaker-${index}`}>
                        <span className="eventListSpan">{this.props.trainers[speaker][0].name}   </span>
                        <a href={this.props.trainers[speaker][0].avatar} target="_blank"  className="calendarLinks">Foto</a>
                      </div>
                  )}
              </div>
            </div>
            <div className="container" style={{display: 'inline'}}>
              <a href={`#${event.id}`} className="btn btn-warning btn-xs" data-toggle="collapse">Description</a>
              <div id={event.id} className="collapse">{event.description}</div>
            </div>
            <div className="container" style={{display: 'inline'}}>
              <a href={`#${event.id}123`} className="btn btn-warning btn-xs" data-toggle="collapse">Resources</a>
              <div id={`${event.id}123`} className="collapse">
                <div className="container" style={{display: 'inline'}}>
                  {event.resources.map((resource, index) =>
                      <div key={`resource-${index}`}>
                        <a href={`#${resource.type}`} className="btn btn-default btn-xs resourcesCalendar" data-toggle="collapse" >Resource ({resource.type})</a>
                        <div id={resource.type} className="collapse">
                          <a href={resource.resource} target="_blank" className="calendarLinks">Link to download</a>
                          <p>{resource.description}</p>
                        </div>
                      </div>
                  )}
                </div>
              </div>
            </div>
          </li>)}
        </ul>
      )
    }
    return null;
l }
}