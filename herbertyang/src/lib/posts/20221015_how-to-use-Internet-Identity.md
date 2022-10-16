---
title: 如何使用互联网计算机身份 - Internet Identity
date: "2022/10/15"
updated: ""
categories:
    - "tech"
    - "web3"
    - "chinese"
excerpt: 如何注册并使用基于互联网计算机Internet Computer区块链技术的互联网身份Interet Identity来逐步实现在Web3世界里自己的数据主权
coverImage: "/img/IC_logo_horizontal_black@2x.png"
tw_card_type: "summary_large_image"
tw_card_desc: "如何使用基于互联网计算机Internet Computer区块链技术的互联网身份Interet Identity来逐步实现在Web3世界里自己的数据主权"
tw_card_image: "/img/IC_logo_horizontal_black@2x.png"
---

## 介绍

由总部在瑞士的DFINITY基金会研发开创的互联网计算机代表了最先进的第三代区块链技术，可以将分布于全世界的独立数据中心组合成一个可以无限扩容的虚拟主机，以去中心化的方式为开发者提供存储和算力。自从2021年5月10日主网上线以来，`互联网计算机`("Internet Computer”, 或者 "`IC`")的生态迅猛发展，已经涌现出了几百个去中心化应用，开始逐步颠覆各个互联网传统领域。

要想使用构建在IC这条公链上的应用，首先需要注册一个`互联网身份`("Internet Identity“, 或者"`II`")。在传统中心化互联网平台上，Apple ID, Gmail, Facebook Connect, 支付宝，微信经常被用来验证用户身份，方便新用户登录网站。在IC上，对应的DID ("Digital ID")系统则是II。有了II，就可以解锁IC生态上的所有应用。

## 注册 - 移动设备

在电脑和手机上注册都可以完成注册。建议先在**移动设备**上注册，手机或者iPad都可以。移动设备上完成这个操作会容易很多，因为可以比较方便确认用户是个真人而不是机器人bot。电脑上要做到这一点难度会高很多。互联网发展了30多年，很多服务的功能和真正潜力还无法解锁，就是因为越来越难以区分真人和机器人bot。

我的配置：

- iPhone 13 ProMax (中国购买)
- iOS版本 15.7
- iPhone上的浏览器: Safari 
- MacBook Pro (16-inch, 2019)
- macOS 12.5.1
- MacBook上的浏览器: Chrome 106.0.5249.91

1. 打开一个新的浏览器窗口（不要在微信里打开），键入以下地址：

    [https://identity.ic0.app](https://identity.ic0.app)

    第一次拜访这个网页（包括任何构建在IC上的网页），会看到安装Loading the Service Worker的提示。这是正常系统操作，稍候几秒安转完成后，就会看到网页。

    ![II landing](/img/ii_01_landing.png)

2. 点击 `New? Create an Internet Identity Anchor`

    ![II new anchor](/img/ii_02_create_new_anchor.png)

    在`Device name`里，输入一个目前使用的设备的名称，譬如，`Joe iPhone13 Pro Max`。以后你的II账号里会有多个自己的设备，只要你自己方便识别就行。这个名字目前只能用**英文**，还不支持中文。设备名称的结尾不能使用空格，下划线，和连字符。

    ![II enter device](/img/ii_03_enter_device.png)

3. 点击`Create`，会看到这个界面，iPhone在问你是否愿意通过**Face ID**来完成验证。

    ![II allow FaceID](/img/ii_04_anchor_allow_faceid.JPG)

    点击`Continue`，Face ID验证通过后，手机再次确认是否准备登录到[https://identity.ic0.app](https://identity.ic0.app)。

    ![II sign into II](/img/ii_05_signin_ii.JPG)

4. 点击`Continue`，在下面的界面输入验证码，需要区分大小写

    ![II captcha](/img/ii_06_captcha.png)

    点击`Confirm`，你的`身份地址`Identity Anchor被创建好了。这段话的中文翻译如下，

    > 请记录下你的身份地址。把它写下来，存在合适的地方。以后你会需要它来使用互联网身份或者添加其他设备。如果你失去了`身份地址`，你会无法使用这个身份来验证互联网计算机上的服务

    这个`身份地址`就是你在`互联网计算机`上的**数据身份** ("DID"）了。平时你如何记录各大网站上的登录信息，就用同样的办法把它也记录下来。我是用一个password manager。你也可以考虑用互联网计算机上另外一个去中心化服务[Dstar Notes](https://note.dstar.app)来记录。

    ![II generated](/img/ii_07_created.png)

5. 点击`Continue`，这段话的中文翻译如下，

    > 看起来你在使用iOS上的Safari浏览器。

    > 如果你通过手机的系统设置操作"Clear History and Website Data” ，所有的网站验证秘钥都会被删除。这意味着你将无法在这台设备上使用你的`身份地址`（以及所有它连通的资源和令牌）。

    > 我们建议你通过多台设备来连接到你的身份地址，并且起码添加一个恢复机制，譬如外界的秘钥管理器或者一个助字词。

    ![II recovery](/img/ii_08_recovery.png)

6. 如何添加助字词后文再解释，现在先直接开始使用。点击`Skip, I understand the risks`.

    ![II success](/img/ii_09_success.png)

    恭喜！你已经成功地在Web3上创建了你的个人身份，以后这个身份地址下所有的数据，都完全归你自己所有，不会再被中心化垄断性的互联网公司卖给广告商了。

    这个号码是逐个累加的。它是互联网计算机这个网络上创建的第2,041,257个地址。

## 注册 - 电脑

电脑上注册需要经过的步骤就比较繁琐了，因为电脑上无法使用类似Face ID这样的生物识别技术。

3. 第1步和第2步同上，第3步，在电脑上会看到这个界面。有三个路径来完成身份识别。如果电脑是Mac的话，第三个选项最简单。

    ![II PC](/img/ii_10_pc.png)

    - 3.1 选择`This device`, Mac会跳出一个窗口，让你用Touch ID来做验证

        ![II Touch ID](/img/ii_13_pc_touch_id.jpg)

        完成Touch ID验证后，就到了上述第4步的窗口。剩下的步骤同上。
    
    - 3.2 如果电脑上安装了Yubikey的话，可以选择`USB security key`.

        互联网计算机所用到的加密技术，需要可以支持`FIDO 2`的硬件密钥。市场上最常见的是[Yubico](https://www.yubico.com/)卖的[YubiKey 5 Series](https://www.yubico.com/store/#yubikey-5-series). 我用的是**YubiKey 5C Nano**，平时就把它一直插在MacBook上。

        一旦电脑进入三个选项的窗口，YubiKey就会开始闪绿光

        ![II Yubikey Green](/img/ii_11_yubikey.jpg)

        在YubiKey闪绿光的时候，手指按在YubiKey上。

        ![II YubiKey Press](/img/ii_12_yubikey_press.jpg)

        YubiKey启动闪绿光后，过了大概30秒如果没有受到触摸就停止闪灯了。这个时候再去按，是没有反应的。需要回到上一个步骤，再次进入到第3步的三个选项窗口。

        按过YubiKey后，将会来到同样的第4步。

    - 3.3 如果选择第一个选项`Use phone with a QR code`， 会出现一个二维码

        ![II QR Code](/img/ii_14_qr_code.jpg)

        用手机上的摄像头去扫描，iPhone可以直接对准二维码，扫描后出现这个窗口

        ![II Xcode](/img/ii_15_xcode.jpg)

        这条路径我没有走下去过，太麻烦了，而且没有必要。

到目前为止，互联网地址`2041257`已经可以使用，但是没有任何备份措施。按照互联网身份的设计思路，有两个办法可以加强安全性，添加更多的设备和助字词。

## 添加助字词

登录后的管理页面里，点击`Add Recovery`

![II Seed Phrase](/img/ii_16_seed.jpg)

在移动端用Security Key比较麻烦，这里先略过。选择`Seed Phrase`，进入到下一个界面。

![II Phrase](/img/ii_17_phrase.jpg)

互联网身份上的助字词格式是一行字符串，以身份地址开头，然后是24个简单易记的单词，中间用空格隔开。

⚠️警告⚠️
>
任何人，如果知道了这个助字词，就可以获取这个身份地址相关联的应用和数据。 <br>
最好用一支笔把助字抄在一张纸上，然后把这张纸保存在一个只有你可以接触到的地方，譬如，保险柜。如果条件允许，尽量不要让这个助字词出现在除了这个界面以外的任何互联网平台上。最安全的信息保管方式，就是不要让它接触到互联网。<br>
这个助字词只会出现一次，仅仅出现在这个界面上。一旦点击了`Continue`键，这个助字词就再也看不到了。
>

点击`Continue`，回到初始的管理界面。助字词已经设置完毕。如果有外接的YubiKey，还可以继续添加额外的安全措施。

![II Complete](/img/ii_18_complete.jpg)

界面上显示`Recovery phrase`。点击右边的设置键，打开助字词的管理界面。

![II Seed Options](/img/ii_19_seed_options.jpg)

可以把现有的助字词删掉重新生成。互联网计算机底层的加密技术会确保助字词不可能重合。

## 添加多个设备

作为一个最佳实践，每个身份地址都应该可以通过起码两部设备登录。

假设，上述步骤里设置好的设备是**A**，我们在第二部移动设备**B**里也关联这个身份地址。每个身份地址可以关联最多8部设备。

1. 在设备**A**上

    - 1.1 打开设备**A**的管理界面

        ![II add new device](/img/ii_20_add_new_device.jpg)

    - 1.2 选择`Add new device`。

        ![II warning](/img/ii_21_warning.jpg)

        中文大意如下：

        >
        你正在准备添加一个新的设备。这里添加的任何设备都会获得对这个身份完全的控制权。请仅当你自己亲自掌握新设备的时候才继续以下的操作。<br>
        除了`https://identity.ic0.app`，如果任何其他网站提示你操作以下步骤，请立即停止。
        >

    - 1.3 下面有两个选项，选择`Remote Device`

        ![II remote](/img/ii_22_remote.jpg)

    - 1.4 下面的窗口开始一个**15分钟**的计时器

        ![II timer](/img/ii_28_A_enabled.jpg)

2. 在设备**B**上（也是部iPhone）, 需要在15分钟以内完成以下步骤。

    - 2.1 打开[https://identity.ic0.app](https://identity.ic0.app),

        ![II new device](/img/ii_24_new_device.PNG)

    - 2.2 选择`Already have an anchor but using a new device`. 输入在设备**A**上注册好的身份地址`2041257`. 

        ![II anchor](/img/ii_25_anchor.jpg)

    - 2.3 点击`Continue`, 在空栏里填写设备**B**的名字

        ![II device name](/img/ii_26_device_name.jpg)

    - 2.4 点击`Continue`。如果这时在设备**A**上还没有添加`Remote Device`这个选项的话(**步骤1.4**)，下一步的界面会提示说需要先在设备**A**上完成上述第1步的操作。

        ![II not ready](/img/ii_27_no_ready.jpg)

        如果1.4步已经完成，则会出现下面的界面，一个验证码`508036`随机产生了。

        ![II verification code](/img/ii_29_verification_code.jpg)

3. 回到设备**A**上

    - 3.1 原先步骤1.4里的窗口会自动更新，成为这个样子

        ![II ready](/img/ii_30_verify.jpg)

    - 3.2 在`Verification Code`的空栏里，填写在2.4里获得的验证码`508036`。

        点击`Verify Device`
    
    - 3.3 自动回到初始管理界面，显示设备**B**已经被成功添加。如果登录到设备**B**的管理界面，也会看到一模一样的信息。

        ![II All Set](/img/ii_31_all_set.jpg)

⚠️警告⚠️

>
身份地址关联的设备越多，可以带来更多便利，但风险也会更高。任何一部设备如果落入他人之手，都可以掌握身份地址。<br>
安全的核心关键在于身边可以直接控制的硬件。所有跟网络相连的端口都不足以安全。如果你身边的硬件被其他人控制，那就不是软件或者加密技术可以解决的问题了。
>

## FAQ

- 为什么在微信里打开II的网址就不可以？
    > 微信里点击链接，打开的窗口其实仍然是封装在微信里面，很多互联网的基本功能和服务是无法使用的。腾讯不希望自己的用户去其他地方，希望大家老老实实呆在铁屋子里就好。
- 什么是Loading Service Worker?
    > 这是互联网计算机区块链的底层技术在首次访问本网页的设备上安装必要的启动程序。
- 为什么整个过程没有用到密码？
    > 互联网身份的机制里不需要用户记住自己的密码。（常规意义上的）密码，使用在任何网站上都会带来安全隐患。互联网身份的验证通过用户直接控制的硬件里储存的私钥来完成。
- 这个`https://identity.ic0.app`网站有自己的app吗？
    > 没有，也没有这个必要。在互联网计算机的世界里，我们尽量避免使用App Store或者Google Play Store这种中心化的平台。
- 注册II需要花钱吗？
    > 不需要。注册II是完全免费的。
- 我可以注册多少个身份地址Internet Anchor？
    > 用户可以注册任意数量的身份地址。
- 我的身份地址Internet Anchor会被公开的吗？
    > 通常不会。在互联网计算机用户之间的交流中（譬如，互相转发ICP），不会用到身份地址（而是第三方的钱包地址）。在各大社交应用中，会展示用户自己选取的用户名，不会展示相关联的身份地址。
- 如何恢复身份地址的关联
    >
    即使关联的所有设备都被删除了，只要助字词还有效，就可以恢复账号的关联。<br>
    如果助字词忘记或者失效了，只要有一部设备可以访问身份地址，就可以恢复其他设备的关联并且重新设置助字词。<br>
    如果所有设备都被删除，而且助字词也被篡改（被他人重置），这个账号就被黑掉了，再也无法恢复。
    >
- 身份地址可以像域名或者QQ号一样买卖吗？
    > 有互联网计算机社区里的第三方平台可以买卖身份地址 [II Market by Dstar](https://ii.dstar.app)。

## 声明

这个攻略是我为身边的朋友家人所写，不代表DFINITY基金会的所谓“官方版本”。最终如何使用II服务的解释权归DFINITY基金会和IC社区。如果对这个攻略有任何建议或者反馈，欢迎[联系我](/contact)，我们一起改进它。