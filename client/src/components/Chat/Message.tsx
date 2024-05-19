import React from 'react'

export const Message = ({ message, user }: { message: string, user: string }) => {

    const userColors: { [key: string]: string } = {
        "me": "text-cyan-500",
        "player1": "text-red-500",
        "player2": "text-orange-500",
        "player3": "text-yellow-500",
        "player4": "text-green-500",
        "player5": "text-blue-500",
        "player6": "text-pink-500",
    };

    return (
        <div className="w-full flex items-center">
            <div className={`
                mr-2 
                ${userColors.hasOwnProperty(user)? userColors[user]:"text-white"}`}>
                {user}:</div>
            <div className={`${user=="me"? "text-cyan-300": "text-white" }`}>{message}</div>
        </div>
    )
}
