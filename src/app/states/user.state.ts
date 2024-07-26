import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserStateModel {
  user: User | null;
}

export class SetUser {
  static readonly type = '[User] Set';
  constructor(public user: User) {}
}

export class ResetState {
  static readonly type = '[User] Reset State';
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
  },
})
@Injectable()
export class UserState {
  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
    const state = ctx.getState();
    const newState = { ...state, user: action.user };
    ctx.setState(newState);
    localStorage.setItem('userState', JSON.stringify(newState.user));
  }

  @Action(ResetState)
  resetState(ctx: StateContext<UserStateModel>) {
    const defaultState = { user: null };
    ctx.setState(defaultState);
    localStorage.removeItem('userState');
  }
}
