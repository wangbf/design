var tools = {};
// Generate four random hex digits.
tools.S4 = function() {
	return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

// uuid
tools.guid = function() {
	return (tools.S4() + tools.S4() + "-" + tools.S4() + "-" + tools.S4() + "-" + tools.S4() + "-" + tools.S4() + tools.S4() + tools.S4());
};

tools.isObject = function (item) {
	return item === Object(item);
}

tools.contains = function (array, item) {
	var i = array.length;
	while (i--)
		if (array[i] === item)
			return true;
	return false;
}

tools.extend = function (obj, props) {
	for ( var key in props)
		obj[key] = props[key]
	return obj;
}

tools.result = function (object, property) {
	if (object == null)
		return void 0;
	var value = object[property];
	return (typeof value === 'function') ? object[property]() : value;
}