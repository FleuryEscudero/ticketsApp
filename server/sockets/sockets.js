const {
    io
} = require('../server');
const {
    TicketControl
} = require('../classes/ticket.control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket();
        console.log(nextTicket);
        callback(nextTicket);
    });

    //emitir un evento actual status

    client.emit('getStatus', {
        actual: ticketControl.getStatus(),
        lastFour: ticketControl.getLastFour()
    });

    client.on('ticketAsigned', (data, callback) => {

        if (!data.desktop) {
            return callback({
                err: true,
                message: 'Escritorio es necesario'
            });
        }


        let asignedTicket = ticketControl.ticketAsigned(data.desktop);
        callback(asignedTicket);


        //actualizar o no tificar cambios a los ultimos 4
        client.broadcast.emit('LastFour', {
            lastFour: ticketControl.getLastFour()
        })

    })



});