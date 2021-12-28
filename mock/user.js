const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req, res) {
  await waitTime(2000);
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET /api/user/get_profile': {
    id: 2,
    username: 'user',
    user_type: 'user',
    // user_type: 'admin',
    level: 1,
    real_name: '风清扬',
    identity_type: 1,
    identity_num: '511112111111111112',
    city: ['北京市', '北京市', '海淀区'],
    signup_time: '2021-12-12',
    modify_time: '2021-12-28',
    phone_num: '12345678911',
    description: "I'm Ultraman!!!",
  },

  'POST /api/user/update_profile': async (req, res) => {
    console.log(req.body);
    res.send({
      status: 'ok',
    });
  },

  'POST /api/login': async (req, res) => {
    const { password, username, type } = req.body;
    console.log(type);

    if (password === 'admin' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        current_authority: 'admin',
        access_token: 'fake_token',
      });
      return;
    }

    if (password === 'user' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        current_authority: 'user',
      });
      return;
    }

    res.send({
      status: 'error',
      error_message: '账号或密码错误！',
      type,
      current_authority: 'guest',
    });
  },
  'POST /api/signup': (req, res) => {
    res.send({
      status: 'ok',
      current_authority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,
};
