# @Ilbuonmatteobot

Sono il bot del Buon Matteo. I miei compiti sono quelli di prenotare il fornetto, sfottere la gente e di prendere le ordinazini delle pizze. Per scegliere una pizza scrivi /pizza seguito dalla pizza che vuoi ordinare (es. /pizza margherita). È possibile scegliere per un altro con /sceglixaltro seguito dall'username della persona e che pizza vuole (es. /sceglixaltro @Pippo margherita). Non è possibile cambiare la scelta di qualcun altro. Per vedere tutte le ordinazioni già prese puoi scivere /ordine; invece per cancellare la tua pizza /cancella e per ricominciare puoi scrivere /reset. Per prenotare il fornetto per il pasto più vicino manda /prenota e se cambi idea /sprenota. Se hai bisogno di un messaggio vocale manda /dimmi seguito da quello che vuoi ascoltare. L'admin ha il potere di inoltrare i messaggi con /scrivi "testo" e di scaricare il log delle conversazioni con /log "mese"_"anno".


## Se vuoi eseguirlo per conto tuo

Segui queste istruzioni se vuoi eseguire il bot Telegram su un tuo server Node JS:

### Prerequisiti

* [Node JS](https://nodejs.org/en/) - Ovviamente hai bisono di Node JS installato su una macchina windows (se ti sbatti a modificarlo puoi eseguirlo anche altrove) con npm per installre le dipendenze.
* [Token di @BotFather](https://telegram.me/BotFather) - Crea un nuovo bot su BotFather e copia il token.
* [ffmpeg](http://ffmpeg.org) - Scarica e copia ffmpeg.exe nella root del tuo progetto.

### Installazione

Scarica i file di questo progetto in una cartella, posizionati dentro con un prompt ed esegui:
```
npm intall
```

Questo comado installerà tutte le dipendenze necessarie per il corretto funzionamento.
Apri il file index.js con l'editor di testo che ti piace di più (es notepad++) ed inderisci il tuo token al posto dei ######.
Se hai a disposizione il chat id della tua conversazione e quella del gruppo dove hai intenzione di usarlo sostituisili al posto dei ###### mostrati di seguito:

```
const admin = ########;
const gruppo = ########;
const token = '########';
```

## Esecuzione

per eseguirlo basta che scrivi nel prompt:
```
launch.bat
```

## Personalizzalo

Personalizzalo come ti pare, se vuoi puoi vedere la [documentazione ufficiale di telegram](https://core.telegram.org/bots/api).

## Costruito con

* [Telegram Bot API for NodeJS](https://github.com/yagop/node-telegram-bot-api)
* [Google TTS (Text-To-Speech) for node.js](https://github.com/zlargon/google-tts)

## Autore

* **Andrea Mannarella**  - [andrimanna](https://github.com/andrimanna)

## Licenza

Questo progetto è sotto licenza MIT.

## Ringraziamenti

Tutti i miei amici.
