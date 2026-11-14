function attachments(list) {
	// Turns the Attachments array into what POST /v1/send expects. Make hands a
	// mapped file over as a buffer, and a buffer put straight into a JSON body
	// is sent as an object, which the API refuses, so each file is encoded to
	// base64 here.
	if (!Array.isArray(list) || list.length === 0) return undefined;
	function toBase64(data) {
		if (data === null || data === undefined) return '';
		if (typeof data === 'string') return Buffer.from(data).toString('base64');
		// A buffer serialised to JSON arrives as { type: 'Buffer', data: [...] }.
		if (data.type === 'Buffer' && Array.isArray(data.data)) return Buffer.from(data.data).toString('base64');
		return Buffer.from(data).toString('base64');
	}
	var files = [];
	for (var i = 0; i < list.length; i++) {
		files.push({
			filename: list[i].filename,
			content_type: list[i].content_type || 'application/octet-stream',
			content_base64: toBase64(list[i].content_base64)
		});
	}
	return files;
}
