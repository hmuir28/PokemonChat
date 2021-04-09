import { Injectable } from '@angular/core';

import WebSocketConfig from '../config/websocket-config';
import Message from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket?: WebSocket;

  constructor() {
    if (!this.socket) {
      this.socket = new WebSocket(`${WebSocketConfig.protocol}${WebSocketConfig.hostname}:${WebSocketConfig.port}`);
    }
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }

  open(callback: (this: WebSocket, ev: Event) => any) {
    if (this.socket) {
      this.socket.addEventListener('open', callback);
    }
  }

  receiveMessage(callback: (this: WebSocket, ev: Event) => any) {
    if (this.socket) {
      this.socket.addEventListener('message', callback);
    }
  }

  sendMessage(msg: string | Message) {
    if (!this.socket) return;

    if (msg instanceof Message) {
      this.socket.send(JSON.stringify(msg));
      return;
    }

    this.socket.send(msg);
  }
}
