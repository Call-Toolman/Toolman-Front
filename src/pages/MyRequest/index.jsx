import React, { useState, useEffect } from 'react';
import { Affix, TreeSelect, Layout, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, SelectLang, useIntl, connect, FormattedMessage, history } from 'umi';
import { AudioOutlined } from '@ant-design/icons';

import { Cards } from '../Cards.js';
import { AddRequest } from '../AddRequest.js';

class MyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      showtype: 2, // 1. 广场 2. 我的劳驾 3. 我的接驾 4. 管理
      specificType: 0, // 0-5
      searchKey: '',
      requestStatus: 0,
      city: [],
    };
  }

  receiver = () => {
    // no-op
  };

  receiverCreator = (handler) => {
    this.receiver = handler;
  };

  trigger = () => {
    this.receiver && this.receiver();
  };

  render() {
    const {
      currentUser = {
        username: '',
      },
    } = this.props;


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
              <AddRequest userVars={currentUser} trigger={this.trigger} />
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
                receiverCreator={this.receiverCreator}
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
}))(MyRequest);
