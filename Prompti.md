Haluan rakentaa CV rakennus työkalun jossa käyttäjä syöttää eri tiedot kenttiin ja lopuksi tulostaa pdf muodossa cv:n. Käyttäjän tiedot tulee tallentaa local storageen. Luo tilaa varten omat metodit ja tee se koko projektin saataville. Tee aluksi suunnitelma ja tavoitteet projektille, jonka pohjalta testaaminen tapahtuu. Tutustu svelte projektin pohjaan ja rakenna sen päälle.

## CV:n peruselementit

- Yhteystiedot 
- Tiivistelmä/profiili/ydinosaaminen ja vahvuudet (md muodossa) 1 kpl
- Työkokemus (Tehtävänimike, työnantaja, päivämäärät, lisätiedot (md muodossa)) lista
- Koulutus (Tutkinto, koulu, päivämäärät ja lisätiedot (md muodossa)) lista
- Kielitaito (Kieli, taitotaso, tutkinto tms) lista

Lisäksi vapaaehtoisia
- IT-taidot (Ohjelmat, taitotaso) lista
- Täydennyskoulutus (Tutkinto, tarjoava taho, päivämäärä) lista                                                                   
- Luottamustehtävät/vapaaehtoistyö (Tehtävä, taho, päivämäärät, lisätiedot) lista
- Kiinnostukset (kiinnostuksen kohde, lisätiedot) lista                                           
- Muut tiedot (md muodossa) 1 kpl
- Tieto suosittelijoista (Suosittelija, yritys tms, puhelinnumero, sähköposti) lista

## Toimintalogiikka
Jokaisen elementin vieressä tulee olla muokkausvaiheessa kynäpainike josta avautuu popup valikko. Popup valikossa on form muodossa kentän tiedot mitä halutaan lisätä. Jos on listamuotoinen osio, lisäyspainike listan yläosaan otsikon tasolle. Käyttöliittymässä rajoitetaan erikseen että esimerkiksi yhteystieto elementtejä ei voi lisätä kuin yksi.

## Tiedon tallennus
Jokaisen elementtityypin tiedot tulee tallentaa objektimuodossa tilaan siten että koodi on modulaarista. Kaikki elementit on lähtökohtaisesti array muodossa, jotta työkokemusten tai muiden listamuotoisten elementtien lisääminen on helppoa.

## Tyylitys
Käytä kaikkialla tailwindcss. Pyri myös käyttämään kaikkialla shadcn teeman muuttujia, jotta visuaalisen ilmeen muuttaminen on mahdollisimman helppoa. Tee myös komponentti johon voi syöttää shadcn teeman määritystiedot.

## Kirjastot
Käytä komponenttikirjastona shadcn-svelte kirjastoa: https://shadcn-svelte.com/llms.txt
Käytä ikoneina heroicons kirjastoa https://heroicons.com/
Käytä md editori komponentin pohjana https://github.com/BearToCode/carta


I have svelte component which handles state changes. I want it to provide context for it's potential children

- Vapaavalintainen sijainti eri osioille
- 