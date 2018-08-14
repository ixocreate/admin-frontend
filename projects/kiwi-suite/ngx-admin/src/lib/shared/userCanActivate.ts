import { User } from '../interfaces/user.interface';

export function canActivateWithPermissions(permissions: Array<string>, abilities: string[]) {
  let can = true;
  if (!permissions) {
    can = false;
  } else {
    abilities.map(ability => {
      const wildCardAbility = ability.split('.').slice(0, -1).join('.') + '.*';
      if (permissions.indexOf('*') > -1 || permissions.indexOf(wildCardAbility) > -1 || permissions.indexOf(ability) > -1) {
        // all good
      } else {
        can = false;
      }
    });
  }
  return can;
}
