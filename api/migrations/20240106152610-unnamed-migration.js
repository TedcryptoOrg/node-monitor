'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('monitors', 'last_check', {
        type: Sequelize.DATE,
        allowNull: true
    })
    await queryInterface.addColumn('monitors', 'status', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    })
    await queryInterface.addColumn('monitors', 'last_error', {
        type: Sequelize.STRING,
        allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('monitors', 'last_check')
    await queryInterface.removeColumn('monitors', 'status')
    await queryInterface.removeColumn('monitors', 'last_error')
  }
};
