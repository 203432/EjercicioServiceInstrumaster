export class Answer {
  constructor(
    readonly id: string,
    readonly id_exercise: string,
    readonly multimedia: string,
    readonly answer: string,
    readonly is_correct: number
  ) {}
}
