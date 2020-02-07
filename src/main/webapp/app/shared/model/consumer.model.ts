export interface IConsumer {
  id?: number;
  lastName?: string;
  firstName?: string;
  patranimicName?: string;
  phoneNumber?: string;
  email?: string;
  photoContentType?: string;
  photo?: any;
}

export class Consumer implements IConsumer {
  constructor(
    public id?: number,
    public lastName?: string,
    public firstName?: string,
    public patranimicName?: string,
    public phoneNumber?: string,
    public email?: string,
    public photoContentType?: string,
    public photo?: any
  ) {}
}
