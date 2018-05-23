import getPrevAuthState from './Login/Reducer/getPrevAuthState';
import getPrevMerchantsState from './Merchants/Reducer/getPrevMerchantsState';
import getPrevMerchantState from './Merchants/Reducer/getPrevMerchantState';
import getPrevMerchantItemsState from './MerchantItems/Reducer/getPrevMerchantItemsState';
import getPrevMenuState from './Menu/Reducer/getPrevMenuState';
import getPrevMatchedItemsState from './Menu/Reducer/getPrevMatchedItemsState';
import getPrevFilteredItemState from './MerchantItems/Reducer/getPrevFilteredItemState';
import getPrevLinkedItemState from './MerchantItems/Reducer/getPrevLinkedItemState';

export default function loadPrevAppState() {
	return {
		auth: getPrevAuthState(),
		merchants: getPrevMerchantsState(),
		merchant: getPrevMerchantState(),
		merchantItems: getPrevMerchantItemsState(),
		menu: getPrevMenuState(),
		matchedItems: getPrevMatchedItemsState(),
		filteredItem: getPrevFilteredItemState(),
		linkedItem: getPrevLinkedItemState()
	};
}
