
const PopUp = (props: IPopUpProps) => {
    const { children, toggle, setToggle} = props;
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/60 flex flex-col justify-center items-center z-50'>
            <div className="relative">
                <div className="absolute right-[20px] top-[11px] hover:cursor-pointer" onClick={()=> setToggle(!toggle)}>
                    <img src="/public/assets/icons/close.svg" />
                </div>
                <div>
                    {children}
                </div>

            </div>
        </div>

    )

}
export default PopUp;