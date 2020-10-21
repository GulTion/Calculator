import React, { Component } from 'react'
import './index.scss'
export default class index extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        return (
            <div className="KeyBar">
                <div className="left">{this.props.left}</div> 
                 <div className="center">{this.props.center.toUpperCase()}</div>
            <div className="right">{this.props.right}</div>
                </div>
        )
    }
}
