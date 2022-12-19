import { useEffect, useRef } from 'react';
import io, {Socket} from 'socket.io-client';

export const useSocket = (url: string): Socket => {
    const { current: socket } = useRef(io(url));
    

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);


   

   

    return socket;
    
};


