import * as React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions, CardContent } from "@mui/material";
import Button from "@mui/material/Button";

interface ProductProps {
    describe: string;
    imgUrl: string;
    price: string;
}

const Product: React.FunctionComponent<ProductProps> = ({
    describe,
    imgUrl,
    price,
}) => {
    return (
        <Card
            className="duration-1000 transform w-44 sm:w-52 hover:-translate-y-1"
            key={describe}
        >
            <CardActionArea>
                <CardMedia component="img" image={imgUrl} alt="green iguana" />
            </CardActionArea>
            <CardContent>
                <p className="text-sm text-left line-clamp-2">{describe}</p>
            </CardContent>
            <CardActions>
                <div className="flex flex-col justify-between w-full text-sm text-left sm:items-center item-left sm:flex-row">
                    <p className="text-sm text-red-400 ">{price}</p>
                    <Button variant="outlined" size="small" className="text-xs">
                        Add to cart
                    </Button>
                </div>
            </CardActions>
        </Card>
    );
};

export default Product;
