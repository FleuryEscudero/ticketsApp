var socket = io();



var searchParams = new URLSearchParams(window.location.search)
if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario 2');
};

var desktop = searchParams.get('desktop');
var label = $('small');

console.log(desktop);

$('h1').text(`Escritorio ${desktop}`);

$('button').on('click', () => {

    socket.emit('ticketAsigned', {
        desktop
    }, (data) => {
        if (data === 'Ya no hay mas tickets') {
            label.text(data);
            alert(data)
            return;
        }
        label.text(`Ticket numero ${data.number}`);
    })
})