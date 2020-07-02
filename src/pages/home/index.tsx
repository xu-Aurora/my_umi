import React, { useState, useCallback } from 'react';
import { Button } from "antd";
import isEmpty from "lodash/isEmpty";

export default () => {

  const [count, setCount] = useState<number>(0)

  const click = () => {
    setCount((count) => count + 1)
  }
  const uclick = useCallback(() => {
    setCount((count) => count + 1)
  }, [count])

  const arr: string[] = []

  console.log(isEmpty(arr))


  return (
    <div>
      <div>{ count }</div>
      <Button onClick={click}>普通点击</Button> 
      <Button onClick={uclick}>usecallback</Button> 
    </div>
  );
}
