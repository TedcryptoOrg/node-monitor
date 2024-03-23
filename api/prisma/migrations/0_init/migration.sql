-- CreateTable
CREATE TABLE `SequelizeMeta` (
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `configuration_id` INTEGER UNSIGNED NULL,
    `monitor_id` INTEGER UNSIGNED NULL,
    `server_id` INTEGER UNSIGNED NULL,
    `message` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuration_notification_channels` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `configuration_id` INTEGER UNSIGNED NOT NULL,
    `notification_channel_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_configuration_notification_channels_configuration_id`(`configuration_id`),
    INDEX `fk_configuration_notification_channels_notification_channel_id`(`notification_channel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configurations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `chain` VARCHAR(255) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monitors` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `configuration_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `configuration_object` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `server_id` INTEGER UNSIGNED NULL,
    `last_check` DATETIME(0) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `last_error` VARCHAR(255) NULL,

    INDEX `fk_monitor_configuration_id`(`configuration_id`),
    INDEX `monitors_server_id_foreign_idx`(`server_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification_channels` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `configuration_object` VARCHAR(255) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `configuration_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `fk_server_configuration_id`(`configuration_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `server_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    INDEX `fk_services_server_id`(`server_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `configuration_notification_channels` ADD CONSTRAINT `fk_configuration_notification_channels_configuration_id` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuration_notification_channels` ADD CONSTRAINT `fk_configuration_notification_channels_notification_channel_id` FOREIGN KEY (`notification_channel_id`) REFERENCES `notification_channels`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitors` ADD CONSTRAINT `fk_monitor_configuration_id` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitors` ADD CONSTRAINT `monitors_server_id_foreign_idx` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `servers` ADD CONSTRAINT `fk_server_configuration_id` FOREIGN KEY (`configuration_id`) REFERENCES `configurations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `fk_services_server_id` FOREIGN KEY (`server_id`) REFERENCES `servers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

