import React from 'react'
import {Tag} from 'antd'
function Labels(props:object) {//管理标签的组件
    return (
        <div className="note-labels" >
             {props.labels.map(label=>{
                  switch(label){
                    case'读书会':return(<Tag color="geekblue">读书会</Tag>)
                    case'线下':return(<Tag color="gold">线下</Tag>)
                    case'线上':return(<Tag color="pink">线上</Tag>)
                    case'周五影院':return(<Tag color='purple'>周五影院</Tag>)
                    case'师兄师姐说':return(<Tag color='green'>师兄师姐说</Tag>)
                    case'绘本故事':return(<Tag color='magenta'>绘本故事</Tag>)
                    case'观影沙龙':return(<Tag color='volcano'>观影沙龙</Tag>)
                    default:return null;
                  }
                })}
      </div>
    )
}

export default Labels
