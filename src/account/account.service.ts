import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private dataSource: DataSource) {}

  async create(createAccountDto: CreateAccountDto) {
    const accountRepo = this.dataSource.getRepository(Account);
    const newAccount = new Account();
    newAccount.accountNumber = createAccountDto.accountNumber;
    newAccount.balance = createAccountDto.balance;
    await accountRepo.save(newAccount);
  }

  async findAll() {
    return await this.dataSource.getRepository(Account).find();
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(Account).findBy({ id: id });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const accountRepo = this.dataSource.getRepository(Account);

    const accountUpdate = await accountRepo.findOneBy({ id });
    if (
      updateAccountDto.accountNumber == null &&
      updateAccountDto.balance == null
    ) {
      throw new BadRequestException('Nem lehetnek üresek az adattagok');
    }

    updateAccountDto.accountNumber = updateAccountDto.accountNumber;
    updateAccountDto.balance = updateAccountDto.balance;
    accountRepo.save(accountUpdate);
  }

  async remove(id: number) {
    const accountRepo = this.dataSource.getRepository(Account);
    if (!(await accountRepo.findOneBy({ id: id }))) {
      throw new BadRequestException('Ilyen számla nem létezik');
    }
    accountRepo.delete(id);
  }
}
