import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

// Define your actions
export class SetToken {
  static readonly type = '[Auth] Set Token';
  constructor(public token: string) {}
}

export class ClearToken {
  static readonly type = '[Auth] Clear Token';
}

interface AuthStateModel {
  token: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
  },
})
@Injectable()
export class AuthState {
  @Action(SetToken)
  setToken(ctx: StateContext<AuthStateModel>, action: SetToken) {
    ctx.patchState({ token: action.token });
  }

  @Action(ClearToken)
  clearToken(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ token: null });
  }
}
