import { useQuery } from 'react-query';
import { IReqParams } from './types';
import { getAuthorByNameStart, getBookByAuthor, getBookById, getBookFavorite, getBooks, getBookSetting, } from './request';
import { COOKIES, getCookies } from '@/utils/cookies';

export const useBooks = (params: IReqParams) => {
  const { data, ...rest } = useQuery([`/api/v1/books`, params],
    async () => {
      const result = await getBooks(params);
      return result;
    },
    {
      enabled: params != undefined
    }
  );
  return { books: data, ...rest };
};

export const useBookDetail = (id: string, reload?: number) => {
  const { data, ...rest } = useQuery([`/api/v1/books/`, id, reload],
    async () => {
      const result = await getBookById(id);
      return result;
    },
    {
      enabled: id != undefined
    }
  );
  return { book: data, ...rest };
};

export const useBookFavorite = (reload?: number) => {
  const token = getCookies(COOKIES.token);
  const { data, ...rest } = useQuery([`/api/v1/books/favorite`, reload, token],
    async () => {
      const result = await getBookFavorite();
      return result;
    }
  );
  return { bookFavorite: data, ...rest };
}

export const useBookSetting = (reload?: number) => {
  const { data, ...rest } = useQuery([`/api/v1/books/setting`, reload],
    async () => {
      const result = await getBookSetting();
      return result;
    }
  );
  return { bookSetting: data, ...rest };
}

export const useAuthor = (name: string) => {
  const { data, ...rest } = useQuery([`/api/v1/people/author?name=${name}`],
    async () => {
      const result = await getAuthorByNameStart(name.toUpperCase());
      return result;
    },
    {
      enabled: name != undefined
    }
  );
  return { author: data, ...rest };
}
export const useBooksOfUser = (id: string) => {
  const { data, ...rest } = useQuery([`/api/v1/people/books?authorId=${id}`],
    async () => {
      const result = await getBookByAuthor(id);
      return result;
    },
    {
      enabled: id != undefined
    }
  );
  return { booksOfUser: data, ...rest };
}