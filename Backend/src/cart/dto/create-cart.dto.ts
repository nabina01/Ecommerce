import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  selectedVariant?: string;
}
