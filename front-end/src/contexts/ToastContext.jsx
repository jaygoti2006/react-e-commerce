import { createContext, useState } from "react";

const ToastContext=createContext();

export default ToastContext;

let id=0;

export function ToastContextProvider({children}){
    const [toasts, setToasts]=useState([]);

    function showToast(obj) {
        setToasts([...toasts,{...obj, id:id}]);
        id++;
    }

    function removeToast(toastId) {
        setToasts(toasts.filter(el=>el.id!==toastId));
    }

    const icons={
        "success": <svg className="fill-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417L5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>,
        "error": <svg className="fill-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path d="m8.746 8l3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746l3.1 3.1l-3.1 3.1a.527.527 0 1 0 .746.746l3.1-3.1l3.1 3.1a.527.527 0 1 0 .746-.746zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/></svg>,
        "warning": <svg className="fill-yellow-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><path d="m955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96z"/></svg>,
        "info": <svg className="fill-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fillRule="evenodd" d="M3.25 12a8.75 8.75 0 1 1 17.5 0a8.75 8.75 0 0 1-17.5 0ZM13 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-1 2.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd"/></svg>
    };

    const config={
        icons
    }
    
    return (
    <ToastContext value={{toasts, config, removeToast, showToast}}>
        {children}
    </ToastContext>
    );
}