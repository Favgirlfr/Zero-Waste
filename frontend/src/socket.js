import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    transports: ["websocket"],
    reconnection: true,

}); // Replace with your backend URL
export default socket;
