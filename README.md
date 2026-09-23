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
| Instant trigger | Watch Events | `POST /v1/webhooks`, then Lockally posts to the scenario |
| Action | Send Email | `POST /v1/send` |
| Action | Send Email from Template | `POST /v1/send` with `template_id` |
| Action | Reply to Email Thread | `POST /v1/threads/{id}/reply` |
| Action | Add to Suppression List | `POST /v1/suppressions` |
| Action | Remove from Suppression List | `DELETE /v1/suppressions/{email}` |
| Search | Get a Sent Message | `GET /v1/messages/{id}` |
| Search | Get a Suppression | `GET /v1/suppressions/{email}` |

Two dropdowns are filled by RPCs: the mailbox list from `GET /v1/inboxes`, and
the template list from `GET /v1/templates`.

## Layout

```
base.imljson                     the API host, the Authorization header, error wording
connections/lockally/            the API key, and the call that checks it
modules/<name>/                  api, parameters, interface, samples
webhooks/events/                 attach, detach, the payload shape
rpcs/<name>/                     the dropdowns
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
6. Create the two RPCs from `rpcs/`.

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
