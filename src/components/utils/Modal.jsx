import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react'
import Button from './Button';

const Modal = ({ title, description, isOpen, onClose, onSubmit, formId, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/10 z-40 backdrop-blur-[1px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* modal */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center  px-4"
                        initial={{ opacity: 0, y: 10 }}
                        onClick={onClose}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl rounded-2xl bg-white shadow-md">

                            {/* header */}
                            <div className="flex items-center justify-between px-6 pt-5 pb-3">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {title}
                                    </h2>
                                    <p className="text-xs text-gray-700 mt-0.5">
                                        {description}
                                    </p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-gray-100 transition"
                                >
                                    <X className="w-4 h-4 text-gray-700" />
                                </button>
                            </div>

                            {/* body */}
                            <div className="px-6 pb-5 space-y-4">
                                {children}
                            </div>

                            {/* Action buttons */}
                            {formId && <div className="flex justify-end gap-3 px-6 pb-5">
                                <Button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    // onClick={onSubmit}
                                    form={formId}
                                >
                                    Sumbit
                                </Button>
                            </div>}
                        </div>
                    </motion.div>
                </>)
            }
        </AnimatePresence>
    )
}

export default Modal;