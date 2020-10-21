import React, { Component } from 'react'
import './index.scss'
import KeyBar from '../KeyBar/'
import Result from './Components/Result/';
import Options from './Components/Options/'
import buttonPosition from '../../assets/key.jpg'
import Cliptory from './Components/Cliptory/';
import Clip from './Components/Cliptory/ClipTask';
import History from './Components/Histroy/';
import Functions from '../Advanced/Components/Functions/'
const dkey = {left:"Functions",right:"Options",center:"Solve"};

export default class index extends Component {
    constructor(props){
        super(props);
        this.state ={
            result:'',
            histroy:"0",
            keys:dkey,
            isOpen:false,
            isCliptoryOpen:false,
            cliptoryMode:0,
            isFunction:false,
        }
    }
    addKey(){
        document.addEventListener('keydown',this.handlekeydown)
    }
    reKey(){
        document.removeEventListener('keydown',this.handlekeydown)
    }
    componentDidMount(){
        this.addKey();
    }

    handlekeydown=(e)=>{
        const Opreator=(op)=>{
            let histo = this.state.histroy
            if(histo=='0'){
                histo=''
            }
            this.setState({histroy:histo+Number(this.state.result).toLocaleString()+op,result:0})
        }
        console.log(`Basic: ${e.key}`);
        if(!this.state.isOpen){
       if(e.key==Number(e.key)){
           this.setState({result:String(this.state.result).length<12?(this.state.result+e.key):this.state.result})
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
            Clip.setHistroy({...data,result:this.state.result});
        
            
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
            this.reKey();
            this.setState({isFunction:true})
        }
    }
    
      
       
    }
    render() {
        
        return (
            <>
            <div  className="Basic">
            
            
                <History histroy={this.state.histroy}/>

                <Result result={this.state.result} title={"Result"}/>
               
                <div className="keys">
                
                    <img style={{width:"100%",position:"fixed",bottom:"30px",zIndex:"-1"}} src={buttonPosition} alt=""/>
                
                </div>
            
                
            </div>
            {this.state.isFunction?<Functions
        onOpen={()=>{this.setState({keys:{left:"<< Prev",right:"Next >>",center:"Add"}})}}

        onBack={()=>{this.addKey();this.setState({isFunction:false,keys:{left:"Functions",center:"Solve",right:"Options"}})}}

        data={[['(',')','*','+','-','/','.'],['sin(x)','cos(x)','tan(x)'],['log(x)','e^x','n!']]}
         />:null}
            {this.state.isOpen?
            <Options options={
                [   {option:"Clear",fn:()=>{this.setState({result:0})}},
                    {option:"Clear All",fn:()=>{this.setState({result:0,histroy:"0"})}},
                    {option:"Exit",fn:()=>{window.close()}},
                    {option:"Main Menu",fn:()=>{this.props.onEnter(-1)}},
                    {option:"Show Histroy",fn:()=>{
                        this.setState({cliptoryMode:0,isCliptoryOpen:true,keys:{left:"Delete",center:"copy",right:"Delete All"}});
                         this.reKey();
        }},
                    {option:"Copy Result",fn:()=>{
                       Clip.copyFromResult(this.state.result)
                    }},
                    {option:"Paste Result",fn:()=>{this.setState({result:Clip.pasteFromResult()})}},
                    {option:"Paste from ClipBoard",fn:()=>{
                        this.setState({cliptoryMode:1,isCliptoryOpen:true,keys:{left:"Delete",center:"copy",right:"Delete All"}});
                         this.reKey();

                    }},
 
                    ]}
                    onBack={e=>{this.addKey();this.setState({isOpen:false,keys:dkey})}}
                    onOptions={e=>{this.reKey()}}
                    />:null
                }

                {/* CLiptory Component START */}
            {this.state.isCliptoryOpen?<Cliptory 
            onOpen={()=>{
                             }} 
            mode={this.state.cliptoryMode} 
            onClose={(e)=>{
                if(e.type=='copy'){
                    this.setState({result:Clip.getCopy()})
                }
                
                this.setState({isCliptoryOpen:false,isOpen:false,keys:dkey});
                this.addKey();
            }}/>:null}
            {/* Cliptory Component END */}
            <KeyBar left={this.state.keys.left} center={this.state.keys.center} right={this.state.keys.right}/>
            </>
        )
    }
}
