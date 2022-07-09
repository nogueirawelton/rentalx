import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { MailTrapProvider } from "./MailProvider/implementations/MailTrapProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

const diskStorage = {
  localStorage: LocalStorageProvider,
  s3Storage: S3StorageProvider,
};

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "MailProvider",
  new MailTrapProvider()
);

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.DISK]
);
