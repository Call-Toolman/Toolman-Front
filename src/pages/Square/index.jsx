import React, { useState, useEffect } from 'react';
import { Affix, Space, Cascader, Select, TreeSelect, Layout, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, SelectLang, useIntl, connect, FormattedMessage, history } from 'umi';
import { AudioOutlined } from '@ant-design/icons';
import options from '../../utils/city.js';

import { Cards } from '../Cards.js';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      showtype: 1, // 1. 广场 2. 我的劳驾 3. 我的接驾 4. 管理
      specificType: 0, // 0-5
      searchKey: '',
      requestStatus: 0,
      city: [],
    };
  }

  render() {
    const {
      currentUser = {
        username: '',
      },
      menu,
    } = this.props;

    const { Search } = Input;
    const { TreeNode } = TreeSelect;

    const suffix = (
      <AudioOutlined
        style={{
          color: '#1890ff',
        }}
      />
    );

    return (
      <PageHeaderWrapper>
        <Layout>
          <Affix offsetTop={0}>
            <Layout.Header
              style={{
                padding: 0,
                backgroundColor: '#ffffff',
              }}
              background="transparent"
              backgroundColor="transparent"
            >
              <Space>
                <Search
                  placeholder="input search text"
                  enterButton="Search"
                  allowClear
                  suffix={suffix}
                  onSearch={(value) => {
                    this.setState({ searchKey: value });
                  }}
                  style={{
                    width: 300,
                    margin: '16px 26px',
                  }}
                />

                <Select
                  defaultValue="0"
                  style={{ width: 120 }}
                  onChange={(value) => {
                    this.setState({ requestStatus: value });
                  }}
                >
                  <Select.Option value="0">全部状态</Select.Option>
                  <Select.Option value="1">已完成</Select.Option>
                  <Select.Option value="2">待响应</Select.Option>
                  <Select.Option value="3">已取消</Select.Option>
                  <Select.Option value="4">已过期</Select.Option>
                </Select>

                <Select
                  defaultValue="0"
                  style={{ width: 120 }}
                  onChange={(value) => {
                    this.setState({ specificType: value });
                  }}
                >
                  <Select.Option value="0">全部类型</Select.Option>
                  <Select.Option value="1">科学空间</Select.Option>
                  <Select.Option value="2">快递搬运</Select.Option>
                  <Select.Option value="3">社会实践</Select.Option>
                  <Select.Option value="4">娱乐天地</Select.Option>
                  <Select.Option value="5">其他类型</Select.Option>
                </Select>

                <Cascader
                  options={options.options}
                  style={{ width: 200 }}
                  onChange={(value) => {
                    this.setState({ city: value });
                  }}
                  placeholder="选择地区"
                  changeOnSelect
                />
              </Space>
            </Layout.Header>
          </Affix>

          <Layout.Content className="content-back">
            <div
              className="card-area"
              style={{
                marginTop: 30,
                marginLeft: 30,
              }}
            >
              <Cards
                userVars={currentUser}
                showtype={this.state.showtype}
                specificType={this.state.specificType}
                requestStatus={this.state.requestStatus}
                city={this.state.city}
                searchKey={this.state.searchKey}
              />
            </div>
          </Layout.Content>
        </Layout>
      </PageHeaderWrapper>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(Square);
