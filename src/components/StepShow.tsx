import React from 'react';
import { Steps, Popover } from 'antd';
//a component shows customs step
const { Step } = Steps;
export interface StepItem {
  title: string;
  description: string;
}
export interface StepShowProps {
  current: number;
  allStep: StepItem[];
}

const StepShow: React.FunctionComponent<StepShowProps> = ({
  current,
  allStep,
}) => {
  console.log(current);
  console.log(allStep);
  const SimpleDot = (dot, { status, index }) => (
    <Popover content={<span>{allStep[index].description}</span>}>{dot}</Popover>
  );
  return (
    <Steps current={current} progressDot={SimpleDot} responsive={true}>
      {allStep.map(step => (
        <Step title={step.title} />
      ))}
    </Steps>
  );
};

export default StepShow;
