// aggiungo le api
const TelegramBot = require('node-telegram-bot-api');
 
// token di @BotFather 
const token = '############';
 
// avvio il bot in polling
const bot = new TelegramBot(token, {polling: true});

// leggo tutti i messaggi per sfottere la gente
bot.on("message", (msg) => {
	if (msg.text.toString().toLowerCase().includes("pesto")) {
		bot.sendMessage(msg.chat.id, "Mia mamma lo fa meglio!");
	}
	if (msg.text.toString().toLowerCase().includes("sugo")) {
		bot.sendMessage(msg.chat.id, "Che schifo il sugo, " + msg.from.first_name + "!");
	}
	if (msg.text.toString().toLowerCase().includes("sesamo")) {
		bot.sendMessage(msg.chat.id, "Eja! Il mal di testta venirre fa.");
	}
	if (msg.text.toString().toLowerCase().includes("autostrad")) {
		bot.sendMessage(msg.chat.id, msg.from.first_name + ", quantte voltte te lo devvo dire che in Sardegna autosradde non ci sonno.");
	}
	if (msg.text.toString().toLowerCase().includes("bruciat")) {
		bot.sendMessage(msg.chat.id, "È stata Clarissa!");
	}
	if (msg.text.toString().toLowerCase().includes("riso in bianco")) {
		bot.sendPhoto(msg.chat.id,"http://mannarella.tk/matteo.jpg" );
	}
	if (msg.text.toString().toLowerCase().includes("lecc")) {
		bot.sendPhoto(msg.chat.id,"http://mannarella.tk/leccato.jpg" );
	}
	if (msg.text.toString().toLowerCase().includes("pomodor")) {
		bot.sendMessage(msg.chat.id, "Bhhh bololi");
	}
	if (msg.text.toString().toLowerCase().includes("lezione")) {
		bot.sendMessage(msg.chat.id, "Non c'ho voglia.");
	}
});

// comando di aiuto e di start
bot.onText(/\/aiuto/, (msg) => {
	bot.sendMessage(msg.chat.id, "mmmmm, stavo dormendo o giocando a lol");
	bot.sendMessage(msg.chat.id, "Sono il bot del Buon Matteo. I miei compiti sono quelli di sfottere la gente e di prendere le ordinazini delle pizze. Per scegliere una pizza scrivi /pizza seguito dalla pizza che vuoi ordinare (es. /pizza margherita). È possibile scegliere per un altro con /sceglixaltro seguito dal nome della persona e che pizza vuole (es. /pizza Pippo margherita). Non è possibile cambiare la scelta di qualcun altro. Per vedere tutte le ordinazioni già prese puoi scivere /ordine; invece per cancellare la tua pizza /cancella e per ricominciare puoi scrivere /reset.\n\nCredits by @mannarella.");
});
bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Non c'ho voglia.");
});

// comando aggiungi pizza
var persone = new Array();
var pizza = new Array();
var flag = 0;
var trovato;
bot.onText(/\/pizza (.+)/, (pzz, match) => {
	trovato = persone.indexOf(pzz.from.first_name);  
	if (trovato == -1){
		persone.unshift(pzz.from.first_name);
		pizza.unshift(match[1].toLowerCase());
		trovato = 0;
		bot.sendMessage(pzz.chat.id, "Bene, " + pzz.from.first_name + " per te " + pizza[trovato] + ".");
	} else{
		pizza[trovato] = match[1].toLowerCase();
		bot.sendMessage(pzz.chat.id, pzz.from.first_name + ", ho cambiato la tua pizza in " + pizza[trovato] + ".");
	}
	flag = 1;
	//console.log(match[0]);
	sicuro = 0;
});

//comando errato aggiungii pizza
bot.onText(/\/pizza/, (pzz) => {
	if (flag == 0)	bot.sendMessage(pzz.chat.id, pzz.from.first_name + " devi scrivere /pizza e la pizza che hai scelto!");
	else flag = 0;
	sicuro = 0;
});

//comando scegli per altro
bot.onText(/\/sceglixaltro (.+)/, (pzz, match) => {
	var spazio = match[1].indexOf(" ");
	if (spazio == -1) bot.sendMessage(pzz.chat.id, pzz.from.first_name + " devi scrivere /sceglixaltro e il nome della persona e la pizza che ha scelto!");
	else {
		var qualepizza = match[1].slice(spazio + 1, match[1].length).toLowerCase();
		var nomepersona = match[1].slice(0, spazio);
		trovato = persone.indexOf(nomepersona);  
		if (trovato == -1){
			persone.unshift(nomepersona);
			pizza.unshift(qualepizza);
			trovato = 0;
			bot.sendMessage(pzz.chat.id, "Bene, " + qualepizza + " per " + nomepersona + ".");
		} else{
			bot.sendSticker(pzz.chat.id, "CAADBAAD2QADEzLMAdbI38mV8YYsAg");
			bot.sendMessage(pzz.chat.id, "Non puoi cambiare la pizza di un altro.");
		}
	}
	flag = 1;
	//console.log(match[0]);
	sicuro = 0;
});

//comando errato scegli per altro
bot.onText(/\/sceglixaltro/, (pzz) => {
	if (flag == 0)	bot.sendMessage(pzz.chat.id, pzz.from.first_name + " devi scrivere /sceglixaltro e il nome della persona e la pizza che ha scelto!");
	else flag = 0;
	sicuro = 0;
});

//comando per cancellare
var sicuro = 0;
bot.onText(/\/reset/, (pzz) => {
	if (sicuro == 0) {
		bot.sendMessage(pzz.chat.id, "Sei sicuro? Per cancellare tutto manda ancora /reset");
		sicuro = 1;
	} else{
		persone = [];
		pizza = [];
		bot.sendMessage(pzz.chat.id, "Ho cancellato tutto.");
		sicuro = 0;
	}
});

//comando per vedere chi ha scelto
bot.onText(/\/lista/, (pzz) => {
	var testo = new Array();
	var i=0;
	while (persone[i] != undefined){
		testo[i] = persone[i] + " -\t" + pizza [i];
		i++;
	}
	if (i==0) bot.sendMessage(pzz.chat.id, "Nessuno ha scelto.");
	else {
		testo.unshift("Ecco chi ha scelto:\n");
		bot.sendMessage(pzz.chat.id, testo.join("\n"));
	}
	sicuro = 0;
});

//comando cancella
bot.onText(/\/cancella/, (pzz) => {
	trovato = persone.indexOf(pzz.from.first_name);
	if (trovato == -1){
		bot.sendMessage(pzz.chat.id, pzz.from.first_name + ", non possso cancellare la tua pizza se non me l'hai ancora detta.");
	} else{
		persone.splice(trovato,1);
		pizza.splice(trovato,1);
		bot.sendMessage(pzz.chat.id, pzz.from.first_name + ", ho cancellato la tua pizza.");
	}
	var i=0;
	while (persone[i] != undefined){
		console.log(persone[i]);
		i++;
	}
	sicuro = 0;
});

//comando per l'ordinazione
bot.onText(/\/ordine/, (pzz) => {
	//conto le pizze
	nomepizze = new Array();
	quantepizze = new Array();
	controllato = new Array();
	var i=0;
	while (pizza[i] != undefined){
		controllato [i] = 0;
		i++;
	}
	i=0;
	while (pizza[i] != undefined){
		var j=0;
		while (pizza[j] != undefined){
			if ((pizza[i] == pizza[j]) && (controllato [j] == 0)){
				controllato [j] = 1;
				var trovato = nomepizze.indexOf(pizza[j]);
				if(trovato == -1){
					nomepizze.unshift(pizza[j]);
					quantepizze.unshift(0);
					trovato = 0;
				}
				quantepizze[trovato]++;
			} else
			j++;
		}
		i++;
	}
	//stampo il risultato
	var testo = new Array();
	i=0;
	while (nomepizze[i] != undefined){
		testo[i] = quantepizze[i] + "\t" + nomepizze [i];
		i++;
	}
	if (i==0) bot.sendMessage(pzz.chat.id, "Nessuno ha scelto.");
	else {
		testo.unshift("Ecco gli ordini delle pizze:\n");
		//caloclo il totale
		testo.push("\nTotale: " + controllato.length);
		bot.sendMessage(pzz.chat.id, testo.join("\n"));
	}
	sicuro = 0;
});
