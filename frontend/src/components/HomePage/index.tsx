import ProductContainer from "../ProductContainer";
import { Products } from "./HomepageProducts";

interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = () => {
    // const Products: Array<ProductFields> = [
    //     {
    //         productId: "1",
    //         imgUrl: "/images/sus1.jpg",
    //         describe:
    //             "Amongus bla blas bla bla bla bla bla bla bla bla bl bla 1",
    //         price: 199000,
    //     },
    //     {
    //         productId: "2",
    //         imgUrl: "/images/sus2.jpg",
    //         describe:
    //             "Amongus bla blas bla bla bla bla bla bla bla bla bl bla 2",
    //         price: 199000,
    //     },
    //     {
    //         productId: "4",
    //         imgUrl: "/images/sus3.jpg",
    //         describe:
    //             "Amongus bla blas bla bla bla bla bla bla bla bla bl bla 3",
    //         price: 199000,
    //     },
    // ];

    return (
        <div className="overflow-y-auto text-4xl h-contentHeight">
            this is homepage
            <ProductContainer Products={Products} />
        </div>
    );
};

export default HomePage;
