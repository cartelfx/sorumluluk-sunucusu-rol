const { Client } = require('discord.js');
const client = new Client({ intents: [32767] });

const anaSunucuID = 'ANA_SUNUCU_ID';
const sorumlulukSunucuID = 'SORUMLULUK_SUNUCU_ID';
const staffs = [
    { rol: 'YETKİLİ SORUMLUSU' },
    { rol: 'KAYIT SORUMLUSU' },
    { rol: 'STREAMER SORUMLUSU' }
];

client.on('guildMemberUpdate', (oldUser, newUser) => {
    const anaSunucu = client.guilds.cache.get(anaSunucuID);
    const sorumlulukSunucu = client.guilds.cache.get(sorumlulukSunucuID);

    const kullaniciRoller = newUser.roles.cache.map(role => role.name);

    const yetkiKontrolü = staffs.some(staff => kullaniciRoller.includes(staff.rol));

    if (yetkiKontrolü && kullaniciRoller.some(r => staffs.map(s => s.rol).includes(r))) {
        const sorumlulukUye = sorumlulukSunucu.members.cache.get(newUser.id);

        if (sorumlulukUye) {
            staffs.forEach(staff => {
                const kontrolEdilecekRolAdi = staff.rol;
                const anaSunucuRol = anaSunucu.roles.cache.find(role => role.name === kontrolEdilecekRolAdi);

                if (anaSunucuRol) {
                    if (!newUser.includes(kontrolEdilecekRolAdi)) {
                        sorumlulukUye.roles.add(anaSunucuRol);
                    }
                } else {
            //sorumlulukUye.kick(); de yapabilirsiniz keyfinize göre.
                    sorumlulukUye.ban();
                }
            });
        }
    }
});
