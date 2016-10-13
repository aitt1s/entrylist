import React, { Component, PropTypes } from 'react';
import { Areas, Provs } from '../../api/Areas.js';
import Autosuggest from 'react-autosuggest';
import { createContainer } from 'meteor/react-meteor-data';

class AreaComp extends Component {
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
    const areas = this.props.areas;
    const provs = this.props.provs;

    const together = provs.concat(areas);

    return inputLength === 0 ? [] : together.filter(lang =>
      lang.mun.toString().toLowerCase().slice(0, inputLength) === inputValue
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
    this.props.onUpdate(x);
  }

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div className="suggest-box">
      {suggestion.mun} { suggestion.pro !== "undefined" ? "" : ", " + suggestion.pro }
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
      placeholder: 'Kunta tai maakunta',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

AreaComp.propTypes = {
  areas: PropTypes.array.isRequired,
  provs: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('areas');
  Meteor.subscribe('provs');

  return {
    areas: Areas.find({}).fetch(),
    provs: Provs.find({}).fetch(),
  };
}, AreaComp);
