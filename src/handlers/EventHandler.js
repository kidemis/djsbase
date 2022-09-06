function eventHandler (client, events) {
    for(const [_, ev] of events.entries()) {
        if(ev.disabled) continue;
        ev.execute(client);
    }
}

module.exports = eventHandler;