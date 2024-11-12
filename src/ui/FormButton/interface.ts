interface IFormButtonProps {
    type?: 'button' | 'submit' | 'reset';
    label?: string;
    properties?: string;
    onClick?: () => void;
}