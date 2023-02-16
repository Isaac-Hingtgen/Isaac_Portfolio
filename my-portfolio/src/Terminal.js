import React, { useEffect, useState } from 'react';
import './Terminal.css';
import Arguments from './Arguments.js';

function System() {
    return (
        <>
            <span className='green-text'>ihing@Isaac-Portfolio</span> 
            <span className='purple-text'> v1.0</span> 
            <span className='gold-text'> ~</span>
        </>
    )  
}

function Terminal() {
    const INPUT_MARKER = "$ ";
    const WD = "/c/Users/Isaac-Portfolio/CLI";
    const VALID_PATHS = [
        "PortfolioUI",
        "Github",
        "LinkedIn",
    ];
    
    const GREETING = 'Hello.';
    const [commandList, setCommandList] = useState([]);
    const [currentInput, setCurrentInput] = useState(GREETING);
    const [currentCommandIndex, setCurrentCommandIndex] = useState(commandList.length);
    const [inputDisabled, setInputDisabled] = useState(true)
    let lastElement;
    let keyIndex = 0;

    useEffect(() => lastElement.scrollIntoView());
    useEffect(() => {
        window.addEventListener('load', sayHello);
        return () => window.removeEventListener('load', sayHello);
    });

    return (
        <>
            <section className='container'>
                <div className='interface terminal-properties'>
                <System /> <br ref={(ele) => { lastElement = ele }}/>
                    {commandList.map((list) => {
                        keyIndex++;
                        return (
                            <div key={list.command.concat(keyIndex)} >
                                {INPUT_MARKER}
                                <span>{list.command}</span>     {(list.length !== 0 && "\n")}
                                <span>{list.response}</span>    {(list.length !== 0 && "\n\n")}
                                {list.response.substring(list.response.length - "command not found".length) === "command not found" && <Arguments paths={VALID_PATHS}/>}
                                <System /> <br ref={(ele) => { lastElement = ele }}/>
                            </div>
                        )
                    })}
                </div>
                <div className='terminal-properties'>
                    {INPUT_MARKER}
                    <input className='input terminal-properties' 
                           value={currentInput} 
                           disabled={inputDisabled}
                           onKeyDown={(e) => (e.key === "Enter") ? handleSubmitCommand() : handleOtherKeystroke(e.key)} 
                           onChange={updateInputText}> 
                    </input>
                </div>
            </section>
        </>
    )

    function sayHello() {
        const TIMER = 400;
        setCurrentInput("");
        
        for(let i = 0; i < GREETING.length; i++) {
            setTimeout(() => {
                setCurrentInput(prevChars => prevChars + GREETING[i])
                if(i === GREETING.length - 1) {
                    setTimeout(() => {
                        setInputDisabled(false);
                        handleSubmitCommand();
                    }, TIMER)
                }
            }, (i+1) * TIMER);
        }    
    }

    function handleSubmitCommand() {
        if(currentInput === "") return;
        handleCommand(currentInput);
        setCurrentInput(() => "");
    }

    function handleOtherKeystroke(key) {
        switch (key) {
            case "ArrowUp":
                setCurrentCommandIndex(cIndex => Math.max(cIndex - 1, 0));
                break;
            case "ArrowDown":
                setCurrentCommandIndex(cIndex => Math.min(cIndex + 1, commandList.length));
                break;
            default:
                return;
        }
        if(commandList.length === 0) return;
        if(currentCommandIndex === commandList.length) {
            setCurrentInput(() => "");
        } else {
            setCurrentInput(() => commandList.at(currentCommandIndex).command);
        }
    }

    function handleCommand(input) {
        let output = "";
        let args = input.split(' ');
        switch (args[0]) {
            case "clear":
                setCommandList(() => []);
                keyIndex = 0;
                return;
            case "pwd":
                output = WD;
                break;
            default:
                output = `bash: ${input}: command not found`;
                break;
        }
        setCommandList(prevCommands => {
            return (
                [...prevCommands, {command: input, response: output}]
            )
        });
        setCurrentCommandIndex(() => commandList.length);
    }

    function updateInputText(cInput) {
        setCurrentInput(() => cInput.target.value);
    }
}


export default Terminal;