import { useForm } from 'react-hook-form';
import { AnalystDate, ApexLineConfig } from '../../../../common/interfaces/Common/analyst';
import Chart from 'react-apexcharts';
import * as React from 'react';
import { RootState, store } from '../../../../redux';
import { analystThunk } from '../../../../redux/analyst/analystThunk';
import { useSelector } from 'react-redux';
import { AnalystState } from '../../../../common/interfaces/Redux/analyst';
interface TotalPriceOnTimeProps {}

const TotalPriceOnTime: React.FunctionComponent<TotalPriceOnTimeProps> = () => {
    const analystState = useSelector<RootState, AnalystState>((state) => state.analyst);
    const { handleSubmit, register } = useForm<AnalystDate>({
        defaultValues: {
            from: `${new Date().getFullYear()}-01-01`,
            to: `${new Date().getFullYear()}-12-31`,
        },
    });
    const onSubmit = (data: AnalystDate) => {
        store.dispatch(analystThunk.getTotalPriceOnTime({ from: data.from, to: data.to }));
    };

    const [chartConfig, setChartConfig] = React.useState<ApexLineConfig>({
        options: {
            chart: {
                id: 'Total price on time',
            },
            xaxis: {
                categories:
                    analystState.totalPrice.length > 0
                        ? analystState.totalPrice.map((sale) => {
                              return sale.time;
                          })
                        : [],
            },
        },
        series: [
            {
                name: 'Total price',
                data:
                    analystState.totalPrice.length > 0
                        ? analystState.totalPrice.map((sale) => {
                              return Number(sale.data);
                          })
                        : [],
            },
        ],
    });
    //set value on state update
    React.useEffect(() => {
        if (analystState.totalPrice.length > 0) {
            setChartConfig((prev) => {
                return {
                    ...prev,
                    options: {
                        ...prev.options,
                        xaxis: {
                            categories: analystState.totalPrice.map((item) => {
                                return item.time;
                            }),
                        },
                    },
                    series: [
                        {
                            name: 'abc',
                            data: analystState.totalPrice.map((item) => {
                                return Number(item.data);
                            }),
                        },
                    ],
                };
            });
        }
    }, [analystState.totalPrice]);
    //call api to get data on first time
    React.useEffect(() => {
        store.dispatch(
            analystThunk.getTotalPriceOnTime({
                from: `${new Date().getFullYear()}-01-01`,
                to: `${new Date().getFullYear()}-12-31`,
            })
        );
        return () => {};
    }, []);

    return (
        <div className="">
            <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                Total price on time
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
            {chartConfig.options.xaxis?.categories.length > 0 && (
                <Chart options={chartConfig.options} series={chartConfig.series} width="750" />
            )}
        </div>
    );
};

export default TotalPriceOnTime;
