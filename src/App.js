import React, { Component } from 'react'
import './App.css';
import ico from './assets/icons/icons';
import Header from './components/Header/'
import MainCard from './components/MainCard/'
import Basic from './components/Basic/'
import Advanced from './components/Advanced/'
export default class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      HeaderData:{},
      // tabNumber is use for the Change the type of Calc 
      // e.g. Basic , Advanced and others
      // for Main:-1, Basic:0, and Advanced:1 and so on others:n
      tabNumber:-1

  
    }
  }
  render() {
    const Apps = {
    "-1":<MainCard onEnter={e=>this.setState({HeaderData:e.HeaderData,tabNumber:e.tabNumber})}/>,
      "0":<Basic onEnter={e=>this.setState({HeaderData:e.HeaderData,tabNumber:e})}/>,
      // "1":<Advanced onEnter={e=>this.setState({HeaderData:e.HeaderData,tabNumber:e})}/>

    }
    return (
      <>
      <Header Data={this.state.HeaderData}/>
      {Apps[this.state.tabNumber]}
  
      </>
    );
  }
}

