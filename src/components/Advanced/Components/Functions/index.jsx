import React, { Component } from 'react'
import './index.scss'
export default class index extends Component {
    constructor(props){
        super();
        this.state={tab:0}
    }
    addKey(){
        document.addEventListener('keydown',this.handlekeydown);
    }
    reKey(){
        document.removeEventListener('keydown',this.handlekeydown);
    }
    componentDidMount(){
        this.addKey()
        document.querySelector('.function').focus();
        this.props.onOpen();

    }
    handlekeydown=(e)=>{
        console.log(`Function: ${e.key}`)
        const tab=(no, move)=>{
            let c = this.state.tab+move;
            if(c==-1){
                c=no-1;
            }
            if(c==no){
                c=0;
            }
            this.setState({tab:c});
        }
        const nav=(move)=>{
            const currentIndex = document.activeElement.tabIndex;
            let next = currentIndex + move;
            const items = document.querySelectorAll('.function');
            if(next>=items.length){
                next =0;
            }
            else if(next<=-1){
                next = items.length-1;
            }
            const targetElement = items[next]||-1;
            if(targetElement!=-1){
                targetElement.focus()
            }

            return next;
        }
        if(e.key=='ArrowRight'){
            nav(1)
        }
        if(e.key=='ArrowLeft'){
            nav(-1)
        }
        if(e.key=='ArrowUp'){
            nav(-3)
        }
        if(e.key=='ArrowDown'){
            nav(3)
        }
        if(e.key=='Shift'||e.key=='SoftLeft'){
            tab(this.props.data.length, -1);
            nav(1);
        }
        if(e.key=='Control'||e.key=='SoftRight'){
            tab(this.props.data.length, 1);
            nav(1)
        }
        if(e.key=='Enter'){
            this.reKey();
            this.props.onBack();
        }
        if(e.key=='End'){
            this.reKey();
            this.props.onBack();
        }    
    }
    render() {
        return (
            <>
            
            <div className="Functions">
        <div className="title">Functions {this.state.tab+1}/{this.props.data.length}</div>
                <div className="content">
                {this.props.data[this.state.tab].map((e,i)=>{
                    return (<div tabIndex={i} key={e} className="function">
                        <div className="fun">{e}</div>
                <div className="key">{i+1}</div>
                        </div>)
                })}
            </div>
            </div>
            </>
        )
    }
}
