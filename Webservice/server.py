import asyncio
import json
import websockets
import base64
import pyodbc
import datetime
from classes import Bewerber, Erziehungsberechtigter
import get_access_fk as fk
import socket

access_file_path = 'bewerber2023leer.accdb'

example_data = Bewerber('Mustermann', 'Max', 'm', '01.01.1990', 'Österreich', 'Österreich', 'röm.-kath.', 'Deutsch', 'Deutsch', '1234567', '1234567890', 'Elektronik', 'Informatik', '', 0, 4, 4, 0, 0, 0, 'Volksschule Musterdorf', 'AHS', True, 'SZ', True, [
    Erziehungsberechtigter('Vater', 'Herr', 'Dr.', 'Ing.', 'Max', 'Mustermann', 'Mustermann', 'BSc', 'A', '4060', 'Leonding', 'Musterstraße', '1', 1234567890, 1234567890, 'a.d@b.c', True, True)])


async def echo(websocket, path):
    async for message in websocket:
        data = json.loads(message)
        if(data['type'] == 'processing'):
            # write first image to file which is base 64 encoded

            for i in range(len(data['data'])):
                with open(f'DocumentUnderstanding/data/image{i}.jpg', 'wb') as file:
                    file.write(base64.b64decode(data['data'][i]))

            print('sending validation data')
            example_data.pack_guardians()
            await websocket.send(json.dumps(example_data.__dict__))
        
        if(data['type'] == 'validation'):
            # enter data into access database
            validatedBewerber = Bewerber(**data['data'])
            validatedBewerber.unpack_guardians()
            enter_data(validatedBewerber)

        print(message)



def enter_data(bewerber: Bewerber):
    first_name = bewerber.vornamen.split(' ')[0]
    middle_names = ' '.join(bewerber.vornamen.split(' ')[1:])

    conn = pyodbc.connect(r'DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:\Users\domio\OneDrive\Diplomarbeit\Webservice\bewerber2023leer.accdb;')
    cursor = conn.cursor()

    geburtsstaat_fk = fk.get_staat_fk(cursor, bewerber.geburtsstaat)
    staatsbuergerschaft_fk = fk.get_staat_fk(cursor, bewerber.staatsbuergerschaft)
    religionsbekenntnis_fk = fk.get_religionsbekenntnis_fk(cursor, bewerber.religion)
    muttersprache_fk = fk.get_landuage_fk(cursor, bewerber.muttersprache)
    alltagssprache_fk = fk.get_landuage_fk(cursor, bewerber.alltagssprache)
    herkungtsschultyp_fk = fk.get_schultyp_fk(cursor, bewerber.herkunftsschule_typ)

    desired_department_fk = fk.get_abteilung_fk(cursor, bewerber.wunsch_abteilung)
    alternative_department_fk = fk.get_abteilung_fk(cursor, bewerber.alternativ_abteilung)
    alternative_department2_fk = fk.get_abteilung_fk(cursor, bewerber.alternativ_abteilung2)

    verhalten7sst_fk = fk.get_verhalten_fk(cursor, bewerber.verhalten7sst)

    query_data = (bewerber.nachname, first_name, middle_names, bewerber.geschlecht, bewerber.geburtsdatum, geburtsstaat_fk, staatsbuergerschaft_fk, religionsbekenntnis_fk, muttersprache_fk, alltagssprache_fk, bewerber.svn_kurz, '', '', bewerber.telefonnummer, desired_department_fk, alternative_department_fk, alternative_department2_fk, bewerber.vorschule_jahre, bewerber.volkschule_jahre, bewerber.mittelschule_jahre, bewerber.ahs_jahre, bewerber.poly_jahre, bewerber.sonstige_jahre, bewerber.herkunftsschule_name, herkungtsschultyp_fk, bewerber.geschwister_an_der_schule, verhalten7sst_fk, bewerber.original_jahreszeugnis)
    query = 'insert into bewerber (Familienname, Vorname1, Vorname2plus, Geschlecht, Geburtsdatum, Geburtsstaat_FK, Staatsbuergerschaft_FK, Religionsbekenntnis_FK, Muttersprache_FK, AlltagsspracheA_FK, SVNR_kurz, Anmerkung, Schueler_EMail, TelefonNr1_Bewerber, Wunschabteilung1, Wunschabteilung2, Wunschabteilung3, Vorbildung_Vorschule, Vorbildung_Volksschule, Vorbildung_NMS, Vorbildung_AHS, Vorbildung_Poly, Vorbildung_Sonstige, Herkunftsschule, Herkunftsschultyp, Geschwister_an_HTL, Verhalten_7SST, Original_Jahreszeugnis) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    cursor.execute(query, query_data)
    conn.commit()

    cursor.execute("SELECT @@IDENTITY AS NewID")
    bewerber_id = cursor.fetchone().NewID

    # insert Adresse

    for guardian in bewerber.erziehungsberechtigte:
        guardian_type_fk = fk.get_addressart_fk(cursor, guardian.type)
        land_fk = fk.get_land_fk(cursor, guardian.land)
        ort = fk.get_ort(cursor, guardian.plz)
        gemeinde_fk = fk.get_gemeinde_fk(cursor, guardian.gemeinde)

        query_data = (bewerber_id, guardian_type_fk, guardian.anrede, guardian.title, guardian.akad_grad, guardian.vorname, guardian.zweiter_vorname, guardian.nachname, guardian.akad_grad_nach, land_fk, guardian.plz, ort, gemeinde_fk, guardian.strasse, guardian.hausnummer, guardian.telefonnummer1, guardian.telefonnummer2, guardian.email, guardian.schueler_wohnt_hier, guardian.ist_erziehungsberechtigt)
        query = 'insert into Adresse (BewerberID, AdressartID, Anrede, Titel, Akad_Grad, Vorname, Vorname2, Familienname, Akad_Grad_nach, LandID, PLZ_FK, Ort, GemeindeID_FK, Strasse, Hausnummer, Adress_TelefonNr1, Adress_TelefonNr2, Adress_EMail, Schueler_wohnt_hier, Ist_erziehungsberechtigt) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        cursor.execute(query, query_data)


    # Zeugnisse müssen selber im access eingetragen werden

    conn.commit()
    cursor.close()
    conn.close()



start_server = websockets.serve(echo, "10.0.0.30", 5000, max_size=100000000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()