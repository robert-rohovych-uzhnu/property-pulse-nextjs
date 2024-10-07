export const getRateDisplay = (property) => {
    const {rates} = property;
    if (rates.monthly !== undefined) {
        return `$${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly !== undefined) {
        return `$${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly !== undefined) {
        return `$${rates.nightly.toLocaleString()}/night`;
    }
}
