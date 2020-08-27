import React from 'react'
import { Card,Button } from 'antd';
//活动列表
function ListAct(props:any) {
    return (
        <div>
            活动列表
            <Card title="Card title" bordered={false} extra={<Button onClick={p => props.history.push('/home/admin/createact')}>新建</Button>} style={{ width:'100%',height:'100%' }}>

            </Card>
        </div>
    )
}

export default ListAct
