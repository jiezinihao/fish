import request from "./index"

//获取随记栏目
export const NotesNavsGetAPI = ():Promise<NotesNavsAPIRes> => request.get("/notes/get-nav")

export const NotesListGetAPI = (params:NotesListAPIReq):Promise<NotesListAPIRes> => request.post("/notes/list-article",params)
