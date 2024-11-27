import { Card } from "antd";
const { Meta } = Card;
const CollectionCard = (props: ICollectionCardProps) => {
    const { title, imageLink } = props;
    return (
        <Card
            hoverable
            style={{ width: 300, height: 400 }}
            cover={
                <img
                    src={imageLink}
                    alt={title}
                    style={{
                        width: "100%",
                        height: 280,
                        objectFit: "cover",
                    }}
                />
            }
        >
            <Meta
                title={title}
                style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                }}
            />
        </Card>
    )
};

export default CollectionCard;