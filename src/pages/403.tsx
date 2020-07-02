import React from 'react';
import { Button, Result } from 'antd';
import { history } from 'umi';

export default () => (
  <Result
    status="403"
    title="403"
    subTitle="对不起，你没有权限访问该页面。"
    extra={
      <Button type="primary" onClick={() => history.push('/login')}>
        去登陆
      </Button>
    }
  />
);

