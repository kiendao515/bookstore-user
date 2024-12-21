import { Typography } from "antd";
import classNames from "classnames";

const TemporaryOut = ({ isMobile }: { isMobile: boolean }) => {
    return (
        <div
            className={classNames(
                "flex justify-center items-center rounded-full bg-black",
                {
                    "w-[50px] h-[50px]": isMobile,
                    "w-[80px] h-[80px]": !isMobile,
                }
            )}
        >
            <Typography.Text
                className={classNames("text-white text-center", {
                    "text-[15px] leading-[18px] w-[38px]": isMobile,
                    "text-[17px] leading-[21px]": !isMobile,
                })}
            >
                Tạm hết
            </Typography.Text>
        </div>
    );
};

export default TemporaryOut;
