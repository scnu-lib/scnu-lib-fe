export default {
  'GET /notify/methods/{userID}': (req:any,res:any)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req);
    res.status(200).json({
      "userID": 0,
      "wechat": {
        "enabled": true,
        "wxid": "string"
      },
      "email": {
        "enabled": true,
        "address": "user@example.com"
      }
    })
  },
  'GET /account/accounts/{userID}': (req:any,res:any)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req);
    res.status(200).json({
      "id": 0,
      "username": "string",
      "password": "string",
      "detail": {
        "name": "string"
      },
      "role": [
        "ROLE_USER"
      ]
    })
  },
  'GET /activity/activities/{activityID}/volunteer': (req:any,res:any)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req);
    res.status(200).json([
      {
        "activityID": 0,
        "userID": 0
      },{
        "activityID": 0,
        "userID": 1
      }
    ])
  },
  '/activity/activities/{activityID}/volunteer-application': (req:any,res:any)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req);
    res.status(200).json([
      {
        "activityID": 0,
        "userID": 0,
        "state": "APPLIED",
        "reason": "string"
      },[
        {
          "activityID": 0,
          "userID": 1,
          "state": "APPLIED",
          "reason": "string"
        }
      ]
    ])
  },
  'GET /activity/activities/': (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req);
    res.status(200).json([
      {
        id: 0,
        title: '【莎士比亚】哈姆雷特',
        src: 'http://chuantu.xyz/t6/741/1605766913x1700339730.png',
        startTime: '2020-08-27',
        endTime: '2020-08-27',
        signUpDeadline: '2020-08-27',
        maxParticipant: 40,
        currentParticipant: 3,
        location: '图书馆（石牌）',
        labels: ['读书会', '线下'],
        volState: true,
        maxVolParticipant: 30,
      },
      {
        id: 1,
        title: '【莎士比亚】哈姆雷特',
        src: 'http://chuantu.xyz/t6/741/1605766913x1700339730.png',
        startTime: '2020-08-27',
        endTime: '2020-08-27',
        signUpDeadline: '2020-08-27',
        maxParticipant: 40,
        currentParticipant: 3,
        location: '图书馆（石牌）',
        labels: ['读书会', '线下'],
        volState: true,
        maxVolParticipant: 30,
      },
      {
        id: 2,
        title: '【莎士比亚】哈姆雷特',
        src: 'http://chuantu.xyz/t6/741/1605766913x1700339730.png',
        startTime: '2020-08-27',
        endTime: '2020-08-27',
        signUpDeadline: '2020-08-27',
        maxParticipant: 40,
        currentParticipant: 3,
        location: '图书馆（石牌）',
        labels: ['读书会', '线下'],
        volState: true,
        maxVolParticipant: 30,
      },
      {
        id: 3,
        title: '【莎士比亚】哈姆雷特',
        src: 'http://chuantu.xyz/t6/741/1605766913x1700339730.png',
        startTime: '2020-08-27',
        endTime: '2020-08-27',
        signUpDeadline: '2020-08-27',
        maxParticipant: 40,
        currentParticipant: 3,
        location: '图书馆（石牌）',
        labels: ['读书会', '线下'],
        volState: true,
        maxVolParticipant: 30,
      },
      {
        id: 4,
        title: '【莎士比亚】哈姆雷特',
        src: 'http://chuantu.xyz/t6/741/1605766913x1700339730.png',
        startTime: '2020-08-27',
        endTime: '2020-08-27',
        signUpDeadline: '2020-08-27',
        maxParticipant: 40,
        currentParticipant: 3,
        location: '图书馆（石牌）',
        labels: ['读书会', '线下'],
        volState: true,
        maxVolParticipant: 30,
      },
      {
        id: 5,
        title: '【莎士比亚】哈姆雷特',
        src: 'http://chuantu.xyz/t6/741/1605766913x1700339730.png',
        startTime: '2020-08-27',
        endTime: '2020-08-27',
        signUpDeadline: '2020-08-27',
        maxParticipant: 40,
        currentParticipant: 3,
        location: '图书馆（石牌）',
        labels: ['读书会', '线下'],
        volState: true,
        maxVolParticipant: 30,
      },
    ]);
  },
  'GET /activity/activities/:id': (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req);
    res.status(200).json({
      id: 0,
      title: '【莎士比亚】哈姆雷特',
      content: `生存还是毁灭，这是一个值得考虑的问题。

  默然忍受命运的暴虐的毒箭，或是挺身反抗人世的无涯的苦难，这两种行为，哪一种更高贵？

  死了；睡着了；什么都完了；要是在这一种睡眠之中，我们心头的创痛，以及其他无数血肉之躯所不能避免的打击，都可以从此消失，那正是我们求之不得的结局。

  死了；睡着了；睡着了也许还会做梦；嗯，阻碍就在这儿：

  因为当我们摆脱了这一具朽腐的皮囊以后，在那死的睡眠里，究竟将要做些什么梦，那不能不使我们踌躇顾虑。

  人们甘心久困于患难之中，也就是为了这个缘故；谁愿意忍受人世的鞭挞和讥嘲、压迫者的凌辱、傲慢者的冷眼、被轻蔑的爱情的惨痛、法律的迁延、官吏的横暴和费尽辛勤所换来的小人的鄙视，要是他只要用一柄小小的刀子，就可以清算他自己的一生？

  谁愿意负着这样的重担，在烦劳的生命的压迫下呻吟流汗，倘不是因为惧怕不可知的死后，惧怕那从来不曾有一个旅人回来过的神秘之国，是它迷惑了我们的意志，使我们宁愿忍受目前的折磨，不敢向我们所不知道的痛苦飞去？

  这样，重重的顾虑使我们全变成了懦夫，决心的赤热的光彩，被审慎的思维盖上了一层灰色，伟大的事业在这一种考虑之下，也会逆流而退，失去了行动的意义。`,
      startTime: '2020-08-27',
      endTime: '2020-08-27',
      signUpDeadline: '2020-08-27',
      maxParticipant: 40,
      currentParticipant: 3,
      location: '图书馆（石牌）',
      issign: false,
      src: 'http://chuantu.xyz/t6/741/1605766913x1700339730.png',
      labels: ['读书会', '线下'],
    });
  },
  'POST /account/login': (req: any, res: any) => {
    res.status(200).json({
      jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklEIjoiSm9obiBEb2UiLCJyb2xlIjoiUk9MRV9BRE1JTiJ9.ZPVKalZY3yZD5oi205XrxUtiAcxyLFh373bwwV9Ig5o',
    });
  },
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklEIjoiSm9obiBEb2UiLCJyb2xlIjoiUk9MRV9BRE1JTiJ9.ZPVKalZY3yZD5oi205XrxUtiAcxyLFh373bwwV9Ig5o
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklEIjoiSm9obiBEb2UiLCJyb2xlIjoiUk9MRV9VU0VSIn0.yuDgBMuKI9ZusSvdl6Vec4uH-TVNu-vdS_i1v7KSkhQ
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklEIjoiSm9obiBEb2UiLCJyb2xlIjoiUk9MRV9MSUJSQVJJQU4ifQ.VW26C-T5Z9vONZHlI8aoblcr9hsHyw_OydaIpu40ZP8
  'GET /activity/activities/:activityID/volunteer': (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json([
      {
        activityID: 0,
        userID: 0,
      },
    ]);
  },
  'GET /notify/methods/:userID': (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      userID: 0,
      wechat: {
        enabled: true,
        wxid: 'string',
      },
      email: {
        enabled: true,
        address: 'user@example.com',
      },
    });
  },
  'GET /account/accounts': {
    data: [
      {
        id: 0,
        username: 'string',
        role: ['ROLE_USER'],
      },
    ],
  },
};
/*
export default{
    'POST /account/login':(req:any,res:any)=>{
      res.status(200).json({jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklEIjoiSm9obiBEb2UiLCJyb2xlcyI6IlJPTEVfVVNFUiJ9.hKTaxy2Q0JsQskQzKYK3gpgescbQDa6aF5a0CDX6vVc'})
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
        "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
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
        "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
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
        "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
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
        "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
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
        "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "startTime": "2020-08-27",
        "endTime": "2020-08-27",
        "signUpDeadline": "2020-08-27",
        "maxParticipant": 40,
        "currentParticipant": 3,
        "location": "图书馆（石牌）",
        "labels": [
          "string"
        ]},{"id": 5,
        "title": "阅读马拉松",
        "src":"https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
        "startTime": "2020-08-27",
        "endTime": "2020-08-27",
        "signUpDeadline": "2020-08-27",
        "maxParticipant": 40,
        "currentParticipant": 3,
        "location": "图书馆（石牌）",
        "labels": [
          "string"
        ]}])json([{src:'https://img9.doubanio.com/view/photo/l/public/p1188029166.webp',id:'1',title:'pride and prejudice'},
        {src:'https://img3.doubanio.com/view/photo/l/public/p1910907590.webp',id:'2',title:'the godfather'},
        {src:'https://img3.doubanio.com/view/photo/l/public/p462657443.webp',id:'3',title:'the dark knight'}])
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
    res.status(200).json({
      "userID": 0,
      "wechat": {
        "enabled": true,
        "wxid": "string"
      },
      "email": {
        "enabled": true,
        "address": "user@example.com"
      }
    }
    )
  },
  'PUT /notify/methods/:id':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(200).json({
      "userID": 1,
      "wechat": {
        "enabled": true,
        "wxid": 2
      },
      "email": {
        "enabled": true,
        "address": 3
      }
    }
    )
  },
  'POST /activity/activities':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      "id": 0,
      "title": "string",
      "startTime": "2020-10-06T03:20:10.926Z",
      "endTime": "2020-10-06T03:20:10.926Z",
      "signUpDeadline": "2020-10-06T03:20:10.926Z",
      "maxParticipant": 0,
      "location": "string",
      "labels": [
        "string"
      ]
    }
    )
  },
  'PUT /activity/activities/:id':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      "id": 0,
      "title": "string",
      "startTime": "2020-10-06T03:20:10.926Z",
      "endTime": "2020-10-06T03:20:10.926Z",
      "signUpDeadline": "2020-10-06T03:20:10.926Z",
      "maxParticipant": 0,
      "location": "string",
      "labels": [
        "string"
      ]
    }
    )
  },
  'GET /account/accounts/':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(202).json({
      "id": 0,
      "username": "string",
      "role":[
        "ROLE_USER"
      ]
    }
    )
  },
  'GET /account/accounts/:id':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(202).json({
      "id": 1,
      "username": "string",
      "password": "string",
      "detail": {
        "name": "string"
      },
      "role": [
        "ROLE_USER"
      ]
    })
  },
  'PUT /account/accounts/:id':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(202).json({
      "id": 0,
      "username": "string",
      "password": "string",
      "detail": {
        "name": "string"
      },
      "role": [
        "ROLE_USER"
      ]
    })
  },
  'GET /activity/activities/:activityID/sign-up':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(202).json([{
      "id":0,
    },{
      "id":1,
    }])
  },
  'PUT /activity/activities/:acitivityID/sign-in/:userID':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(200).json({'status':'ok'})
  },
  'PUT /activity/activities/:activityID/volunteer/:userID':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({'id':1})
  },
  'DELETE /activity/activities/:activityID/volunteer/:userID':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({'id':1})
  },
  'PUT /activity/activities/:activityID/sign-up/:userID':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(200).json({'status':'ok'})
  },
  'GET /activity/activities/:activityID/volunteer-application':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(200).json([
      {
        "activityID": 0,
        "userID": 0,
        "state": "APPLIED",
        "reason": "string"
      },{
        "activityID": 0,
        "userID": 1,
        "state": "APPLIED",
        "reason": "string"
      },
    ])
  },
  'PUT /activity/activities/:activityID/volunteer-application/:userID':(req:any,res:any)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req)
    res.status(200).json(
      {
        "activityID": 0,
        "userID": 1,
        "state": "REJECTED",
        "reason": "string"
      }
    )
  }
}*/
