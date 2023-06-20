'use client'

import {AnimatePresence, motion} from 'framer-motion'

export default function Favicon () {
    return <div className="h-screen flex justify-center items-center bg-black">
        <div className="flex gap-7 items-center">
            <motion.div className="h-[120px] w-[120px] flex justify-center items-center rounded-xl bg-black border border-gray-300/10">
                <AnimatePresence>
                    <motion.h1 initial={{ y: -40, x: -20, opacity: 0, position: 'absolute' }}
                               animate={{ y: -20, x: -10, opacity: 0.2, position: 'absolute' }}
                               transition={{
                                   ease: 'easeOut',
                                   duration: 1,
                                   delay: 0
                               }}
                               className="text-5xl z-0">
                        30
                    </motion.h1>
                </AnimatePresence>
                <AnimatePresence>
                    <motion.h1 initial={{ y: -20, x: -10, opacity: 0 }}
                               animate={{ y: 0, x: 0, opacity: 0.5 }}
                               transition={{
                                   ease: 'easeOut',
                                   duration: 1,
                                   delay: 0.3
                               }}
                               className="text-5xl z-10">
                        31
                    </motion.h1>
                </AnimatePresence>
                <AnimatePresence>
                    <motion.h1 initial={{ y: 0, x: 0, opacity: 0, position: 'absolute' }}
                               animate={{ y: 20, x: 10, opacity: 0.8, position: 'absolute' }}
                               transition={{
                                   ease: 'easeOut',
                                   duration: 1,
                                   delay: 0.6
                               }}
                               className="text-5xl z-20">
                        32
                    </motion.h1>
                </AnimatePresence>
            </motion.div>
            <div className="flex flex-col justify-center">
                <h1 className="text-5xl">counter.studio</h1>
            </div>
        </div>
    </div>
}
