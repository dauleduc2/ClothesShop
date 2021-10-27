//react router dom
export interface RouteComponentProps<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = H.LocationState
> {
    history: H.History;
    location: H.Location<S>;
    match: match<Params>;
    staticContext?: C;
}
export interface RouteProps {
    location?: H.Location;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: (props: RouteComponentProps<any>) => React.ReactNode;
    children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}
export class Route<T extends RouteProps = RouteProps> extends React.Component<T, any> {}

type AsyncThunkConfig = {
    /** return type for `thunkApi.getState` */
    state?: unknown;
    /** type for `thunkApi.dispatch` */
    dispatch?: Dispatch;
    /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
    extra?: unknown;
    /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
    rejectValue?: unknown;
    /** return type of the `serializeError` option callback */
    serializedErrorType?: unknown;
    /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
    pendingMeta?: unknown;
    /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
    fulfilledMeta?: unknown;
    /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
    rejectedMeta?: unknown;
};

export class ReactQuill extends React.Component<ReactQuill.ComponentProps> {
    focus(): void;
    blur(): void;
    getEditor(): Quill.Quill;
}
export { Quill } from 'quill';
export = ReactQuill;
