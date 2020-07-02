import React, { useState, FC } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect, Dispatch } from 'umi';
import { LoginParams } from '@/api/login';

import styles from './index.less';

interface LoginProps {
  dispatch: Dispatch;
  loading: boolean;
}

const NormalLoginForm: FC<LoginProps> = ({ dispatch, loading }) => {

  const [check, setCheck] = useState<string>('off')

  // Partial<>    给它每个key都加个问号，实现可选
  const onFinish = (values: Partial<LoginParams>) => {

    dispatch({
      type: "login/login", 
      payload: values
    })

  };

  const checkbox = (e: any) => {
    setCheck(e.target.checked === true ? 'on' : 'off')
  }

  return (
    <div className={styles.login}>
      <Form
        name="normal_login"
        className={styles.login_form}
        // initialValues={{ remember: true }}
        onFinish={ onFinish }
      >
        <Form.Item
          name="userCode"
          label="userCode"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input autoComplete={check} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="passWord"
          label="Password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            autoComplete={check}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item valuePropName="checked" noStyle>
            <Checkbox onChange={(e) => checkbox(e)}>记住我</Checkbox>
          </Form.Item>

          <a className={styles.login_form_forgot} href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className={styles.login_form_button}>
            登陆
          </Button>
          Or <a href="" style={{color: '#1890ff'}}>注册!</a>
        </Form.Item>
      </Form>

    </div>
  );
};

interface Ilogin {
  loading: {
    models: { [key: string]: boolean };
  }
}

export default connect(
  ({ loading }: Ilogin) => ({
    loading: loading.models.hero
  })
)(NormalLoginForm);