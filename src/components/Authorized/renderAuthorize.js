/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';

/**
 * Use authority or getAuthority
 *
 * @param {string|()=>String} current_authority
 */
const renderAuthorize = (Authorized) => (current_authority) => {
  if (current_authority) {
    if (typeof current_authority === 'function') {
      CURRENT = current_authority();
    }

    if (
      Object.prototype.toString.call(current_authority) === '[object String]' ||
      Array.isArray(current_authority)
    ) {
      CURRENT = current_authority;
    }
  } else {
    CURRENT = 'NULL';
  }

  return Authorized;
};

export { CURRENT };
export default (Authorized) => renderAuthorize(Authorized);
