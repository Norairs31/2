const db = require("nrc.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login(process.env.token);
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);
const prefix = process.env.prefix

////Airfax


const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});////Airfax

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
////Airfax//Airfax

//OYNUYOR KISMI
////Airfax

client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setPresence({
    activity: {
      name: "Airfax Uptime Bot",
      type: "STREAMING",
      url: "https://www.twitch.tv/Airfax8"
    }
  });
});
////Airfax

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

//embed hazırlıkları
////Airfax

const help = new discord.MessageEmbed()
.setFooter("Airfax Uptime Bot")
.setColor("RANDOM")
.setDescription(`Selamlar, botunu uptime etmek için yapman gereken adımları sana söyleyeceğim. \n Artık kolay bir şekilde botunu 7/24 aktif edebilirsin! \n\n📜 Botunu uptime etmek için \`${prefix}ekle\` yazabilirsin, Nasıl yapıldığını komutu yazdığında göreceksin \n 📜 Uptime edilen botların sayısını görmek için \`${prefix}say\` yazabilirsin. \n 📜 Eğer Botunu Uptimeden Kaldırmak İstiyorsan Kurucumuza Ulaşabilirsin. `)
.setImage("https://cdn.glitch.global/d6ee6295-f2f8-498b-b757-64c37650a484/standard%20(6).gif?v=1662474348790")

////Airfax
////Airfax

////Airfax
////Airfax





client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == prefix+"ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(new discord.MessageEmbed().setFooter(" Uptime Bot").setColor("#ff1313").setDescription("Projeniz Sistemimizde Zaten Bulunuyor Eğer Şüpheniz Varsa Sahibime Ulaşabilirsin."));
        message.channel.send(new discord.MessageEmbed().setFooter("Airfax Uptime Bot").setColor("#0fe900").setDescription(`Projeniz Sistemimize Başarıyla Eklendi,Eğer Çalışmıyor İse Sahibime Ulaşabilirsin.`));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => { 
        return message.channel.send(new discord.MessageEmbed().setFooter("Airfax Uptime Bot").setColor("#00d0e9").setDescription(`Lütfen Bir Link Giriniz, \n Glitch Projenize Girin, Sağ Yukardaki Share Butonuna Tıklayıp Altdan ikinci Live Site Yazan Yerdeki Linki  Kopyalıyıp \`${prefix}ekle\` komutunu kullanın. \n Not: Eğer Linki Doğru Girdiğin Halde Bu Hatayı Alıyorsan Sahibime Ulaş.`).setImage("https://cdn.glitch.global/d6ee6295-f2f8-498b-b757-64c37650a484/ezgif-5-90a058cbcf.gif?v=1662473629615"));
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == prefix+"say") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Airfax Uptime Bot").setColor("#e0e900").setDescription(`${db.get("linkler").length} Tane Proje Anlık Olarak Aktif Tutuluyor!`));
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == prefix+"yardım") {
    var link = spl[1];
    message.channel.send(help);
  }
});
////Airfax
////Airfax


client.on('message', message => {
  const airfaxaboneol = ['.glitch.me/','.glitch.me']
  if(airfaxaboneol.some(airfax => message.content.includes(airfax))){
    // Lin Atarsa Mesajı Silelim
    message.delete()

    // Uyaralım
    const air = new discord.MessageEmbed()
    .setDescription(`- **Projeniz 3 4 dakika içinde eklenicektir :) ${message.author}**
Lütfen spam ATMAYINIZ`  )
    .setColor('#ff1313')
    message.channel.send(air) .then(msg => msg.delete({ timeout: 9000}));
  }
})
