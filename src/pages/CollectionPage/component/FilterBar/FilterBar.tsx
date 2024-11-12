const FilterBar = (props: IFilterBarProps) => {
    const { titles = [] } = props;
    return (
        <div className="flex flex-col gap-[7px]">
            {
                titles.map(title => {
                    return (
                        <div>{title}</div>
                    )
                })
            }
        </div>
    )
}

export default FilterBar;