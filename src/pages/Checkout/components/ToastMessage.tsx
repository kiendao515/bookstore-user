
import { IToastMessage } from "./interface";


const ToastMessage = (props:IToastMessage) => {
    const {visible, onRetry} = props;
    return(
        <div
            className={`${visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full rounded-lg pointer-events-auto flex`}
        >
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg shadow-lg flex items-start space-x-3 animate-bounce">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 20h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div className="flex-1">
                    <p className="font-bold text-lg">Lỗi thanh toán!</p>
                    <p className="text-sm">Đã xảy ra lỗi khi xử lý thanh toán của bạn. Vui lòng thử lại.</p>
                    <button
                    onClick={onRetry}
                        className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red transition ease-in-out duration-150"
                    >
                        thanh toán lại
                    </button>
                </div>
            </div>
        </div>
    )
    
};
export default ToastMessage