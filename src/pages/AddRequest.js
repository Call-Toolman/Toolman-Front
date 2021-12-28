import React, { useState } from 'react';
import { Modal, Layout, Button, Upload, message, Input, Select, DatePicker } from 'antd';
import { Divider, InputNumber, Form } from 'antd';
import { moment } from 'moment';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import request from '../utils/request';
import { useHistory } from 'react-router-dom';
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  EditOutlined,
} from '@ant-design/icons';

Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return fmt;
};

export const AddRequest = (props) => {
  var d = new Date().format('yyyy-MM-dd');
  function disabledDate(current) {
    return current.format('YYYY-MM-DD') < d;
  }

  const [form] = Form.useForm();

  const callUpSubmit = async (values) => {
    console.log(values);
    const payload = {
      // username: props.userVars.user,
      title: values.title,
      type: values.type,
      endtime: values.endtime.format('YYYY-MM-DD'),
      description: values.description,
      population: `${values.population}`,
      img: 'no image',
    };
    console.log(payload);

    try {
      await request.post('/api/user/add_request', payload);
      message.success('添加劳驾成功！');
    } catch (e) {
      message.error(e.toString());
      form.resetFields();
    }
    props.trigger()
    handleOk();
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const pppp = {
    name: 'thisisafile',
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="default"
        onClick={showModal}
        style={{
          // marginLeft: 60
          margin: '16px 26px',
        }}
      >
        添加劳驾
      </Button>

      <Modal
        title={<div style={{ fontSize: 20 }}>添加劳驾</div>}
        centered
        width={910}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
      >
        <Form
          form={form}
          name="addCallUp"
          initialValues={{ remember: true }}
          onFinish={(values) => callUpSubmit(values)}
          preserve={false}
        >
          <Layout
            style={{
              backgroundColor: 'white',
              height: 300,
              marginTop: 15,
              marginLeft: 15,
            }}
          >
            <Layout
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Layout.Sider
                width={550}
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                <Layout
                  width={450}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <Layout
                    height={300}
                    style={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    <Layout.Sider
                      width={380}
                      style={{
                        backgroundColor: 'transparent',
                      }}
                    >
                      <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                      >
                        <Input
                          placeholder="Title"
                          autoComplete="off"
                          style={{
                            width: 330,
                          }}
                        />
                      </Form.Item>
                    </Layout.Sider>

                    <Layout.Content>
                      <Form.Item
                        name="type"
                        rules={[{ required: true, message: 'Please choose the type!' }]}
                      >
                        <Select style={{ width: 120 }}>
                          <Select.Option value="1">科学空间</Select.Option>
                          <Select.Option value="2">快递搬运</Select.Option>
                          <Select.Option value="3">社会实践</Select.Option>
                          <Select.Option value="4">娱乐天地</Select.Option>
                          <Select.Option value="5">其他类型</Select.Option>
                        </Select>
                      </Form.Item>
                    </Layout.Content>
                  </Layout>

                  <Layout
                    height={300}
                    style={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    <Layout.Sider
                      width={250}
                      style={{
                        backgroundColor: 'transparent',
                      }}
                    >
                      <Form.Item
                        name="endtime"
                        rules={[{ required: true, message: 'Please input the end date!' }]}
                      >
                        <DatePicker
                          placeholder="Finish date"
                          disabledDate={disabledDate}
                          inputReadOnly
                          style={{
                            width: 200,
                          }}
                        />
                      </Form.Item>
                    </Layout.Sider>

                    <Layout.Content>
                      <Form.Item
                        name="population"
                        rules={[{ required: true, message: 'Please input the person number!' }]}
                      >
                        <InputNumber
                          min={1}
                          placeholder="Population"
                          style={{
                            width: 120,
                          }}
                        />
                      </Form.Item>
                    </Layout.Content>
                  </Layout>

                  <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                  >
                    <Input.TextArea
                      placeholder="Discription"
                      showCount
                      maxLength={140}
                      rows={4}
                      autoComplete="off"
                      style={{
                        width: 500,
                      }}
                    />
                  </Form.Item>
                </Layout>
              </Layout.Sider>

              <Layout.Content>
                <Form.Item
                  name="image"
                  rules={[{ required: false, message: 'Please upload the event picture!' }]}
                >
                  <Upload {...pppp}>
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        width: 240,
                        height: 180,
                      }}
                    >
                      upload
                    </Button>
                  </Upload>
                </Form.Item>
              </Layout.Content>
            </Layout>

            <Layout style={{ backgroundColor: 'transparent' }}>
              <Row gutter={16} justify="end" style={{ marginRight: 10 }}>
                <Col>
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Col>

                <Col>
                  <Form.Item>
                    <Button key="submit" type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Layout>
          </Layout>
        </Form>
      </Modal>
    </>
  );
};
