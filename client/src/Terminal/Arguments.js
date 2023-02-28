import { VALID_PATHS } from "../CONSTANTS.js"

export default function Arguments() {
    const args = [
        {
            command: "npm start",
            description: "Renders UI-friendly Isaac's Portfolio"
        },
        {
            command: "cd <path>",
            description: "Redirects to the path",
        },
        {
            command: "mkdir <path>",
            description: "Opens new tab to the path",
        },
        {
            command: "git add <your_email@example.com>",
            description: "Sends your email address to Isaac Hingtgen",
        },
        {
            command: "git commit -m \"<your message>\"",
            description: "Prepares a message for Isaac Hingtgen",
        },
        {
            command: "git push origin main",
            description: "Sends Isaac Hingtgen your email and message",
        },
        {
            command: "clear",
            description: "Clears CLI contents",
        },
    ]

    return (
        <div className="args-grid terminal-properties">
            <div className='command header'>-Valid Commands-</div>
            <div className='description header'>-Description-</div>
            {args.map(arg => {
                return (
                	<div key={arg.command}>
                    <span className='command'>{arg.command}</span>
                    <span className='description'>{arg.description}</span>
                  </div>
                )
            })}
            <div className="path header">
                <br/>-Path Variables-<br/>
                {Object.keys(VALID_PATHS).map(key => {
                    return (
                        <span className='path' key={key}>{VALID_PATHS[key].name}</span>
                    )
                })}
            </div>
            <br/>
        </div>
    )
}