import { useRegistrationConfirm } from "@/api/auth";
import { message } from "antd";
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const ConfirmRegistrationPage = () => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { data, isLoading, error } = useRegistrationConfirm({
        token: searchParams.get("token")
    });
    useEffect(() => {
        if (data) {
            if (data.result) {
                navigate("/?is_confirm_success=1")
            } else {
                message.error("Invalid token");
                navigate("/")
            }
        } else if (error) {
            message.error("An error occurs");
            navigate("/")
        }
    }, [data, error, navigate])
    if (isLoading) return <div>Loading ...</div>
    return <div></div>
}

export default ConfirmRegistrationPage