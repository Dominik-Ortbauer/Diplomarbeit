import asyncio
import json
import websockets

async def echo(websocket, path):
    async for message in websocket:
        print(message)
        data = json.loads(message)
        if(data['type'] == 'processing'):
            # send data to model
            validationData = {
                'Vorname': 'Max',
                'Nachname': 'Mustermann',
                'Geburtsdatum': '01.01.1990',
            }
            print('sending validation data')
            await websocket.send(json.dumps(validationData))
        
        if(data['type'] == 'validation'):
            # enter data into access database
            validatedData = data['data']
            print(validatedData['Vorname'])

        print(message)

start_server = websockets.serve(echo, "10.0.0.29", 5000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()