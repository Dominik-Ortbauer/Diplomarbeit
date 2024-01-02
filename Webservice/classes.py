from typing import List


class Erziehungsberechtigter:
    def __init__(self, dict):
        self.__dict__ = dict

    def __init__(self, type, anrede, title, akad_grad, vorname, zweiter_vorname, nachname, akad_grad_nach, land, plz, gemeinde, strasse, hausnummer, telefonnummer1, telefonnummer2, email, schueler_wohnt_hier, ist_erziehungsberechtigt):
        self.type = type
        self.anrede = anrede
        self.title = title
        self.akad_grad = akad_grad
        self.vorname = vorname
        self.zweiter_vorname = zweiter_vorname
        self.nachname = nachname
        self.akad_grad_nach = akad_grad_nach
        self.land = land
        self.plz = plz
        self.gemeinde = gemeinde
        self.strasse = strasse
        self.hausnummer = hausnummer
        self.telefonnummer1 = telefonnummer1
        self.telefonnummer2 = telefonnummer2
        self.email = email
        self.schueler_wohnt_hier = schueler_wohnt_hier
        self.ist_erziehungsberechtigt = ist_erziehungsberechtigt

class Bewerber:
    def __init__(self, dict):
        self.__dict__ = dict

    def __init__(self, nachname, vornamen, geschlecht, geburtsdatum, geburtsstaat, staatsbuergerschaft, religion, muttersprache, alltagssprache, svn_kurz, telefonnummer, wunsch_abteilung, alternativ_abteilung, alternativ_abteilung2, vorschule_jahre, volkschule_jahre, mittelschule_jahre, ahs_jahre, poly_jahre, sonstige_jahre, herkunftsschule_name, herkunftsschule_typ, geschwister_an_der_schule: bool, verhalten7sst, original_jahreszeugnis: bool, erziehungsberechtigte: List[Erziehungsberechtigter]):
        self.nachname = nachname
        self.vornamen = vornamen
        self.wunsch_abteilung = wunsch_abteilung
        self.alternativ_abteilung = alternativ_abteilung
        self.alternativ_abteilung2 = alternativ_abteilung2
        self.geschlecht = geschlecht
        self.svn_kurz = svn_kurz
        self.geburtsdatum = geburtsdatum
        self.telefonnummer = telefonnummer
        self.vorschule_jahre = vorschule_jahre
        self.volkschule_jahre = volkschule_jahre
        self.mittelschule_jahre = mittelschule_jahre
        self.ahs_jahre = ahs_jahre
        self.poly_jahre = poly_jahre
        self.sonstige_jahre = sonstige_jahre
        self.herkunftsschule_typ = herkunftsschule_typ
        self.herkunftsschule_name = herkunftsschule_name
        self.geburtsstaat = geburtsstaat
        self.staatsbuergerschaft = staatsbuergerschaft
        self.muttersprache = muttersprache
        self.alltagssprache = alltagssprache
        self.religion = religion
        self.geschwister_an_der_schule = geschwister_an_der_schule
        self.verhalten7sst = verhalten7sst
        self.original_jahreszeugnis = original_jahreszeugnis
        self.erziehungsberechtigte = erziehungsberechtigte

    def unpack_guardians(self):
        if len(self.erziehungsberechtigte) > 0 and isinstance(self.erziehungsberechtigte[0], dict):
            self.erziehungsberechtigte = [Erziehungsberechtigter(**e) for e in self.erziehungsberechtigte]

    def pack_guardians(self):
        if len(self.erziehungsberechtigte) > 0 and isinstance(self.erziehungsberechtigte[0], Erziehungsberechtigter):
            self.erziehungsberechtigte = [e.__dict__ for e in self.erziehungsberechtigte]
    
    def __str__(self):
        return f"{self.first_name} {self.family_name}"