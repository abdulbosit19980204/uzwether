const TelegramBot = require("node-telegram-bot-api")
const axios = require("axios")
const token = "6652285546:AAFlhNlR9juU36EkKYNujzTGYLM20uHFyZw"


const bot  = new TelegramBot(token, {polling: true});
bot.on("message",async (msg)=>{
    const chatId = msg.chat.id
    const inputedCity = msg.text
    try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputedCity}&appid=c01a196e1eca17c1aca5b2763a52568d`
        );
        const data = response.data;
        const weather = data.weather[0].description;
        const temperature = data.main.temp - 273.15;
        const icon = data.weather.icon
        const city = data.name;
        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;
        const message = `🚩 <b>Shaxar</b>:<b> ${city}</b>
        \n   <b>Ob-xavo:</b> ${weather} 
        \n🌡 <b>Tempratura: </b>${temperature.toFixed(2)}°C. 
        \n🫧 <b>Namlik: </b>${humidity}%,
        \n👁‍🗨 <b>Bosim: </b>${pressure}hPa, 
        \n🌿 <b>Shamol tezligi: </b>${windSpeed}m/s.`;
        
    
        bot.sendMessage(chatId, `${message}`, {parse_mode:"HTML"});
      } catch (error) {
        // bot.sendMessage(chatId, "City doesn't exist.");
        bot.sendMessage(msg.chat.id,
            "<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>"
             ,{parse_mode : "HTML"}
             );
       
      }
    
})