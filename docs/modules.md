# What each module says in Make

The label and description of each module, to keep them consistent wherever they
are entered.

## Watch Events (instant trigger)

**Label:** Watch Events
**Description:** Starts a scenario when something happens in Lockally: mail
arrives, or mail you sent is delivered, bounces, or is marked as spam.

Turning the scenario on creates a webhook in Lockally; turning it off deletes
it. Watching mail arrive needs the `inboxes:read` permission and, if the key is
limited to certain mailboxes, a grant for the one being watched. Triggers need a
plan that includes webhooks.

## Send Email (action)

**Label:** Send Email
**Description:** Sends an email from one of your own Lockally addresses, with
attachments and optional scheduling.

## Send Email from Template (action)

**Label:** Send Email from Template
**Description:** Sends a saved Lockally template and fills in its placeholders,
so the wording can be changed without touching the scenario.

## Reply to Email Thread (action)

**Label:** Reply to Email Thread
**Description:** Replies inside an existing conversation, so it stays one thread
in the recipient's mail app rather than arriving as a new message.

## Add to Suppression List (action)

**Label:** Add to Suppression List
**Description:** Stops Lockally sending to an address.

## Remove from Suppression List (action)

**Label:** Remove from Suppression List
**Description:** Lets Lockally send to an address again. Only do this when the
person has asked to hear from you.

## Get a Sent Message (search)

**Label:** Get a Sent Message
**Description:** Looks up an email you sent and reports where it got to: queued,
delivered, bounced, or a spam complaint.

## Get a Suppression (search)

**Label:** Get a Suppression
**Description:** Checks whether an address is on your suppression list, and why.
Returns nothing if the address is free to receive mail.
