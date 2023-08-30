# Nogometna Aplikacija
 
 Aplikacija je izrađena u sklopu predmeta Programsko inžinjerstvo.

 Alati i programi korišteni za izradu aplikacije:
- Vue
- JavaScript
- HTML & CSS
- Visual studio code
- Firebase
- Netlify
- Github


## SWOT analiza

Prednosti:
- Lagana upotreba bez detaljnih pojašnjenja
- Slaba konkurencija
- Pregled kreiranih liga, timova i utakmica

Slabosti:
 Ukoliko netko zna nećiji e-mail i lozinku, lako se može prijaviti kao ta osoba

Mogučnosti:
- Dodavanje više unosa drugih podataka
- Kreiranje lige, timova i utakmica
- Pregled tablice
- Brisanje liga i timova

Prijetnje:
- Predstavljanje lažnih podataka u javnost


### Detaljno objašnejnje SWOT-a

#### Prednosti
Aplikaciju nije bilo komplicirano raditi, niti je bilo potrebno nešto takvo dodavati, zato je jako jednostavna za korištenje, bilo tko je može koristiti. Kako je navedeno u uvodu, i da postoji neka aplikacija koja ima isti ili slični koncept kao ova aplikacija, sigurno nije dobro dizajnirana i dobro organizirana po pitanju preglednosti i razumijevanja samih korisnika, stoga se smatra da prevelike brige o konkurenciji konkretno nema. Kako se aplikacija bude koristila, kreirale lige, timovi i utakmice, tako će se moći vidjeti sve lige koje je korisnik napravio, sve timove za svaku ligu posebno, te sve utakmice koje su se „odigrale“.
Slabosti
Apliakcija nema određeni sustav sigurnosti prijavljivanja, stoga, ako neki korisnik zna e-mail adresu i lozinku drugog korisnika, on se lako može prijaviti, uzeti sve za sebe ili čak mu uništiti sve što je korisnik do sada napravio za sebe.


#### Mogućnosti
Korisnik u bilo kojem trenutku može kreirati nove lige, timove i utakmice, a ukoliko mu se ne sviđaju, može ih lagano obrisati. Na dijelu aplikacije zvana „Tablice“ možete pregledati sve vaše lige te trenutne rezultate svih timova kako ste kreirali utakmice. Tu također možete izbrisati ligu ili klub, ali utakmica kada se jednom unese, ne može se izbrisati, niti kada bi se klub izbrisao, ne brišu se rezultati timova koji su „odigrali“ utakmice protiv izbrisanog tima.


#### Prijetnje
Netko tko zna hakirati ili lažno predstavljati pojedine stvari, može lagano zloupotrijebiti aplikaciju na način da normalno kreira ligu, timove i utakmicu, te da sve to objavljuje na internet kako bi se „igrao“ sa ljudima i navijaćima tih klubova za koje je lažno predstavio u javnost, misleći da se ta utakmica zaista tako odigrala.


## UML Use Case dijagram

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146478484458307636/image.png">

Nogometna aplikacija nema admine, moderatore, banke, administratore i sl., jer jednostavno nije potrebno, svi se oni klasificiraju kao jedan obićan zasebni korisnik. 
Nakon registracije korisnika i njegovog ulogiranja, omogućeno mu je sve za što je aplikacija namijenjena, može kreirati ligu, timove, utakmice, te može pregledavati sveukupni rezultat po svakoj ligi koju je napravio i može pregledavati sve utakmice koje je kreirao. Korisnik svoje kreirane lige može provjeriti kroz „select“ opciju koja se nalazi u kreiranju kluba, utakmice i pregleda rezultata. Sve kreirane klubove može pregledati kod kreiranja utakmice i pregleda konačnih rezultata u tablici. U dijagramu su navedeni algoritmi provjeravanja s razlogom jer se očekivalo da će biti potrebni u nekim dijelovima aplikacije, kao na primjer: provjera kreirane lige i provjera kreiranja klubova. Na kraju je jasno da ako nije kreirana makar jedna liga, ne može se kreirati ni klub, a ako nisu kreirana makar 2 kluba za tu jednu ligu, ne može se kreirati ni utakmica. To je prvobitno i spriječeno tako što se je dodalo pravilo koje spriječava da se gumb „uključi“ dok se sva potrebna polja moraju popuniti.



## UML Class dijagram

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146478941465485433/image.png">

UML Klasni dijagram (Slika 18) smo koristili za objekte iz domene. Dijagram aplikacije nije kompliciran jer je sama aplikacija jednostavna.  Na početku je već spomenuto da aplikacija nema admina, administratora, niti nekih drugih posrednika, već svi se gledaju kao jedan običan korisnik. Obilježja korisnika su ime, prezime, username (što je kasnije postala e-mail adresa), lozinka, te datum rođenja. Korisnik može kreirati lige, timove i utakmice koliko god želi, no sve te lige, timovi i utakmice imaju jednoga kreatora, jedna liga može imati više klubova, no jedan klub pripada samo u jednoj ligi. Moguće je napraviti dva identična tima u dvije različite lige, ali ta dva tima su također različita. Za jednu ligu i uz klubove može se kreirati utakmica koliko korisnik želi. Obilježja lige su naziv i država kojoj pripada, daljnim napretkom odustalo se od ideje gdje će se pratiti broj klubova jer to se može vidjeti kroz prikaz rezultata u tablici, a dodan je podatak o tome kada je nastala liga. Obilježja kluba su naziv, godina nastanka, država kojoj pripada i liga u kojoj se nalazi klub. Mjesto gdje se klub nalazi je odlučeno da se makne jer će se gledati kroz kreiranje utakmica. Logično će biti da klub igra domaće utakmice na istom mjestu, osim ako se ne radi u europskom natjecanju. Klub se može kreirati, izbrisati i pretražiti i pregledati kroz tablicu. Obilježja utakmice su kolo i datum utakmice, kasnije je dodano mjesto igranja, naziv stadiona, odabir lige i klubova i zapis golova. Vrijeme početka utakmice je kasnije maknuto jer nakon što se utakmica „odigra“, postaje nebitno. Utakmice se mogu pregledati u pregledu utakmica gdje će se odabirom lige izlistati sve utakmice koje su zapisane za tu ligu, izlistati će se zajedno sa svim važnim podacima o utakmici.


## Implementacija

Za izradu cijele aplikacije korištena je aplikacija Visual Studio Code gdje smo koristili vue, javascript, html i css. Za pohranu podataka i slika koristila se web baza podataka Firebase. U toj bazi podataka je korišten firebase firestore za pohranu podataka, firebase storage je korišten za slike i još je korišten firebase autentification za pravljenje e-mail adresa koje nisu povezane sa pravim g-mailom.

Planirane funkcije u prototipu WEB aplikacije:
- Registracija i prijava korisnika
- Kreiranje i brisanje lige
- Kreiranje i Brisanje kluba
- Kreiranje i Brisanje utakmice
- Prikaz rezultata u tablici
- Prikaz svih kreiranih utakmica i rezultate

Kako je zamišljeno, tako je i napravljeno. Male promjene su kod utakmice, za koje je odlučeno da se trenutno neće moći brisati niti mijenjati, tako da će njihov upis zahtjevati stogu preciznost ako korisnik želi da bude onako kako on želi. Promjena oko dizajna nema, slika je ista, samo što se je u prototipu navigacijska traka prikazana zajedno sa slikom, dok je u završnoj verziji posebna vidljiva stvar gdje je prisutna u svakom dijelu stranice.

Vue komponente se nisu koristile u kreiranju ove aplikacije jer svaki kod nije toliko dugaćak da se je morao prebacivati u posebnu komponentu, ovako je sve pregledno i toćno se zna gdje bi koja funkcija zaštekala.


## Uputstvo za korištenje aplikacije


### Registracija i prijava

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146480435765989386/image.png">

Ovako trebaju biti popunjeni podaci za registraciju. Napomena, za svako biranje datuma, kada se klikne na datum, možete kliknuti na „datum + godina“ što stoji iznad svih dana u mjesecu, jedan klik će vas odvesti da birate mjesec u trenurnoj godini, a još jedan klik na isto će vas odvesti na biranje svih godina.

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146480478367526942/image.png">


### Kretanje po aplikaciji

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146481024369447033/image.png">

Kroz izbornik aplikacije koji se pokaže ćim se korisnik prijavi u aplikaciju, možete se kretati na druge dijelove aplikacije bez ikakvih poteškoća.


### Kreiranje lige

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146481087577604106/image.png">

Upisom potrebnih i ispravih podataka za kreiranje lige, otvara vam se gumb za kreiranje. Grb lige nije obavezan jer ukoliko korisnik ne želi ga priložiti iskorititi će se standardni grb koje je postavljen u bazi podataka.


### Kreiranje kluba

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146481159686070432/image.png">

Upisom potrebnih i ispravih podataka za kreiranje kluba, otvara vam se gumb za kreiranje. Grb kluba nije obavezan jer ukoliko korisnik ne želi ga priložiti iskorititi će se standardni grb koje je postavljen u bazi podataka.


### Kreiranje utakmice

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146481221220704489/image.png">

Upisom potrebnih i ispravih podataka za kreiranje utakmice, otvara vam se gumb za kreiranje. Utakmica zahtjeva malo više podataka jer je sve navedeno potrebno za ispunjenje.


### Tablica

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146481275532746913/image.png">

Odabirom lige vam se prikazuju svi vaši kreirani klubovi zajedno sa obrađenim podacima kako ste kreirali utakmice. Odabirom lige možete ju izbrisati klikom na gumb iznad, pa tako i za klub, samo što za klub prvo trebate odabrati ligu iz koje želite izbrisati klub, zatim onda odabirete klub koji želite izbrisati.


### Pregled utakmica

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146481334571765851/image.png">

Odabirom lige vam se izlistavaju sve vaše kreirane utakmice zajedno sa svim njenim važnim podacima. Kao što je prije napomenuto, utakmice se ne mogu mijenjati ili brisati jer je proces poništavanja obrađenih podataka vrlo kompliciran, stoga unosite podatke za utakmicu sigurno i pažljivo.
