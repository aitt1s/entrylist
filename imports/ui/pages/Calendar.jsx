import React, { Component } from 'react';
import { Entries } from '../../api/Entries.js';
import EventModal from '../components/calendar/EventModal.jsx'
import { createContainer } from 'meteor/react-meteor-data';
import Loading from '../components/Loading.jsx';
import Events from './Events.jsx'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: 0,
      entryId: "",
      entryName: "",
      title: "",
      selected: "",
      event: {},
      edit: false,
      create: false,
      start: {},
      end: {},
      belongsTo: 0,
    }
  }

  modalEditData(id, title, start, end, belongsTo) {
    this.setState({
      eventId: id,
      title: title,
      selected: belongsTo,
      edit: true,
      start: start,
      end: end,
      belongsTo: belongsTo
    }, function() {

    })
  }

  modalCreateData(start, end, selected) {
    this.setState({
      start: start,
      end: end,
      create: true,
    })
  }


  handleChangeStart(event) {
    this.setState({
      start: event.target.value
    }, function() {

    });
  }

  handleChangeEnd(event) {
    this.setState({
      end: event.target.value
    }, function() {

    });
  }

  handleChangeTitle(event) {
    this.setState({
      title: event.target.value
    }, function() {

    });
  }

  handleChangeSelect(e) {
    e.preventDefault();
    this.setState({
      selected: e.target.value,
    }, function() {
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const title = this.state.title.trim();
    const start = this.state.start;
    const end = this.state.end;
    const selected = this.state.selected;
    this.createEvent(title, start, end, selected);
  }

  handleDelete(e) {
    e.preventDefault();
    console.log(this.state.selected, this.state.eventId);
    Meteor.call('event.remove', this.state.selected, this.state.eventId, (err) => {
      if(err) {
        Bert.alert({
          title: 'Error',
          message: err.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });
      }
      else {
        Bert.alert({
          title: 'Even deleted',
          message: 'Now, make another!',
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-bell'
        });
      }
    });
    $('#calendar').fullCalendar('removeEvents', e.target.id);
    this.resetStates();
    $('#calEventModal').modal('hide')
  }

  createEvent(title, start, end, selected) {
    if(this.state.create) {
      var eventData;
      if (title) {
        eventData = {
          _id: new Meteor.Collection.ObjectID().valueOf(),
          title: title,
          start: moment(start).format("YYYY-MM-DD"),
          end: moment(end).format("YYYY-MM-DD"),
          belongsTo: selected,
        };
      }
      Meteor.call('entries.insert.event', selected, eventData, (err) => {
        if(err) {
          Bert.alert({
            title: 'Error',
            message: err.reason,
            type: 'danger',
            style: 'growl-top-right',
            icon: 'fa-bell'
          });
        }
        else {
          Bert.alert({
            title: 'Event created!',
            message: 'Good',
            type: 'success',
            style: 'growl-top-right',
            icon: 'fa-check'
          });
        }
      });
      $('#calendar').fullCalendar('renderEvent', eventData, true);
    }

    if(this.state.edit)  {

      if (title) {
        const calEvent = {
          _id: this.state.eventId,
          title: title,
          start: moment(start).format("YYYY-MM-DD"),
          end: moment(end).format("YYYY-MM-DD"),
          belongsTo: selected
        }
        Meteor.call('entries.updateEvent', selected, calEvent._id, calEvent);
        console.log(calEvent);

      }
    }
    this.resetStates();
    $('#calEventModal').modal('hide')
  }

  resetStates() {
    this.setState({
      eventId: "",
      title: "",
      belongsTo: "",
      create: false,
      edit: false,
      start: {},
      end: {},
    })
  }

  mapEntries() {
    return this.props.entries.map((entry) => (
      entry.events
    ));
  }

  renderCalendar() {
    const eventSources = [];
    var self=this;
    if(!this.props.loading) {
      let mappedEntries = this.mapEntries();

      for(i=0; i < mappedEntries.length; i++) {
        let obj = {"events": mappedEntries[i]};
        eventSources.push(obj);
      }
    }

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      eventSources: eventSources,
      timezone : 'local',
      contentHeight: "auto",
      eventClick: function(calEvent) {
        $('#calEventModal').modal();
        self.modalEditData(calEvent._id, calEvent.title, calEvent.start, calEvent.end, calEvent.belongsTo);
        console.log(calEvent);
      },
      editable: true,
      selectable: true,
      select: function(start, end) {
        $('#calEventModal').modal();
        self.modalCreateData(start, end);
        $('#calendar').fullCalendar('unselect');
      },

      droppable: true, // this allows things to be dropped onto the calendar
      drop: function() {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove();
        }
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div id="calendar"></div>
        <EventModal
          eventId={this.state.eventId}
          title={this.state.title}
          start={this.state.start}
          end={this.state.end}
          selected={this.state.selected}
          handleChangeStart={this.handleChangeStart.bind(this)}
          handleChangeEnd={this.handleChangeEnd.bind(this)}
          handleChangeTitle={this.handleChangeTitle.bind(this)}
          handleChangeSelect={this.handleChangeSelect.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
          edit={this.state.edit}
          create={this.state.create}
          entries={this.props.entries}
          />
          {this.renderCalendar()}
      </div>
    );
  }

  componentDidMount() {
    var self=this;
    $('#calEventModal').on('hidden.bs.modal', function () {
      self.resetStates();
    })
  }
}

export default CalendarContainer = createContainer(() => {

  const subscription = Meteor.subscribe('entries.events');
  const loading = !subscription.ready();
  const entries = Entries.find({"owner": Meteor.userId()}).fetch()

  return {
    loading,
    entries
  };

}, Calendar);
