import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateOwnerDto {
  @IsNotEmpty({ message: 'A mező kitöltése kötelező!' })
  fullName: string;

  @IsBoolean()
  busniess: boolean;
}
