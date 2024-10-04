import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Rectangle({ children }: Props) {
  return (
    <svg
      width="403"
      height="266"
      viewBox="0 0 403 266"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.40754 61.9421C3.61524 29.2599 30.2785 3.17349 62.9747 2.439C189.559 -0.404571 219.585 -0.424389 340.715 2.37952C373.664 3.14222 400.386 29.6076 401.288 62.5529C402.845 119.468 402.931 144.013 401.319 203.393C400.425 236.356 373.671 262.831 340.702 263.502C225.863 265.84 195.404 265.482 63.3769 263.241C30.5121 262.683 3.62272 236.53 2.41237 203.682C0.256596 145.177 0.22911 120.894 2.40754 61.9421Z"
        fill="#D1F8F3"
      />

      <text x="50%" y="50%" fill="black">
        I love SVG!
      </text>
    </svg>
  )
}
