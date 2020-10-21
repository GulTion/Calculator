import React, { Component } from 'react'
import './index.scss';
import KeyBar from '../KeyBar/'
import Options from '../Basic/Components/Options/'
import Functions from './Components/Functions/'
import Result from '../Basic/Components/Result/'
import History from '../Basic/Components/Histroy/'
export default class index extends Component {
    constructor(props){
        super();
        this.state={
            isFunction:false,
            isOpen:false,
            keys:{left:"Functions",center:"solve",right:"Options"},
            result:0,
            histroy:"0"
        }
    }
    add(){
        document.addEventListener('keydown',this.handlekeydown);
    }
    re(){
        document.removeEventListener('keydown',this.handlekeydown)
    }
    componentDidMount(){
        this.add()
    }
    handlekeydown=(e)=>{
        const Opreator=(op)=>{
            let histo = this.state.histroy
            if(histo=='0'){
                histo=''
            }
            this.setState({histroy:histo+Number(this.state.result).toLocaleString()+op,result:0})
        }
        console.log(`Advanced: ${e.key}`)
        // const nav=(className,move)=>{
        //     const currentIndex = document.activeElement.tabIndex;
        //     let next = currentIndex + move;
        //     const items = document.querySelectorAll(className);
        //     if(next>=items.length){
        //         next =0;
        //     }
        //     else if(next<=-1){
        //         next = items.length-1;
        //     }
        //     const targetElement = items[next]||-1;
        //     if(targetElement!=-1){
        //         targetElement.focus()
        //     }

        //     return next;
        // }
        if(e.key=='Control'||e.key=='SoftRight'){
            this.setState({isOpen:!this.state.isOpen});
            this.re()
        }

        else if(e.key=='Shift'||e.key=='SoftLeft'){
            this.setState({isFunction:!this.state.isFunction});
            this.re()
        }

        else if(e.key==Number(e.key)){
            this.setState({result:this.state.result+e.key})
        }
        else if(e.key=='Backspace'||e.key=='SoftLeft'||e.key=='AltGraph'){
            e.preventDefault();
            let r = this.state.result;
            r = Math.abs(r).toString().length===1?0:r;
            r = Number(r).toString();
            console.log(this.state.result)
             this.setState({result:r.slice(0,r.length-1)})
            
        }
        else if(e.key=='ArrowDown'){
            Opreator('+')
        }
        else if(e.key=='ArrowUp'){
             Opreator('-')
         }
         else if(e.key=='ArrowLeft'){
             Opreator('/')
         }
         else if(e.key=='ArrowRight'){
             Opreator('*')   
         }
         else if(e.key=='Enter'){
            let j = this.state.histroy;
            if(j=='0'){
                j=''
            };
           
            
            let data = {data:this.state.histroy+this.state.result,date:new Date().getTime()}
            
            this.setState({result:Number(eval(j.split(',').join('')+Number(this.state.result))),histroy:"0"});
            // Clip.setHistroy({...data,result:this.state.result});
        
            
        }
        else if(e.key=='*'||e.key=='-'){
            this.setState({result:-1*this.state.result})
        }
        else if(e.key=='#'||e.key=='.'){
            let re = this.state.result;
            if(re.toString().indexOf('.')==-1){
                this.setState({result:re+'.'})
            }
        }
        else if(e.key=='Control'||e.key=='SoftRight'){
            const o = this.state.isOpen;
            this.setState({keys:{left:!o?"":"Clear",center:!o?"SELECT":"Solve",right:!o?"Back":"Options",},isOpen:!o});
        
        }
        else if(e.key=='Shift'||e.key=='SoftLeft'){
            this.setState({result:0})
        }


       
    }
    render() {
        return (
            <>
            <div className="Advanced">
                <History histroy={this.state.histroy}/>
                <Result result={this.state.result} title="Result"/>
            </div>


{this.state.isOpen?

            <Options 
            onOptions={
                ()=>{this.re()
                this.setState({keys:{left:"",center:"select",right:"back"}})}
            } 
            onBack={
                ()=>{this.add()

                this.setState({isOpen:!this.state.isOpen, keys:{left:"Functions",center:"solve",right:"Options"}})
            }} 
            options={[
                {option:'Main Menu',fn:()=>{this.props.onEnter(-1)}
            }]}/>:null
        }
        {this.state.isFunction?
        <Functions
        onOpen={()=>{this.setState({keys:{left:"<< Prev",right:"Next >>",center:"Add"}})}}

        onBack={()=>{this.add();this.setState({isFunction:false,keys:{left:"Functions",center:"Solve",right:"Options"}})}}

        data={[['(',')','*','+','-','/','.'],['sin(x)','cos(x)','tan(x)'],['log(x)','e^x','n!']]}
         />:null}


        <KeyBar 

        left={this.state.keys.left} 
        center={this.state.keys.center} 
        right={this.state.keys.right}/>
            </>
        )
    }
}
