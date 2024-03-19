'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('audit', {
        id: {
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        configuration_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        monitor_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        server_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('audit');
  }
};
