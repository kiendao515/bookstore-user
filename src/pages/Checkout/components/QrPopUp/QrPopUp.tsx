import { COUNTDOWN_TIME } from "@/utils/constant";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IQrPopUpProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    qrCode: string | null;
    orderId: string;
    reload: number;
}

const QrPopUp = (props: IQrPopUpProps) => {
    const { toggle, qrCode, orderId, reload, setToggle } = props;
    const [timeLeft, setTimeLeft] = useState<number>(COUNTDOWN_TIME);
    const navigate = useNavigate();

    useEffect(() => {
        if (!open) return; // Reset the countdown when the dialog is closed
        setTimeLeft(COUNTDOWN_TIME); // Reset countdown each time the dialog opens

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1000) {
                    clearInterval(intervalId); // Stop countdown when time runs out
                    navigate('/order-result?orderId=' + orderId);
                    setToggle(false);
                    return 0;
                }
                return prevTime - 1000; // Decrement by 10 milliseconds for smoother updates
            });
        }, 1000); // Update every 10 milliseconds

        return () => clearInterval(intervalId); // Clean up on component unmount
    }, [open, reload]);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    // Format time as MM:SS
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <Dialog open={toggle}>
            <DialogTitle>Mã QR của bạn</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {qrCode ? (
                    <>
                        <Typography>Quét mã QR dưới đây để hoàn tất thanh toán
                        </Typography>
                        <Typography>
                            (Lưu ý không chỉnh sửa nội dung chuyển khoản)
                        </Typography>
                        <img src={qrCode} alt="QR Code" style={{ width: '100%', marginTop: '20px' }} />
                        <Typography variant="body2" color="textSecondary" fontWeight="bold" style={{ marginTop: '10px' }}>
                            Thời gian còn lại: {formattedTime}
                        </Typography>
                    </>
                ) : (
                    <Typography>Đang tải mã QR...</Typography>
                )}
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>

    )
}

export default QrPopUp;