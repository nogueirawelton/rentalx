"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const DayjsDateProvider_1 = require("./DateProvider/implementations/DayjsDateProvider");
const MailTrapProvider_1 = require("./MailProvider/implementations/MailTrapProvider");
const LocalStorageProvider_1 = require("./StorageProvider/implementations/LocalStorageProvider");
const S3StorageProvider_1 = require("./StorageProvider/implementations/S3StorageProvider");
const diskStorage = {
    localStorage: LocalStorageProvider_1.LocalStorageProvider,
    s3Storage: S3StorageProvider_1.S3StorageProvider,
};
tsyringe_1.container.registerSingleton("DayjsDateProvider", DayjsDateProvider_1.DayjsDateProvider);
tsyringe_1.container.registerInstance("MailProvider", new MailTrapProvider_1.MailTrapProvider());
tsyringe_1.container.registerSingleton("StorageProvider", diskStorage[process.env.DISK]);
