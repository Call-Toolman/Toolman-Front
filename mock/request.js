export default {
  'GET /api/request_list': {
    result: 'success',
    callupinfo: [
      {
        id: 1,
        owner: 'user',
        owner_id: 3,
        name: '北京南山滑雪场滑雪求组队',
        type: 1,
        city: ['北京市', '北京市', '海淀区'],
        description:
          '刚买了 HALTI 全套，打算在圣诞节附近，12/22 - 12/29 这一周去南山滑雪。我22岁，寻找一起滑雪的小伙伴。如果有一起想去的朋友可以联系我。',
        member: 1,
        end_time: '2020-12-25',
        img: 'pythonteacher.jpg',
        ctime: '2020-12-5',
        mtime: '2020-12-5',
        state: 2,
        requests: [
          {
            id: 1,
            user_id: 4,
            user_name: 'user1',
            description: '\u6211python\u8d3c\u597d',
            state: 1,
          },
        ],
      },
      {
        id: 2,
        owner: 'user',
        owner_id: 3,
        name: '求代写 Web 开发大作业',
        type: 1,
        city: ['北京市', '北京市', '海淀区'],
        description: '题目是“劳您驾”对接平台，有祖传代码优先。',
        member: 1,
        end_time: '2020-12-16',
        img: 'webteacher.jpg',
        ctime: '2020-12-5',
        mtime: '2020-12-5',
        state: 1,
        requests: [
          {
            id: 4,
            user_id: 4,
            user_name: 'user1',
            description: 'cnm\n',
            state: 2,
          },
        ],
      },
      {
        id: 3,
        owner: 'user',
        owner_id: 4,
        name: '100块出一个网恋的男朋友',
        type: 3,
        city: ['北京市', '北京市', '昌平区'],
        description: '聊了3个月，没见过面，连号一起出，不定期经常收到礼物、外卖那种...',
        member: 21312,
        end_time: '2021-12-25',
        img: 'no image',
        ctime: '2021-12-25',
        mtime: '2021-12-25',
        state: 2,
        requests: [],
      },
      {
        id: 4,
        owner: 'user1',
        owner_id: 4,
        name: '绿萝奥森公园志愿者招募',
        type: 3,
        city: ['北京市', '北京市', '海淀区'],
        description: '绿萝的家人们，在志愿北京上报名加群......',
        member: 1,
        end_time: '2020-12-29',
        img: 'no image',
        ctime: '2020-12-5',
        mtime: '2020-12-5',
        state: 2,
        requests: [
          {
            id: 3,
            user_id: 3,
            user_name: 'user',
            description: '\u6211\u4f1aReact',
            state: 1,
          },
        ],
      },
      {
        id: 5,
        owner: 'user1',
        owner_id: 4,
        name: '求小南门帮忙取下外卖',
        type: 1,
        city: ['北京市', '北京市', '海淀区'],
        description: '太冷了懒得动，5块钱请人帮取外卖，不准偷吃~',
        member: 1,
        end_time: '2020-12-29',
        img: 'cppteacher.jpg',
        ctime: '2020-12-5',
        mtime: '2020-12-5',
        state: 3,
        requests: [
          {
            id: 3,
            user_id: 3,
            user_name: 'user',
            description: '\u6211\u4f1aReact',
            state: 1,
          },
        ],
      },
      {
        id: 6,
        owner: 'zebgou',
        owner_id: 4,
        name: '重金劳驾代写毕业设计',
        type: 2,
        city: ['上海市', '上海市', '黄浦区'],
        description: '按期上交，能过就行（Python代写,Java代写,网页代写,金融代写,统计代写,EE代写,数学代写,物理代写）',
        member: 21312,
        end_time: '2021-12-25',
        img: 'cppteacher.jpg',
        ctime: '2021-12-25',
        mtime: '2021-12-25',
        state: 2,
        requests: [],
      },
    ],
  },

  'POST /api/user/add_request': async (req, res) => {
    console.log(req.body);
    res.send({
      status: 'ok',
    });
  },

  'POST /api/user/update_request': async (req, res) => {
    console.log(req.body);
    res.send({
      status: 'ok',
    });
  },

  'POST /api/user/add_response': async (req, res) => {
    console.log(req.body);
    res.send({
      status: 'ok',
    });
  },

  'POST /api/user/update_response': async (req, res) => {
    console.log(req.body);
    res.send({
      status: 'ok',
    });
  },

  'POST /api/user/manage_response': async (req, res) => {
    console.log(req.body);
    res.send({
      status: 'ok',
    });
  },
};
