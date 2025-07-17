import { useState } from 'react'
import { RiMessage2Fill } from 'react-icons/ri'
import Dropdown from './Dropdown'

const MessagesMenu = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="relative flex items-center">
      <button
        className="hover:opacity-70 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <RiMessage2Fill className="text-lg" />
      </button>
      {open && <Dropdown title="Messages" />}
    </div>
  )
}
export default MessagesMenu
