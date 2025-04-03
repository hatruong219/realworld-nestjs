import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsInt, IsNumber, IsObject, IsOptional, Max, Min } from "class-validator";

export class PageMetaDto {
  @IsNumber()
  page: number;

  @IsNumber()
  limmit: number;

  @IsNumber()
  itemCount: number;

  @IsNumber()
  pageCount: number;

  @IsBoolean()
  hasPreviousPage: boolean;

  @IsBoolean()
  hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.limmit = pageOptionsDto.limmit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.limmit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
export class PageDto<T> {
  @IsArray()
  data: T[];

  @Type(() => PageMetaDto)
  meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.ASC;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limmit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limmit;
  }
}

export interface PageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}
