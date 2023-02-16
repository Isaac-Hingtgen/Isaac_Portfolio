import { VALID_PATHS, WD, MY_EMAIL } from "./CONSTANTS.js"

export default function runCommands(args) {
    let output = `bash: ${args.join(" ")}: command not found`;
    let yourMessage = '';

    switch (args[0]) {
        case "pwd":
            output = WD;
            break;

        case "npm":
            if(args.length === 2 && args[1] === 'start') {
                // TODO: render UI component
            }
            break;

        case "cd":
            if(args.length > 2) return;
            VALID_PATHS.forEach(path => {
                if(path === args[1]) {
                    // TODO: keep command line in cache
                    output = `rerouting to: ${args[1]}`
                    openInSameWindow(path)
                    return;
                }
            })
            break;

        case "mkdir":
            if(args.length > 2) break;
            VALID_PATHS.forEach(path => {
                if(path === args[1]) {
                    output = `opening new tab to: ${args[1]}`
                    openInNewWindow(path);
                    return;
                }
            })
            break;

        case "git":
            if(args.length < 3) break;
            switch (args[1]) {
                case 'add':
                    if(args.length === 3) {
                        // TODO: POST email to server
                        output = 'email staged';
                    }
                    break;

                case "commit":
                    if(args[2] === '-m') {
                        args.shift(); args.shift(); args.shift();
                        yourMessage = args.join(" ")
                        output = `[main (${MY_EMAIL}) message] ${yourMessage}`
                    } 
                    break;

                case "push":
                    if(args[2] === 'origin') {
                        if(args.length === 4 && args[3] === 'main') {
                            output = `To ${MY_EMAIL}\n` + 
                                     ` * [new message]     your email -> ${MY_EMAIL}\n` +
                                     `email '${MY_EMAIL}' set up to receive '${yourMessage}'`
                        }
                    }
                    break;

                default:
                    break;
            }
            break;

        default:
            break;
    }
    return output;
}

function openInSameWindow(destination) {
    switch (destination) {
        case VALID_PATHS[0]: // github
            window.location.href = 'https://github.com/Isaac-Hingtgen';
            break;
        case VALID_PATHS[1]: // linkedin
            window.location.href = 'https://www.linkedin.com/in/isaac-hingtgen-5ba0b51ab/';
            break;
        default:
            break;
    }
}

function openInNewWindow(destination) {
    switch (destination) {
        case VALID_PATHS[0]: // github
            window.open('https://github.com/Isaac-Hingtgen', '_blank');
            break;
        case VALID_PATHS[1]: // linkedin
            window.open('https://www.linkedin.com/in/isaac-hingtgen-5ba0b51ab/', '_blank')
            break;
        default:
            break;
    }
}