export const PageContainer: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return (
        <main className="flex flex-grow justify-center overflow-hidden">
            {children}{' '}
        </main>
    )
}
