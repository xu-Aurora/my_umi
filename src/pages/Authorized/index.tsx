import React from 'react';
import { Authorized } from '@alitajs/antd-plus';
import { Policy } from '@alitajs/antd-plus/lib/authorized';
import { Button } from "antd";


const AuthorizedPlus = (props: any) => {
  // 描述有哪些权限种类的按钮
  const actions = [
    { module: 'module1', action: 'admin' },
    { module: 'module1', action: 'action2' },
  ];
  const policy = new Policy(actions);
  
  // 控制权限按钮，这里指module1下的所有actions都有权限
  policy.addPolicy({
    version: 1,
    statement: [
      {
        effect: 'allow',
        action: [
          'module1/*'
        ]
      }
    ]
  });
  
  return (
    <Authorized {...props} policy={policy} />
  )
}

const NoAuth = () => {
  return (
    <span style={{ color: '#ff4d4f' }}>no auth</span>  
  )
}



const authorized = () => {
  return(
    <div className="authorized-demo">
      {/* authority属性控制按钮的显示或隐藏，noMatch没有权限的话展示的页面  */}
      <AuthorizedPlus authority="module1/admin">
        <Button type="primary">操作1</Button>
      </AuthorizedPlus>
      
      <AuthorizedPlus authority="module2/action1" noMatch={<NoAuth />}>
        <Button type="primary">操作3</Button>
      </AuthorizedPlus> 
    </div>
  )
}

export default authorized;

