import React,{useState,useEffect} from 'react'
import { List, Typography, Divider,Card,message } from 'antd';
import { listnotions } from '@/Services/activity';
import { userID } from '@/Utils/auth';

function Notions(props:any) {
    const [data,setData] = useState([])
    const getList = async () => {
        try{
        const res = await listnotions(userID)
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
