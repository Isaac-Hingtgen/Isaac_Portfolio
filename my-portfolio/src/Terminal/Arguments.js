import { VALID_PATHS } from "./CONSTANTS.js"

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
                    <>
                    <span key={arg.command} className='command'>{arg.command}</span>
                    <span key={arg.description} className='description'>{arg.description}</span>
                    </>
                )
            })}
            <div className="path header">
                <br/>-Path Variables-<br/>
                {VALID_PATHS.map(path => {
                    return (
                        <span className='path' key={path}>{path}</span>
                    )
                })}
            </div>
            <br/>
        </div>
    )
}