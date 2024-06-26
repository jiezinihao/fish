class DefNull {
    def: null
}

interface APIRes {
    code: string,
    msg: string,
    data: string | null
}


//请求栏目列表
interface NavNotes {
    nav_id: string,
    title: string
}
interface NotesNavsAPIRes extends APIRes {
    data: NavNotes[]
}


//请求栏目文章
interface NotesList {
    nav_id: string,
    title: string,
    time: string,
    article_id: string,
    watchNum:string
}
interface NotesListAPIRes extends APIRes {
    maxCount: string,
    data: NotesList[]
}

interface NotesListAPIReq {
    nav_id: string,
    page: number,
    pageSize: number
}

//文章详情
interface NotesDetail {
    nav_id: string,
    title: string,
    time: number,
    article_id: string,
    file: string,
    watchNum:string
}
interface NotesDetailGetAPIReq {
    article_id: string
}
interface NotesDetailGetAPIRes extends APIRes {
    data: NotesDetail
}

interface TravelImg {
    url: string,
    name: string,
    uid: string
}
interface TravelGetAPIResDataItem {
    title: string,
    body: string,
    travel_id: string,
    thumb: TravelImg,
    time: string,
    watchNum:string,
    imgList: TravelImg[]
}
interface TravelListGetAPIRes extends APIRes {
    data: TravelGetAPIResDataItem[]
}


interface TravelCommentItem {
    commentBody: string,
    commentName: string,
    commentId: string,
}
interface TravelCommentItemFrist {
    commentBody: String,
    commentName: String,
    commentId: String,
    commentBack: [TravelCommentItem],
}

interface TravelCommentUploadGetAPIRes extends APIRes {
    data: {
        travelId: String,
        commentList: [TravelCommentItemFrist],
    }[]
}


interface TravelCommentUploadGetAPIReq {
    commentBody: String,
    commentName: String,
    commentId?: String,
    travelId: String,
}

interface TravelCommentGetAPIAPIReq {
    travelId: String,
}
interface TravelCommentGetAPIAPIRes extends APIRes {
    data:TravelCommentItemFrist[]
}