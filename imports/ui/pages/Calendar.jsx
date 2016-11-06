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
      edit: false,
      _id: "",
      start: {},
      end: {},
      title: "",
      options: [],
      selectedOption: "",
    }
  }

  getOptions() {
    return this.props.entries.map((entry) => (
      entry._id
    ));
  }

  createEventClick(start, end) {
    if(this.getOptions().length == 1) {
      this.setState({
        selectedOption: this.props.entries[0]._id
      })
    }
    this.setState({
      _id: new Meteor.Collection.ObjectID().valueOf(),
      start: start,
      end: end,
      options: this.getOptions()
    });
  }

  updateEventClick(event) {
    const clickedElement = event;
    this.setState({
      edit: true,
      _id: event._id,
      start: event.start,
      end: event.end,
      title: event.title,
      selectedOption: event.belongsTo,
      options: this.getOptions(),
    });
  }

  handleChangeTitle(event) {
    event.preventDefault();
    this.setState({
      title: event.target.value
    });
  }

  handleChangeSelect(event) {
    event.preventDefault();
    this.setState({
      selectedOption: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if(!this.state.edit) {
      let newEvent = {
        _id: this.state._id,
        title: this.state.title,
        start: moment(this.state.start).format("YYYY-MM-DD"),
        end: moment(this.state.end).format("YYYY-MM-DD"),
        belongsTo: this.state.selectedOption
      }
      Meteor.call("entries.insert.event", this.state.selectedOption, newEvent);
      newEvent.start = this.state.start;
      newEvent.end = this.state.end;
      $('#calendar').fullCalendar( 'renderEvent', newEvent, true);
    }

    if(this.state.edit) {
      let targetElement = $('#calendar').fullCalendar( 'clientEvents', this.state._id).shift();
      targetElement.title = this.state.title;
      let updatedEvent = {
        title: this.state.title,
      }

      Meteor.call("entries.update.event", this.state.selectedOption, targetElement._id,  updatedEvent);
      $('#calendar').fullCalendar('updateEvent', targetElement);
    }

    $('#calEventModal').modal('hide');
  }

  handleDelete(event) {
    event.preventDefault();
    let buttonId = event.target.id;
    let buttonIdConfirm = this.state._id

    if(buttonId == buttonIdConfirm) {
      $('#calendar').fullCalendar( 'removeEvents', buttonId);
      $('#calEventModal').modal('hide');
    }
    else {
      console.log("Some error");
    }
  }

  toggleChecked(event) {
    entryId = event.target.id;
    target = Entries.findOne({_id: entryId});
    // Set the checked property to the opposite of its current value
    Meteor.call('entries.setChecked', entryId, !target.checked);
  }

  mapEntries() {
    return this.props.entries.map((entry) => (
      entry.checked ? entry.events : []
    ));
  }

  resetStates() {
    this.setState({
      _id: "",
      edit: false,
      start: {},
      end: {},
      title: "",
      options: [],
      selectedOption: "",
    });
  }

  getEventSources() {
    if(this.props.loading) {
    }

    const eventSources = [];
    let mappedEntries = this.mapEntries();

    for(i=0; i < mappedEntries.length; i++) {
      let obj = {"id": i, "events": mappedEntries[i]};
      eventSources.push(obj);
    }

    return eventSources;
  }

  renderCalendar() {
    var self=this;

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      eventSources: self.getEventSources(),
      timezone : 'local',
      contentHeight: "auto",
      eventClick: function(calEvent) {
        self.updateEventClick(calEvent);
        $('#calEventModal').modal();
      },
      editable: true,
      selectable: true,
      select: function(start, end) {
        self.createEventClick(start, end)
        $('#calEventModal').modal();
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


    $('#calendar').fullCalendar( 'refetchEvents' );
    $('#calendar').fullCalendar( 'rerenderEvents' );
  }

  renderSelectors() {
    return this.props.entries.map((entry) => (
      <div key={`calendarEntry-${entry._id}`} className="checkbox">
        <label>
          <input type="checkbox" readOnly onClick={this.toggleChecked.bind(this)} checked={entry.checked} id={entry._id} /> {entry.name}
        </label>
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="entry-selector col-sm-4">
            {this.props.loading ? <Loading /> : this.renderSelectors() }
          </div>
        </div>
        <div id="calendar"></div>
          <EventModal
                    id={this.state._id}
                    edit={this.state.edit}
                    start={this.state.start}
                    end={this.state.end}
                    title={this.state.title}
                    options={this.state.options}
                    selectedOption={this.state.selectedOption}
                    handleChangeTitle={this.handleChangeTitle.bind(this)}
                    handleChangeSelect={this.handleChangeSelect.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
            />
          {this.renderCalendar()}
      </div>
    );
  }

  componentDidMount() {
    var self=this;
    $('#calEventModal').on('hidden.bs.modal', function () {
      self.resetStates();
    });
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
