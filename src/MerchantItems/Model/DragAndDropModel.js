export default function(type) {
    switch(type) {

        case 'item':
            return 'item';

        case 'submenu':
        case 'section':
            return 'submenu';

        case 'option':
            return 'option';

        case 'option group':
        case 'optiongroup':
            return 'option group';

        case 'price group':
        case 'pricegroup':
            return 'price group';

        case 'image':
            return 'image';

        default:
            return 'item';
    }
}