const hashToArray = function(input) {
    if (Array.isArray(input)) {
        return input;
    } else if (typeof input == "object") {
        return Object.keys(input).map(function (key) {
            return input[key];
        });
    }
    return [];
};

export {
    hashToArray
};
