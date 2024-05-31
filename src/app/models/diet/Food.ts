import { NutritionalInfo } from "./NutritionalInfo";

export class Food {
    constructor(
      public name:string,
      public grams: number,
      public nutritionalInfo: NutritionalInfo
    ) {}
  }