'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('monitors', 'server_id', {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'servers',
            key: 'id'
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('monitors', 'server_id');
  }
};
