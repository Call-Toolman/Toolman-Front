import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link, SelectLang, useIntl, connect, FormattedMessage, history } from 'umi';

import { Cards } from '../Cards.js';

class MyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      showtype: 3, // 1. 广场 2. 我的劳驾 3. 我的接驾 4. 管理
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
    } = this.props;

    return (
      <PageHeaderWrapper>
        <Layout>
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
}))(MyRequest);
