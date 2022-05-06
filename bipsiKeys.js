/*
    V BIPSI HTML NA LINE 3945 PASTAJ TO IN REPLACAJ OBA EVENET LISTENERJA
*/

document.addEventListener("keydown", (event) => {
    if (!event.repeat) down(event.key, event.code);
    var key = event.code
    if (key == "Space")
        parent.startVoiceMsg(); //testing only
    //parent.stopVoiceMsg(); //prav function
    if (event.key !== "Tab") {
        event.stopPropagation();
        event.preventDefault();
    }
}, { capture: true });
document.addEventListener("keyup", (event) => {
    up(event.key, event.code);
    var key = event.code
    if (key == "Space")
        parent.stopVoiceMsg(); //testing only
    //parent.startVoiceMsg(); //prav function
});
