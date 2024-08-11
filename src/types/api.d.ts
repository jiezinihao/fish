type Mark = 'a' | 't' | 'm'
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
    nav_id?: string,
    sort?: 'proportion'|'desc' | 'asc',
    page?: number,
    pageSize?: number
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
interface TravelListGetAPIReq {
    page?: number,
    pageSize?: number,
    sort?: 'proportion'|'desc' | 'asc'
}
interface TravelListGetAPIRes extends APIRes {
    data: TravelGetAPIResDataItem[],
    maxCount: number
}

interface GetTravelDetailReq {
    id:string
}
interface GetTravelDetailRes extends APIRes {
    data:TravelGetAPIResDataItem
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
    createTime: String,
    icon: String,
    isHot:'1'|'0',  //是否热门
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
    icon:String,
    mark:Mark,
}

interface CommentGetAPIReq {
    id: String,
    mark:Mark,
}
interface CommentGetAPIRes extends APIRes {
    data:CommentItemFrist[]
}

interface GetHotCommentListAPIRes  extends APIRes {
    data: {
        commentBody: string,
        commentName: string,
        aid: string,
        createTime: string,
        icon: string,
        cid:string,
        mark: Mark,
        title: string,
    }[]
}
