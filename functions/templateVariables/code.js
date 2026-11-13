function templateVariables(parameters) {
	// The template's placeholders appear as fields named var_<placeholder>,
	// one per placeholder (see rpcs/templateValues). This gathers them into the
	// variables object POST /v1/send expects, and sends nothing when none is set.
	var out = {};
	var count = 0;
	for (var key in parameters) {
		if (key.indexOf('var_') !== 0) continue;
		var value = parameters[key];
		if (value === undefined || value === null) continue;
		out[key.slice(4)] = String(value);
		count++;
	}
	return count ? out : undefined;
}
