import { Config } from '../interfaces/config.interface';
import { User } from '../interfaces/user.interface';

export interface AppState {
  config: Config;
  user: User;
}
