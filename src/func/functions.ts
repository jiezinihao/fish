export const fillSuffix = (str:string,suffix:string)=>{
    if(typeof str!=='string'){
        return str
    }
    if(str.indexOf(suffix)===-1){
        return str+suffix
    }
    return str
}