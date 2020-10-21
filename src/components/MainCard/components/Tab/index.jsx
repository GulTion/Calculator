import React, { Component } from 'react'
import './index.scss'
import ico from '../../../../assets/icons/icons'
export default class index extends Component {
    constructor(props){
        super();
    }
    
    render() {
        
        return (
           <div onBlur={e=>{e.target.style.backgroundColor="rgba(0,0,0,0)"}} tabIndex={this.props.tabIndex} onFocus={e=>{e.target.style.backgroundColor=this.props.Data.background}} tabIndex={this.props.tabIndex}  className="Tab">
               <img style={{backgroundColor:this.props.Data.background}} src={this.props.Data.ico} alt={"Basic"} className="img"/>
        <div className="title">{this.props.Data.title}</div>
           </div>
        )
    }
}
