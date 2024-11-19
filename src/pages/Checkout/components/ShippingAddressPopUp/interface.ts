export interface IShippingAddressPopUpProps {
    reload: number;
    setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>
    toggleAddress: boolean;
    setToggleAddress: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IReqParams {
    page?: number;
    size?: number;
    reload?: number;
}
