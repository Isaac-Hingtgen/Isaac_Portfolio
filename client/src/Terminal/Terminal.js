import React, { useEffect, useState } from 'react';
import './Terminal.css';
import Arguments from './Arguments.js';
import runCommands from './runCommands.js';
import { INPUT_MARKER, GREETING, VERSION } from '../CONSTANTS.js';


function System() {
    return (
        <>
            <span className='green-text'>ihing@Isaac-Portfolio</span> 
            <span className='purple-text'> v{VERSION}</span> 
            <span className='gold-text'> ~</span>
        </>
    )  
}

function Terminal() {
    const [commandList, setCommandList] = useState([]);
    const [currentInput, setCurrentInput] = useState(GREETING);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [inputIndex, setInputIndex] = useState(commandList.length);
    let lastElement;

    useEffect(() => lastElement.scrollIntoView());

    window.addEventListener('load', sayHello); // TODO: move to useEffect

    // @ts-ignore
    if (window.performance && (window.performance.getEntriesByType('navigation')[0].type === "back_forward")) {
        window.removeEventListener('load', sayHello); // remove onLoad if just navigating back and forth between page
    } 
  
    return (
        <>
            <section className='container'>
                <div className='interface terminal-properties'>
                <System /> <br ref={(ele) => { lastElement = ele }}/>
                    {commandList.map((list, ind) => {
                        return (
                            <div key={list.command.concat(ind)} >
                                {INPUT_MARKER}
                                <span>{list.command}</span>     {(list.length !== 0 && "\n")}
                                <span>{list.response}</span>    {(list.length !== 0 && "\n\n")}
                                {list.response.substring(list.response.length - "command not found".length) === "command not found" && <Arguments />}
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
        setInputDisabled(true)
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
        const n = commandList.length;
        if(n === 0) return;

        switch (key) {
            case "ArrowUp":
                setInputIndex(prevInd => (((prevInd - 1) % (n + 1)) + (n + 1)) % (n + 1));   // since stupid js doesnt do negative modulo
                break;
            case "ArrowDown":
                setInputIndex(prevInd => (prevInd + 1) % (n + 1));
                break;
            default:
                return;
        }
        console.log(inputIndex)
        if(inputIndex === n) {
            setCurrentInput(() => '');
        } else {
            setCurrentInput(() => commandList.at(inputIndex).command);
        }
    }

    function handleCommand(input) {
        let output = "";
        let args = input.split(' ');
        if(args[0] === 'clear') {
            setCommandList(() => []);
            return;
        } else {
            output = runCommands(args);
        }
        setCommandList(prevCommands => {
            return (
                [...prevCommands, {command: input, response: output}]
            )
        });
        setInputIndex(commandList.length);
    }

    function updateInputText(cInput) {
        setCurrentInput(() => cInput.target.value);
    }
}


export default Terminal;