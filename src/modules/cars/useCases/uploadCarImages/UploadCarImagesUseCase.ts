import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ id, images_name }: IRequest) {
    images_name.forEach(async (image) => {
      await this.carsImagesRepository.create(id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}
