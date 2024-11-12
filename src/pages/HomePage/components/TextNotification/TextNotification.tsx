const TextNotification = (props: ITextNotificationProps) => {
    const { content } = props;
    return (
        <div className="italic">
            {content}
        </div>
    )
};

export default TextNotification;