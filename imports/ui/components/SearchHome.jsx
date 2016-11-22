import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import SingleEntry from './SingleEntry.jsx';
import AreaComp from './AreaComp.jsx';
import Busses from './Busses.jsx';

class SearchHome extends Component {

  onUpdate(val){
    let areas = Session.get("addedSuggestions");
    if(areas === undefined) {
      areas = [];
    }
    Session.set( "addedSuggestions", areas.concat([val]));
  }

  onUpdateBus(val){
    let busses = Session.get("addedBusses");
    if(busses === undefined) {
      busses = [];
    }
    Session.set( "addedBusses", busses.concat([val]));
  }

  removeLabel(id){
    let array = Session.get('addedSuggestions').filter(function(item) {
      return item._id.toString() !== id
    });

    Session.set("addedSuggestions", array);
  }

  removeLabelBus(id){
    let array = Session.get('addedBusses').filter(function(item) {
      return item._id.toString() !== id
    });

    Session.set("addedBusses", array);
  }

  renderAdded() {
    if(Session.get('addedSuggestions') !== undefined) {
      return Session.get('addedSuggestions').map((sug) => (
        <div key={sug._id} className="place-label label label-primary">
          {sug.mun}
          <span className="pull-right-container remove-label" onClick={this.removeLabel.bind(this, sug._id.toString())}>
            <i className="fa fa-times"></i>
          </span>
        </div>
      ));
    }
  }

  renderAddedBusses() {
    if(Session.get('addedBusses') !== undefined) {
      return Session.get('addedBusses').map((sug) => (
        <div key={sug._id} className="place-label label label-info">
          {sug.bname}
          <span className="pull-right-container remove-label" onClick={this.removeLabelBus.bind(this, sug._id.toString())}>
            <i className="fa fa-times"></i>
          </span>
        </div>
      ));
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 searchdiv">
          <form className="form-inline" onChange={this.onChange}>
            <div className="form-group main-search">
              <Busses onUpdateBus={this.onUpdateBus.bind(this)}/>
            </div>
            <div className="form-group main-search">
              <AreaComp onUpdate={this.onUpdate.bind(this)} />
             </div>

            <div className="more-options main-search">
              <a className="" data-toggle="collapse" href="#moreSettings" id="link"><small>More options</small></a>
            </div>
          </form>

          <form id="moreSettings" className="form-inline more-settings collapse">
            <div className="form-group main-search">
              <div className="form-group main-search">
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="" />
                      Saatavana heti
                  </label>
                </div>
              </div>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Aikahaarukan alku" />
                <span className="btn btn-default input-group-addon">
                  <span className="caret"></span>
                </span>
              </div>
            </div>
            <div className="form-group main-search">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Aikahaarukan loppu" />
                <span className="btn btn-default input-group-addon">
                  <span className="caret"></span>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xs-12 form-group">
          <div className="search-home-area">
            {this.renderAddedBusses()}{this.renderAdded()}
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer (() => {
  return {
    addedSuggestions: Session.get('addedSuggestions'),
    addedBusses: Session.get('addedBusses'),
  };
}, SearchHome);
