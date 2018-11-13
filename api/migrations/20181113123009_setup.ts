exports.up = function(knex) {
  return knex.schema.createTable('patients', table => {
    table
      .increments('Id')
      .index()
      .primary();
    table.string('Provider Name').notNullable();
    table.string('Provider Street Address').notNullable();
    table.string('Provider City').notNullable();
    table.string('Provider State').notNullable();
    table.string('Provider Zip Code').notNullable();
    table.string('Hospital Referral Region Description').notNullable();
    table.integer('Total Discharges').notNullable();
    table.integer('Average Covered Charges Cents').notNullable();
    table.integer('Average Total Payments Cents').notNullable();
    table.integer('Average Medicare Payments Cents').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('patients');
};
