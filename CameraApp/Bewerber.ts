export class Erziehungsberechtigter {
    type: string;
    anrede: string;
    title: string;
    akad_grad: string;
    vorname: string;
    zweiter_vorname: string;
    nachname: string;
    akad_grad_nach: string;
    land: string;
    plz: string;
    gemeinde: string;
    strasse: string;
    hausnummer: string;
    telefonnummer1: string;
    telefonnummer2: string;
    email: string;
    schueler_wohnt_hier: boolean;
    ist_erziehungsberechtigt: boolean;

    constructor(data: any) {
        this.type = data?.type;
        this.anrede = data?.anrede;
        this.title = data?.title;
        this.akad_grad = data?.akad_grad;
        this.vorname = data?.vorname;
        this.zweiter_vorname = data?.zweiter_vorname;
        this.nachname = data?.nachname;
        this.akad_grad_nach = data?.akad_grad_nach;
        this.land = data?.land;
        this.plz = data?.plz;
        this.gemeinde = data?.gemeinde;
        this.strasse = data?.strasse;
        this.hausnummer = data?.hausnummer;
        this.telefonnummer1 = data?.telefonnummer1;
        this.telefonnummer2 = data?.telefonnummer2;
        this.email = data?.email;
        this.schueler_wohnt_hier = data?.schueler_wohnt_hier;
        this.ist_erziehungsberechtigt = data?.ist_erziehungsberechtigt;
    }
}

export class Bewerber {
    nachname: string;
    vornamen: string;
    wunsch_abteilung: string;
    alternativ_abteilung: string;
    alternativ_abteilung2: string;
    geschlecht: string;
    svn_kurz: number;
    geburtsdatum: string;
    telefonnummer: string;
    vorschule_jahre: string;
    volkschule_jahre: string;
    mittelschule_jahre: string;
    ahs_jahre: string;
    poly_jahre: string;
    sonstige_jahre: string;
    herkunftsschule_typ: string;
    herkunftsschule_name: string;
    geburtsstaat: string;
    staatsbuergerschaft: string;
    muttersprache: string;
    alltagssprache: string;
    religion: string;
    schulpflicht_erfuellt: boolean;
    geschwister_an_der_schule: boolean;
    verhalten7sst: string;
    original_jahreszeugnis: boolean;
    erziehungsberechtigte: Erziehungsberechtigter[];

    constructor(data: any, guardianData: any[]) {
        this.nachname = data?.nachname;
        this.vornamen = data?.vornamen;
        this.wunsch_abteilung = data?.wunsch_abteilung;
        this.alternativ_abteilung = data?.alternativ_abteilung;
        this.alternativ_abteilung2 = data?.alternativ_abteilung2;
        this.geschlecht = data?.geschlecht;
        this.svn_kurz = data?.svn_kurz;
        this.geburtsdatum = data?.geburtsdatum;
        this.telefonnummer = data?.telefonnummer;
        this.vorschule_jahre = data?.vorschule_jahre;
        this.volkschule_jahre = data?.volkschule_jahre;
        this.mittelschule_jahre = data?.mittelschule_jahre;
        this.ahs_jahre = data?.ahs_jahre;
        this.poly_jahre = data?.poly_jahre;
        this.sonstige_jahre = data?.sonstige_jahre;
        this.herkunftsschule_typ = data?.herkunftsschule_typ;
        this.herkunftsschule_name = data?.herkunftsschule_name;
        this.geburtsstaat = data?.geburtsstaat;
        this.staatsbuergerschaft = data?.staatsbuergerschaft;
        this.muttersprache = data?.muttersprache;
        this.alltagssprache = data?.alltagssprache;
        this.religion = data?.religion;
        this.schulpflicht_erfuellt = data?.schulpflicht_erfuellt;
        this.geschwister_an_der_schule = data?.geschwister_an_der_schule;
        this.verhalten7sst = data?.verhalten7sst;
        this.original_jahreszeugnis = data?.original_jahreszeugnis;
        this.erziehungsberechtigte = guardianData?.map((guardian) => new Erziehungsberechtigter(guardian));
    }
}