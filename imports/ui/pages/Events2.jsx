$('#calendar').fullCalendar({
  header: {
    left: 'prev,next today',
    center: 'title',
    right: ''
  },
  timezone : 'local',
  contentHeight: "auto",
  eventClick: function(calEvent, jsEvent, view) {
    $('#calEventModal').modal();
    self.modalEditData(calEvent.id, calEvent.title, calEvent.start, calEvent.end, calEvent, jsEvent, view);
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
