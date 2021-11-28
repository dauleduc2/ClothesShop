import ProductContainer from '../../components/ProductContainer';
import React from 'react';
import { RootState, store } from '../../redux';
import { productThunk } from '../../redux/product/productThunk';
import { useSelector } from 'react-redux';
import { ProductState } from '../../common/interfaces/Redux/product';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
interface HomePageProps extends RouteComponentProps {}
const categories = [
    {
        name: 'Kids',
        href: '/categories/kids',
        imageSrc:
            'https://img.ltwebstatic.com/images3_pi/2019/11/09/15732767009cd5e4dbfc077e2dfe3f5c354fa3baa4_thumbnail_600x.webp',
    },
    {
        name: 'Hoodies',
        href: '/categories/hoodies',
        imageSrc:
            'https://bizweb.dktcdn.net/100/287/440/files/ao-khoac-hoodie-den-nam-nu-local-brand.jpg?v=1609171430739',
    },
    {
        name: 'Knitwear',
        href: '/categories/knitwear',
        imageSrc:
            'https://www.kamiceria.com/media/catalog/product/cache/77fa05ee1c24c380906545840523d8cf/f/-/f-telayo1018-6757-503_01.jpg',
    },
    {
        name: 'Pants',
        href: '/categories/pants',
        imageSrc:
            'https://craft-products-production.imgix.net/images/695_a86132f3c9-1908716-999000-1-original.jpg?q=70&fit=clip&w=1255&fm=jpg&auto=format',
    },
    {
        name: 'T-Shirts',
        href: '/categories/t-shirts',
        imageSrc: 'https://owen.vn/media/catalog/product/cache/01755127bd64f5dde3182fd2f139143a/t/s/ts22352_1.jpg',
    },
];
const HomePage: React.FunctionComponent<HomePageProps> = ({ location }) => {
    const productState = useSelector<RootState, ProductState>((state) => state.product);
    React.useEffect(() => {
        store.dispatch(productThunk.getAllProduct({ limit: Number(8), page: Number(1) }));
    }, []);
    return (
        <div className="flex-1 mt-5 text-4xl">
            <div className="bg-white">
                <div className="relative bg-gray-900">
                    {/* Decorative image and overlay */}
                    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg"
                            alt=""
                            className="object-cover object-center w-full h-full"
                        />
                    </div>
                    <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

                    {/* Navigation */}

                    <div className="relative flex flex-col items-center max-w-3xl px-6 py-32 mx-auto text-center sm:py-64 lg:px-0">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white lg:text-6xl">
                            New arrivals are here
                        </h1>
                        <p className="mt-4 text-xl text-white">
                            The new arrivals have, well, newly arrived. Check out the latest options from our summer
                            small-batch release while they're still in stock.
                        </p>
                        <Link
                            to="#"
                            className="inline-block px-8 py-3 mt-8 text-base font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-gray-100"
                        >
                            Shop New Arrivals
                        </Link>
                    </div>
                </div>

                <main>
                    {/* Category section */}
                    <section
                        aria-labelledby="category-heading"
                        className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
                    >
                        <div className="px-4 sm:px-6 sm:flex sm:items-center sm:justify-between lg:px-8 xl:px-0">
                            <h2 id="category-heading" className="text-2xl font-extrabold tracking-tight text-gray-900">
                                Shop by Category
                            </h2>
                            <Link
                                to="#"
                                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
                            >
                                Browse all categories<span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>

                        <div className="flow-root mt-4">
                            <div className="-my-2">
                                <div className="box-content relative py-2 overflow-x-auto h-80 xl:overflow-visible">
                                    <div className="absolute flex px-4 space-x-8 min-w-screen-xl sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:grid xl:grid-cols-5 xl:gap-x-8">
                                        {categories.map((category) => (
                                            <a
                                                key={category.name}
                                                href={category.href}
                                                className="relative flex flex-col w-56 p-6 overflow-hidden rounded-lg h-80 hover:opacity-75 xl:w-auto"
                                            >
                                                <span aria-hidden="true" className="absolute inset-0">
                                                    <img
                                                        src={category.imageSrc}
                                                        alt=""
                                                        className="object-cover object-center w-full h-full"
                                                    />
                                                </span>
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-x-0 bottom-0 opacity-50 h-2/3 bg-gradient-to-t from-gray-800"
                                                />
                                                <span className="relative mt-auto text-xl font-bold text-center text-white">
                                                    {category.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 mt-6 sm:hidden">
                            <Link to="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                Browse all categories<span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>
                    </section>
                </main>
            </div>
            <ProductContainer products={productState.productToShowList.data} />
        </div>
    );
};

export default HomePage;
