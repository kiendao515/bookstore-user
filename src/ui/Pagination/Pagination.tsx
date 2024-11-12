import Button from "../Button";

const Pagination = (props: IPaginationProps) => {
    const { } = props;
    return (
        <div className="flex gap-[25px]">
            {
                [1, 2, 3, 4, 5, 6].map(i => {
                    return (
                        <Button label={i.toString()} />
                    )
                })
            }
            <Button label="..."/>
            {
                [19, 20].map(i => {
                    return (
                        <Button label={i.toString()} />
                    )
                })
            }
            <img src="/public/assets/icons/narrow.svg" />
        </div>
    )
};

export default Pagination;