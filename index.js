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
        const message = `🚩 Shaxar: ${city}
        \n   Ob-xavo: ${weather} 
        \n🌡 Tempratura: ${temperature.toFixed(2)}°C. 
        \n🫧 Namlik ${humidity}%,
        \n👁‍🗨 Bosim: ${pressure}hPa, 
        \n🌿 Shamol tezligi ${windSpeed}m/s.`;
    
        bot.sendMessage(chatId, message);
      } catch (error) {
        bot.sendMessage(chatId, "City doesn't exist.");
      }
    
})