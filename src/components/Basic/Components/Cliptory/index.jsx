import React, { Component } from 'react'
import './index.scss'
import Clip from './ClipTask'


export default class index extends Component {
    constructor(){
        super();
        this.state={data:[]};
        
    }
    componentWillMount(){
        this.setState({data:Clip.getFromMode(this.props.mode)})
        this.props.onOpen();
        document.addEventListener('keydown',this.handlekeydown);
    }
    componentDidMount(){
        let t = document.querySelector('.item');
        if(t!=null){
            t.focus()
        }
    }
    handlekeydown=(e)=>{
        console.log(`Clipory: ${e.key}`)
        const nav=(className,move)=>{
            const currentIndex = document.activeElement.tabIndex;
            let next = currentIndex + move;
            const items = document.querySelectorAll(className);
            if(next>=items.length){
                next =items.length-1;
            }
            else if(next<=-1){
                next = 0;
            }
            const targetElement = items[next]||-1;
            if(targetElement!=-1){
                targetElement.focus()
            }

            return next;
        }
        if(e.key=='Control'||e.key=='SoftRight'){
            this.setState({data:[]});
            localStorage.setItem(this.props.mode,JSON.stringify([]))
            
        }
        if(e.key=='Shift'||e.key=='SoftLeft'){
            this.setState({data:this.state.data.filter(e=>e!==this.state.data[document.activeElement.tabIndex])})
            localStorage.setItem(this.props.mode,JSON.stringify(this.state.data))
        }
        if(e.key=='ArrowDown'){
    
            nav('.item',1)
        }
        if(e.key=='ArrowUp'){
  
            nav('.item',-1)
        }
        if(e.key=='End'){
            document.removeEventListener('keydown',this.handlekeydown)
            this.props.onClose({type:"end"});
        }
        if(e.key=='Enter'){
            
                
                Clip.copyFromMode(this.props.mode);
                document.removeEventListener('keydown',this.handlekeydown)
                console.log(Clip.getCopy())
                this.props.onClose({type:"copy"});

    
            
        }
        
    
      
       
    }
    render() {
        return (
            <div className="Cliptory">
                <div className="title">{this.props.mode?"ClipBoard":"History"}</div>
                <div className="content">
                {this.state.data
                .map((e,i)=>{
                    return (<div tabIndex={i} className="item">
                        {this.props.mode?null:<div className="data">
                            {e.data}
                        </div>}
                        <div className="result">
                            {e.result}
                        </div>
                        <div className="date">
                            {new Date(e.date).toUTCString()}
                        </div>
                        </div>)
                })}
                </div>

            </div>
        )
    }
}
