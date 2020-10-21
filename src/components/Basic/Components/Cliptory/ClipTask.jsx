const str = (json) => JSON.stringify(json);
const par = (obj) => JSON.parse(obj);
const get = (mode) => par(localStorage.getItem(mode)||'[]');
const getClip =()=> get(1);
const getHistory =()=> get(0);

const getCopy =()=> localStorage.getItem(2)||0;
const setClip = (data) => {
    let c = getClip();

    localStorage.setItem(1, str([data,...c]));
};
const setHistory = (data)=> {
    let c = getHistory();
    localStorage.setItem(0, str([data,...c]));
};
const setCopy = (data) => localStorage.setItem(2,data);

const Clip={
    copyFromResult:(data)=>{
        setCopy(data);
        setClip({date:new Date(),result:data});
    },
    pasteFromResult:()=>getCopy(),
    setHistroy:(data)=>setHistory(data),

    copyFromHistory:()=>{
        const index = document.activeElement.tabIndex;
        Clip.copyFromResult(getHistory()[index].result);
    },
    getFromMode:(mode)=>get(mode),
    copyFromMode:(mode)=>{
        if(mode){
            const index = document.activeElement.tabIndex;
            setCopy(getClip()[index].result);
        }else{
            //History
            Clip.copyFromHistory();
        }
    },
    getCopy:()=>getCopy(),









 

}

export default Clip;