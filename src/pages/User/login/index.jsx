import {
  GithubOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  WechatOutlined,
  UserOutlined,
  WeiboCircleOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, message, Cascader, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, {
  ProFormCaptcha,
  ProFormSelect,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import { getFakeCaptcha } from '@/services/login';
import styles from './index.less';

import options from '../../../utils/city.js';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState('login');
  const intl = useIntl();

  const handleSubmit = (values) => {
    console.log(values);
    const { dispatch } = props;
    if (type === 'login') {
      values = { ...values, ['grant_type']: 'password' };
      dispatch({
        type: 'login/login',

        payload: { ...values, type },
      });
    } else {
      values = { ...values, ['role']: 'admin' };
      {
        /* add role to register */
      }
      dispatch({
        type: 'login/signup',
        payload: { ...values, type },
      });
    }
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="login"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: 'Account password login',
            })}
          />
          <Tabs.TabPane
            key="signup"
            tab={intl.formatMessage({
              id: 'pages.login.accountSignUp.tab',
              defaultMessage: 'Account sign up',
            })}
          />
        </Tabs>

        {status === 'error' && loginType === 'login' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: 'Incorrect account or password（admin/ant.design)',
            })}
          />
        )}
        {/* login */}
        {type === 'login' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Username: admin or user',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please enter user name!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'Password: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please enter password！"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {status === 'error' && loginType === 'signup' && !submitting && (
          <LoginMessage content="Verification code error" />
        )}

        {/* signup */}
        {type === 'signup' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Please input user name！',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please enter user name!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'Password: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please enter password！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              name="real_name"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.realname.placeholder',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.realname.required"
                      defaultMessage="Please enter user name!"
                    />
                  ),
                },
              ]}
            />
            <ProFormSelect
              // label="证件类型"
              name="identity_type"
              fieldProps={{
                size: 'large',
                prefix: <IdcardOutlined className={styles.prefixIcon} />,
              }}
              options={[
                {
                  value: 1,
                  label: '身份证',
                },
                {
                  value: 2,
                  label: '护照',
                },
              ]}
              placeholder={intl.formatMessage({
                id: 'pages.login.idtype.placeholder',
                defaultMessage: '证件类型',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.idtype.required"
                      defaultMessage="Please enter type of certificate!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText
              name="identity_num"
              fieldProps={{
                size: 'large',
                prefix: <IdcardOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.idnumber.placeholder',
                defaultMessage: '证件号码',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.idnumber.required"
                      defaultMessage="请输入证件号码！"
                    />
                  ),
                },
              ]}
            />
            <ProForm.Item
              name="city"
              prefixIcon={<UserOutlined className={styles.prefixIcon} />}
              rules={[
                {
                  type: 'array',
                  required: true,
                  message: 'Please select your habitual residence!',
                },
              ]}
            >
              <Cascader
                size="large"
                options={options.options}
                placeholder="居住地区"
              />
            </ProForm.Item>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={styles.prefixIcon} />,
              }}
              name="phone_num"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormText
              name="description"
              initialValue={""}
              fieldProps={{
                size: 'large',
                prefix: <InfoCircleOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.description.placeholder',
                defaultMessage: '个人介绍',
              })}
              rules={[
                {
                  required: false,
                },
              ]}
            />
          </>
        )}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="Auto login" />
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
            onClick={() => message.warn('请联系管理员！')}
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Forget password" />
          </a>
        </div>
      </ProForm>
      <Space className={styles.other}>
        <FormattedMessage id="pages.login.loginWith" defaultMessage="Other login methods" />
        <GithubOutlined className={styles.icon} />
        <WechatOutlined className={styles.icon} />
        <WeiboCircleOutlined className={styles.icon} />
      </Space>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
