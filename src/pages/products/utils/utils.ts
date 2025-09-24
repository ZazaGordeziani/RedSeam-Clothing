export const formatProductName = (name: string) => {
    if (!name) return ''

    return name
        .split(' ')
        .map((word) =>
            word
                .split('-')
                .map(
                    (segment) =>
                        segment.charAt(0).toUpperCase() +
                        segment.slice(1).toLowerCase(),
                )
                .join('-'),
        )
        .join(' ')
}
