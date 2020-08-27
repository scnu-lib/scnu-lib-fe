export default{
    'POST /account/login':(req:any,res:any)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json({jwt:'token'})
    },
    'POST /account/accounts':(req:any,res:any)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(req)
        res.status(400).json({code:'error.generic.malformed_request'})
    },
    'GET /activity/activities':(req:any,res:any)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(req)
        res.status(200).json([{src:'https://img9.doubanio.com/view/photo/l/public/p1188029166.webp',id:'1',title:'pride and prejudice'},
        {src:'https://img3.doubanio.com/view/photo/l/public/p1910907590.webp',id:'2',title:'the godfather'},
        {src:'https://img3.doubanio.com/view/photo/l/public/p462657443.webp',id:'3',title:'the dark knight'}])
    }

}