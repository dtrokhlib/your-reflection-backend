import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  mood?: string;
}
