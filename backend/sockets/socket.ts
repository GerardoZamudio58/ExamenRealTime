import { Socket } from 'socket.io';
import socketIO from 'socket.io';






export const desconectar = ( cliente: Socket ) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

}


// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('cambio', (  payload: boolean  ) => {

        console.log('Mensaje recibido', payload );

        io.emit('cambio', payload );

    });

}

