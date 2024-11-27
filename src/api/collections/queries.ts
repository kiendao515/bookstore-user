import { useQuery } from 'react-query';
import { getCollections } from './request';
import { IReqParams } from './types';

// export const useCollectionDetail = (id: string, reload?: number) => {
//     const { data, ...rest } = useQuery([`/api/v1/collection/detail`, id, reload],
//         async () => {
//             const result = await getOrderById(id);
//             return result;
//         },
//         {
//             enabled: id != undefined && id != ''
//         }
//     );
//     return { order: data, ...rest };
// };
export const useCollections = (params: IReqParams) => {
    const { data, ...rest } = useQuery([`/api/v1/collections`, params],
        async () => {
            const result = await getCollections(params);
            return result;
        },
        {
            enabled: params != undefined
        }
    );
    return { collections: data, ...rest };
};


