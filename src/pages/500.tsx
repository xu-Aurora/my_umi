import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';

export default () => (
  <Result
    status="500"
    title="500"
    subTitle="对不起, 服务器发生了错误。"
    extra={
      <Button type="primary" onClick={() => history.push('/layouts')}>
        返回首页
      </Button>
    }
  />
);

