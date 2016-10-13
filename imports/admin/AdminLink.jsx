import React from "react"
import {Link} from "react-router";

export default React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },

    render: function () {
        let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive ? "active" : "";

        return (
            <li className={`treeview ${className}`}>
                <Link {...this.props}>
                  <i className={this.props.icon}></i>
                  <span>
                    {this.props.children}
                  </span>
                  { this.props.icon2 ? <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span> : "" }
                </Link>
            </li>
        );
    }
});
