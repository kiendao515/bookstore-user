import { useRegistrationConfirm } from "@/api/auth";
import { useEffect } from "react"
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom"

const ConfirmRegistrationPage = () => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { data, isLoading, error } = useRegistrationConfirm({
        token: searchParams.get("token")
    });
    useEffect(() => {
        if (data) {
            if (data.success) {
                toast.success(data.message)
                navigate("/?is_confirm_success=1")
            } else {
                toast.error("Invalid token");
                navigate("/")
            }
        } else if (error) {
            toast.error("An error occurs");
            navigate("/")
        }
    }, [data, error, navigate])
    if (isLoading) return <div>Loading ...</div>
    return <div></div>
}

export default ConfirmRegistrationPage