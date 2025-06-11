---
title: Home Assistant backup to Synology NAS
category: project
tags:
 - home-assistant
 - home-automation
 - backup
images:
 feature: /assets/images/disc-backup-hero.jpg
 height: null
description: Regularly backing up your Home Assistant configuration is critical to protecting your smart home deployment. This article explains how to back up your Home Assistant to a NAS.
date: 2023-07-17
---

**Update**: With the first two 2025 releases, there were some new features for Home Assistant backups. I have summarised these in [a new article](/home-assistant-backup-2025/). However, the NAS backup steps in this article are of course still valid.

---

Okay, I don't think I need to go into detail about why having a solid backup strategy for your [Home Assistant](https://www.home-assistant.io/) solution is important. So I'll write about how to set it up. I've wanted to set up the backup of my Home Assistant installation properly for months. Now that I've finally tackled this task, I thought I'd summarize the steps I took.

I'm [running Home Assistant on an Odroid N2](/jama-villa/), and I'm well aware that frequent writes can shorten the lifespan of memory cards. In general a higher quality SD card typically will last longer and can hold multiple years. We also have to consider the entire system, not only Home Assistant itself, but also all add-on like MQTT broker etc. Although this concern primarily applies to SD cards, I wanted to be cautious with the Odroid N2 and its MMC memory.

Until now, I've been creating weekly backups directly on the local disk of my Home Assistant server. Later, I manually transferred these backups to our NAS system at more or less regular intervals. Unfortunately, the memory card has filled up multiple times, forcing me to delete older backups.

I previously experimented with syncing backups on Dropbox and Google Drive, but wasn't really happy with these options either.

However, with the release of Home Assistant 2023.6, native support for mounted network storage was introduced. This feature allows connecting Home Assistant to Windows/Samba (CIFS) or Network File Share (NFS) network shares within the local network. These network shares can serve as media folders or external backup storage.

Now, it's time for me to give it a try and establish a robust backup strategy.

## Home Assistant backup to network storage

In my case I connected Home Assistant to our [Synology NAS](https://www.synology.com/en-us/dsm/solution/what-is-nas/for-home). The setup steps are pretty well [documented](https://www.home-assistant.io/common-tasks/os/#network-storage) for the Home Assistant part, however the NAS or file server part is always a little more tricky and different. I'll explain how to configure a network share hosted on the Synology NAS as the main backup location for Home Assistant. This will work with other NAS systems (like QNAP) or file servers as well, but might require some different configuration steps to enable the file share.

## Setup step by step

With the following step by step you should have no problem to set up your own Home Assistant backup to a network share.

### 1. Create a Shared Folder

In order to get started, you must create a shared network folder on your NAS. Go to _Control Panel_ > _Shared Folder_ and click _Create_. Enter a name for the shared folder (such as "Home Assistant Backup") and select a location. The location options depend on the NAS setup. I only have _Volume 1_.

![screenshot 1](/assets/images/ha-backup-screenshot-1.png 'Screenshot 1: configuration of Synology Shared Folder'){class="x-small"}

Do not enable the recycle bin feature. Click _Next_.

On the next screen leave the option at _skip_. Don't configure any encryption for the backup folder. You can choose to secure you backup with a password later in Home Assistant.

Click _Next_. Don't change anything on the advanced setups and click _Next_ again.

Review the settings and click _Next_ to create the shared folder.

![screenshot 2](/assets/images/ha-backup-screenshot-2.png 'Screenshot 2: configuration of Synology Shared Folder'){class="x-small"}

Review the access permissions and click _Apply_.

### 2. Enable NFS access

In this step we will enable NFS file services on the Synology NAS. This step is only needed if not done before during the initial NAS system setup.

In your Synology UI go to _Control Panel_ > _File Services_ and select the _NFS_ tab. If not already checked select the _Enable NFS Service_ checkbox. The screen should look like this:

![screenshot 3](/assets/images/ha-backup-screenshot-5.png 'Screenshot 3: enable NFS services on Synology NAS'){class="x-small"}

### 3. Make the shared folder accessible via NFS

In the next step we need to enable NFS access and allow Home Assistant to use the newly created network share. I decided to proceed with NFS. CIFS shares are supported by Home Assistant as well, however I could not get it working with my Synology setup.

Select the newly created shared folder from the _Shared Folder_ list in the Control Panel and click _Edit_.

In the dialog navigate to the _NFS Permissions_ tab and click _Create_. In the dialog enter the hostname or IP address of your Home Assistant machine.

![screenshot 4](/assets/images/ha-backup-screenshot-3.png 'Screenshot 4: set up NFS Permissions for shared folder'){class="x-small"}

Click _Save_.

Copy and note down the mount path at the bottom of the _NFS Permissions_ tab.

![screenshot 5](/assets/images/ha-backup-screenshot-4.png 'Screenshot 5: set up NFS Permissions for shared folder'){class="x-small"}

Click _Save_.

### 4. Connect the shared folder in Home Assistant

Let's switch to Home Assistant and connect to the recently created shared folder on your Synology NAS.

Go to _Settings_ > _System_ > _Storage_ in Home Assistant. In the Network storage section you can see all connected network shares. This list might be empty if you have never connected to network storage before.

Click _Add Network Storage_ button.

In the dialog:

- enter a name, like "HomeAssistantBackup"
- select _Backup_ from the _Usage_ category
- enter the NAS server hostname or IP address
- select _Network File Share (NFS)_ as the protocol
- in the remote share field enter the NFS share mount path you copied in step 3

![screenshot 6](/assets/images/ha-backup-screenshot-6.png 'Screenshot 6: Home Assistant Network Storage configuration'){class="x-small"}

Click _Connect_.

Home Assistant will not bind the network share and if everything was correct you should see the new network storage in the list of the _Network storage_ section.

If you try to use the CIFS protocol you need to provide a username & password plus the CIFS share name to connect.

### 5. Change the default backup location

Once the network share is set up, we only need to change the backup location where Home Assistant stores backups.

Go to _Settings_ > _System_ > _Backups_ in the Home Assistant UI. In the right top corner menu select _Change default backup location_. In the pop-up dialog select the new backup location and click _Save_.

![screenshot 7](/assets/images/ha-backup-screenshot-7.png 'Screenshot 7: Home Assistant Network change default backup location'){class="x-small"}

That's it, the next time a backup is created it will be stored on the NAS network share.

### 6. List the backups

There are three options to list the backups stored on our NAS:

1. In Home Assistant, navigate to _Settings_ > _System_ > _Backups_. You will get a list of all backups. In the _Location_ column you can see where these are stored.
2. Via Home Assistant CLI run `ha backup list` to see all the backups. The result also contains a _location_ attribute for each backup. Also note the _slug_ attribute. This maps to the NAS file share filename.
3. On our NAS we can simply check the shared folder contents. Each backup is stored as one .tar file. The filename maps to the _slug_ attribute in Home Assistant.

Example:

```yaml
backups:
 - compressed: true
   content:
    addons:
     - a0d7b954_ssh
     - core_mosquitto
     - a0d7b954_adguard
     - core_samba
     - a0d7b954_vscode
     - 15ef4d2f_esphome
    folders:
     - share
     - addons/local
     - ssl
     - media
    homeassistant: true
   date: '2023-07-16T11:23:21.072157+00:00'
   location: BackupShareNAS
   name: Backup_16-07-2023
   protected: false
   size: 216.67
   slug: c528818e
   type: full
 - compressed: true
   content:
    addons:
     - a0d7b954_ssh
     - core_mosquitto
     - a0d7b954_adguard
     - core_samba
     - a0d7b954_vscode
     - 15ef4d2f_esphome
    folders:
     - share
     - addons/local
     - ssl
     - media
    homeassistant: true
   date: '2023-07-08T18:00:00.304439+00:00'
   location: null
   name: Backup_08-07-2023
   protected: false
   size: 224.17
   slug: 39b2baaf
   type: full
days_until_stale: 30
```

## Conclusion

Regularly backing up your Home Assistant configuration is crucial to protect your smart home deployment. While Home Assistant has offered that capability for years to backup to a local disk/memory card then transfer it to external storage afterwards - it is not very reliable. By utilizing a network share as backup storage you add an extra layer of security to your backup strategy. With these steps in place, you can rest assured that your Home Assistant configuration is safe and easily recoverable in case of unforeseen events.

Happy automating!

Hero image from <a href="https://unsplash.com/@filmlav?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fernando Lavin</a> on <a href="https://unsplash.com/de/fotos/RxHCRDO0psE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
