import React, { useState, useEffect } from 'react';
import {
  Space,
  Card,
  Modal,
  Descriptions,
  Popconfirm,
  Badge,
  Avatar,
  Spin,
  Popover,
  message,
  Layout,
  Button,
  Typography,
  Row,
  Col,
  Input,
  List,
  Upload,
} from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';

import poster1 from '../assets/cards/1.png';
import poster2 from '../assets/cards/2.png';
import poster3 from '../assets/cards/3.png';
import poster4 from '../assets/cards/4.png';
import poster5 from '../assets/cards/5.png';
import poster6 from '../assets/cards/6.png';
import poster7 from '../assets/cards/7.png';
import poster8 from '../assets/cards/8.png';
import poster9 from '../assets/cards/9.png';
import poster10 from '../assets/cards/10.png';
import { Select, Form, DatePicker, InputNumber } from 'antd';

import moment from 'moment';
import request from '../utils/request';
import { get } from 'lodash';

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

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

export const Cards = (props) => {
  const [callupList, setCallupList] = useState([]);
  const [detail, setDetail] = useState({ id: '' });
  const [requests, setRequests] = useState([]);
  const [realRequests, setRealRequests] = useState([]); // 正在进行的申请

  const [myReq, setMyReq] = useState({ user_id: '' });
  const [newDescription, setNewDescription] = useState('');
  const [visbleManageResponse, setVisbleManageResponse] = useState(false);
  const [visbleUpdateResponse, setVisbleUpdateResponse] = useState(false);
  const [visbleAddResponse, setVisbleAddResponse] = useState(false);
  const [visbleUpdateRequest, setVisbleUpdateRequest] = useState(false);
  const { Paragraph } = Typography;
  const { TextArea } = Input;
  const calluplist = ['科学空间', '学术探讨', '社会实践', '娱乐天地', '其他类型'];

  const reqstate = [
    { color: '#F4D03F', text: '待处理' },
    { color: '#58D68D', text: '已批准' },
    { color: '#EC7063', text: '已拒绝' },
    { color: '#99A3A4', text: '已取消' },
  ];

  const callupstate = [
    { color: '#58D68D', text: '已完成' },
    { color: '#F4D03F', text: '待响应' },
    { color: '#99A3A4', text: '已取消' },
    { color: '#EC7063', text: '已过期' },
  ];
  const posterList = [
    poster1,
    poster2,
    poster3,
    poster4,
    poster5,
    poster6,
    poster7,
    poster8,
    poster9,
    poster10,
  ];

  const getCallup = async () => {
    const showtype = props.showtype;
    var count = 0;
    var participate = false;

    try {
      let json = (await request.get('/api/request_list')).data;

      const tempCallupList = [];
      console.log(json);

      // 过滤
      json.callupinfo.forEach((callup) => {
        let callup_city_array = callup.city.split("-")
        if (
          (props.specificType == 0 || props.specificType == callup.type) &&
          (props.requestStatus == 0 || props.requestStatus == callup.state) &&
          (props.city.length == 0 ||
            arrayEquals(props.city, callup_city_array.slice(0, props.city.length))) &&
          callup.name.search(props.searchKey) != -1
        )
          tempCallupList.push(callup);
      });

      // 按行分组
      const newCallupList = [];
      tempCallupList.forEach((callup, index) => {
        if (showtype == 2) {
          if (callup.owner === props.userVars.username) {
            if (count % 4 === 0) newCallupList.push([]);
            newCallupList[newCallupList.length - 1].push(callup);
            count = count + 1;
          }
        } else if (showtype == 3) {
          participate = false;
          for (let i = 0; i < callup.requests.length; i++) {
            if (callup.requests[i].user_name === props.userVars.username) {
              participate = true;
            }
          }
          if (participate) {
            if (count % 4 === 0) newCallupList.push([]);
            newCallupList[newCallupList.length - 1].push(callup);
            count = count + 1;
          }
        } else {
          if (index % 4 === 0) newCallupList.push([]);
          newCallupList[newCallupList.length - 1].push(callup);
        }
      });
      setCallupList(newCallupList);

      console.log(callupList);
    } catch (e) {
      message.error(e.toString());
    }
  };

  useEffect(getCallup, [
    props.showtype,
    props.specificType,
    props.requestStatus,
    props.city,
    props.searchKey,
  ]);

  props.receiverCreator && props.receiverCreator(getCallup);

  const showDetail = (callup) => {
    setMyReq({ user_id: '' });
    var accept = 0;
    for (let i = 0; i < callup.requests.length; i++) {
      if (callup.requests[i].user_name === props.userVars.username) {
        setMyReq(callup.requests[i]);
      }
      if (callup.requests[i].state === 2) {
        accept = accept + 1;
      }
    }

    setRequests(callup.requests);
    let tempResponses = [];

    callup.requests.forEach((response) => {
      if (response.state == 1) {
        tempResponses.push(response);
      }
    });

    setRealRequests(tempResponses);

    setDetail({ ...callup, acceptReq: accept });
  };

  const callupCards = callupList.map((callupGroup, group_idx) => (
    <Space key={group_idx} size={50}>
      {callupGroup.map((callup) => (
        <Card
          key={callup.id}
          hoverable
          onClick={(e) => {
            showDetail(callup);
            // e.stopPropagation();
          }}
          style={{ width: 260 }}
          cover={<img src={posterList[callup.id % 10]} alt="poster" />}
        >
          <Card.Meta
            title={<Paragraph>{callup.name}</Paragraph>}
            description={
              <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                {callup.description}
              </Paragraph>
            }
          />
        </Card>
      ))}
    </Space>
  ));

  const [form] = Form.useForm();

  const showVisbleUpdateRequest = () => {
    form.setFieldsValue({
      title: detail.name,
      type: String(detail.type),
      endtime: moment(detail.end_time),
      population: detail.member,
      description: detail.description,
    });
    setVisbleUpdateRequest(true);
  };

  const updateRequest = async (values) => {
    console.log(values);
    const payload = {
      id: `${detail.id}`,
      title: values.title,
      type: values.type,
      endtime: values.endtime.format('YYYY-MM-DD'),
      description: values.description,
      population: `${values.population}`,
      img: 'no image',
    };
    console.log(payload);

    try {
      await request.post('/api/user/update_request', payload);
      message.success('修改劳驾成功！');
      handleOk();
    } catch (e) {
      message.error(e.toString());
    }
  };

  const cancelRequest = async (values) => {
    const payload = {
      id: `${detail.id}`,
    };

    try {
      console.log(payload);
      await request.post('/api/user/cancel_request', payload);
      message.success('取消劳驾成功！');
      handleOk();
    } catch (e) {
      message.error(e.toString());
    }
  };

  const handleCancel = () => {
    setVisbleUpdateRequest(false);
    setDetail({ id: '' });
  };

  const handleOk = () => {
    setVisbleUpdateRequest(false);
    setDetail({ id: '' });
    getCallup();
  };

  var d = new Date().format('yyyy-MM-dd');
  function disabledDate(current) {
    return current.format('YYYY-MM-DD') < d;
  }

  return (
    <>
      <Space className="main-col" align="left" direction="vertical">
        {callupCards}
      </Space>

      {/* 劳驾细节 */}
      <Modal
        centered
        width={1000}
        visible={detail.id}
        destroyOnClose={true}
        onCancel={() => setDetail({ id: '' })}
        title={<p style={{ fontSize: 30 }}>{detail.name}</p>}
        footer={[]}
      >
        <Spin spinning={!detail.id}>
          <Descriptions bordered>
            <Descriptions.Item label="劳驾描述" span={3}>
              {detail.description}
            </Descriptions.Item>
            <Descriptions.Item label="劳驾类型">{calluplist[detail.type - 1]}</Descriptions.Item>
            <Descriptions.Item label="发布者">{detail.owner}</Descriptions.Item>
            <Descriptions.Item label="城市社区">{detail.city}</Descriptions.Item>
            <Descriptions.Item label="结束时间">{detail.end_time}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{detail.ctime}</Descriptions.Item>
            <Descriptions.Item label="修改时间">{detail.mtime}</Descriptions.Item>
            <Descriptions.Item label="招募人数">{detail.member}</Descriptions.Item>
            <Descriptions.Item label="申请人数">{realRequests.length}</Descriptions.Item>
            <Descriptions.Item label="已批准人数">{detail.acceptReq}</Descriptions.Item>
            <Descriptions.Item label="状态">
              {!detail.id ? (
                <></>
              ) : (
                <Badge
                  color={callupstate[detail.state - 1].color}
                  text={callupstate[detail.state - 1].text}
                />
              )}
            </Descriptions.Item>
            {detail.owner === props.userVars.username ? (
              <>
                <Descriptions.Item label="操作">
                  <Space>
                    <Button
                      type="primary"
                      shape="round"
                      onClick={showVisbleUpdateRequest}
                      // style={{ marginLeft: 30 }}
                      disabled={detail.state !== 2}
                    >
                      修改劳驾
                    </Button>
                    <Popconfirm
                      // placement="topLeft"
                      title={'确认取消劳驾？'}
                      onConfirm={cancelRequest}
                      okText="Yes"
                      cancelText="No"
                      disabled={detail.state !== 2}
                    >
                      <Button type="primary" shape="round" disabled={detail.state !== 2}>
                        取消劳驾
                      </Button>
                    </Popconfirm>
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="管理申请">
                  {requests.length > 0 ? (
                    <Button
                      type="primary"
                      shape="round"
                      onClick={() => setVisbleManageResponse(true)}
                      disabled={detail.state !== 2}
                    >
                      管理接驾
                    </Button>
                  ) : (
                    '还没有用户申请!'
                  )}
                </Descriptions.Item>
              </>
            ) : (
              <Descriptions.Item label="我的申请" span={2}>
                {myReq.user_id ? (
                  <Row align="middle">
                    <Col span={5}>
                      <Badge
                        color={reqstate[myReq.state - 1].color}
                        text={reqstate[myReq.state - 1].text}
                      />
                    </Col>
                    <Col offset={1} span={5}>
                      <Space>
                        <Button
                          type="primary"
                          shape="round"
                          onClick={() => setVisbleUpdateResponse(true)}
                          disabled={detail.state !== 2 || myReq.state !== 1}
                        >
                          修改接驾
                        </Button>

                        <Popconfirm
                          // placement="topLeft"
                          title={'确认取消接驾？'}
                          disabled={detail.state !== 2 || myReq.state !== 1}
                          onConfirm={async () => {
                            const payload = {
                              id: myReq.id,
                              state: 4,
                            };
                            try {
                              await request.post('/api/user/manage_response', payload);
                              message.success('取消接驾成功！');
                              setVisbleManageResponse(false);
                              setDetail({ id: '' });
                              getCallup();
                            } catch (e) {
                              message.error(e.toString());
                            }
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type="primary"
                            shape="round"
                            disabled={detail.state !== 2 || myReq.state !== 1}
                          >
                            取消接驾
                          </Button>
                        </Popconfirm>
                      </Space>
                    </Col>
                  </Row>
                ) : (
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => setVisbleAddResponse(true)}
                    disabled={detail.state !== 2}
                  >
                    申请接驾
                  </Button>
                )}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Spin>
      </Modal>

      {/* 添加我的接驾 */}
      <Modal
        centered
        visible={visbleAddResponse}
        destroyOnClose={true}
        onCancel={() => {
          setVisbleAddResponse(false);
          setDetail({ id: '' });
          getCallup();
        }}
        title="接驾申请"
        footer={[]}
      >
        <Form
          name="add_response"
          onFinish={async (values) => {
            const payload = {
              id: detail.id,
              user: props.userVars.username,
              description: values.description,
            };
            console.log(payload);
            try {
              await request.post('/api/user/add_response', payload);
              message.success('申请接驾成功!');
              setVisbleAddResponse(false);
              setDetail({ id: '' });
              getCallup();
            } catch (e) {
              message.error(e.toString());
            }
          }}
        >
          <Form.Item name="description" label="申请理由">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ align: 'right' }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 修改我的接驾 */}
      <Modal
        centered
        width={500}
        visible={visbleUpdateResponse}
        destroyOnClose={true}
        onCancel={() => {
          setVisbleUpdateResponse(false);
          setDetail({ id: '' });
          setNewDescription('');
          getCallup();
        }}
        title={'修改我的接驾'}
        footer={[]}
      >
        <Row align="middle" gutter={[16, 24]}>
          <Col offset={2} span={4}>
            <p style={{ margin: 0 }}>召集令</p>
          </Col>
          <Col offset={1} span={6}>
            <p style={{ margin: 0 }}>{detail.name}</p>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 24]}>
          <Col offset={2} span={4}>
            <p style={{ margin: 0 }}>申请理由</p>
          </Col>
          <Col offset={1} span={8}>
            <TextArea
              defaultValue={myReq.description}
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 24]}>
          <Col offset={7} span={4}>
            <Button
              type="primary"
              shape="round"
              onClick={async () => {
                const payload = {
                  id: myReq.id,
                  description: newDescription,
                };
                try {
                  await request.post('/api/user/update_response', payload);
                  message.success('接驾修改成功！');
                  setNewDescription('');
                  setVisbleUpdateResponse(false);
                  setDetail({ id: '' });
                  getCallup();
                } catch (e) {
                  message.error(e.toString());
                }
              }}
            >
              修改接驾
            </Button>
          </Col>
        </Row>
      </Modal>

      {/* 管理他人接驾 */}
      <Modal
        centered
        width={500}
        visible={visbleManageResponse}
        destroyOnClose={true}
        onCancel={() => {
          setVisbleManageResponse(false);
          setDetail({ id: '' });
          getCallup();
        }}
        title={'管理接驾'}
        footer={[]}
      >
        <List
          itemLayout="horizontal"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 4,
          }}
          dataSource={realRequests}
          renderItem={(item) => (
            <List.Item
              key={item.name}
              actions={[
                <Button
                  type="primary"
                  shape="circle"
                  onClick={async () => {
                    const payload = {
                      id: item.id,
                      state: 2,
                    };
                    try {
                      await request.post('/api/user/manage_response', payload);
                      message.success('接收接驾成功！');
                      setVisbleManageResponse(false);
                      setDetail({ id: '' });
                      getCallup();
                    } catch (e) {
                      message.error(e.toString());
                    }
                  }}
                  disabled={
                    detail.acceptReq >= detail.member || item.state === 2 || item.state === 4
                  }
                >
                  <CheckOutlined />
                </Button>,
                <Button
                  shape="circle"
                  onClick={async () => {
                    const payload = {
                      id: item.id,
                      state: 3,
                    };
                    try {
                      await request.post('/api/user/manage_response', payload);
                      message.success('拒绝接驾成功！');
                      setVisbleManageResponse(false);
                      // setDetail({ id: '' });
                      getCallup();
                    } catch (e) {
                      message.error(e.toString());
                    }
                  }}
                  disabled={item.state === 3 || item.state === 4}
                >
                  <CloseOutlined />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<UserOutlined style={{ fontSize: 20 }} />}
                title={
                  <p style={{ fontSize: 16, fontWeight: 'bold', margin: 0, padding: 0 }}>
                    {item.user_name}
                  </p>
                }
                description={
                  <p style={{ fontSize: 14, margin: 0, padding: 0 }}>{item.description}</p>
                }
                style={{ margin: 0, padding: 0 }}
              />
            </List.Item>
          )}
        />
      </Modal>

      {/* 修改劳驾 */}
      <Modal
        title={<div style={{ fontSize: 20 }}>修改劳驾</div>}
        centered
        width={910}
        visible={visbleUpdateRequest}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={null}
      >
        <Form
          name="visbleUpdateRequest"
          form={form}
          initialValues={{ remember: true }}
          onFinish={(values) => updateRequest(values)}
          preserve={false}
        >
          <Layout style={{ backgroundColor: 'white', height: 300, marginTop: 15, marginLeft: 15 }}>
            <Layout style={{ backgroundColor: 'transparent' }}>
              <Layout.Sider width={550} style={{ backgroundColor: 'transparent' }}>
                <Layout width={450} style={{ backgroundColor: 'transparent' }}>
                  <Layout height={300} style={{ backgroundColor: 'transparent' }}>
                    <Layout.Sider width={380} style={{ backgroundColor: 'transparent' }}>
                      <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                      >
                        <Input
                          placeholder="Title"
                          autoComplete="off"
                          style={{ width: 330 }}
                          // defaultValue={detail.name}
                        />
                      </Form.Item>
                    </Layout.Sider>

                    <Layout.Content>
                      <Form.Item
                        name="type"
                        rules={[{ required: true, message: 'Please choose the type!' }]}
                      >
                        <Select
                          style={{ width: 120 }}
                          // defaultValue={String(detail.type)}
                        >
                          <Select.Option value="1">科学空间</Select.Option>
                          <Select.Option value="2">快递搬运</Select.Option>
                          <Select.Option value="3">社会实践</Select.Option>
                          <Select.Option value="4">娱乐天地</Select.Option>
                          <Select.Option value="5">其他类型</Select.Option>
                        </Select>
                      </Form.Item>
                    </Layout.Content>
                  </Layout>

                  <Layout height={300} style={{ backgroundColor: 'transparent' }}>
                    <Layout.Sider width={250} style={{ backgroundColor: 'transparent' }}>
                      <Form.Item
                        name="endtime"
                        rules={[{ required: true, message: 'Please input the end date!' }]}
                      >
                        <DatePicker
                          placeholder="Finish date"
                          disabledDate={disabledDate}
                          inputReadOnly
                          style={{ width: 200 }}
                          // defaultValue={moment(detail.end_time)}
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
                          style={{ width: 120 }}
                          // defaultValue={detail.member}
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
                      // defaultValue={detail.description}
                      style={{ width: 500 }}
                    />
                  </Form.Item>
                </Layout>
              </Layout.Sider>

              <Layout.Content>
                <Form.Item
                  name="image"
                  rules={[{ required: false, message: 'Please upload the event picture!' }]}
                >
                  {/* <Upload {...pppp}> */}
                  <Upload>
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

// export default Squere;
