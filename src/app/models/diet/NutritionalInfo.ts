export class NutritionalInfo {
    constructor(
      public proteins: number = 0,
      public fats: number = 0,
      public carbs: number = 0,
      public calories: number = 0
    ) {}

    add(nutritionalInfo: NutritionalInfo) {
        this.proteins += nutritionalInfo.proteins;
        this.fats += nutritionalInfo.fats;
        this.carbs += nutritionalInfo.carbs;
        this.calories += nutritionalInfo.calories;
      }
  }