
export default{
    'POST /account/login':(req:any,res:any)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'})
    },
    'POST /account/accounts':(req:any,res:any)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(req)
        res.status(400).json({code:'error.generic.malformed_request'})
    },
    'GET /activity/activities/':(req:any,res:any)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(req)
        res.status(200).json([ {"id": 0,
        "title": "阅读马拉松",
        "startTime": "2020-08-27",
        "endTime": "2020-08-27",
        "signUpDeadline": "2020-08-27",
        "maxParticipant": 40,
        "currentParticipant": 3,
        "location": "图书馆（石牌）",
        "labels": [
          "string"
        ]}, {"id": 1,
        "title": "阅读马拉松",
        "startTime": "2020-08-27",
        "endTime": "2020-08-27",
        "signUpDeadline": "2020-08-27",
        "maxParticipant": 40,
        "currentParticipant": 3,
        "location": "图书馆（石牌）",
        "labels": [
          "string"
        ]}, {"id": 2,
        "title": "阅读马拉松",
        "startTime": "2020-08-27",
        "endTime": "2020-08-27",
        "signUpDeadline": "2020-08-27",
        "maxParticipant": 40,
        "currentParticipant": 3,
        "location": "图书馆（石牌）",
        "labels": [
          "string"
        ]}, {"id": 3,
        "title": "阅读马拉松",
        "startTime": "2020-08-27",
        "endTime": "2020-08-27",
        "signUpDeadline": "2020-08-27",
        "maxParticipant": 40,
        "currentParticipant": 3,
        "location": "图书馆（石牌）",
        "labels": [
          "string"
        ]},{"id": 4,
        "title": "阅读马拉松",
        "startTime": "2020-08-27",
        "endTime": "2020-08-27",
        "signUpDeadline": "2020-08-27",
        "maxParticipant": 40,
        "currentParticipant": 3,
        "location": "图书馆（石牌）",
        "labels": [
          "string"
        ]}])/*json([{src:'https://img9.doubanio.com/view/photo/l/public/p1188029166.webp',id:'1',title:'pride and prejudice'},
        {src:'https://img3.doubanio.com/view/photo/l/public/p1910907590.webp',id:'2',title:'the godfather'},
        {src:'https://img3.doubanio.com/view/photo/l/public/p462657443.webp',id:'3',title:'the dark knight'}])*/
    },
    'GET /activity/activities/:id':(req:any,res:any)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(req)
        res.status(200).json({"id": 0,
        "title": "阅读马拉松",
        "content":"欧洲某国的安妮公主（奥黛丽·赫本 Audrey Hepburn 饰）到访罗马，国务烦身，但她又厌倦繁文缛节。一天晚上，身心俱疲的她偷偷来到民间欣赏夜景，巧遇报社记者乔（格里高利·派克 Gregory Peck 饰）。二人把手同游，相当快乐。公主更是到乔的家中作客并在那过夜。不料乔无意中发现了公主的真实身份，他决定炮制一个独家新闻，于是乔和朋友、摄影师欧文（埃迪·艾伯特 Eddie Albert 饰）一起带公主同游罗马，并且偷拍了公主的很多生活照。然而，在接下来与公主的相处中，乔不知不觉恋上了公主。为了保护公主的形象，乔只能忍痛抛弃功成名就的良机，将照片送予了公主。安妮公主在经历了罗马一日假期后，反而体验了自己对国家的责任，毅然返回了大使馆，为了本身的责任而果断抛弃了爱情。 ©豆瓣",
        "startTime": "2020-08-27",
        "endTime": "2020-08-27",
        "signUpDeadline": "2020-08-27",
        "maxParticipant": 40,
        "currentParticipant": 3,
        "location": "图书馆（石牌）",
        "issign":false,
        "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "labels": [
          "string"
        ]})
    },
  'GET /notify/methods/':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(404).code({"code": "error.notify.not_exists"}
    )
  }
}