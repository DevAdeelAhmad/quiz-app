const SingleCategoryPage = ({ params }: {
    params: { name: string }
}) => {
    const capitalizedCategoryName = params.name.charAt(0).toUpperCase() + params.name.slice(1);

    return (
        <main className="flex min-h-screen items-center justify-center">
            <span>{capitalizedCategoryName} Category Page</span>
        </main>
    );
};

export default SingleCategoryPage;
