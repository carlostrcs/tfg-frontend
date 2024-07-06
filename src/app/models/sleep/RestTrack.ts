export class RestTrack {
    id?: string;
    date: string;
    hoursSlept: number;
    timesWokeUp: number;
    subjectiveRecovery: number;
    chestFatigue: number;
    backFatigue: number;
    quadricepsFatigue: number;
    femoralFatigue: number;
    calfsFatigue: number;
    bicepsFatigue: number;
    tricepsFatigue: number;
    forearmsFatigue: number;
    shouldersFatigue: number;
    motivation: number;

    constructor() {
      this.date = new Date().toISOString().split('T')[0]; // Fecha actual en formato ISO (solo fecha)
      this.hoursSlept = 0;
      this.timesWokeUp = 0;
      this.subjectiveRecovery = 0;
      this.chestFatigue = 0;
      this.backFatigue = 0;
      this.quadricepsFatigue = 0;
      this.femoralFatigue = 0;
      this.calfsFatigue = 0;
      this.bicepsFatigue = 0;
      this.tricepsFatigue = 0;
      this.forearmsFatigue = 0;
      this.shouldersFatigue = 0;
      this.motivation = 0;
    }
  }