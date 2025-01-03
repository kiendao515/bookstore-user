import { IWebContent } from '@/store/duck/webContent/slice';
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

export const imageUrlToFile = async (url: string): Promise<File> => {
  // Extract filename and MIME type from the URL
  const filename = url.split('/').pop() || 'file';
  const mimeType = `image/${filename.split('.').pop() || 'jpeg'}`;

  // Load the image
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "Anonymous"; // This is necessary to avoid CORS issues
    image.src = url;

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image failed to load"));
  });

  // Create a canvas to draw the image on
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Draw the image onto the canvas
  ctx.drawImage(img, 0, 0);

  // Convert the canvas content to a Blob
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, 1.0);
  });

  if (!blob) {
    throw new Error("Canvas is empty");
  }

  // Create and return a File object from the Blob
  return new File([blob], filename, { type: mimeType });
}

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

export const getContent = (contents: IWebContent[], key: string) => {
  console.log("contents", contents)
  let contentArr = contents.filter((content) => content.key == key)
  if(contentArr.length == 0) return "";
  let content = contentArr[0];
  if(content.property == "TEXT") return content.value;
  if(content.property == "IMAGE") return content.image.link;
  return ""
}

export const handleOrderStatus = (status: string) => {
  switch (status) {
    case "CREATED":
      return "Chờ xác nhận";
    case "READY_TO_PACKAGE":
      return "Chờ gói hàng";
    case "COMBINED_ORDER":
      return "Chờ gom đơn";
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

export const ccyFormat = (num: number) => {
  return `${num.toFixed(2)}`;
}

// utils/romanConverter.js
export const convertToRoman = (num: number) => {
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  let result = '';
  for (const { value, numeral } of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}
