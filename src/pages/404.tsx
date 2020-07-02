import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';

export default () => (
  <Result
    status="404"
    title="404"
    subTitle="对不起, 您访问的页面不存在。"
    extra={
      <Button type="primary" onClick={() => history.push('/layouts')}>
        返回首页
      </Button>
    }
  />
);
