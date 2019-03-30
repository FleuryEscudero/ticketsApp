    //Comando establecer comunicacion de los sockets

    var socket = io();


    var label = $('#lblNuevoTicket')
    /**
     * Escuchar 
     */
    socket.on('connect', () => {
        console.log('Conectado al servidor');
    });

    socket.on('disconnect', () => {
        console.log('Perdimos conexion con el servidor');
    });

    socket.on('getStatus', (res)=>{
        console.log(res);
        label.text(res.actual);
    })

    $('button').on('click', function () {
       
        socket.emit('nextTicket', null,(nextTicket)=>{
           label.text(nextTicket);
        })
    })