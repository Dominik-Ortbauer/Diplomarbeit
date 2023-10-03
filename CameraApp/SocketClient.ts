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

    public async sendProcessingData(data: CameraCapturedPicture[]) {
        const reader = new FileReader();

        var json = `{"type": "processing", "data":[`;

        reader.onloadend = () => {
            json += "\"" + reader.result.toString().split(";")[1].substring(7) + "\",";
            console.log("loaded");
        }

        console.log(data);
        for(const picture of data) {
            const response = await fetch(picture.uri);
            const blob = await response.blob();
            reader.readAsDataURL(blob);
            console.log("read");
        }

        reader.addEventListener("loadend", () => {
            json = json.substring(0, json.length - 1);
            json += "]}";
            console.log(json.substring(0, 100));
            if(this.ws.readyState == WebSocket.OPEN) {
                
                this.ws.send(json);
            }
        });
    }

    sendValidatedData(validationData: Map<string, string>) {
        var jsonObject = {};
        for(var [key, value] of validationData) {
            jsonObject[key] = value;
        }
        this.ws.send(`{"type": "validation", "data": ${JSON.stringify(jsonObject)}}`);
    }
}