import json from "../assets/json/index.json"


const randomNum = (max:number)=>{
    const r = Math.random();
    
    return Math.round((max - 1 ) * r)
}

export const RandomPoetry = ()=>{
    return json.poetry[randomNum(json.poetry.length)]
};