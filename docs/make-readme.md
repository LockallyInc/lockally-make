# Lockally

Lockally is business email on your own domain, with a sending API in the same account. This app lets your scenarios send email from your own Lockally addresses, and start a scenario when mail arrives or when mail you sent is delivered, bounces or is reported as spam.

## What you need

- A Lockally account with your domain set up. You can start free at [lockally.com](https://lockally.com).
- An API key from the Lockally console.
- To use **Watch events**, a paid Lockally plan. Every other module works on any plan that includes API access.

## Connect Lockally to Make

1. Sign in to the Lockally console and open **Tokens**.
2. Create a key and give it the permissions your scenarios need:

   | To do this | The key needs |
   |---|---|
   | Send email, with or without a template | `send:write`, plus `templates:read` for templates |
   | Look up a sent message | `send:read` |
   | Watch events | `webhooks:read` and `webhooks:write` |
   | Watch new mail, or choose a mailbox | `inboxes:read` |
   | Reply in a thread | `inboxes:write` |
   | Add, remove or look up suppressions | `suppressions:read` and `suppressions:write` |

3. To watch new mail or reply in a thread, grant the key the mailboxes it should use: open **API Keys** in the console, find the key, and add each mailbox under **Mailboxes**. A key only sees the mailboxes it has been granted, and with none granted it sees none. A mailbox with agent access turned off, or with end-to-end encryption, cannot be granted, and the console says why.
4. Copy the key. It starts with `lk_live_` and is shown only once.
5. In Make, add any Lockally module, click **Create a connection**, and paste the key into **API key**.

## Modules

**Triggers**

- **Watch events:** starts a scenario when new mail arrives, or when mail you sent is delivered, bounces or gets a spam complaint. Turning the scenario on creates the webhook in Lockally, and turning it off removes it.

**Emails**

- **Send an email:** sends from one of your own addresses, with CC, BCC, attachments and an optional scheduled send time.
- **Send an email from a template:** sends a saved Lockally template and fills in its placeholders.
- **Reply to an email thread:** replies inside an existing conversation, so it stays one thread for the recipient.
- **Get a sent message:** shows where an email you sent got to: queued, delivered, bounced or a spam complaint.

**Suppressions**

- **Add to suppression list:** stops Lockally sending to an address.
- **Get a suppression:** checks whether an address is on your suppression list, and why. It always returns one bundle; **Suppressed** is false when the address can receive mail.
- **Remove from suppression list:** lets Lockally send to an address again. Only do this when the person has asked to hear from you.

**Other**

- **Make an API call:** calls any Lockally API endpoint with your connection, for anything the other modules do not cover.

## Good to know

- Each send counts toward your plan's monthly sending allowance. The allowance for each plan is on [lockally.com/pricing](https://lockally.com/pricing/).
- If a module says the key is missing a permission, create a new key with that permission on the **Tokens** page of the Lockally console, then update your Lockally connection in Make with the new key. A key's permissions cannot be changed after it is created. If the old key had mailboxes granted, grant them to the new key too, under its **Mailboxes** on the **API Keys** page.

## Help

- API documentation: [developers.lockally.com](https://developers.lockally.com)
- Support: support@lockally.com
