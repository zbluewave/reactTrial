export default function getPrevMatchedItemsState() {
    return {
        data: JSON.parse(localStorage.getItem('matches')) || []
    };
}
