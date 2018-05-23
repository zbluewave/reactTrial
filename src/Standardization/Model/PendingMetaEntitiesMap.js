const MASTER_LIST_TYPE = 'master_list';
const ENTITY_TYPE = 'entity';
const TO_WIPE_ASSO = 'to_wipe_asso';

const dataSetCreator = () => {

    let associateMap = new Map();
    let deleteSet = new Set();
    let metaDataMap = new Map();
    let entityMap = new Map();
    let masterListMap = new Map();

    /**
     * just keep for reference
     * @param metaData
     */
    function addMetaData(metaData) {
        if (!metaDataMap.has(metaData.product_id)) {
            metaDataMap.set(metaData.product_id, metaData);
        }
    }

    function addMasterList(masterList) {
        if (!masterListMap.has(masterList.standardized_data_master_list_id)) {
            masterListMap.set(masterList.standardized_data_master_list_id, masterList);
        }
    }

    function addEntityMap(entityData) {
        if (!entityMap.has(entityData.entity_id)) {
            entityMap.set(entityData.entity_id, entityData);
        }
    }

    function addToDeleteQueue(entityData) {
        deleteSet.add(entityData.entity_id);
        addEntityMap(entityData);
    }

    function addToPendingQueue(metaData, masterList, entityData) {
        addMetaData(metaData);
        addMasterList(masterList);
        addEntityMap(entityData);
        associateMap.set(entityData.entity_id, masterList.standardized_data_master_list_id);
        deleteSet.delete(entityData.entity_id);
    }

    function removeEntity(entity) {
        deleteSet.delete(entity.entity_id);
        associateMap.delete(entity.entity_id);
    }

    function hasEntity(entityData) {
        return associateMap.has(entityData.entity_id);
    }

    function clear() {
        associateMap.clear();
        metaDataMap.clear();
        masterListMap.clear();
        entityMap.clear();
    }
    
    function flatten() {
        let result = [];
        let map = new Map();
        associateMap.forEach((masterListId, entityId)=> {
            if (!map.has(masterListId)) {
                map.set(masterListId, []);
            }
            let list =  map.get(masterListId);
            list.push(entityId);
        });
        map.forEach((entityIds, masterListId)=> {
            let masterList = masterListMap.get(masterListId);
            let metaData = metaDataMap.get(masterList.product_id);
            result.push({
                type: MASTER_LIST_TYPE,
                data: {
                    ...masterList,
                    name: metaData.name
                }
            });
            entityIds.forEach((entityId) => {
                result.push({
                    type: ENTITY_TYPE,
                    data: entityMap.get(entityId)
                });
            });
        });
        if (deleteSet.size > 0) {
            result.push({
                type: TO_WIPE_ASSO,
                data: {}
            });
            deleteSet.forEach((entityId) => {
                result.push({
                    type: ENTITY_TYPE,
                    data: entityMap.get(entityId)
                });
            });
        }
        return result;
    }

    function getPendingQueue() {
        let result = [];
        associateMap.forEach((masterListId, entityId)=> {
            result.push({
                "entity_id": entityId,
                "master_list_id": masterListId
            });
        });
        deleteSet.forEach((entityId)=> {
            result.push({
                "entity_id": entityId,
                "master_list_id": null
            });
        });
        return result;
    }

    function hasPending() {
        return deleteSet.size > 0 || associateMap.size > 0;
    }

    return {
        flatten: flatten,
        hasPending: hasPending,
        associateMap: associateMap,
        entityMap: entityMap,
        addToPendingQueue: addToPendingQueue,
        addToDeleteQueue: addToDeleteQueue,
        removeEntity: removeEntity,
        hasEntity: hasEntity,
        clear: clear,
        getPendingQueue: getPendingQueue
    };
};

dataSetCreator.MASTER_LIST_TYPE = MASTER_LIST_TYPE;
dataSetCreator.ENTITY_TYPE = ENTITY_TYPE;
dataSetCreator.TO_WIPE_ASSO = TO_WIPE_ASSO;

export default dataSetCreator;
