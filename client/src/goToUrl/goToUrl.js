
export default function goTo(destination, method) {
    if(arguments.length === 1) {
        window.location.href = destination;
    } else if(method === 'newTab') {
        window.open(destination, '_blank');
    } 
    
}