const Button = (props: IButtonProps) => {
    const { type = 'button', label, onClick } = props;
    return (
        <button type={type} onClick={onClick} className="h-full text-black p-0">
            {label}
        </button>
    )
};

export default Button;