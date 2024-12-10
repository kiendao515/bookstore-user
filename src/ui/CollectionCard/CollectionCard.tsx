import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const CollectionCard = (props: ICollectionCardProps) => {
    const { title, imageLink, link } = props;
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(link || "")}
            hoverable
            style={{
                width: 300,
                borderRadius: "8px",
                border: "1px solid #f0f0f0",
                boxShadow: "none",
                overflow: "hidden",
                cursor: "pointer",
            }}
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
                    color: "#000",
                    marginTop: "8px",
                }}
            />
        </Card>
    );
};

export default CollectionCard;
