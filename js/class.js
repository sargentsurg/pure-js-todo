var TC = TC || {};

TC.Class = {
    create: function create(namespace, constructor) {
        var newClass = TC.Class.makeNamespace(namespace, constructor);
		newClass = constructor;
		return newClass;
    },
    extend: function extend(parent, namespace, constructor) {
        var f = function() {};
		try {
			f.prototype = parent.prototype;
		} catch(e) {
			throw new Error("Parent class does not exist. Are you loading it in a <script> tag?");
		}
        constructor.prototype = new f();
        constructor.prototype.parent = parent;
        constructor.prototype.constructor = constructor;
		return TC.Class.create(namespace, constructor);
    },
    implement: function implement(mixin, child) {
        for (var prop in mixin.prototype) {
            if (mixin.prototype.hasOwnProperty(prop)) {
                child.prototype[prop] = mixin.prototype[prop];
            }
        }
    },
	addDefaultOptions: function addDefaultProperties(classObj, options) {
		classObj.prototype.defaultOptions = $.extend({}, classObj.prototype.defaultOptions, options);
	},
	makeNamespace: function makeNamespace(string, value) {
		var parts = string.split('.');
		var parent = window;
		for (var i=0; i<parts.length; i++) {
			var part = parts[i];
			if (typeof parent[part] == 'undefined') {
				if (i == parts.length-1 && typeof value !== 'undefined') {
					parent[part] = value;
				} else {
					parent[part] = {};
				}
			}
			parent = parent[part];
		}
		return parent;
	}
};