export const PageContainer: React.FC<React.PropsWithChildren> = ({
    children,
}) => {
    return <main className="flex flex-grow">{children} </main>
}
