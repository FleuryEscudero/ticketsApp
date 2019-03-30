const fs = require('fs');


class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {

        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        /**
         * reiniciar el proceso despues de cada dia
         */

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCount();

        }

    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();
        return `Ticket ${this.last}`;
    }

    getStatus() {
        return `Ticket ${this.last}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    ticketAsigned(desktop) {
        if (this.tickets.length === 0) {
            return 'Ya no hay mas tickets'
        }
        let tnumber = this.tickets[0].number;
        this.tickets.shift();

        let asignedTicket = new Ticket(tnumber, desktop);

        this.lastFour.unshift(asignedTicket);

        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1) //borra ultimo elemento del arreglo
        }
        console.log('Last 4');
        console.log(this.lastFour);

        this.saveFile();
        return asignedTicket;
    }

    restartCount() {
        this.ultimo = 0;
        this.tickets = [];
        this.lastFour = [];
        console.log('Iniciando Conteo');
        this.saveFile();
    }

    saveFile() {

        let jsondata = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastfour: this.lastFour
        };

        let json = JSON.stringify(jsondata);
        /**
         * guardamos en un json
         */
        fs.writeFileSync('./server/data/data.json', json);

    }

}




module.exports = {
    TicketControl
}