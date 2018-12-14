export class AugmentEvent {

  constructor(
    public uid: string,
    public uploadImage: string,
    public numOfAugments: number,
    public tags?: string
  ) {  }

}
