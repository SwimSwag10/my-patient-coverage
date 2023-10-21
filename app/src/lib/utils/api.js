async function api(endpoint, method, body, options) {
    endpoint
		// ❔ Why do we need this? Why are we usign the 8325 port? Is this for development purposes?
    let res = await fetch(
		`${window.location.href.includes("localhost") ? "http://localhost:8325" : ""}/api${endpoint}`,
		{
        ...(method && {method}),
        headers: {"Content-Type": "application/json"},
        ...(body && {body: JSON.stringify(body)}),
        ...options
    })
	if (res?.headers?.get("content-type").includes("application/json")) {
	  body = await res.json()
	} else if (res?.headers?.get("content-type").includes("text")) {
		body = await res.text()
	} else {
	  body = null
	}
    return {ok: res.ok, body}
}

export default api