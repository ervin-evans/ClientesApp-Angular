import { Region } from './region';

export class Cliente {
  public id: number = 0;
  public nombre: string = '';
  public apellidoPaterno = '';
  public apellidoMaterno = '';
  public email: string = '';
  public foto: string = '';
  public createdAt: string = '';
  public region: Region = new Region();
}
