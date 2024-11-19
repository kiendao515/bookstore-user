export * from './appConfig';
export const __prod__ = process.env.NODE_ENV !== 'development';
export const API_URL = import.meta.env.VITE_API_BE;
export const NFT_API_URL = 'https://external-dev.bitkubnft.net/api/';
export const BITKUB_ACCOUNT_URL = 'https://accounts.bitkubnext.com';
export const CLIENT_ID = '627cc14526dbae6bc42fa82b';
export const REDIRECT_URL = 'http://localhost:3000/oauth/callback';
// export const REDIRECT_URL = 'https://bitkub-nft.vercel.app/oauth/callback';
export const LOGOUT_URL = `https://accounts.bitkubnext.com/logout?from=http://localhost:3000`;
export const COUNTDOWN_TIME = import.meta.env.VITE_COUNTDOWN_TIME ? Number(import.meta.env.VITE_COUNTDOWN_TIME) : 3 * 60 * 1000;
export const AMOUNT_FREE_SHIP = import.meta.env.VITE_AMOUNT_FREE_SHIP ? Number(import.meta.env.VITE_AMOUNT_FREE_SHIP) : 500000;
export const AMOUNT_SHIPPING_FEE = import.meta.env.VITE_AMOUNT_SHIPPING_FEE ? Number(import.meta.env.VITE_AMOUNT_SHIPPING_FEE) : 25000;

export const LOCAL_STORAGE_KEY = {
  token: 'token',
  refreshToken: 'refresh_token',
  user: 'auth_user',
};

export const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const LANGUAGES = [
  { label: 'Vietnam', code: 'vi' },
  { label: 'English', code: 'en' },
];
