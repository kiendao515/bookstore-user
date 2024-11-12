const TextBox = (props: ITextBoxProps) => {
    const { label, placeholder } = props;
    return (
        <div className="w-full">
            {
                label && (<label className="block text-[28px] mb-[5px]">{label}</label>)
            }
            <input className="w-full border-black border-[1px] pl-[13px] py-[6px] text-[#A8A8A8] italic" placeholder={placeholder} />
        </div>
    )
};

export default TextBox;