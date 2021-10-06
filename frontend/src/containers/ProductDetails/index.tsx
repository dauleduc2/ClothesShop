import * as React from "react";

import { RadioGroup } from "@headlessui/react";

interface ProductDetailsProps {}

const product = {
    name: "sus",
    price: "$35",

    href: "#",
    breadcrumbs: [{ id: 1, name: "Amongus", href: "#" }],
    images: [
        {
            id: 1,
            imageSrc: "/images/sus1.jpg",
            imageAlt: "Back of women's Basic Tee in black.",
            primary: true,
        },
        {
            id: 2,
            imageSrc: "/images/sus2.jpg",
            imageAlt: "Side profile of women's Basic Tee in black.",
            primary: false,
        },
        {
            id: 3,
            imageSrc: "/images/sus3.jpg",
            imageAlt: "Front of women's Basic Tee in black.",
            primary: false,
        },
        {
            id: 4,
            imageSrc: "/images/sus4.jpg",
            imageAlt: "Front of women's Basic Tee in black.",
            primary: false,
        },
    ],
    colors: [
        {
            name: "Black",
            bgColor: "bg-gray-900",
            selectedColor: "ring-gray-900",
        },
        {
            name: "Heather Grey",
            bgColor: "bg-gray-400",
            selectedColor: "ring-gray-400",
        },
    ],
    sizes: [
        { name: "XXS", inStock: true },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: false },
    ],
    description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
    details: [
        "Only the best materials",
        "Ethically and locally made",
        "Pre-washed and pre-shrunk",
        "Machine wash cold with similar colors",
    ],
};

// const policies = [
//     {
//         name: "International delivery",
//         icon: GlobeIcon,
//         description: "Get your order in 2 years",
//     },
//     {
//         name: "Loyalty rewards",
//         icon: CurrencyDollarIcon,
//         description: "Don't look at other tees",
//     },
// ];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = () => {
    const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = React.useState(product.sizes[2]);

    return (
        <div>
            <div className="bg-white">
                <div className="pt-6 pb-16 sm:pb-24">
                    <nav
                        aria-label="Breadcrumb"
                        className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
                    >
                        <ol role="list" className="flex items-center space-x-4">
                            {product.breadcrumbs.map((breadcrumb) => (
                                <li key={breadcrumb.id}>
                                    <div className="flex items-center">
                                        <a
                                            href={breadcrumb.href}
                                            className="mr-4 text-sm font-medium text-gray-900"
                                        >
                                            {breadcrumb.name}
                                        </a>
                                        <svg
                                            viewBox="0 0 6 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="w-auto h-5 text-gray-300"
                                        >
                                            <path
                                                d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                <a
                                    href={product.href}
                                    aria-current="page"
                                    className="font-medium text-gray-500 hover:text-gray-600"
                                >
                                    {product.name}
                                </a>
                            </li>
                        </ol>
                    </nav>
                    <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
                            <div className="lg:col-start-8 lg:col-span-5">
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-medium text-gray-900">
                                        {product.name}
                                    </h1>
                                    <p className="text-xl font-medium text-gray-900">
                                        {product.price}
                                    </p>
                                </div>
                            </div>

                            {/* Image gallery */}
                            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                                <h2 className="sr-only">Images</h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                                    {product.images.map((image) => (
                                        <img
                                            key={image.id}
                                            src={image.imageSrc}
                                            alt={image.imageAlt}
                                            className={classNames(
                                                image.primary
                                                    ? "lg:col-span-2 lg:row-span-2 w-full h-full"
                                                    : "hidden lg:block",
                                                "rounded-lg"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 lg:col-span-5">
                                <form>
                                    {/* Color picker */}
                                    <div>
                                        <h2 className="text-sm font-medium text-gray-900">
                                            Color
                                        </h2>

                                        <RadioGroup
                                            value={selectedColor}
                                            onChange={setSelectedColor}
                                            className="mt-2"
                                        >
                                            <RadioGroup.Label className="sr-only">
                                                Choose a color
                                            </RadioGroup.Label>
                                            <div className="flex items-center space-x-3">
                                                {product.colors.map((color) => (
                                                    <RadioGroup.Option
                                                        key={color.name}
                                                        value={color}
                                                        className={({
                                                            active,
                                                            checked,
                                                        }) =>
                                                            classNames(
                                                                color.selectedColor,
                                                                active &&
                                                                    checked
                                                                    ? "ring ring-offset-1"
                                                                    : "",
                                                                !active &&
                                                                    checked
                                                                    ? "ring-2"
                                                                    : "",
                                                                "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label
                                                            as="p"
                                                            className="sr-only"
                                                        >
                                                            {color.name}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                color.bgColor,
                                                                "h-8 w-8 border border-black border-opacity-10 rounded-full"
                                                            )}
                                                        />
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    {/* Size picker */}
                                    <div className="mt-8">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-sm font-medium text-gray-900">
                                                Size
                                            </h2>
                                            <a
                                                href="#"
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                See sizing chart
                                            </a>
                                        </div>

                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            className="mt-2"
                                        >
                                            <RadioGroup.Label className="sr-only">
                                                Choose a size
                                            </RadioGroup.Label>
                                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                {product.sizes.map((size) => (
                                                    <RadioGroup.Option
                                                        key={size.name}
                                                        value={size}
                                                        className={({
                                                            active,
                                                            checked,
                                                        }) =>
                                                            classNames(
                                                                size.inStock
                                                                    ? "cursor-pointer focus:outline-none"
                                                                    : "opacity-25 cursor-not-allowed",
                                                                active
                                                                    ? "ring-2 ring-offset-2 ring-indigo-500"
                                                                    : "",
                                                                checked
                                                                    ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                                                    : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                                                "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                                                            )
                                                        }
                                                        disabled={!size.inStock}
                                                    >
                                                        <RadioGroup.Label as="p">
                                                            {size.name}
                                                        </RadioGroup.Label>
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Add to cart
                                    </button>
                                </form>

                                {/* Product details */}
                                <div className="mt-10">
                                    <h2 className="text-sm font-medium text-gray-900">
                                        Description
                                    </h2>

                                    <div
                                        className="mt-4 prose-sm prose text-gray-500"
                                        dangerouslySetInnerHTML={{
                                            __html: product.description,
                                        }}
                                    />
                                </div>

                                <div className="pt-8 mt-8 border-t border-gray-200">
                                    <h2 className="text-sm font-medium text-gray-900">
                                        Fabric &amp; Care
                                    </h2>

                                    <div className="mt-4 prose-sm prose text-gray-500">
                                        <ul role="list">
                                            {product.details.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Policies */}
                                {/* <section
                                    aria-labelledby="policies-heading"
                                    className="mt-10"
                                >
                                    <h2
                                        id="policies-heading"
                                        className="sr-only"
                                    >
                                        Our Policies
                                    </h2>

                                    <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                        {policies.map((policy) => (
                                            <div
                                                key={policy.name}
                                                className="p-6 text-center border border-gray-200 rounded-lg bg-gray-50"
                                            >
                                                <dt>
                                                    <policy.icon
                                                        className="flex-shrink-0 w-6 h-6 mx-auto text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                    <span className="mt-4 text-sm font-medium text-gray-900">
                                                        {policy.name}
                                                    </span>
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-500">
                                                    {policy.description}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </section> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
