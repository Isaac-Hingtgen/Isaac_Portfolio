import { VALID_PATHS, WD } from "../CONSTANTS.js"
import goTo from "../goToUrl/goToUrl.js";

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
            Object.keys(VALID_PATHS).forEach(key => {
                if(VALID_PATHS[key].name === args[1]) {
                    // TODO: keep command line in cache
                    output = `rerouting to: ${args[1]}`
                    goTo(VALID_PATHS[key].url)
                    return;
                }
            })
            break;

        case "mkdir":
            if(args.length > 2) break;
            Object.keys(VALID_PATHS).forEach(key => {
                if(VALID_PATHS[key].name === args[1]) {
                    output = `opening new tab to: ${args[1]}`
                    goTo(VALID_PATHS[key].url, "newTab");
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
                        output = `[main (email) message] ${yourMessage}`
                    } 
                    break;

                case "push":
                    if(args[2] === 'origin') {
                        if(args.length === 4 && args[3] === 'main') {
                            output = `To Isaac\n` + 
                                     ` * [new message]     your email -> main\n` +
                                     `email 'main' set up to receive '${yourMessage}'`
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

