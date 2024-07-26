import { State, Action, StateContext } from '@ngxs/store';
import { AddUserAction } from './actions';

// Define your state model
export interface UsersState {
  value: string;
}

// Define initial state
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
