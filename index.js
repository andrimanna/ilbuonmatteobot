console.error = function() {}

// aggiungo le api
const TelegramBot = require('node-telegram-bot-api');
const googleTTS = require('google-tts-api');
const timers = require('timers');
var http = require('https');
var fs = require('fs');
var exec = require('child_process').execFile;

// token di @BotFather 
const token = '########';
 
// avvio il bot in polling
const bot = new TelegramBot(token, {polling: true});
console.log("Bot avviato.");
console.log("I messaggi ricevuti verranno stampati di seguito nel seguente formato: ID Chat, Gruppo, Nome, Congnome, Username, Data, Testo del messagio");

// leggo tutti i messaggi
var timermessaggi;
bot.on("message", (msg) => {
	//stampo cose sulla console
	var data = new Date(msg.date*1000);
	var testo = new Array();
	testo.push(msg.chat.id);
	if (msg.chat.title == undefined) testo.push("/");
	else testo.push(msg.chat.title);
	testo.push(msg.from.first_name);
	testo.push(msg.from.last_name);
	testo.push("@"+msg.from.username);
	testo.push(data.getDate() + "/" + (data.getMonth()+1) + "/" + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds());
	testo.push(msg.text);
	console.log(testo.join("\t"));
	//sfotto la gente
	if (msg.text.toString().toLowerCase().includes("pesto")) {
		bot.sendMessage(msg.chat.id, "Mia mamma lo fa meglio!");
	}
	if (msg.text.toString().toLowerCase().includes("sug")) {
		bot.sendMessage(msg.chat.id, "Che schifo il sugo, " + msg.from.first_name + "!");
	}
	if (msg.text.toString().toLowerCase().includes("sesamo")) {
		bot.sendMessage(msg.chat.id, "Eja! Il mal di testta venirre fa.");
	}
	if (msg.text.toString().toLowerCase().includes("autostrad")) {
		bot.sendMessage(msg.chat.id, msg.from.first_name + ", quantte voltte te lo devvo dire che in Sardegna autosradde non ci sonno.");
	}
	if (msg.text.toString().toLowerCase().includes("bruci")) {
		bot.sendMessage(msg.chat.id, "È stata Clarissa!");
	}
	if (msg.text.toString().toLowerCase().includes("riso")) {
		bot.sendPhoto(msg.chat.id,"http://mannarella.tk/matteo.jpg" );
	}
	if (msg.text.toString().toLowerCase().includes("lecc")) {
		bot.sendPhoto(msg.chat.id,"http://mannarella.tk/leccato.jpg" );
	}
	if (msg.text.toString().toLowerCase().includes("pomodor")) {
		bot.sendMessage(msg.chat.id, "Bhhh bololi");
	}
	if (msg.text.toString().toLowerCase().includes("lezione")) {
		bot.sendMessage(msg.chat.id, "Non c'ho voglia di andare a lezione.");
	}
	if (msg.text.toString().toLowerCase().includes("esplo")) {
		bot.sendDocument(msg.chat.id, 'http://www.daidegasforum.com/images/386/esplosione-atomica-atomic-bomb.gif');
	}
	if (msg.text.toString().toLowerCase().includes("latte")) {
		bot.sendPhoto(msg.chat.id,"http://mannarella.tk/latte.jpg" );
	}
	if (msg.text.toString().toLowerCase().includes("friarielli")) {
		bot.sendMessage(msg.chat.id, "Volevi dire cime di rapa?");
	}
	if (msg.text.toString().toLowerCase().includes("rapa")) {
		bot.sendMessage(msg.chat.id, "Volevi dire friarielli?");
	}
	if (msg.text.toString().toLowerCase().includes("uov")) {
		bot.sendMessage(msg.chat.id, "Ma è nato prima l'uovo o la gallina?");
	}
	if (msg.chat.title != undefined){
		clearInterval(timermessaggi);
		timermessaggi = setInterval(function() {
			switch (Math.floor((Math.random() * 10) + 1)){
				case 1:
				bot.sendMessage(msg.chat.id, "Ma è nato prima l'uovo o la gallina?", {disable_notification:1});
				break;
				case 2:
				bot.sendMessage(msg.chat.id, "Qualcuno ha detto friarielli?", {disable_notification:1});
				break;
				case 3:
				bot.sendMessage(msg.chat.id, "Qualcuno ha detto cime di rapa?", {disable_notification:1});
				break;
				case 4:
				bot.sendPhoto(msg.chat.id,"http://mannarella.tk/latte.jpg", {disable_notification:1});
				break;
				case 5:
				bot.sendMessage(msg.chat.id, "Non c'ho voglia di andare a lezione.", {disable_notification:1});
				break;
				case 6:
				bot.sendMessage(msg.chat.id, "Bhhh bololi", {disable_notification:1});
				break;
				case 7:
				bot.sendPhoto(msg.chat.id,"http://mannarella.tk/leccato.jpg", {disable_notification:1});
				break;
				case 8:
				bot.sendPhoto(msg.chat.id,"http://mannarella.tk/matteo.jpg", {disable_notification:1});
				break;
				case 9:
				bot.sendMessage(msg.chat.id, "Che schifo il sugo!", {disable_notification:1});
				break;
				case 10:
				bot.sendMessage(msg.chat.id, "Mia mamma lo fa meglio!", {disable_notification:1});
				break;	
			}		
		}, 86400000);
	}
});

// comando di aiuto e di start
bot.onText(/\/aiuto/, (msg) => {
	bot.sendMessage(msg.chat.id, "mmmmm, stavo dormendo o giocando al computer");
	bot.sendMessage(msg.chat.id, "Sono il bot del Buon Matteo. I miei compiti sono quelli di sfottere la gente e di prendere le ordinazini delle pizze. Per scegliere una pizza scrivi /pizza seguito dalla pizza che vuoi ordinare (es. /pizza margherita). È possibile scegliere per un altro con /sceglixaltro seguito dal'username della persona e che pizza vuole (es. /sceglixaltro @Pippo margherita). Non è possibile cambiare la scelta di qualcun altro. Per vedere tutte le ordinazioni già prese puoi scivere /ordine; invece per cancellare la tua pizza /cancella e per ricominciare puoi scrivere /reset.\n\nCredits by @mannarella.");
});
bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Non c'ho voglia.");
});

//comando per parlare
var file, flag1 = 0;
bot.onText(/\/dimmi (.+)/, (msg, match) => {
	if (match[1][200] == null) {
		bot.sendChatAction(msg.chat.id, "record_audio");
		googleTTS(match[1], 'it', 1).then(function (url) {
			file = fs.createWriteStream("prova.mp3");
			var request = http.get(url, function(response) {
				response.pipe(file);
				exec('encode.bat', function() {
					fs.unlink('prova.mp3');
					bot.sendVoice(msg.chat.id, "audio.ogg");
					fs.unlink('audio.ogg');
				});
			});
		});
	} else bot.sendMessage(msg.chat.id, "mmmmm, mi stanco a parlare così tanto.");
	sicuro = 0;
	flag1 = 1;
});

//comando errato per parlare
bot.onText(/\/dimmi/, (msg) => {
	if (flag1 == 0)	bot.sendMessage(msg.chat.id, msg.from.first_name + " devi scrivere /dimmi seguito da quello che vuoi sentire!");
	else flag1 = 0;
	sicuro = 0;
});

//comando prenotazione fornetto
var orario;
var fine;
var timerforno = null;
var personapren;
var scherzo = Math.floor((Math.random() * 2) + 1);

bot.onText(/\/prenota/, (frn) => {
	if ((frn.from.username == "Mannarella") || (frn.from.username == "Eroe69") || (frn.from.username == "Alfonso_vx") || (frn.from.username == "lordwilliamterzo") || (frn.from.username == "Daniela_z") || (frn.from.username == "Edolomba23")){
		if (scherzo == 1){
			scherzo = Math.floor((Math.random() * 2) + 1);
			orario = new Date();
				if (timerforno == null) {
					personapren = frn.from.username;
					if (orario.getHours()<15){
						fine = (15 - orario.getHours()) * 3600000 - orario.getMinutes() * 60000 - orario.getSeconds() * 1000;
						bot.sendMessage(frn.chat.id, "Bene, " + frn.from.first_name + " ha prenotato il fornetto per oggi a parnzo.");
					}	else {
						fine = (23 - orario.getHours()) * 3600000 - orario.getMinutes() * 60000 - orario.getSeconds() * 1000;
						bot.sendMessage(frn.chat.id, "Bene, " + frn.from.first_name + " ha prenotato il fornetto per stasera a cena.");
					}
					timerforno = setTimeout(function() {bot.sendMessage(frn.chat.id, frn.from.first_name + ", la tua prenotazione è scaduta."); timerforno=null;}, fine);
				} else bot.sendMessage(frn.chat.id, "Il fornetto è gia stato prenotato da @" + personapren);
		} else {
			bot.sendMessage(frn.chat.id, "Siccome mi stai antipatico, non puoi prenotare il fornetto oggi.");
			setTimeout(function() {
				orario = new Date();
				if (timerforno == null) {
					personapren = frn.from.username;
					if (orario.getHours()<15){
						fine = (15 - orario.getHours()) * 3600000 - orario.getMinutes() * 60000 - orario.getSeconds() * 1000;
						bot.sendMessage(frn.chat.id, "Non è vero, " + frn.from.first_name + " ha prenotato il fornetto per oggi a parnzo.");
					}	else {
						fine = (23 - orario.getHours()) * 3600000 - orario.getMinutes() * 60000 - orario.getSeconds() * 1000;
						bot.sendMessage(frn.chat.id, "Non è vero, " + frn.from.first_name + " ha prenotato il fornetto per stasera a cena.");
					}
					timerforno = setTimeout(function() {bot.sendMessage(frn.chat.id, frn.from.first_name + ", la tua prenotazione è scaduta."); timerforno=null;}, fine);
				} else bot.sendMessage(frn.chat.id, "Non è vero, il fornetto è gia stato prenotato da @" + personapren);
			}, 6000);	
			scherzo = Math.floor((Math.random() * 2) + 1);
		}
	} else {
		bot.sendSticker(frn.chat.id, "CAADBAAD2QADEzLMAdbI38mV8YYsAg");
		bot.sendMessage(frn.chat.id, "Tu non puoi prenotare il fornetto.");
	}
	sicuro = 0;
});

//comando sprenotazione fornetto
bot.onText(/\/sprenota/, (frn) => {
	if (timerforno != null){
		if (frn.from.username == personapren){
			clearTimeout(timerforno);
			bot.sendMessage(frn.chat.id, frn.from.first_name + ", la tua prenotazione è annullata.");
			timerforno=null;
		} else {
			bot.sendSticker(frn.chat.id, "CAADAgADuQADEmARAzMSCb-uZBAHAg");
			bot.sendMessage(frn.chat.id, "Non puoi sprenotare il fornetto ad un altro.");
		}
	} else {
		bot.sendMessage(frn.chat.id, "Il fonetto non è prenotato.");
	}
	sicuro = 0;
});

// comando aggiungi pizza
var persone = new Array();
var pizza = new Array();
var flag = 0;
var trovato;
bot.onText(/\/pizza (.+)/, (pzz, match) => {
	trovato = persone.indexOf(pzz.from.username);  
	if (trovato == -1){
		persone.unshift(pzz.from.username);
		pizza.unshift(match[1].toLowerCase());
		trovato = 0;
		bot.sendMessage(pzz.chat.id, "Bene, " + pzz.from.first_name + " per te " + pizza[trovato] + ".");
	} else{
		pizza[trovato] = match[1].toLowerCase();
		bot.sendMessage(pzz.chat.id, pzz.from.first_name + ", ho cambiato la tua in " + pizza[trovato] + ".");
	}
	flag = 1;
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
	if (spazio == -1) bot.sendMessage(pzz.chat.id, pzz.from.first_name + " devi scrivere /sceglixaltro seguito dall'username della persona e la pizza che ha scelto!");
	else if (match[1].indexOf("@") == -1) bot.sendMessage(pzz.chat.id, pzz.from.first_name + " l'username inizia per @!");
	else {
		var qualepizza = match[1].slice(spazio + 1, match[1].length).toLowerCase();
		var nomepersona = match[1].slice(1, spazio);
		trovato = persone.indexOf(nomepersona);  
		if (trovato == -1){
			persone.unshift(nomepersona);
			pizza.unshift(qualepizza);
			trovato = 0;
			bot.sendMessage(pzz.chat.id, "Bene, " + qualepizza + " per " + nomepersona + ".");
		} else{
			bot.sendSticker(pzz.chat.id, "CAADBAAD8QADEzLMAetg5uanapKwAg");
			bot.sendMessage(pzz.chat.id, "Non puoi cambiare la pizza di un altro.");
		}
	}
	flag = 1;
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
		testo[i] = "@" + persone[i] + " - " + pizza [i];
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
	trovato = persone.indexOf(pzz.from.username);
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
			}
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
		testo.push("\nTotale: " + controllato.length);
		bot.sendMessage(pzz.chat.id, testo.join("\n"));
	}
	sicuro = 0;
});
