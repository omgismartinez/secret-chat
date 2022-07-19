import { useState } from "react"
import Image from "next/image"

import { useChat } from "context/context"
import Send from "./send"

export default function ConversationInput({ user }) {
    const [message, setMessage] = useState('')
    const { chat } = useChat()

    async function handleSendMessageSubmit(e) {
        e.preventDefault()
        if (message.length === 0 || message === 'secret') { return setMessage('secret') }

        chat.sendMessage(message)
        document.getElementById('message').value = ''
    }
    return (
        <div className='w-full my-6'>
            <form onSubmit={handleSendMessageSubmit}
                className='flex justify-center items-center 
                            gap-2 relative w-full'>
                <div className='flex justify-center items-center'>
                    {
                        user.image ?
                            <Image src={user.image} alt={user.name} className='rounded-full'
                                placeholder='blur' blurDataURL='#1a1b1c' layout='fixed' width={45} height={45} />
                            : null
                    }
                </div>
                <div className='flex justify-center items-center 
                                border-2 border-[#262728]
                                rounded-xl py-2 pl-4 pr-2 w-full'>
                    <input type='text' placeholder='Write a message' id='message' autoFocus autoComplete="off"
                        className={`outline-none transition-all w-full
                            bg-transparent placeholder:text-[#3e4044] focus:border-zinc-300
                            ${message === 'secret'
                                ? 'focus:border-red-500 border-red-500'
                                : 'border-zinc-300'}`}
                        onChange={(e) => setMessage(e.target.value)} />
                    <span className={`
                        absolute bottom-0 transition-all
                        ${message === 'secret'
                            ? 'z-20 -bottom-8 text-red-500'
                            : '-z-20'}`}>
                        message is <strong>required</strong>
                    </span>
                    <button
                        type='submit'
                        className='absolute right-2
                        rounded-md p-1 transition-all bg-[#313336] 
                        font-semibold text-center text-white hover:animate-pulse'>
                        <Send />
                    </button>
                </div>
            </form>
        </div>
    )
}
