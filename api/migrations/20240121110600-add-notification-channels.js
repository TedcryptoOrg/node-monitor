'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('notification_channels', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            configuration_object: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            is_enabled: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        })
        await queryInterface.createTable('configuration_notification_channels', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },
            configuration_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            notification_channel_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        })

        await queryInterface.addConstraint('configuration_notification_channels', {
            fields: ['configuration_id'],
            type: 'foreign key',
            name: 'fk_configuration_notification_channels_configuration_id',
            references: {
                table: 'configurations',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
        await queryInterface.addConstraint('configuration_notification_channels', {
            fields: ['notification_channel_id'],
            type: 'foreign key',
            name: 'fk_configuration_notification_channels_notification_channel_id',
            references: {
                table: 'notification_channels',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.removeConstraint('configuration_notification_channels', 'fk_configuration_notification_channels_configuration_id')
        await queryInterface.removeConstraint('configuration_notification_channels', 'fk_configuration_notification_channels_notification_channel_id')
        await queryInterface.dropTable('configuration_notification_channels');
        await queryInterface.dropTable('notification_channels');
    }
};
