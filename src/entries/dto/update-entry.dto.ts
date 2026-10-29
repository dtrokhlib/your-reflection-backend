import { IsOptional, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateEntryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string;
}