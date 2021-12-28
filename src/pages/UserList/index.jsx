import React, { useState, useEffect } from 'react';
import { Table, Layout, message } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, FormattedMessage, history } from 'umi';
import { AudioOutlined } from '@ant-design/icons';

import request from '../../utils/request';

class MyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      showtype: 2, // 1. 广场 2. 我的劳驾 3. 我的接驾 4. 管理
      specificType: 0, // 0-5
      searchKey: '',
      requestStatus: 0,
      community: '北京市',
    };
  }

  render() {
    const {
      currentUser = {
        username: '',
      },
      menu,
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Layout>
          <Layout.Content className="content-back">
            <UList />
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    );
  }
}

const columns1 = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '电话号',
    dataIndex: 'phone_num',
  },
  {
    title: '简介',
    dataIndex: 'description',
  },
  {
    title: '真实姓名',
    dataIndex: 'real_name',
  },
  {
    title: '用户类型',
    dataIndex: 'user_type',
  },
  {
    title: '证件类型',
    dataIndex: 'identity_type',
  },
  {
    title: '证件号',
    dataIndex: 'identity_num',
  },
  {
    title: '等级',
    dataIndex: 'level',
  },
  {
    title: '城市',
    dataIndex: 'city',
  },
  {
    title: '社区',
    dataIndex: 'community',
  },
];

const UList = () => {
  const [listUserData, setListUserData] = useState([]);

  const getUser = async () => {
    try {
      let json = (await request.get('/api/admin/user_list')).data;
      const tempList = [];
      console.log(json);
      for (let i = 0; i < json.userinfo.length; i++) {
        let user = json.userinfo[i];
        tempList.push(user);
      }
      setListUserData(tempList);
    } catch (e) {
      message.error(e.toString());
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <Table dataSource={listUserData} columns={columns1} />;
};

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(MyRequest);
