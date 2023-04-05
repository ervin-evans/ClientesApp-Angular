import { Region } from './Region';

export class Cliente {
  public id: number = 0;
  public nombre: string = '';
  public apellidoPaterno = '';
  public apellidoMaterno = '';
  public email: string = '';
  public profileImage: string = '';
  public createdAt: string = '';
  public region: Region = new Region();
}
