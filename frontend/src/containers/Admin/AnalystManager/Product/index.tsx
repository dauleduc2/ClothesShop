import { useForm } from 'react-hook-form';
import { AnalystDate } from '../../../../common/interfaces/Common/analyst';
import Chart from 'react-apexcharts';
import * as React from 'react';
import { RootState, store } from '../../../../redux';
import { analystThunk } from '../../../../redux/analyst/analystThunk';
import { useSelector } from 'react-redux';
import { AnalystState } from '../../../../common/interfaces/Redux/analyst';
import { useLayoutEffect } from 'hoist-non-react-statics/node_modules/@types/react';

interface ProductAnalystProps {}

const ProductAnalyst: React.FunctionComponent<ProductAnalystProps> = () => {
    const { handleSubmit, register } = useForm<AnalystDate>();
    const onSubmit = (data: AnalystDate) => {
        store.dispatch(analystThunk.getTotalSaleOnTime({ from: data.from, to: data.to }));
    };
    const analystState = useSelector<RootState, AnalystState>((state) => state.analyst);
    const [categories, setCategories] = React.useState<String[]>([
        '1991',
        '1992',
        '1993',
        '1994',
        '1995',
        '1996',
        '1997',
        '1998',
        '1999',
    ]);
    const [dataSeries, setDataSeries] = React.useState<Number[]>([30, 40, 45, 50, 49, 60, 70, 91]);
    React.useLayoutEffect(() => {
        const categoriesList = analystState.totalSale.map((sale) => {
            return sale.time;
        });
        const newDataSeries = analystState.totalSale.map((sale) => {
            return Number(sale.data);
        });
        setCategories(categoriesList);
        setDataSeries(newDataSeries);
    }, [analystState.totalSale]);
    const options = {
        chart: {
            id: 'basic-bar',
        },
        xaxis: {
            categories: categories,
        },
    };

    const series = [
        {
            name: 'Total item sale ',
            data: dataSeries,
        },
    ];
    return (
        <div className="">
            <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                Total sale on time
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex my-3 align-baseline">
                <div className="flex flex-col">
                    <label className="text-base">Start Date</label>
                    <input type="date" {...register('from')} />
                </div>
                <div className="flex flex-col ml-5">
                    <label className="text-base">End Date</label>
                    <input type="date" {...register('to')} />
                </div>
                <div className="">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 mt-6 ml-5 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Analyst
                    </button>
                </div>
            </form>
            <Chart options={options} series={series} type="line" width="500" />
        </div>
    );
};

export default ProductAnalyst;
