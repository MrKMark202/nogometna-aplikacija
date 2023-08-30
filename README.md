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


## UML Class dijagram

<img src="https://cdn.discordapp.com/attachments/913822641645813772/1146478484458307636/image.png">

Nogometna aplikacija nema admine, moderatore, banke, administratore i sl., jer jednostavno nije potrebno, svi se oni klasificiraju kao jedan obićan zasebni korisnik. 
Nakon registracije korisnika i njegovog ulogiranja, omogućeno mu je sve za što je aplikacija namijenjena, može kreirati ligu, timove, utakmice, te može pregledavati sveukupni rezultat po svakoj ligi koju je napravio i može pregledavati sve utakmice koje je kreirao. Korisnik svoje kreirane lige može provjeriti kroz „select“ opciju koja se nalazi u kreiranju kluba, utakmice i pregleda rezultata. Sve kreirane klubove može pregledati kod kreiranja utakmice i pregleda konačnih rezultata u tablici. U dijagramu su navedeni algoritmi provjeravanja s razlogom jer se očekivalo da će biti potrebni u nekim dijelovima aplikacije, kao na primjer: provjera kreirane lige i provjera kreiranja klubova. Na kraju je jasno da ako nije kreirana makar jedna liga, ne može se kreirati ni klub, a ako nisu kreirana makar 2 kluba za tu jednu ligu, ne može se kreirati ni utakmica. To je prvobitno i spriječeno tako što se je dodalo pravilo koje spriječava da se gumb „uključi“ dok se sva potrebna polja moraju popuniti.



## Uputstvo za korištenje aplikacije

    