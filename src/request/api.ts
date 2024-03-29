import request from "./index"

//获取随记栏目
export const NotesNavsGetAPI = ():Promise<NotesNavsAPIRes> => request.get("/notes/get-nav")
//获取随记栏目文章列表
export const NotesListGetAPI = (params:NotesListAPIReq):Promise<NotesListAPIRes> => request.post("/notes/list-article",params)
//获取随记栏目文章详情
export const NotesDetailGetAPI = (params:NotesDetailGetAPIReq):Promise<NotesDetailGetAPIRes> => request.post("/notes/detail-article",params)
//获取旅行栏目数据
export const TravelListGetAPI = ():Promise<TravelListGetAPIRes> => request.get("/travel/travel-list")
//上传旅行栏目的评论
export const TravelCommentUploadGetAPI = (params:TravelCommentUploadGetAPIReq):Promise<TravelCommentUploadGetAPIRes> => request.post("/travel/travel-comment-upload",params)
//获取旅行评论
export const TravelCommentGetAPI = (params:TravelCommentGetAPIAPIReq):Promise<TravelCommentGetAPIAPIRes> => request.post("/travel/travel-comment",params)



