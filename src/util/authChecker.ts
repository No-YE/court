import { AuthChecker } from 'type-graphql';
import { Context } from './Context';

export const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) => {
  if (roles.length === 0) {
    return user !== null;
  }

  return user.isAdmin;
};
