/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
    await knex('cars').truncate()
    await knex('cars').insert([
        {vin: 'Num1', make: 'honda', model: 'civic', 
        mileage: 2412, title: null, transmission: null},
        {vin: 'Num2', make: 'honda', model: 'accord', 
        mileage: 43232, title: 'not sure', transmission: 'muy mal'},
        {vin: 'Num3', make: 'toyota', model: 'corolla', 
        mileage: 2412522, title: 'Idk cars', transmission: 'muy bien'},
    ])
}

