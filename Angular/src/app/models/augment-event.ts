export class AugmentEvent {

  constructor(
    public uid: string,
    public numOfAugments: number,
    public tags?: string
  ) {
    this.numOfAugments = 5;
  }

}
