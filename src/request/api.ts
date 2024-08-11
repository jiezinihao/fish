import request from "./index"
//获取随记栏目
export const NotesNavsGetAPI = ():Promise<NotesNavsAPIRes> => request.get("/notes/get-nav")
//获取随记栏目文章列表
export const NotesListGetAPI = (params:NotesListAPIReq):Promise<NotesListAPIRes> => request.post("/notes/list-article",params)
//获取随记栏目文章详情
export const NotesDetailGetAPI = (params:NotesDetailGetAPIReq):Promise<NotesDetailGetAPIRes> => request.post("/notes/detail-article",params)
//获取旅行栏目数据
export const TravelListGetAPI = (params:TravelListGetAPIReq):Promise<TravelListGetAPIRes> => request.post("/travel/travel-list",params)
//获取旅行栏目详情
export const GetTravelDetail = (params:GetTravelDetailReq):Promise<GetTravelDetailRes> => request.post("/travel/travel-detail",params)

//上传旅行栏目的评论
export const CommentUploadGetAPI = (params:CommentUploadGetAPIReq):Promise<CommentUploadGetAPIRes> => request.post("/public/comments/upload-comments",params)
//获取评论
export const CommentGetAPI = (params:CommentGetAPIReq):Promise<CommentGetAPIRes> => request.post("/public/comments/get-comments",params)

//获取精选评论列表
export const GetHotCommentListAPI = ():Promise<GetHotCommentListAPIRes> => request.get("/public/comments/get-comments-hot")



