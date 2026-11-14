# Lockally for Make

The source of the Lockally app for [Make](https://make.com): send email from
your own domain as a step in any scenario, and start scenarios from the mail
that arrives.

A Make app lives in Make's own editor rather than being published from a
package, so this repository is the record of what that app contains. Every
block here is pasted into, or synced to, the app in Make.

## What the app offers

| Kind | Module | Endpoint |
|---|---|---|
| Instant trigger | Watch events | `POST /v1/webhooks`, then Lockally posts to the scenario |
| Action | Send an email | `POST /v1/send` |
| Action | Send an email from a template | `POST /v1/send` with `template_id` |
| Action | Reply to an email thread | `POST /v1/threads/{id}/reply` |
| Action | Add to suppression list | `POST /v1/suppressions` |
| Action | Remove from suppression list | `DELETE /v1/suppressions/{email}` |
| Action | Get a sent message (`getSentMessage`) | `GET /v1/messages/{id}` |
| Action | Get a suppression (`checkSuppression`) | `GET /v1/suppressions?email=` |
| Universal | Make an API call | any `https://api.lockally.com` path, with the connection's key |

Two dropdowns are filled by RPCs: the mailbox list from `GET /v1/inboxes`, and
the template list from `GET /v1/templates`.

## Layout

```
base.imljson                     the API host, the Authorization header, error wording
connections/lockally/            the API key, and the call that checks it
modules/<name>/                  api, parameters, interface, samples
webhooks/events/                 attach, detach, the payload shape
rpcs/<name>/                     the dropdowns, and the template's value fields
functions/<name>/                custom IML functions (paste code.js)
docs/                            what each module is for, ready to paste into Make
```

`api.imljson` is the request, `parameters.imljson` is what the person fills in,
`interface.imljson` is what later modules can map from, and `samples.imljson` is
what Make shows before the scenario has ever run.

## Building it in Make

1. In Make, open **Custom apps** and create an app named Lockally, with the
   Email category and the details in `docs/app.md`.
2. Paste `base.imljson` into **Base**.
3. Create the connection (type: API key) and paste the two files from
   `connections/lockally/`.
4. Create each module, choosing the right type (instant trigger, action,
   search), and paste its blocks.
5. Create the webhook and paste `webhooks/events/`.
6. Create the three RPCs from `rpcs/`, and the two IML functions from
   `functions/` (the function name is the folder name).

Make's VS Code extension can sync a local folder with an app, which is quicker
than pasting. This layout matches what it expects.

## Notes on the design

* **Turning a scenario on creates the Lockally webhook, turning it off deletes
  it.** `attach` keeps the id it was given, and `detach` treats an already
  deleted subscription as success, so a scenario can always be turned off.
* **Every send carries a fresh `Idempotency-Key`.** Lockally replays the first
  answer for 24 hours if it sees the same key again, and a scenario that means
  to send the same message twice should send it twice.
* **The mailbox dropdown lists what the key may see.** A key limited to certain
  mailboxes gets exactly those, so the list never offers one the trigger would
  then be refused.
* **Attachments are encoded by `functions/attachments`.** Make hands a mapped
  file over as a buffer, and a buffer placed straight in a JSON body arrives as
  an object, which `/v1/send` refuses. The function turns each one into base64.
* **A template's placeholders become their own fields.** Choosing a template
  loads `rpcs/templateValues`, which adds one field per placeholder, named
  `var_<placeholder>`. `functions/templateVariables` gathers them back into
  `variables`. A collection whose `spec` is itself an RPC was tried first and
  failed: Make calls that inner RPC without the connection, so it gets a 401.
* **Get a suppression asks the list endpoint, not `/v1/suppressions/{email}`.**
  Make treats every 4xx as an error, so the 404 that means "not suppressed"
  would stop the scenario. `GET /v1/suppressions?email=` answers 200 with an
  empty list instead, and the module returns one bundle with `suppressed: false`.
  It is an action, not a search: Make's review asked for get-one modules to be
  actions. The old search modules (`getMessage`, `getSuppression`) stay in the
  app, hidden and labelled [DO NOT USE], because a published module cannot be
  deleted.
* **The key is redacted from logs** through `log.sanitize` in `base.imljson`
  and in the connection.

## Getting listed

Make requires an app to pass review before it appears in the marketplace, and
an active Make Partnership Agreement, which Make offers after that review. Until
then the app can be shared privately by link with specific customers.

## Support

support@lockally.com · [Lockally developer documentation](https://developers.lockally.com)

## Licence

MIT, see [LICENSE](LICENSE).
