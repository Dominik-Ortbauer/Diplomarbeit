def get_staat_fk(cursor, staat):
    cursor.execute('select StaatID from Staat where Staatname = ?', (staat))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Staat nicht gefunden: ' + staat)
        return None
    
def get_religionsbekenntnis_fk(cursor, religion):
    cursor.execute('select ReligionID from Religion where Religionsname = ?', (religion))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Religionsbekenntnis nicht gefunden: ' + religion)
        return None

def get_landuage_fk(cursor, language):
    cursor.execute('select SprachID from Sprache where Sprachname = ?', (language))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Sprache nicht gefunden: ' + language)
        return None

def get_schultyp_fk(cursor, schultyp):
    cursor.execute('select SchultypID from Schultyp where Schultypbezeichnung = ?', (schultyp))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Schultyp nicht gefunden: ' + schultyp)
        return None
    
def get_abteilung_fk(cursor, abteilung):
    cursor.execute('select AbteilungID from HTL_Abteilung where Abteilungsname like ?', ("%" + abteilung + "%"))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Abteilung nicht gefunden: ' + abteilung)
        return None
    
def get_verhalten_fk(cursor, verhaltenkürzel):
    cursor.execute('select VerhaltenID from Verhalten where Verhaltenkuerzel = ?', (verhaltenkürzel))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Verhalten nicht gefunden: ' + verhaltenkürzel)
        return None
    
def get_addressart_fk(cursor, addressart):
    cursor.execute('select AdressartId from Adressart where Adressart = ?', (addressart))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Adressart nicht gefunden: ' + addressart)
        return None
    
def get_land_fk(cursor, land):
    cursor.execute('select LandID from Land where Landname = ?', (land))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Land nicht gefunden: ' + land)
        return None
    
def get_ort(cursor, plz):
    cursor.execute('select Ort from PLZ_Ort_GD700 where PLZ = ?', (plz))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Ort nicht gefunden: ' + plz)
        return None
    
def get_gemeinde_fk(cursor, gemeinde):
    cursor.execute('select Gemeindenummer from Gemeinde_GD740 where Gemeindename = ?', (gemeinde))
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        print('Gemeinde nicht gefunden: ' + gemeinde)
        return None