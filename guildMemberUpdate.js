const { Client } = require('discord.js');
const client = new Client({ intents: [32767] });

const anaSunucuID = 'ANA_SUNUCU_ID';
const sorumlulukSunucuID = 'SORUMLULUK_SUNUCU_ID';
const staffs = [
    { rol: 'YETKİLİ SORUMLUSU' },
    { rol: 'KAYIT SORUMLUSU' },
    { rol: 'STREAMER SORUMLUSU' },
 /*   { rol: 'SORUMLU' },
    { rol: 'SORUMLU' },
    { rol: 'SORUMLU' },
    { rol: 'SORUMLU' }
  */
];

client.on('guildMemberUpdate', (eskiUye, yeniUye) => {
    const anaSunucu = client.guilds.cache.get(anaSunucuID);
    const sorumlulukSunucu = client.guilds.cache.get(sorumlulukSunucuID);

    const eskiUyeRoller = eskiUye.roles.cache.map(role => role.name);
    const yeniUyeRoller = yeniUye.roles.cache.map(role => role.name);

    const yetkiKontrolü = staffs.some(staff => yeniUyeRoller.includes(staff.rol));

    if (!yetkiKontrolü) {
        return;
    }

    staffs.forEach(staff => {
        const kontrolEdilecekRolAdi = staff.rol;

        if (eskiUyeRoller.includes(kontrolEdilecekRolAdi) && !yeniUyeRoller.includes(kontrolEdilecekRolAdi)) {
            const sorumlulukUye = sorumlulukSunucu.members.cache.get(yeniUye.id);
            if (sorumlulukUye && kontrolEdilecekRolAdi !== '') {
                sorumlulukUye.kick()
                  
            }
        }
    });
});
