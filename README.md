# Tura Mea

Aplicație pentru program în ture de 24/48 (sau 24/72). Îi spui o zi în care ai fost în tură, iar ea îți calculează toate turele, îți arată în ce zile lucrezi și ține evidența concediilor și a orelor.

## Ce face

- **Calendar** cu zilele de tură (T), ieșirea din tură (Ieș) și zilele libere.
- **Starea de azi**: ești în tură, ieși din tură sau ești liber, plus când e următoarea tură.
- **Verifică o zi**: alegi orice dată și îți spune dacă ești de serviciu.
- **Excepții**: atingi o zi și pui CO (concediu de odihnă), CM (concediu medical), Liber cerut, RS (recuperare ore suplimentare), Schimb de tură (cu numele colegului) sau Tură în plus, cu o notă.
- **Perioade**: pui CO sau CM pe mai multe zile deodată.
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

- **Fiecare cu tokenul lui (recomandat).** În `tura-mea-date` → **Settings** → **Collaborators** → **Add people** și îl inviți pe coleg. El își face un token fine-grained pentru `tura-mea-date` cu **Contents: Read and write**. Dacă pleacă din echipă, îl scoți din Collaborators și nu mai are acces.
- **Un singur token comun.** Faci tu un token doar pentru `tura-mea-date` și îl dai colegilor. E mai simplu (ei nu au nevoie de cont GitHub), dar nu poți tăia accesul unui singur om: trebuie să faci token nou pentru toți.

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
    "2026-12-27": { "tip": "extra", "nota": "schimb cu Andrei" }
  }
}
```

- `ciclu`: 3 înseamnă 24/48, 4 înseamnă 24/72.
- `dataReferinta`: o zi de tură; de la ea se calculează restul.
- `exceptii`: zilele schimbate față de program. `tip` poate fi `CO`, `CM`, `L` (liber cerut), `RS` (recuperare ore suplimentare), `SCH` (schimb de tură, cu numele colegului în `cu`) sau `extra` (tură în plus).
- Un `SCH` pus într-o zi de tură înseamnă că ți-ai dat tura; pus într-o zi liberă înseamnă că lucrezi în locul colegului.

## Cum se calculează statisticile

- **Ore lucrate** = ture lucrate × 24. Orele unei ture se numără în ziua în care începe.
- **Normă** = zile lucrătoare (luni–vineri, fără sărbători legale) × 8 ore. E orientativă; verifică cum se calculează la locul tău de muncă.
- O zi cu CO, CM, Liber cerut sau RS peste o tură scade tura din total. Statisticile arată și câte ore ai recuperat prin RS și câte schimburi ai făcut. O „Tură în plus” o adaugă.

## Dacă modifici codul

Totul e în `index.html`. După ce încarci o versiune nouă pe GitHub, deschide `sw.js` și schimbă `tura-mea-v1` în `tura-mea-v2` (și tot așa), ca telefoanele să ia versiunea nouă.
