const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}`).filter(f => f.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
            }else {
                continue;
            }

            if (pull.aliases && Array.isArray(pull))
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}