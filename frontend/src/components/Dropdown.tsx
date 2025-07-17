import { ReactNode } from 'react'
type Props = {
  title: string
  children: ReactNode
}

const Dropdown = ({ title, children }: Props) => {
  return (
    <div className="absolute top-7 w-2xs -translate-x-4 p-4 z-[1000] bg-gray-800 rounded-lg">
      <p className="font-semibold p-1 border-b border-gray-600">{title}</p>
      {children}
    </div>
  )
}
export default Dropdown
