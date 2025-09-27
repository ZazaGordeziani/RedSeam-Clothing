import { CloseSign } from '@/assets/clolse-sign'
import CheckSign from '@/components/base/congrats/components/assets/check-sign'

type CongratsModalProps = {
    onClose: () => void
}

const CongratsModal = ({ onClose }: CongratsModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative h-[700px] w-[900px] bg-white p-6 shadow-lg">
                {/* Close button */}
                <button className="absolute right-8 top-8" onClick={onClose}>
                    <CloseSign />
                </button>

                <div className="flex flex-col items-center gap-12 pt-28">
                    <CheckSign />
                    <div className="flex flex-col items-center justify-center gap-8 font-poppins">
                        <h1 className="text-[42px] font-semibold text-gray-900">
                            Congrats!
                        </h1>
                        <p className="text-sm font-normal text-zinc-700">
                            Your order is placed successfully!
                        </p>
                    </div>
                    <button
                        className="h- mt-5 w-[214px] rounded-[10px] bg-orange-600 text-white"
                        onClick={onClose}
                    >
                        <p className="px-5 py-[10px] font-poppins text-sm font-normal">
                            Continue shopping
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CongratsModal
