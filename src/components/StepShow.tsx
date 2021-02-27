import React from 'react'
import { Steps } from 'antd';
//a component shows customs step
const { Step } = Steps;
export interface StepItem{
    title:string,
    description:string,
}
export interface StepShowProps {
    current:number,
    allStep:StepItem[]
}

const StepShow: React.SFC<StepShowProps> = ({current,allStep}) => {
    console.log(current)
    console.log(allStep)
    return ( <Steps current={current}>
        {allStep.map(step=>
            <Step title={step.title} description={step.description} />
        )}
      </Steps> );
}
 
export default StepShow;