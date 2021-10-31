import Chart from 'react-apexcharts';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AnalystDate } from '../../../../common/interfaces/Common/analyst';
import { ApexOptions } from 'apexcharts';
import { RootState, store } from '../../../../redux';
import { analystThunk } from '../../../../redux/analyst/analystThunk';
import { useSelector } from 'react-redux';
import { AnalystState } from '../../../../common/interfaces/Redux/analyst';
import { capitalizeFirstLetter } from '../../../../utils/textHelper';
interface TotalPriceOfTypeOnTimeProps {}

const TotalPriceOfTypeOnTime: React.FunctionComponent<TotalPriceOfTypeOnTimeProps> = () => {
    const [series, setSeries] = React.useState<number[]>([44, 55, 41, 17, 15]);
    const [label, setLabel] = React.useState(['A', 'B', 'C', 'D', 'E']);
    const analystState = useSelector<RootState, AnalystState>((state) => state.analyst);
    const { handleSubmit, register } = useForm<AnalystDate>({
        defaultValues: {
            from: `${new Date().getFullYear()}-01-01`,
            to: `${new Date().getFullYear()}-12-31`,
        },
    });
    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        labels: label,
    };
    React.useEffect(() => {
        if (analystState.totalPriceByType.length > 0) {
            setSeries(
                analystState.totalPriceByType.map((item) => {
                    return Number(item.totalPrice);
                })
            );
        }

        if (analystState.totalPriceByType.length > 0) {
            setLabel(
                analystState.totalPriceByType.map((item) => {
                    return capitalizeFirstLetter(item.name);
                })
            );
        }

        return () => {};
    }, [analystState.totalPriceByType]);
    const onSubmit = (data: AnalystDate) => {
        store.dispatch(analystThunk.adminGetTotalPriceByType({ from: data.from, to: data.to }));
    };
    return (
        <div className="">
            <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                Top 5 category with most item sale
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
            <Chart options={options} series={series} chartOptions={label} type="donut" width="500" />
        </div>
    );
};

export default TotalPriceOfTypeOnTime;
