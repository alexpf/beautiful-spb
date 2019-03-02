
const csvFilePath = './problems_20171003-20181003.csv';
const csv = require('csvtojson');
const fs = require('fs');

// ID: '318316',
// EXTERNAL_ID: '333718',
// RAW_ID: '-1294633578',
// CATEGORY: 'Улица',
// SUB_CATEGORY: 'Благоустройство',
// NAME: 'Несанкционированные надписи /объявления на опорах освещения',
// DISTRICT: 'Петродворцовый',
// MO: 'поселок Стрельна',
// LATITUDE: '59.8529036',
// LONGITUDE: '30.0249347',
// AUTHOR_ID: '/accounts/8351/',
// AUTHOR: 'Максим Д.',
// STATUS: 'Завершено: Автоматически',
// STATUS_ID: '4',
// RAISED_DATE: '2017-10-13 04:30:24',
// LAST_UPDATED_DATE: '2017-11-09 01:32:30'

csv()
    .fromFile(csvFilePath)
    .then((json) => {
        const result = json.map(item => ({
            category: item.CATEGORY,
            subCategory: item.SUB_CATEGORY,
            lat: item.LATITUDE,
            lon: item.LONGITUDE,
            status: item.STATUS_ID,
            raised: item.RAISED_DATE,
            lastUpdated: item.LAST_UPDATED_DATE
        }));

        fs.writeFileSync('./data.json', JSON.stringify(result));
        console.log('Done');
    });
