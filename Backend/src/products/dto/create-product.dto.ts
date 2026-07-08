import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsOptional,
  IsArray,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class VariantDto {
  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variants: VariantDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
