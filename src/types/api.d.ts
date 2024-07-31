type mark = 'a' | 't' | 'm'
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


interface CommentItem {
    commentBody: string,
    commentName: string,
    cid: string,
}
interface CommentItemFrist {
    commentBody: String,
    commentName: String,
    cid: String,
    commentBack: [CommentItem],
}

interface CommentUploadGetAPIRes extends APIRes {
    data: {
        id: String,
        commentList: [CommentItemFrist],
    }[]
}


interface CommentUploadGetAPIReq {
    commentBody: String,
    commentName: String,
    cid?: String,
    id: String,
    mark:mark,
}

interface CommentGetAPIAPIReq {
    id: String,
    mark:mark,
}
interface CommentGetAPIAPIRes extends APIRes {
    data:CommentItemFrist[]
}