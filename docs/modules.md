# What each module says in Make

The label, description, type, action and group of each module, to keep them
consistent wherever they are entered. Labels are sentence case and every
description ends with a period, as Make's review asks.

## Watch events (instant trigger, group Events)

**Label:** Watch events
**Description:** Starts a scenario when something happens in Lockally: mail
arrives, or mail you sent is delivered, bounces, or is marked as spam.

Turning the scenario on creates a webhook in Lockally; turning it off deletes
it. Watching mail arrive needs the `inboxes:read` permission and a grant for the
mailbox being watched (on the API Keys page, under the key's Mailboxes). A key
with no grants sees no mailboxes. Triggers need a plan that includes webhooks.
The bundle is the webhook payload as Lockally sends it, with `created` (and
`data.received_at`) parsed as dates.

## Send an email (action: create, group Emails)

**Label:** Send an email
**Description:** Sends an email from one of your own Lockally addresses, with
attachments and optional scheduling.

## Send an email from a template (action: create, group Emails)

**Label:** Send an email from a template
**Description:** Sends a saved Lockally template and fills in its placeholders,
so the wording can be changed without touching the scenario.

## Reply to an email thread (action: create, group Emails)

**Label:** Reply to an email thread
**Description:** Replies inside an existing conversation, so it stays one thread
in the recipient's mail app rather than arriving as a new message.

## Get a sent message (action: read, group Emails), module `getSentMessage`

**Label:** Get a sent message
**Description:** Looks up an email you sent and reports where it got to: queued,
delivered, bounced, or a spam complaint.

## Add to suppression list (action: create, group Suppressions)

**Label:** Add to suppression list
**Description:** Stops Lockally sending to an address.

## Get a suppression (action: read, group Suppressions), module `checkSuppression`

**Label:** Get a suppression
**Description:** Checks whether an address is on your suppression list, and why.
Always returns one bundle: Suppressed is false when the address is free to
receive mail.

Uses `GET /v1/suppressions?email=`, which answers 200 with an empty list for an
address that is not suppressed. The single-address route answers 404 instead,
and Make treats every 4xx as an error, which is why this module does not use it.

## Remove from suppression list (action: delete, group Suppressions)

**Label:** Remove from suppression list
**Description:** Lets Lockally send to an address again. Only do this when the
person has asked to hear from you.

Returns no output: a failed removal raises an error.

## Make an API call (universal, group Other)

**Label:** Make an API call
**Description:** Performs an arbitrary authorized API call.

## Retired modules (hidden, kept because a published module cannot be deleted)

| Module | Label | Replaced by |
|---|---|---|
| `getMessage` (search) | [DO NOT USE] Get a Sent Message | `getSentMessage` |
| `getSuppression` (search) | [DO NOT USE] Get a Suppression | `checkSuppression` |

Make's review (2026-11-14) asked for get-by-ID modules to be actions, and a
module's type cannot be changed after it is created.
