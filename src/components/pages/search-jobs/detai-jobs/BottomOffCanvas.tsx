import React from "react"

const BottomOffcanvas:React.FC<any> = ({
    isOffcanvasOpen,
    setIsOffcanvasOpen,
    className,
    children,
}) => {
    return (
        <div className={`${className} z-50`}>
            <div
                onClick={() => setIsOffcanvasOpen(false)}
                className={`bg-[#475467] opacity-80 fixed w-full h-full top-0 left-0 backdrop-blur-xl ${
                    isOffcanvasOpen ? '' : 'hidden'
                }`}>
                <></>
            </div>
            <div
                className={`bg-white w-full transition-all duration-500 fixed bottom-0 left-0 rounded-t-3xl ${
                    isOffcanvasOpen ? 'h-[260px]' : 'h-0 '
                }`}>
                {children}
            </div>
        </div>
    )
}

export default BottomOffcanvas
