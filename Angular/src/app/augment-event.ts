export class AugmentEvent {

  constructor(
    public uid: string,
    public uploadImage: File,
    public numOfAugments: number,
    public tags?: string
  ) {  }

}
