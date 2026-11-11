# Tura Mea

Aplicație pentru program în ture de 24/48 (sau 24/72). Îi spui o zi în care ai fost în tură, iar ea îți calculează toate turele, îți arată în ce zile lucrezi și ține evidența concediilor și a orelor.

## Ce face

- **Calendar** pe luna curentă și luna următoare, cu zilele de TURA, ieșirea din tură (Ieș) și zilele libere.
- **Starea de azi**: ești în tură, ieși din tură sau ești liber, plus când e următoarea tură.
- **Verifică o zi**: alegi orice dată și îți spune dacă ești de serviciu.
- **Excepții**: atingi o zi și pui CO (concediu de odihnă), COS, CM (concediu medical), Liber cerut, RS (recuperare ore suplimentare), Curs sau Schimb de tură (cu numele colegului). Poți scrie și o notă (de ex. „Ambulanță”), care apare în ziua respectivă din calendar.
- **Perioade**: pui CO, COS, CM, RS, Curs sau o notă pe mai multe zile deodată.
- **Statistici pe an și pe lună**: ture lucrate, ore lucrate, normă de ore, diferența față de normă, zile CO folosite și rămase, ture în weekend și de sărbători.
- **Sărbătorile legale din România** sunt calculate automat, inclusiv Paștele și Rusaliile ortodoxe.
- **Baza de date în GitHub**: datele se salvează în fișierul `data/ture.json` din repository-ul tău.
- Merge **fără internet** și se poate **instala pe telefon** ca o aplicație.

## Fișierele proiectului

| Fișier | Ce este |
|---|---|
| `index.html` | Toată aplicația (aspect + logică) |
| `manifest.webmanifest` | Numele și iconița pentru instalarea pe telefon |
| `sw.js` | Face aplicația să meargă și fără internet |
| `icon.svg`, `icon-192.png`, `icon-512.png` | Iconițele |
| `data/ture.json` | Baza de date: setările și zilele marcate |

---

## Pasul 1. Pune proiectul pe GitHub

1. Fă-ți cont pe [github.com](https://github.com) dacă nu ai.
2. Sus-dreapta apasă **+** → **New repository**.
3. La **Repository name** scrie `tura-mea`.
4. Alege **Public** (GitHub Pages gratuit merge doar cu repository public). Vezi nota de la final despre confidențialitate.
5. Apasă **Create repository**.
6. Pe pagina nouă apasă linkul **uploading an existing file**.
7. Dezarhivează `tura-mea.zip` pe calculator și trage **conținutul** folderului (nu folderul în sine) în pagină: `index.html`, `manifest.webmanifest`, `sw.js`, iconițele, `README.md` și folderul `data`.
8. Jos apasă **Commit changes**.

## Pasul 2. Pornește site-ul (GitHub Pages)

1. În repository mergi la **Settings** → **Pages** (în meniul din stânga).
2. La **Source** alege **Deploy from a branch**.
3. La **Branch** alege `main` și folderul `/ (root)`, apoi **Save**.
4. Așteaptă 1–2 minute și reîncarcă pagina. Apare adresa aplicației, de forma:
   `https://NUMELE-TAU.github.io/tura-mea/`

## Pasul 3. Instalează pe telefon

- **Android (Chrome)**: deschide adresa, apasă meniul cu trei puncte → **Instalează aplicația** sau **Adaugă pe ecranul de pornire**.
- **iPhone (Safari)**: butonul de partajare → **Adaugă pe ecranul principal**.

## Pasul 4. Setează-ți programul

În aplicație, fila **Setări**:

1. **Tip tură**: 24/48.
2. **O zi în care ai fost în tură**: alege orice zi în care ai intrat în tură. De la ea se calculează tot.
3. **Ora intrării în tură**: de exemplu 08:00.
4. **Zile CO pe an**: câte zile de concediu ai dreptul.

## Pasul 5. Leagă aplicația de baza de date din GitHub

Ca aplicația să poată scrie în `data/ture.json`, are nevoie de un **token** (o parolă specială, valabilă doar pentru acest repository).

1. Pe GitHub: poza ta de profil (sus-dreapta) → **Settings** → jos de tot **Developer settings** → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. **Token name**: `tura-mea`. **Expiration**: de exemplu 1 an.
3. **Repository access**: **Only select repositories** → alege `tura-mea`.
4. **Permissions** → **Repository permissions** → **Contents**: **Read and write**.
5. Apasă **Generate token** și copiază codul (începe cu `github_pat_`). Îl vezi o singură dată.
6. În aplicație, fila **Setări** → **Baza de date în GitHub**: scrie numele tău (de ex. `alexandru`), proprietarul repository-ului (utilizatorul tău GitHub), repository-ul, ramura `main` și lipește tokenul. Datele tale se salvează în `data/ture-alexandru.json`.
7. Apasă **Salvează în GitHub**. Bifează și **Salvează automat**, ca să se salveze singură după fiecare modificare.

Pe alt telefon sau calculator: completezi aceleași câmpuri și apeși **Încarcă din GitHub**.

> **Important**
> - Tokenul se păstrează **doar pe dispozitivul tău**. Nu ajunge în fișierele din GitHub. Nu-l da nimănui.
> - Dacă repository-ul e **public**, oricine poate vedea fișierul `data/ture.json` (programul tău și notele). Nu scrie în note lucruri personale. Dacă vrei datele private, păstrează doar copia de pe telefon și folosește **Descarcă fișierul cu date** ca backup.
> - Dacă tokenul expiră, faci unul nou la fel și îl lipești în aplicație.

## Baza de date privată, comună pentru toată echipa

Ca datele să nu fie publice, ține-le într-un repository **separat și privat**, de exemplu `tura-mea-date`. Aplicația rămâne în `tura-mea` (public), iar în aplicație scrii la Repository `tura-mea-date`.

Fiecare coleg are fișierul lui în același repository: `data/ture-alexandru.json`, `data/ture-andrei.json` etc. Datele se salvează **și pe telefonul lui, și în GitHub**. Dacă nu are internet, se salvează pe telefon și se trimit singure în GitHub când revine semnalul.

Cum dai acces colegilor (alege una):

- **Fiecare cu contul și tokenul lui (recomandat).** Colegul își face cont GitHub. Tu îl inviți: `tura-mea-date` → **Settings** → **Collaborators** → **Add people**. El acceptă invitația (din e-mail sau github.com/notifications), apoi își face un **token clasic**: **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)** → **Generate new token (classic)**, bifează **repo**, alege expirarea și apasă **Generate token**. Tokenurile fine-grained nu merg pe un repository care aparține altcuiva. Tokenul tău nu-l dai nimănui. Dacă pleacă din echipă, îl scoți din Collaborators sau din aplicație.
- **Un singur token comun.** Faci tu un token doar pentru `tura-mea-date` și îl dai colegilor. E mai simplu (ei nu au nevoie de cont GitHub), dar nu poți tăia accesul unui singur om: trebuie să faci token nou pentru toți.

### Scoaterea unui coleg din echipă (doar administratorul)

1. Fă un token separat pentru echipă (Pasul 5, numit de ex. `tura-mea-echipa`, doar pentru `tura-mea-date`, cu **Contents: Read and write**) și dă-l colegilor. Pe al tău nu-l da.
2. În aplicație: **Setări** → **Administrator** → scrie un cod de minim 6 caractere → **Activează**. Codul se salvează criptat în `data/admin.json`. Fă asta înaintea colegilor: prima persoană care apasă „Activează” stabilește codul.
3. Pe alt telefon sau pe Mac introduci același cod.
4. În fila **Echipa**, jos, apare **Administrează echipa**. **Scoate** (apeși de două ori) șterge fișierul colegului.

Ce se întâmplă cu colegul scos:
- numele lui intră în lista `data/scosi.json`, deci nu mai apare în echipă;
- în aplicația lui apare mesajul „Ai fost scos din echipă”; calendarul lui merge mai departe pe telefon, dar nu mai salvează în GitHub și nu mai vede echipa;
- în panoul tău apare la „Scoși din echipă”, cu butonul **Readaugă**.

Panoul apare doar unde s-a introdus codul. Tokenul comun le dă totuși tehnic voie colegilor să scrie în repository (de exemplu, cineva și-ar putea schimba numele în aplicație ca să ocolească lista). Ca să tai complet accesul cuiva, fă un token nou de echipă și dă-l doar celor rămași.
Ca să schimbi codul: șterge pe GitHub fișierul `data/admin.json` și activează din nou cu codul nou.

### Te scoți sau te înlocuiești singur din echipă

În **Setări** → **Eu în echipă**:
- **Înlocuiește-mă cu numele nou**: scrii numele nou, iar turele tale se mută sub el; numele vechi dispare din echipă. Dacă există deja cineva cu numele acela, aplicația refuză.
- **Ieși din echipă** (apeși de două ori): îți scoate turele din baza de date. Ele rămân pe telefon, iar salvarea automată se oprește. Revii oricând cu **Salvează în GitHub**.

> Oricine are acces la `tura-mea-date` poate vedea și modifica fișierele tuturor colegilor. GitHub nu poate da acces doar la un fișier. Dă acces doar oamenilor de încredere și nu scrie în note lucruri personale.

## Cum arată baza de date

```json
{
  "versiune": 1,
  "setari": {
    "ciclu": 3,
    "dataReferinta": "2026-11-09",
    "oraStart": "08:00",
    "oreTura": 24,
    "zileCO": 25
  },
  "exceptii": {
    "2026-12-24": { "tip": "CO", "nota": "" },
    "2026-12-27": { "tip": "SCH", "nota": "Ambulanță", "cu": "Andrei" }
  }
}
```

- `ciclu`: 3 înseamnă 24/48, 4 înseamnă 24/72.
- `dataReferinta`: o zi de tură; de la ea se calculează restul.
- `exceptii`: zilele schimbate față de program. `tip` poate fi `CO`, `COS`, `CM`, `L` (liber cerut), `RS` (recuperare ore suplimentare), `CURS` (zi de curs) sau `SCH` (schimb de tură, cu numele colegului în `cu`). `nota` e textul care apare în calendar.
- Un `SCH` pus într-o zi de tură înseamnă că ți-ai dat tura; pus într-o zi liberă înseamnă că lucrezi în locul colegului.

## Cum se calculează statisticile

- **Ore lucrate** = ture lucrate × 24. Zilele de curs nu sunt zile de muncă: apar doar la „zile de curs”. Orele unei ture se numără în ziua în care începe.
- **Normă** = zile lucrătoare (luni–vineri, fără sărbători legale) × 8 ore. E orientativă; verifică cum se calculează la locul tău de muncă.
- O zi cu CO, COS, CM, Liber cerut, RS sau Curs peste o tură scade tura din total. Statisticile arată și câte ore ai recuperat prin RS și câte schimburi ai făcut.

## Dacă modifici codul

Totul e în `index.html`. După ce încarci o versiune nouă pe GitHub, deschide `sw.js` și schimbă `tura-mea-v1` în `tura-mea-v2` (și tot așa), ca telefoanele să ia versiunea nouă.
