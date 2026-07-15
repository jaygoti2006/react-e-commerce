import { useContext, useEffect, useRef } from "react";
import ToastContext from "../contexts/ToastContext";

export default function Toast({ toast: { type, message, effect="slide", duration=1500, id } }) {
    const { config: { icons }, removeToast } = useContext(ToastContext);
    const ToastRef = useRef(null);
    const progressRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        ToastRef.current.classList.remove(effect);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleMouseEnter() {
        if (animationRef.current && animationRef.current.playState === "running") animationRef.current.pause();
    }

    function handleMouseLeave() {
        if (animationRef.current && animationRef.current.playState === "paused") animationRef.current.play();
    }

    function handleFinish() {
        animationRef.current.commitStyles();
        animationRef.current.cancel();
        ToastRef.current.classList.remove("ease-out");
        ToastRef.current.classList.remove("ease-in");
        ToastRef.current.classList.add(effect);
    }

    function handleTransitionEnd(e) {
        if (e.propertyName === "opacity") {
            if (getComputedStyle(ToastRef.current).opacity === "1") {
                animationRef.current = progressRef.current.animate([
                    { width: "100%" },
                    { width: "0px" }
                ], {
                    duration: duration,
                    easing: "linear",
                });

                animationRef.current.onfinish = handleFinish;
            }else if(getComputedStyle(ToastRef.current).opacity === "0") removeToast(id);
        }
    }

    function handleCancel() {
        ToastRef.current.classList.remove("ease-out");
        ToastRef.current.classList.remove("ease-in");
        ToastRef.current.classList.add(effect);
    }

    return (
        <div className={`p-4 relative flex items-center gap-3 rounded-lg shadow-lg ${effect} ${type} transition-all duration-300 ease-out overflow-hidden`} ref={ToastRef} onTransitionEnd={handleTransitionEnd} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span>{icons[type]}</span>
            <div className="flex grow flex-col gap-1 leading-none">
                <h3 className="font-bold text-[16px] text-neutral-800">{type[0].toUpperCase() + type.slice(1)}</h3>
                <h6 className="text-[13.5px] font-medium text-neutral-500">{message}</h6>
            </div>
            <button className="cursor-pointer" onClick={handleCancel}>
                <svg className="stroke-neutral-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20" /></svg>
            </button>
            <div className="progress absolute bottom-0 left-0 w-full h-1.5" ref={progressRef}></div>
        </div>
    );
}