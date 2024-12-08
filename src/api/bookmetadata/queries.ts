import { useQuery } from "react-query"
import { ICommonEntityReqParams, IGetRelatedPersonReqParams } from "./types"
import { getCommonEntities, getCommonEntityById, getPersonById, getRelatedPeople } from "./request";

export const useRelatedPeople = (params: IGetRelatedPersonReqParams) => {
    const { data, ...rest } = useQuery([`/api/v1/people`, params],
        async () => {
            const result = await getRelatedPeople(params);
            return result;
        },
        {
            enabled: params != undefined
        }
    );
    return { relatedPeople: data, ...rest };
}

export const useCommonEntities = (params: ICommonEntityReqParams) => {
    const { data, ...rest } = useQuery([`/api/v1/common-entities`, params],
        async () => {
            const result = await getCommonEntities(params);
            return result;
        },
        {
            enabled: params != undefined
        }
    );
    return { commonEntities: data, ...rest };
}

export const usePersonDetail = (id?: string, reload?: number) => {
    const { data, ...rest } = useQuery([`/api/v1/people/${id}`, reload],
        async () => {
            const result = await getPersonById(id);
            return result;
        },
        {
            enabled: id != undefined
        }
    );
    return { person: data, ...rest };
}

export const useCommonEntityDetail = (id?: string, reload?: number) => {
    const { data, ...rest } = useQuery([`/api/v1/common-entity/${id}`, reload],
        async () => {
            const result = await getCommonEntityById(id);
            return result;
        },
        {
            enabled: id != undefined
        }
    );
    return { commonEntity: data, ...rest };
}