export default function (merchantItemsData) {
    return {
        ...cleanItems(merchantItemsData)
    };
}

function formatItems(items) {
    let results = [];

    items.forEach((item) => {

        item.hasOwnProperty('EXTERNAL_ITEM_NAME') ?
            item.EXTERNAL_ITEM_NAME = item.EXTERNAL_ITEM_NAME.replace(/[^\x00-\x7F]/g, "")
            : null;

        item.hasOwnProperty('DESCRIPTION') && item.DESCRIPTION ?
            item.DESCRIPTION = item.DESCRIPTION.replace(/[^\x00-\x7F]/g, "")
            : null;

        results.push(item);
    });

    return results;
}

function cleanItems(items) {

    if (items.linkedItems.length) {
        items.linkedItems = formatItems(items.linkedItems);
    }

    if (items.unlinkedItems.length) {
        items.unlinkedItems = formatItems(items.unlinkedItems);
    }

    if (items.menu.length) {
        items.original = items.menu;
        items.menu = formatMenu(items.menu);
    }
 
    items.unlinkedItems = buildHierarchy(items.unlinkedItems, items.unlinkedItems);

    return items;
}

function buildHierarchy(items, referenceItems) {

    items.forEach((item) => {
        const children = referenceItems.filter((reference) => {
            return reference.EXTERNAL_PARENT_ITEM_ID === item.EXTERNAL_ITEM_ID;
        });

        item.children = children || [];
    });

    return items; 
}

function determineColor(menu, itemArray) {
    const index = menu.indexOf(itemArray);

    if(index % 2 == 0) {
        return '#a4cef3';
    }

    return '#e4e1e1';
}

function formatMenu(menu) {
    let allItems = [];

    menu.forEach((itemArray) => {
        itemArray.forEach((item) => {
            item.color = itemArray.length > 1 ? determineColor(menu, itemArray) : null;

            item.hasOwnProperty('EXTERNAL_ITEM_NAME') ?
                item.EXTERNAL_ITEM_NAME = item.EXTERNAL_ITEM_NAME.replace(/[^\x00-\x7F]/g, "")
                : null;

            item.hasOwnProperty('DESCRIPTION') && item.DESCRIPTION ?
                item.DESCRIPTION = item.DESCRIPTION.replace(/[^\x00-\x7F]/g, "")
                : null;

            allItems.push(item);
        });
    });

    return allItems;
}