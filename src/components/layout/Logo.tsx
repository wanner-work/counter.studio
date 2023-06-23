import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

type LogoProps = {
  classes?: string
  size?: 'mobile' | 'small' | 'medium' | 'large'
}

export default function Logo({ size = 'medium', classes = '' }: LogoProps) {
  let fontSize = 'text-4xl'
  let boxSize = '110px'
  let backgroundSize = '90px'
  let y1Start = -40
  let y2Start = -20
  let y3Start = 0
  let y1End = -20
  let y2End = 0
  let y3End = 20
  let x1Start = -20
  let x2Start = -10
  let x3Start = 0
  let x1End = -10
  let x2End = 0
  let x3End = 10

  switch (size) {
    case 'mobile':
      fontSize = 'text-[22px]'
      boxSize = '60px'
      backgroundSize = '40px'
      y1Start = -20
      y2Start = -10
      y3Start = 0
      y1End = -10
      y2End = 0
      y3End = 10
      x1Start = -10
      x2Start = -5
      x3Start = 0
      x1End = -5
      x2End = 0
      x3End = 5
      break
    case 'small':
      fontSize = 'text-3xl'
      boxSize = '80px'
      backgroundSize = '60px'
      y1Start = -25
      y2Start = -15
      y3Start = 0
      y1End = -15
      y2End = 0
      y3End = 15
      x1Start = -20
      x2Start = -10
      x3Start = 0
      x1End = -10
      x2End = 0
      x3End = 10
      break
    case 'large':
      fontSize = 'text-7xl'
      boxSize = '160px'
      backgroundSize = '180px'
      break
  }

  return <div className={`flex flex-row-reverse gap-7 items-center justify-between ${classes}`}>
    <div className="relative flex justify-center items-center">
      <AnimatePresence>
        <motion.div
          initial={{ border: 'none' }}
          animate={{ border: '1px solid rgb(209 213 219/ 0.1)' }}
          transition={{
            duration: 0.8,
          }}
          style={{ width: boxSize, height: boxSize }}
          className={`relative flex justify-center items-center rounded-xl bg-black/60 border border-gray-300/10 z-10`}>
          <AnimatePresence>
            <motion.h1 initial={{ y: y1Start, x: x1Start, opacity: 0, position: 'absolute' }}
                       animate={{ y: y1End, x: x1End, opacity: 0.2, position: 'absolute' }}
                       transition={{
                         ease: 'easeOut',
                         duration: 0.4,
                         delay: 0
                       }}
                       className={`${fontSize} z-0`}>
              30
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence>
            <motion.h1 initial={{ y: y2Start, x: x2Start, opacity: 0 }}
                       animate={{ y: y2End, x: x2End, opacity: 0.5 }}
                       transition={{
                         ease: 'easeOut',
                         duration: 0.4,
                         delay: 0.2
                       }}
                       className={`${fontSize} z-10`}>
              31
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence>
            <motion.h1 initial={{ y: y3Start, x: x3Start, opacity: 0, position: 'absolute' }}
                       animate={{ y: y3End, x: x3End, opacity: 0.8, position: 'absolute' }}
                       transition={{
                         ease: 'easeOut',
                         duration: 0.4,
                         delay: 0.4
                       }}
                       className={`${fontSize} z-20`}>
              32
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div initial={{ transform: 'scale(0.2)', opacity: 0, position: 'absolute' }}
                    animate={{ transform: 'scale(1)', opacity: 0.6, position: 'absolute' }}
                    transition={{
                      ease: 'easeOut',
                      duration: 1,
                      delay: 0
                    }}
                    style={{
                      width: backgroundSize,
                      height: backgroundSize
                    }}
                    className={`absolute bg-gradient-company blur-2xl opacity-70 flex justify-center items-center z-0`}
        ></motion.div>
      </AnimatePresence>
    </div>
    <motion.div className="flex flex-col justify-center">
      <AnimatePresence>
        <motion.div className="h-auto overflow-hidden">
          <motion.h1 initial={{ y: -20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{
                       ease: 'easeOut',
                       duration: 1,
                       delay: 0
                     }}
                     className={`${fontSize} font-bold`}
          >
            <Link href={'/'}>counter.studio</Link>
          </motion.h1>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  </div>
}
