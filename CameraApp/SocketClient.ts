import { CameraCapturedPicture } from "expo-camera";

export default class SocketClient {
    private ws: WebSocket;
    private port: number;
    private host: string;

    constructor(host: string, port: number, onMessage: (data: any) => void) {
        this.port = port;
        this.host = host;
        this.ws = new WebSocket(`ws://${host}:${this.port}`);

        this.ws.onerror = (error) => {
            console.log(`WebSocket error: ${error.message}`);
        }

        this.ws.onopen = () => {
            console.log("Connected to server");
        };

        this.ws.onmessage = (json) => {
            const data = JSON.parse(json.data);
            console.log(data)
            onMessage(data);
        };
    }

    public getHost(): string {
        return this.host;
    }

    public setHost(host: string) {
        this.host = host;
    }

    public getPort(): number {
        return this.port;
    }

    public setPort(port: number) {
        this.port = port;
    }

    public sendProcessingData(data: CameraCapturedPicture[]) {
        this.ws.send(`{"type": "processing", "data": ${JSON.stringify(data)}}`);
    }

    sendValidatedData(validationData: Map<string, string>) {
        var jsonObject = {};
        for(var [key, value] of validationData) {
            jsonObject[key] = value;
        }
        this.ws.send(`{"type": "validation", "data": ${JSON.stringify(jsonObject)}}`);
    }
}