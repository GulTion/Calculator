import React, { Component } from 'react'
import './index.scss'
import Tab from './components/Tab'
import KeyBar from '../KeyBar/'
import Ico from '../../assets/icons/icons'

// New Function is added by this Array
const Apps = [
    {title:"Basic",background:"grey",ico:Ico.basic,autofocus:true},
    // {title:"Advanced",background:"rgb(0, 157, 219)",ico:Ico.adv},
    {title:"Graph",background:" rgb(12, 201, 5)",ico:Ico.graph},
    {title:"Statitics",background:"#852",ico:Ico.stati}
]
export default class index extends Component {
    constructor(props){
        super(props);
        this.state={tabNumber:0}


    }
    addKey(){
        document.addEventListener('keydown',this.handleKeydown);
    }
    reKey(){
        document.removeEventListener('keydown',this.handleKeydown);
    }
    componentDidMount(){
       
        this.addKey();
        document.querySelector('.Tab').focus();

    }
   

    
    
    handleKeydown=(e)=>{
        console.log(`MainCard: ${e.key}`)
        const nav=(move)=>{
            const currentIndex = document.activeElement.tabIndex;
            let next = currentIndex + move;
            const items = document.querySelectorAll('.Tab');
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
        switch(e.key){
            case 'ArrowUp':
                nav(-3);
                break;
            case 'ArrowDown':
                nav(3);
                break;
            case 'ArrowLeft':
                    nav(-1);
                    break;
            case 'ArrowRight':
                nav(1);
                break;
            case 'Enter':
                
                this.props.onEnter({HeaderData:Apps[nav(0)],tabNumber:nav(0)})
                this.setState({tabNumber:Apps[nav(0)]});
                this.reKey();
                break;
            default :
                break;
        }
    }
    render() {
        return (
            <>
            <div className="MainCard">
                {Apps.map((e,tabindex)=>{
                    return(<Tab Data={e} tabIndex={tabindex} key={tabindex}/>)
                })}
            </div>
                <KeyBar left=" " right=" " center="Enter"/>
            </>
        )
    }
}
