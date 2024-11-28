
import Image from 'next/image'
import BottomOffcanvas from './BottomOffCanvas'
import PrimaryButton from '@/components/ui/button/PrimaryButton'

const SuccessOffcanvas:React.FC<any> = ({ isOffcanvasOpen, setIsOffcanvasOpen }) => {
    return (
        <BottomOffcanvas
            isOffcanvasOpen={isOffcanvasOpen}
            setIsOffcanvasOpen={setIsOffcanvasOpen}>
            <div className="flex flex-col items-center p-6">
                <div className="flex justify-end w-full mb-5">
                    <Image 
                    alt="gdsgs"
                    width={20}
                    height={20}
                        src="/icons/x-close-blue.svg"
                        onClick={() => setIsOffcanvasOpen(false)}
                    />
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <Image alt="gg" width={20} height={20} src="/icons/check-circle-green.svg" />
                    <h1 className="text-base font-bold text-[#027A48] text-center">
                        Successfully Applied !
                    </h1>
                </div>
                <p className="text-sm text-[#475467] text-center mb-8">
                    Your application has been sent successfully to JPlus Job
                    Portal. The employer will contact you if you are in
                    short-listed. Thank you and good luck in your application.
                </p>
                <PrimaryButton
                    onClick={() => setIsOffcanvasOpen(false)}
                    className="py-2.5 w-full text-sm font-semibold">
                    Done
                </PrimaryButton>
            </div>
        </BottomOffcanvas>
    )
}

export default SuccessOffcanvas
