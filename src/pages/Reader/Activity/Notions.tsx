import React,{useState,useEffect} from 'react'
import { List, Typography, Divider,Card,message } from 'antd';
import { listnotions } from '@/Services/activity';
import { getUserID } from '@/Utils/auth';
//理解错后端的api了，这里的通知中心是活动变更后通知用户，后端的是管理员查询用户通知方式，暂时停工
function Notions(props:any) {
    const [data,setData] = useState([])
    const getList = async () => {
        try{
        const res = await listnotions(getUserID())
        setData(res.data)}
        catch(err){
            console.log(err.code)
        }
    }
    useEffect(()=>{
        getList()
    },[])
    return (
        <Card>
            <List
            header='通知中心'
            bordered
            dataSource={data}
            renderItem={item => (
                <List.Item>
                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                </List.Item>
            )}
            />
            
        </Card>
    )
}

export default Notions
