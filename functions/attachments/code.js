function attachments(list) {
	// Turns the Attachments array into what POST /v1/send expects. Make hands a
	// mapped file over as a buffer, and a buffer put straight into a JSON body
	// is sent as an object, which the API refuses. Each file is encoded to
	// base64 here instead, in plain JavaScript so it runs in Make's sandbox.
	if (!Array.isArray(list) || list.length === 0) return undefined;
	var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	function utf8Bytes(text) {
		var out = [];
		for (var i = 0; i < text.length; i++) {
			var c = text.charCodeAt(i);
			if (c >= 0xd800 && c <= 0xdbff && i + 1 < text.length) {
				c = 0x10000 + ((c - 0xd800) << 10) + (text.charCodeAt(++i) - 0xdc00);
			}
			if (c < 0x80) out.push(c);
			else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
			else if (c < 0x10000) out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
			else out.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
		}
		return out;
	}
	function bytesOf(data) {
		if (data === null || data === undefined) return [];
		if (typeof data === 'string') return utf8Bytes(data);
		if (data.type === 'Buffer' && Array.isArray(data.data)) return data.data;
		if (typeof data.length === 'number') return Array.prototype.slice.call(data);
		return [];
	}
	function base64(bytes) {
		var out = '';
		for (var i = 0; i < bytes.length; i += 3) {
			var a = bytes[i], b = bytes[i + 1], c = bytes[i + 2];
			var n = (a << 16) | ((b || 0) << 8) | (c || 0);
			out += alphabet.charAt((n >> 18) & 63) + alphabet.charAt((n >> 12) & 63);
			out += b === undefined ? '=' : alphabet.charAt((n >> 6) & 63);
			out += c === undefined ? '=' : alphabet.charAt(n & 63);
		}
		return out;
	}
	var files = [];
	for (var i = 0; i < list.length; i++) {
		files.push({
			filename: list[i].filename,
			content_type: list[i].content_type || 'application/octet-stream',
			content_base64: base64(bytesOf(list[i].content_base64))
		});
	}
	return files;
}
