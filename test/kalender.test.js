import { async } from '@firebase/util';
import chai from 'chai';
const assert = chai.assert;
import { getDateOfISOWeek } from '../kalender.js';
import { createWeek } from '../kalender.js';
import { putBookinger } from '../kalender.js'

describe('GetDateOfISOWeek', function(){
    it('getDateOfISOWeek should return the given weekdays date', function(){
        assert.equal(getDateOfISOWeek(49,2022,1), '6/12');
        assert.equal(getDateOfISOWeek(52,2022,6), '1/1');
        assert.equal(getDateOfISOWeek(52,2022,5), '31/12');
        assert.equal(getDateOfISOWeek(1, 2023, 0), '2/1');
    });
});

describe('CreateWeek', function(){
    it('createWeek should return a new array of 7 days. Given the weeknumber and year, the days should correspond with the dates and names of the week', function(){
        let week = createWeek(49, 2022);
        assert.isArray(week, 'We have days in a week, thank god! sheesh.');
        assert.equal(week[0].navn, 'Mandag ');
        assert.equal(week[0].tider[0].tid, '0800');
        assert.equal(week[6].navn, 'Søndag ');
        assert.isArray(week[4].tider, 'Every weekday has a list of appointments which can be edited on booking');
        assert.equal(week[4].tider[0].tid, '0800');
    })
})

describe('PutBookinger', async function(){
    it('PutBookinger uses the createWeek function and edits it, so it fits the currently booked tasks in the database and returns it.', async function(){
        let week = await putBookinger(49, 2022);
        assert.isArray(week, 'We have days in a week, thank god! Sheesh.');
        assert.equal(week[0].navn, 'Mandag ');
        assert.notEqual(week[0].tider[0].tid, '0800');
        assert.equal(week[0].tider[0].tid, 'Optaget');
        assert.equal(week[0].tider[1].tid, '0900');
    }) 
})