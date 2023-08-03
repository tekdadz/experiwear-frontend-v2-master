import _ from 'lodash';
import { MOBILE_OS } from 'utils/constants';

export const isServer = () => typeof window === 'undefined';

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

/**
 * Make form data from ordinary object
 * @param {object} data - source object to make FormData
 * @return {FormData} formdata
 */
export const getFormData = (obj) => {
  return Object.keys(obj).reduce((formData, key) => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((el) => formData.append(`${key}`, el));
    } else {
      formData.append(key, obj[key]);
    }
    return formData;
  }, new FormData());
};

/**
 * Find difference between two objects
 * @param  {object} origObj - Source object to compare newObj against
 * @param  {object} newObj  - New object with potential changes
 * @return {object} differences
 */
export const difference = (origObj, newObj) => {
  const changes = (newObj, origObj) => {
    let arrayIndexCounter = 0;
    return _.transform(newObj, (result, value, key) => {
      if (!_.isEqual(value, origObj[key])) {
        let resultKey = _.isArray(origObj) ? arrayIndexCounter++ : key;
        result[resultKey] =
          _.isObject(value) && _.isObject(origObj[key])
            ? changes(value, origObj[key])
            : value;
      }
    });
  };
  return changes(newObj, origObj);
};

/**
 * Format phone number only with numbers beginning with `+` symbol
 * @param  {string} phone - Phone number string to format
 * @return {string} foramtted phone number string
 */
export const formatPhone = (phone) => {
  return phone && phone.match(/\d+/g).reduce((acc, t) => acc + t, '+');
};

/**
 * Extract host address from url
 * @param  {string} url - url string to extract host address
 * @return {string} host address
 */
export const extractHostAddr = (url) => {
  return url && url.split('://')[1].split('/')[0];
};

/**
 * Navigate to path using location of browser window
 * @param {string} pathname - Pathname to navigate to
 */
export const navigateTo = (pathname) => {
  const { protocol, hostname, port } = window.location;
  window.location.href = `${protocol}//${hostname}${
    port && ':' + port
  }/${pathname}`;
};

export const calcStringWidthForFirmware = (text) => {
  // Widths of each character in pixels, in ascii order
  const chWidthMap = [
    1, 2, 11, 4, 4, 3, 6, 2, 7, 5, 7, 7, 7, 7, 7, 7, 7, 7, 2, 3, 7, 7, 7, 7, 7,
    6, 6, 7, 7, 2, 7, 7, 6, 10, 8, 7, 7, 7, 7, 7, 8, 7, 7, 10, 7, 7, 7, 8, 7, 7,
    7, 7, 6, 7, 7, 2, 6, 7, 2, 10, 6, 7, 7, 7, 6, 7, 5, 7, 7, 10, 7, 7, 7,
  ];

  const asciiToIdx = (ascii) => {
    if (ascii < 32 || ascii > 122) return 0xff;

    if (ascii <= 33) {
      return ascii - 32 + 0;
    }
    if (ascii <= 38) {
      return ascii - 38 + 2;
    }
    if (ascii <= 41) {
      return ascii - 40 + 3;
    }
    if (ascii <= 46) {
      return ascii - 44 + 5;
    }
    if (ascii <= 59) {
      return ascii - 48 + 8;
    }
    if (ascii <= 63) {
      return ascii - 63 + 20;
    }
    if (ascii <= 90) {
      return ascii - 65 + 21;
    }
    if (ascii <= 122) {
      return ascii - 97 + 47;
    }

    return 0xff;
  };

  return (
    text
      .split('')
      .reduce(
        (acc, ch) => acc + chWidthMap[asciiToIdx(ch.charCodeAt(0))] + 2,
        0
      ) - 2
  );
};

export const getMobileOS = () => {
  let userAgent;
  if (typeof window !== 'undefined') {
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
  }

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return MOBILE_OS.windowsPhone;
  }

  if (/android/i.test(userAgent)) {
    return MOBILE_OS.android;
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return MOBILE_OS.iOS;
  }

  return MOBILE_OS.unknown;
};
