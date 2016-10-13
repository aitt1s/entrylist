import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import SingleEntry from './SingleEntry.jsx';
import AreaComp from './AreaComp.jsx';

export default class SearchHome extends Component {
  constructor() {
    super();
    this.state = {
      addedSuggestions: [],
    };
  }

  onUpdate(val){
    this.setState({
      addedSuggestions: this.state.addedSuggestions.concat([val])
    }, function() {
      this.props.getSearchFilters(this.state.addedSuggestions);
    });
  }


  removeLabel(id){
    var array = this.state.addedSuggestions.filter(function(item) {
      return item._id.toString() !== id
    });

    this.setState({
      addedSuggestions: array
    }, function() {
      this.props.getSearchFilters(this.state.addedSuggestions);
      console.log(this.state.addedSuggestions);
    });
  }

  renderAdded() {
    return this.state.addedSuggestions.map((sug) => (
      <div key={sug._id} className="place-label label label-primary">
        {sug.mun}
        <span className="pull-right-container remove-label" onClick={this.removeLabel.bind(this, sug._id.toString())}>
          <i className="fa fa-times"></i>
        </span>
      </div>
    ));
  }

  onChange() {

  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 searchdiv">
          <form className="form-inline" onChange={this.onChange}>
            <div className="form-group main-search">
              <select className="form-control">
                <option>Kaikki toimialat</option>
              </select>
            </div>
            <div className="form-group main-search">
              <AreaComp onUpdate={this.onUpdate.bind(this)} />
             </div>
             <div className="form-group main-search">
              <input type="text" className="form-control" placeholder="Vapaa haku" />
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
        <div className="col-xs-12">
          <div className="form-group search-home-area">
            {this.renderAdded()}
          </div>
        </div>
      </div>
    );
  }
}
