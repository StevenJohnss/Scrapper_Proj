-- CreateTable
CREATE TABLE `Component` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(500) NOT NULL,
    `service` INTEGER NOT NULL,
    `status` ENUM('UP', 'DOWN') NOT NULL DEFAULT 'UP',
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Component_service_fkey`(`service`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Issue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(500) NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `resolvedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Issue_serviceId_fkey`(`serviceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `component` INTEGER NULL,
    `service` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `Report_component_fkey`(`component`),
    INDEX `Report_service_fkey`(`service`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(500) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(500) NULL,
    `status` ENUM('UP', 'DOWN') NOT NULL DEFAULT 'UP',
    `website` VARCHAR(500) NULL,
    `data_pageUrl` VARCHAR(500) NULL,
    `twitter` VARCHAR(500) NULL,
    `facebook` VARCHAR(500) NULL,
    `statusPageUrl` VARCHAR(191) NULL,
    `statusPageService` ENUM('INSTATUS', 'STATUSPAGE', 'CACHET', 'HUND', 'STATUSIO') NULL,
    `statusPageId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Service_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Myusers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(355) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_service_fkey` FOREIGN KEY (`service`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_component_fkey` FOREIGN KEY (`component`) REFERENCES `Component`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_service_fkey` FOREIGN KEY (`service`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
