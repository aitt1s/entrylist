import React, { Component } from 'react';
import AreaComp from './AreaComp.jsx';
import Busses from './Busses.jsx';

export default class AreasAndBusses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedSuggestions: this.props.area,
      addedBusses: this.props.busses,
    }
  }

  editLabels(type, res) {
    return (
      <span className="pull-right-container remove-label"
          onClick={this.removeLabel.bind(this, type, res._id.toString())}>
        <i className="fa fa-times"></i>
      </span>
    );
  }

  removeLabel(type, id){
    if(type === "Suggestion") {
      var array = this.state.addedSuggestions.filter(function(item) {
        return item._id.toString() !== id
      });

      this.setState({
        addedSuggestions: array
      });
    }
    if(type === "Busses") {
      var array = this.state.addedBusses.filter(function(item) {
        return item._id.toString() !== id
      });

      this.setState({
        addedBusses: array
      });
    }
  }

  onUpdate(val){
    this.setState({
      addedSuggestions: this.state.addedSuggestions.concat([val])
    });
  }

  onUpdateBus(val){
    this.setState({
      addedBusses: this.state.addedBusses.concat([val])
    });
  }

  renderAreas() {
    if(this.props.area !== undefined && this.props.area) {
      return this.props.area.map((area) => (
        <div key={area._id} className="place-label label label-primary">
          { area.mun }
        </div>
      ));
    }
  }

  renderBusses() {
    if(this.props.busses !== undefined && this.props.busses) {
      return this.props.busses.map((bus) => (
        <div key={bus._id} className="place-label label label-info">
          { bus.bname }
        </div>
      ));
    }
  }

// These are for editing
  renderEditBusses() {
    if(this.props.busses !== undefined && this.props.busses) {
      return this.state.addedBusses.map((bus) => (
        <div key={bus._id} className="place-label label label-info">
          { bus.bname } { this.props.edit ? this.editLabels("Busses", bus) : "" }
        </div>
      ));
    }
  }

  renderEditAreas() {
    if(this.props.area !== undefined && this.props.area) {
      return this.state.addedSuggestions.map((area) => (
        <div key={area._id} className="place-label label label-primary">
          { area.mun } { this.props.edit ? this.editLabels("Suggestion", area) : "" }
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="row">
        <div className="row col-sm-12 info-container">

          <div className="col-sm-12">
            {this.props.edit ? this.renderEditBusses() : this.renderBusses()}
            {this.props.edit ?
            <div className="inline-block">
              <Busses onUpdateBus={this.onUpdateBus.bind(this)} />
            </div>
            : "" }
          </div>

          <div className="col-sm-12">
            {this.props.edit ? this.renderEditAreas() : this.renderAreas()}
            {this.props.edit ?
              <div className="inline-block">
                <AreaComp onUpdate={this.onUpdate.bind(this)} />
              </div>
              : "" }
            </div>
          </div>
      </div>
    );
  }
}
