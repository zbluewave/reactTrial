'use strict';

export default function (data, merchantId) {

    return {
        menu: normalizeMenu(data.menu),
        merchantId,
        createdAt: new Date()
    };
}

function normalizeMenu(menu) {
    let normalizedMenu = [];
    menu.forEach((item) => {
        if (item.children && item.children.length) {
            let section = {
                section: item.name,
                id: item.id,
                description: item.description,
                items: item.children,
                schedule: item.schedule,
                unique_id: item.unique_id,
                type: 'section'
            };
            normalizedMenu.push(section);
        }
    });

    return flattenMenu(normalizedMenu);
}

function flattenMenu(items, path = '') {
    let allItems = [];
    items.forEach(function (item) {
        item.name = item.hasOwnProperty('name') ? item.name.replace(/\uFFFD/g, '') : null;

        allItems.push({
            ...item,
            path
        });

        const currentPath = path.length ? `${path} / ` : '';
        const nextPath = `${currentPath}${item.name || item.section}`;

        if (item.children && item.children.length > 0) {
            allItems = allItems.concat(flattenMenu(item.children, nextPath));
        }
        if (item.items && item.items.length > 0) {
            allItems = allItems.concat(flattenMenu(item.items, nextPath));
        }
    });

    return allItems;
}