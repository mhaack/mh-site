---
title: Home Assistant Backup in 2025
category: project
tags:
  - home-assistant
  - home-automation
  - backup
images:
  feature: /images/disc-backup-2025-hero.jpg
date: 2025-02-23
permalink: home-assistant-backup-2025/
---
Two years ago, I wrote about [backing up Home Assistant to a Synology NAS](/home-assistant-backup-to-synology-nas/) using NFS shares. While that method still works, the Home Assistant team has gone all-in on backups and massively improved Home Assistant's native backup capabilities with the [2025.1](https://www.home-assistant.io/blog/2025/01/03/release-20251/) and [2025.2](https://www.home-assistant.io/blog/2025/02/05/release-20252/) releases. I have already adjusted my backup configuration. Let's explore what's new and why you should update your approach. 

The Home Assistant team calls the now backup strategy: [3…2…1… Backup](https://www.home-assistant.io/blog/2025/01/03/3-2-1-backup/). This means a solid backup strategy follows the 3-2-1 rule:

- 3 copies of your data
- 2 stored on different media
- 1 kept off-site

The recommendation is to backup regular and frequently. IMHO once a week is a good rule of a thumb. Keep backups at different locations. If you house burns down or a lightning strike you local and NAS backup could be extinguished. To be prepared for this, I synchronise important data from our NAS to the cloud (AWS S3 in our case). With the new cloud backup destinations, this can now be done directly from Home Assistant.

## Upgrade your backup strategy with Home Assistant's 2025 features.

Let's have a quick look at them together, and then I'll give you step-by-step instructions on how to configure a backup from Home Assistant 2025 onwards.

* **Easy Setup**
  The Home Assistant team has spent a lot of time making the experience as simple as possible. A new automatic backup configuration can be created with just 3 clicks.

* **Cloud Storage**
  Automatic backups can be saved locally or off-machine. For Home Assistant subscribers, these can be stored directly in Home Assistant Cloud. Network shares will of course continue to work. Other cloud backup options include [Google Drive](https://www.home-assistant.io/integrations/google_drive/) and [Microsoft OneDrive](https://www.home-assistant.io/integrations/onedrive/) and there will be more (cloud) backup locations in the future.

* **Encryption**
  Backups to the Home Assistant Cloud are now secure and encrypted by default. For local backups to your NAS, you can choose to store them encrypted or unencrypted.
  
* **Scheduling and Retention**
  The new automatic backup also makes it easier to keep an overview. You can flexibly set when and how often the backup should run and how many versions should be kept.

## Native backups to the place of your choice

Home Assistant 2025.2 eliminates the need for plugins such as Samba Backup or Google Drive add-ons. The update introduced native integrations for 

- Synology NAS via DSM
- Google Drive
- Microsoft OneDrive

The integrations for these have been updated and are ready for the new automatic backups. This gives Home Assistant users who are not subscribed to Home Assistant Cloud many alternative cloud storage or local storage options.

You can also combine locations for 3-2-1 protection – I store weekly backups on my Synology NAS *and* Home Assistant Cloud simultaneously. Here I keep the last 3 backups. Additionally I create a backup on every Home Assistant update, just in case.

## From 0 to data protection in 90 seconds

Setting up the new automatic backup does not take much time.

1. Navigate to **Settings → System → Backups**  
2. Click **Set Up Backups**  
3. A **new encryption key** will be created the first time, please make a note of it. Store it in a password manager!  
4. Click **Next**
5. Select **Recommended Settings**

Done - Home Assistant will create your first backup for you.

{% image "/images/ha-backup-screenshot-2025-1.png", "screenshot 1", "x-small", "Screenshot 1: Home Assistant Backup" %}

To save a backup of our system in the cloud, just a few clicks are necessary. In the **Backup settings** area, click on the last menu item for the backup locations. 

{% image "/images/ha-backup-screenshot-2025-2.png", "screenshot 2", "x-small", "Screenshot 2: Home Assistant Backup Locations" %}

The local backup should already be displayed here. In my case, I have already moved this to the NAS as storage space. Cloud storage locations can now also be selected here for the backup.

Depending on your configuration, several backups will accumulate over time. Click 'Show all backups' to view all backups.

{% image "/images/ha-backup-screenshot-2025-3.png", "screenshot 3", "x-small", "Screenshot 3: Home Assistant - My Backups" %}

Which locations are displayed here depends on the installed integration [Google Drive](https://www.home-assistant.io/integrations/google_drive/),  [Microsoft OneDrive](https://www.home-assistant.io/integrations/onedrive/) and [Synology DSM](https://www.home-assistant.io/integrations/synology_dsm/#backup-location). And whether you have a Nabu Casa subscription or not.

Some of the integrations - for example Synology - are not automatically configured as a backup target and must be set up separately. See the integration documentation for more information. If you want to store your backup on a Synology NAS, please have a look at [my first article](https://markus-haack.com/home-assistant-backup-to-synology-nas/). The configuration steps on the NAS are exactly the same and still apply.
## Flexible Encryption

Home Assistant 2025.1 introduced automatic encryption of all backups. While encryption is still the default, you can now disable it on a per location basis. 

Why disable? Unencrypted local or NAS backups allow direct file recovery without Home Assistant. This can be useful in some cases. However, cloud backups will always remain encrypted for security.

## Precision Scheduling & Smart Automation  

Automatic backups allow a very flexible setting of when - day & time - a backup should be created. The retention period can also be set individually.

In my case, I have a backup created at the weekend, every Saturday at 4.45am. The days, frequency and even the backup time can be set to suit your needs. Retention can be configured based on the number of backups you want to keep or the number of days you want to keep them.

If the recommended settings to not fit go to: **Settings → System → Backups**  and select the first option in the **Backup settings** area. This will bring you to the automatic backups options which can be flexibly adjusted here.

{% image "/images/ha-backup-screenshot-2025-4.png", "screenshot 4", "x-small", "Screenshot 4: Home Assistant Automatic Backup Options" %}

## Conditional Backups via Automation  

In addition to all the automatic backup settings, you also have the option of creating backups manually or using automation.

This makes sense, for example, if a fixed schedule cannot be used because, for example, the NAS server is switched off at night. Home Assistant provides the `backup.create_automatic` action for automations.

With the help of a simple automation, you can start the creation of a backup for a specific backup destination. The following sample automation trigger backups when your NAS is awake:  

```
automation:
  - alias: "Backup Home Assistant 5 min after NAS is online"
    triggers:
      - trigger: state  
        entity_id: binary_sensor.nas_online  
        to: "on"
        for:
          hours: 0
          minutes: 5
          seconds: 0
    actions:
      - alias: "Create backup now"
        action: backup.create_automatic
```


## Disaster Recovery Protocol 

Just as important as the regular creation of backups is the restoration. This should also be tested regularly.

This is somewhat more time-consuming and annoying to accomplish. Nobody wants to mess around with their production system. That's why you need a second piece of hardware to test the restore procedure. I use a Raspberry Pi that I still have lying around. Here I test the restore flow using my backups stored on our NAS. Unfortunately, the whole thing is quite time-consuming and I admit I should actually test it more often. Fingers crossed the Home Assistant backups are ok and not defective.

## Final Thoughts: Backups Are Boring Until They’re Critical  

Let me summarise what has changed and improved compared to [my first Home Assistant backup article](https://markus-haack.com/home-assistant-backup-to-synology-nas/) in the following table.

| Feature              | 2023 Approach                               | 2025 Approach                                      |
| -------------------- | ------------------------------------------- | -------------------------------------------------- |
| **Backup Locations** | Local or NAS<br>Additional only via Add-ons | Local, NAS & Cloud Backup built-in                 |
| **Encryption**       | n/a                                         | Per-Location Toggle, Mandatory for Cloud locations |
| **Trigger**          | Via Automation                              | Auto-Triggered, Via UI, Via Automation             |
| **Action**           | `hassio.backup_full`                        | `backup.create_automatic`                          |

Home Assistant's 2025 backup tools have matured. With all the new features and configuration options, there is no excuse for not backing up your system. It's easier than ever before. 

Define your backup strategy today – your future self will thank you when the SD card fails at 2 AM.  





