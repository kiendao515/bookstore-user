import { NotificationType } from './enum/notification-type.enum';
import { ISelectBox } from './interfaces';

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const parseJson = (str?: string | null) => {
  if (!str) return null;
  try {
    const data = JSON.parse(str);
    return data;
  } catch (err) {
    return null;
  }
};

/**
 * Add query to url, preserve old query, overriding can happen when `query` contains
 * key that is already in the url
 * @param strict Should exclude null/undefined value or not
 * @returns url after properly adding query
 */
export const addQueryToURL = (url: string, query: Record<string, any>, strict = false) => {
  const newURL = new URL(url);
  Object.keys(query)
    .filter((key) => (strict ? query[key] !== null && query[key] !== undefined : true))
    .forEach((key) => newURL.searchParams.set(key, query[key]));

  return newURL.toString();
};

/**
 * Replace current pathname with newPath, returns replaced url
 */
export const replacePathName = (url: string, newPath: string) => {
  const newURL = new URL(url);
  newURL.pathname = newPath;

  return newURL.toString();
};

export function hasChildren(item: any) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

/**
 *
 * @param key
 * @param arr
 * @returns string
 */
export const parameterizeArray = (key: string, arr?: string[]): string => {
  if (!arr || (arr && arr.length === 0)) return '';
  arr = arr.map(encodeURIComponent);
  return '&' + key + '=' + arr.join('&' + key + '=');
};

export const getFileURL = (filePath?: string, withBlank = true) => {
  if (!filePath) return withBlank ? '/images/collection/blank.png' : '';
  if (filePath.search('blob:') === 0) return filePath;

  let path = filePath;
  if (filePath.includes('user-collective/') && !filePath.includes('output/')) path = `output/${path}`;
  //  return `${FILE_PATH_URL}${`/${path}`}`;
  return `${`/${path}`}`;
};

export const computerType = {
  on: '#18BF47',
  off: '#C70C0C',
  broken: '#671D94',
};

export const removeDuplicate = (arr: ISelectBox[]) => {
  const seen = new Set();

  const filteredArr = arr.filter((el) => {
    const duplicate = seen.has(el.value);
    seen.add(el.value);
    return !duplicate;
  });
  return filteredArr;
};

export const reportType = (type: string) => {
  switch (type) {
    case NotificationType.AGENT_REPORT: {
      return 'New Agent Report';
    }
    case NotificationType.COMPUTER_REPORT: {
      return 'New Computer Report';
    }
    case NotificationType.NEW_SCREEN_CAPTURE: {
      return 'New Screen Capture Picture';
    }
    case NotificationType.ROOM_REPORT: {
      return 'New Room Report';
    }
    case NotificationType.EXAMINATION_REPORT: {
      return 'New Examination Report';
    }
    default: {
      return '';
    }
  }
};

export const handleStatusBook = (status: string) => {
  switch (status) {
    case "OLD":
      return "tạm"
    case "MEDIUM":
      return "khá"
    case "GOOD":
      return "đẹp"
    case "NEW":
      return "mới"
    default:
      return "không xác định"
  }
}


export const handleOrderStatus = (status: string) => {
  switch (status) {
    case "CREATED":
      return "Chờ xác nhận";
    case "READY_TO_PACKAGE":
      return "Chờ gói hàng";
    case "READY_TO_SHIP":
      return "Sẵn sàng gửi";
    case "SHIPPING":
      return "Đang gửi";
    case "DONE":
      return "Thành công";
    case "CANCEL":
      return "Hủy"
    default:
      return "Trạng thái không xác định"; // Fallback for unknown statuses
  }
}