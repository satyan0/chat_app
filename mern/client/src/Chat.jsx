import { useEffect } from "react"
import { useState, useContext } from "react"
import { UserContext } from "./UserContext" 
import { uniqBy } from "lodash"

export default function Chat(){
    const [ws, setWs] = useState(null)
    const [onlinePeople, setOnlinePeople] = useState({})
    const [selectedUserId, setSelectedUserId] = useState(null)
    const {username, id} = useContext(UserContext)
    const [newMessageText, setNewMessageText] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:4040')
        setWs(ws)
        ws.addEventListener('message', handleMessage)
    }, [])

    function showOnlinePeople(peopleArray){
        const people = {}
        peopleArray.forEach(({userId, username})=>{
            people[userId] = username
        })
        // console.log(people)
        setOnlinePeople(people)
    }

    function handleMessage(ev){
        // console.log('new message', e)
        const messageData = JSON.parse(ev.data)
        if('online' in messageData){
            showOnlinePeople(messageData.online)
        }else if('text' in messageData){
            setMessages(prev=>([...prev, {...messageData}]))
        }
    }

    function sendMessage(ev){
        ev.preventDefault()
        console.log('sending')
        ws.send(JSON.stringify({
                recipient: selectedUserId,
                text: newMessageText
        }))
        setNewMessageText('')
        setMessages(prev=>([...prev, {
            text: newMessageText,
             sender: id,
            recipient: selectedUserId,
        id: Date.now()}]))
    }

    const onlinePeoplExclOurUser = {...onlinePeople}
    delete onlinePeoplExclOurUser[id];
    // console.log('yeessss')

    const messagesWithoutDupes =uniqBy(messages, 'id')


    return(
        <div className="flex h-screen">
            <div className="bg-blue-100 w-1/3 pt-4">
                <div className="text-blue-900 font-bold flex gap-2 mb-4">BesideYou</div>
                {Object.keys(onlinePeoplExclOurUser).map(userId=>(
                    <div key={userId}onClick={()=>setSelectedUserId(userId)} className={"border-b border-grey-100  flex items-center cursor-pointer "+(userId===selectedUserId?'bg-blue-200': '')}>
                        {userId === selectedUserId&&(
                            <div className="w-1 bg-blue-500 h-12"></div>
                        )}
                        <div className="flex gap-2 py-2 pl-4">
                            <span className="text-grey-800">{onlinePeople[userId]}</span>
                        </div>
                    </div>
                ))}</div>
            <div className="flex flex-col bg-blue-300 w-2/3 p-2">
                <div className="flex-grow">
                    {!selectedUserId&&(
                        <div className="flex h-full flex-grow items-center justify-center">
                            <div className="text-gray-500">Select chat from sidebar</div>
                        </div>
                    )}
                    {!!selectedUserId&&(
                        <div className="relative h-full">
                            <div className="overflow-y-scroll absolute inset-0 top-0 left-0 right-0 bottom-2">
                            {messagesWithoutDupes.map(message=>(
                                <div className={(message.sender===id?'text-right': 'text-left')}>
                                <div
                                    key={message.id} // You should also add a unique key prop for each message
                                    className={`text-left inline-block p-2 my-2 rounded-sm text-sm ${message.sender === id ? 'bg-blue-700 text-white' : 'bg-blue-100'}`}
                                    >
                                    sender: {message.sender}<br/>
                                    my id: {id}<br/>
                                    {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        </div>
                    )

                    }
                </div>
                {!!selectedUserId&&(
                    <form className="flex gap-2 mx-2" onSubmit={sendMessage}>
                    <input type = "text"
                    value = {newMessageText}
                    onChange={ev=>setNewMessageText(ev.target.value)}
                     placeholder="Type your message..." className="bg-white border p-2 flex-grow rounded-sm"/>
                    <button type="submit" className="bg-blue-500 p-2 text-white rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
                )}
                
            </div>

        </div>
    )
}