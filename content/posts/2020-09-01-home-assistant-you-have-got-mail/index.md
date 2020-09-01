---
title: "Home Assistant: You have got mail"
author: Markus
date: 2020-09-01
hero: images/you-ve_got_mail_-2685196800-.jpg
---
Today I want to share a little holiday project I build this week: a mailbox sensor notifying us if we got new mail. Including a reminder to empty the mailbox in case we forgot about that.

## How does it work?

The project is build using two Xiaomi ZigBee contact sensors I had leftover. Our smart home setup <link> already has a ZigBee network running using a Conbee II stick. Of course, it is integrated with Home Assistant already.

<zeichnung>

## The hard(ware) part

Devices needed for this project:

* 2 ZigBee contact sensors (e.g. Xiaomi…)
* ZigBee network (for example via Deconz)
* Home Assistant
* Duck tape, hot glue, etc. 

The setup depends a little on the construction of the actual mailbox. Ours has a flap on the front side where the mail is thrown in and a door on the backside to empty it. So I needed two sensors, one to detect if the mail was inserted and a second one to detect when we cleared the mailbox. For a mailbox with just one door or flap, only one sensor would be needed. Our mailbox is made of metal, like most mailboxes here, built into a concrete column. I first thought having a metal frame like this might be problematic with the ZigBee signal but that is not the case.

For a first prototype, I just duck taped the sensor inside the mailbox. The door the original magnet was too small so I replaced it with a bigger one.

<foto>
https://www.flickr.com/photos/8058853@N06/2685196800

## The fun part

With the hardware part assembled we can now have a look at the software part. Since our ZigBee network was already running it was easy to connect the two new sensors via the Deconz UI.

<screenshot>

With Deconz integrated into Home Assistant the new sensors are immediately available in Home Assistant as well. Adding some ZigBee sensors to Home Assistant - pretty easy.

The third step is to build out the automations. I’m still having all automations in YAML, so the mailbox automations are added here as well. For the mailbox sensor three automations are needed:

1. set the mailbox state if the mail was inserted
2. Reset the mailbox state once we have cleared the mailbox
3. Reminder in case we forgot to empty the mailbox in the evening

The reminder automation is also very simple. At a certain time it checks the mailbox state and sends us a reminder in case there is still mail in the mailbox. We decided to have two reminders: first at 6 pm, second at 8pm.

<code>

That is, not much needed for this little fun project. Our complete Home Assistant config can be found at GitHub.