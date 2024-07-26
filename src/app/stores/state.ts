import { State, Action, StateContext } from '@ngxs/store';
import { AddUserAction } from './actions';
export interface UsersState {
  value: string;
}

@State<UsersState>({
  name: 'User',
  defaults: {
    value: 'Initial Value',
  },
})
export class YourState {
  @Action(AddUserAction)
  AddUserAction(ctx: StateContext<UsersState>, action: AddUserAction) {
    const state = ctx.getState();
    ctx.patchState({
      value: action.payload,
    });
  }
}
