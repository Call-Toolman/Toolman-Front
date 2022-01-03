import React, { useState, useEffect } from 'react';
import { strict as assert } from 'assert';
import {
  Space,
  Modle,
  Button,
  From,
  Input,
  Card,
  Table,
  BackTop,
  Radio,
  Form,
  Switch,
  InputNumber,
  Row,
  Col,
  message,
} from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import ProCard from '@ant-design/pro-card';
import styles from './index.less';
import logo from '../../assets/logo-full.png';
import request from '../../utils/request';

import {
  PhoneOutlined,
  IdcardOutlined,
  HomeOutlined,
  EditOutlined,
  CrownTwoTone,
} from '@ant-design/icons';

class Info extends React.Component {
  // const intl = useIntl();
  state = {
    id: 0,
    username: '',
    user_type: '',
    level: 0,
    real_name: '',
    identity_type: 0,
    identity_num: '',
    city: [],
    signup_time: '',
    modify_time: '',
    phone_num: '',
    description: '',
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  async componentDidMount() {
    const initData = (await request.get('/api/user/get_profile')).data;
    console.log('init values');
    console.log(initData);
    this.setState(initData, () => {
      this.formRef.current.setFieldsValue({
        username: this.state.username,
        user_type: this.state.user_type,
        level: this.state.level,
        real_name: this.state.real_name,
        identity_type: this.state.identity_type,
        identity_num: this.state.identity_num,
        city: this.state.city,
        signup_time: this.state.signup_time,
        modify_time: this.state.modify_time,
        phone_num: this.state.phone_num,
        description: this.state.description,
      });
    });
    console.log(this.state);
  }

  onFinish = async (values) => {
    try {
      console.log(values);
      await request.post('/api/user/update_profile', values);

      message.success('修改成功');
    } catch (e) {
      message.error(e.toString(), '修改失败！');
    }
  };

  render() {
    return (
      <PageHeaderWrapper>
        <ProCard style={{ marginTop: 8 }} gutter={8} ghost layout="center">
          <ProCard layout="center" bordered>
            <Form
              layout="horizontal"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              initialValues={{
                username: this.state.username,
                user_type: this.state.user_type,
                level: this.state.level,
                real_name: this.state.real_name,
                identity_type: this.state.identity_type,
                identity_num: this.state.identity_num,
                city: this.state.city,
                signup_time: this.state.signup_time,
                modify_time: this.state.modify_time,
                phone_num: this.state.phone_num,
                description: this.state.description,
              }}
              ref={this.formRef} //这里注册一下ref
              onFinish={this.onFinish}
            >
              <Space direction="vertical">
                <Form.Item name="username" label="用户名称">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="user_type" label="用户类型">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="level" label="用户等级">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="real_name" label="真实姓名">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="identity_type" label="证件类型">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="identity_num" label="证件号码">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="city" label="城市社区">
                  <Input disabled />
                </Form.Item>
              </Space>
              <Space direction="vertical">
                <Form.Item name="signup_time" label="注册时间">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="modify_time" label="修改时间">
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  name="phone_num"
                  label="手机号码"
                  rules={[{ required: true, message: 'Please input phone_num' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="个人简介"
                  rules={[{ required: true, message: 'Please input Intro' }]}
                >
                  <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item name="password" label="用户密码" rules={[{ required: true }]}>
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    修改
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </ProCard>

          <ProCard colSpan="42%" layout="center" bordered>
            <Space direction="vertical">
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>

              <ProCard>
                <Row>
                  <span className={styles.title}>Toolman</span>
                </Row>
                <Row>
                  <FormattedMessage
                    id="pages.layouts.userLayout.title"
                    defaultMessage="Toolman: Make Toolman Great Again"
                  />
                </Row>
              </ProCard>
            </Space>
          </ProCard>
        </ProCard>
      </PageHeaderWrapper>
    );
  }
}

export default Info;
