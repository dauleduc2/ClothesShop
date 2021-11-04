interface LoadingProps {}

const LoadingAnimation: React.FunctionComponent<LoadingProps> = () => {
    return (
        <>
            <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24"></svg>
        </>
    );
};

export default LoadingAnimation;
