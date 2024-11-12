const FormButton = (props: IFormButtonProps) => {
    const { type = 'button', label, onClick } = props;
    return (
        <button type={type} onClick={onClick} className="w-full h-full text-black bg-neon mx-1">
            {label}
        </button>
    )
};

export default FormButton;