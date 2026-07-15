import { useContext } from "react";
import ToastContext from "../contexts/ToastContext";
import Toast from "../components/Toast";

const limit=3;

export default function ToastContainer(){
    const { toasts } = useContext(ToastContext);
    
    return (
        <div className="w-75 fixed bottom-8 left-8 flex flex-col gap-4">
            {
                toasts.slice(0,limit).map((toast)=>{
                    return <Toast toast={toast} key={toast.id}/>;
                })
            }
        </div>
    );
}