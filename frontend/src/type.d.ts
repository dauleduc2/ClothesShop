interface IProduct {
    productID: Number;
    name: String;
    amount: Number;
    description: String;
    price: Number;
    status: Interger;
    createDate: Date;
    type: Array;
    size: Array;
    images: Array;
    colors: Array;
}

type ProductState = {
    productList: IProduct[];
};

type ProductAction = {
    type: string;
    payload: IProduct;
};

type DispatchType = (args: ProductAction) => ProductAction;
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
    component?:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
    render?: (props: RouteComponentProps<any>) => React.ReactNode;
    children?:
        | ((props: RouteChildrenProps<any>) => React.ReactNode)
        | React.ReactNode;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}
export class Route<T extends RouteProps = RouteProps> extends React.Component<
    T,
    any
> {}
