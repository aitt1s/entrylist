import React, { Component } from 'react';

export default class Calendar extends Component {
  render() {
    return (
      <div className="container">
        <button id="delete">Test</button>
        <div id="calendar"></div>
        <div className="modal fade" id="calEventModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">
                <p>One fine body&hellip;</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    $('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: ''
			},
      contentHeight: "auto",
      eventClick: function(calEvent, jsEvent, view) {
        $('#calEventModal').modal();
        console.log('Event: ' + calEvent.title);
        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        console.log('View: ' + view.name);
        console.log(calEvent.id);
      },
      eventSources: [{
        events: [
            {
                id     : 0,
                title  : 'event1',
                start  : '2016-10-01'
            },
            {
                id     : 1,
                title  : 'event2',
                start  : '2016-10-05',
                end    : '2016-10-07'
            },
            {
                id     : 2,
                title  : 'event3',
                start  : '2016-10-09T12:30:00',
                allDay : false // will make the time show
            }
        ]
      }],
			editable: true,
      selectable: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
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

    $('#delete').on('click', function() {
      $('#calendar').fullCalendar('removeEvents', 2); //Remove events with the id: 2
    });

    $('#calEventModal').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget) // Button that triggered the modal
      // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
      // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
      var modal = $(this)
      modal.find('.modal-title').text('Event name!')
    })

  }
}

class External extends Component {
  render() {
    return <div id='external-events'>
			<h4>Draggable Events</h4>
			<div className='fc-event'>My Event 1</div>
			<div className='fc-event'>My Event 2</div>
			<div className='fc-event'>My Event 3</div>
			<div className='fc-event'>My Event 4</div>
			<div className='fc-event'>My Event 5</div>
			<p>
				<input type='checkbox' id='drop-remove' />
				<label htmlFor='drop-remove'>remove after drop</label>
			</p>
		</div>;
  }
  componentDidMount() {
		$('#external-events .fc-event').each(function() {

			// store data so the calendar knows to render an event upon drop
			$(this).data('event', {
				title: $.trim($(this).text()), // use the element's text as the event title
				stick: true // maintain when user navigates (see docs on the renderEvent method)
			});

			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});
		});
  }
}
