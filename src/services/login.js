import request from '@/utils/request';

export async function AccountLogin(params) {
  console.log(params);

  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

export async function AccountSignUp(params) {
  return request('/api/signup', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
