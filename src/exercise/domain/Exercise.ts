export class Exercise {
  constructor(
    readonly id: string,
    readonly id_lesson: string,
    readonly multimedia: string,
    readonly question: string,
    readonly stars: number,
    readonly exercise_order: string
  ) {}
}
