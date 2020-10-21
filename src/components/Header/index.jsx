import React, { Component } from 'react'
import './index.scss'

export default class index extends Component {

    
    render() {
        const Data = this.props.Data||{background:"#a1a1a1",title:"Main Menu"};
        return (
            <div style={{backgroundColor:Data.background||"#a1a1a1"}} className="Header">
                {Data.title||"Main Menu"}
            </div>
        )
    }
}
