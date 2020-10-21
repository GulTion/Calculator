import React, { Component } from 'react'
import './index.scss'
export default class index extends Component {
    render() {
        let j = this.props.result;
        if(isNaN(Number(this.props.result))){
            j=0;
        }
        return (
            <div className="Result">
               
        <div className="resulttitle">{this.props.title}</div>
                    {Number(j)}
            </div>

      
        )
    }
}
