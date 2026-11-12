# Lockally

Lockally is business email on your own domain, with a sending API in the same account. This app lets your scenarios send email from your own Lockally addresses, and start a scenario when mail arrives or when mail you sent is delivered, bounces or is reported as spam.

## What you need

- A Lockally account with your domain set up. You can start free at [lockally.com](https://lockally.com).
- An API key from the Lockally console.
- To use **Watch Events**, a paid Lockally plan. Every other module works on any plan that includes API access.

## Connect Lockally to Make

1. Sign in to the Lockally console and open **API keys**.
2. Create a key and give it the permissions your scenarios need:

   | To do this | The key needs |
   |---|---|
   | Send email, with or without a template | `send:write`, plus `templates:read` for templates |
   | Look up a sent message | `send:read` |
   | Watch events | `webhooks:read` and `webhooks:write` |
   | Watch new mail, or choose a mailbox | `inboxes:read` |
   | Reply in a thread | `inboxes:write` |
   | Add, remove or look up suppressions | `suppressions:read` and `suppressions:write` |

3. To watch new mail or reply in a thread, grant the key the mailboxes it should use, on the key's own page in the console. A key only sees the mailboxes it has been granted. A mailbox also needs agent access switched on to appear in the **Mailbox** list.
4. Copy the key. It starts with `lk_live_` and is shown only once.
5. In Make, add any Lockally module, click **Create a connection**, and paste the key into **API key**.

## Modules

**Triggers**

- **Watch Events:** starts a scenario when new mail arrives, or when mail you sent is delivered, bounces or gets a spam complaint. Turning the scenario on creates the webhook in Lockally, and turning it off removes it.

**Actions**

- **Send Email:** sends from one of your own addresses, with CC, BCC, attachments and an optional scheduled send time.
- **Send Email from Template:** sends a saved Lockally template and fills in its placeholders.
- **Reply to Email Thread:** replies inside an existing conversation, so it stays one thread for the recipient.
- **Add to Suppression List:** stops Lockally sending to an address.
- **Remove from Suppression List:** lets Lockally send to an address again. Only do this when the person has asked to hear from you.

**Searches**

- **Get a Sent Message:** shows where an email you sent got to: queued, delivered, bounced or a spam complaint.
- **Get a Suppression:** checks whether an address is on your suppression list, and why. It returns nothing when the address can receive mail.

## Good to know

- Each send counts toward your plan's monthly sending allowance. The allowance for each plan is on [lockally.com/pricing](https://lockally.com/pricing/).
- If a module says the key is missing a permission, edit the key in the Lockally console under **API keys** and add it. You don't need to create a new key.

## Help

- API documentation: [developers.lockally.com](https://developers.lockally.com)
- Support: support@lockally.com
