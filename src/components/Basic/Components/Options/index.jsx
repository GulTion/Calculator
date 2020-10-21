import React, { Component } from 'react'
import './index.scss'
export default class index extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    componentDidMount(){
        this.props.onOptions();
        document.addEventListener('keydown',this.handlekeydown);
        document.querySelector('.option').focus();
    }
   
    handlekeydown=(e)=>{
        
        
        console.log(`Options: ${e.key}`)
        const nav=(move)=>{
            const currentIndex = document.activeElement.tabIndex;
            let next = currentIndex + move;
            const items = document.querySelectorAll('.option');
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
       
        if(e.key=='ArrowUp'){
            e.preventDefault();
            nav(-1);
        }
        else if(e.key=='ArrowDown'){
            e.preventDefault();
            nav(1)
        }
        else if(e.key=='Control'||e.key=='SoftRight'){
            document.removeEventListener('keydown',this.handlekeydown);
            this.props.onBack();
        }
        
    }
      
       

    render() {
      
        return (

                <div  className="Options">
                <div className="title">Options</div>
                <div className="content">
                    {this.props.options.map((e,i)=>{
                        return  (<div 
                            key={e.option} 
                            tabIndex={i} 
                            className="option" 
                            onClick={()=>{
                                this.props.onBack()
                                
                                document.removeEventListener('keydown',this.handlekeydown);
                                e.fn();
                            }} 
                            onKeyDown={g=>{
                                if(g.key=='Enter'){
                                    this.props.onBack();
                                    
                                    document.removeEventListener('keydown',this.handlekeydown);
                                    e.fn();
                                    }}}>
                                {e.option}
                            </div>)
                    })}
       
     
        

                </div>
            </div>

        )
    }
}

