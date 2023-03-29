import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(private dataSource: DataSource) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    const newOwner = new Owner();
    newOwner.fullName = createOwnerDto.fullName;
    newOwner.business = createOwnerDto.busniess;
    await ownerRepo.save(newOwner);
  }

  async findAll() {
    return await this.dataSource.getRepository(Owner).find();
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(Owner).findBy({ id: id });
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    const ownerUpdate = await ownerRepo.findOneBy({ id });
    if (updateOwnerDto.fullName == null && updateOwnerDto.busniess == null) {
      throw new BadRequestException('Nem lehetnek üresek az adattagok');
    }

    ownerUpdate.fullName = updateOwnerDto.fullName;
    ownerUpdate.business = updateOwnerDto.busniess;
    ownerRepo.save(ownerUpdate);
  }

  async remove(id: number) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    if (!(await ownerRepo.findOneBy({ id: id }))) {
      throw new BadRequestException('Ilyen tulajdonos nem létezik');
    }
    ownerRepo.delete(id);
  }
}
