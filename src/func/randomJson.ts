import json from "../assets/json/index.json"


const randomNum = (max:number)=>{
    const r = Math.random();
    
    return Math.round(max * r)
}

export const RandomPoetry = ()=>{
    return json.poetry[randomNum(json.poetry.length)]
};