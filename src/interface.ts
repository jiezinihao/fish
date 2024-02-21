export interface ImgListLocation {
    top: string,
    left: string ,
    position: string ,
    transition: string ,
    active: boolean
}

// 随记列表
export interface NoteList{
    id:string,
    title:string,
    time:Date
}

//旅行列表声明
export interface travelList{
    id:string,
    img:string,
    title:string,
    subtitle:string,
    time:Date,
    coffee:number
}
