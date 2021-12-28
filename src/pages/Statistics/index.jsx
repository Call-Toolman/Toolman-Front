import React, { useState, useEffect } from 'react';
import {
  Card,
  Space,
  Cascader,
  Table,
  DatePicker,
  BackTop,
  Button,
  Form,
  Input,
} from 'antd';
import request from '../../utils/request';
import { Pie, Line } from '@ant-design/charts';
import ProCard from '@ant-design/pro-card';
import {
  SearchOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import moment from 'moment';
import { getType } from '../../utils/utils';

import options from '../../utils/city.js';

const columns1 = [
  {
    title: '用户名',
    dataIndex: 'username',
    render: (_) => <a>{_}</a>,
    // 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
    filterDropdown: () => (
      <div style={{ padding: 8 }}>
        <Input style={{ width: 100, marginBottom: 8, display: 'block' }} />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  },
  {
    title: '等级',
    dataIndex: 'level',
    sorter: (a, b) => a.level - b.level,
  },
  {
    title: '城市社区',
    dataIndex: 'city',
    sorter: (a, b) => a.city - b.city,
  },
  {
    title: '中介费用',
    dataIndex: 'fee',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.fee - b.fee,
  },
  {
    title: '成交单数',
    dataIndex: 'count',
    sorter: (a, b) => a.count - b.count,
  },
];

const worker = {
  // room_id:
  range: [moment().subtract(1, 'year'), moment()],
  city: ['北京市'],
};

const { RangePicker } = DatePicker;

const MONTH_FORMAT = 'YYYY-MM';
const DAY_FORMAT = 'YYYY-MM-DD';

export default () => {
  const [data, setData] = useState([]);
  const [typeFee, setTypeFee] = useState([]);
  const [userData, setUserData] = useState([]);

  const config_fee = {
    data,
    xField: 'month',
    yField: 'fee',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v) => `${v} 元`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
  };

  const config_count = {
    data,
    xField: 'month',
    yField: 'count',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v) => `${v} 单`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
  };

  const config_type = {
    appendPadding: 10,
    data: typeFee,
    angleField: 'fee',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const handleSubmit = async (values) => {
    values['start_time'] = values.range[0].format(MONTH_FORMAT);
    values['end_time'] = values.range[1].format(MONTH_FORMAT);
    console.log(values);
    let report = (
      await request('/api/admin/report', {
        method: 'POST',
        data: values,
      })
    ).data;

    for (let key in report.month_data) {
      let type = report.month_data[key].type;
      report.month_data[key].type = getType(type);
    }

    for (let key in report.type_fee) {
      let type = report.type_fee[key].type;
      report.type_fee[key].type = getType(type);
    }

    console.log(report);

    setTypeFee(report.type_fee);
    setData(report.month_data);
    setUserData(report.user_data);
  };

  return (
    <PageHeaderWrapper>
      <Card id="basicUsage">
        <Form name="time_related_controls" onFinish={handleSubmit} initialValues={worker}>
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'right' }}>
            <Space
              direction="vertical"
              style={{
                width: 300,
                align: 'left top',
                justifyContent: 'center',
              }}
            >
              <Form.Item name="range" label="">
                <RangePicker style={{ width: 200 }} picker="month" />
              </Form.Item>
              <Form.Item name="city">
                <Cascader
                  options={options.options}
                  style={{ width: 200 }}
                  placeholder="选择地区"
                  changeOnSelect
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  查询数据
                </Button>
              </Form.Item>
            </Space>
            <ProCard title="中介费用" style={{ width: 800, height: 400 }}>
              <Line {...config_fee} />
            </ProCard>
          </Space>
        </Form>

        <Space>
          <ProCard title="费用类型" style={{ width: 400, height: 400 }}>
            <Pie align="right" {...config_type} />
          </ProCard>

          <ProCard title="成交单数" style={{ width: 800, height: 400 }}>
            <Line {...config_count} />
          </ProCard>
        </Space>
        <ProCard title="查看明细" collapsible>
          <Table dataSource={userData} columns={columns1} />
        </ProCard>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" disabled={false} onClick={window.print}>
            打印
          </Button>
        </Form.Item>
      </Card>
      <BackTop visibilityHeight={200} style={{ right: 50 }} />
    </PageHeaderWrapper>
  );
};
