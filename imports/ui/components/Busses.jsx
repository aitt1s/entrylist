import React, { Component, PropTypes } from 'react';
import { Bus } from '../../api/Bus.js';
import Autosuggest from 'react-autosuggest';
import { createContainer } from 'meteor/react-meteor-data';

class Busses extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const bus = this.props.bus;
    return inputLength === 0 ?
    console.log("testi")
    :
    bus.filter(bus =>
      bus.bname.toString().toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input field
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    addTo = suggestion;
    this.triggerCallBack(addTo);
    return "";
  };

  triggerCallBack(x) {
    this.props.onUpdateBus(x);
  }

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div className="suggest-box">
      {suggestion.bname}
    </div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    // Autosuggest will pass through all these props to the input field.
    const inputProps = {
      className: "form-control",
      placeholder: 'Toimiala',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          inputProps={inputProps}
          id="bus"
        />
      </div>
    );
  }
}

Bus.propTypes = {
  bus: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('bus');

  return {
    bus: Bus.find({}).fetch(),
  };
}, Busses);
