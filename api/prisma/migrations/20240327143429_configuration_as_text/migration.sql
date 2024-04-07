-- AlterTable
ALTER TABLE `monitors` MODIFY `configuration_object` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `notification_channels` MODIFY `configuration_object` TEXT NOT NULL;
