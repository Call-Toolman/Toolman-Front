import { parse } from 'querystring';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // For the official demo site, it is used to turn off features that are not needed in the real development environment

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export function getType(s) {
  switch (s) {
    case 0:
      return '所有类型';
    case 1:
      return '科学空间';
    case 2:
      return '快递搬运';
    case 3:
      return '社会实践';
    case 4:
      return '娱乐天地';
    case 5:
      return '其他类型';
    default:
      return '-';
  }
}
