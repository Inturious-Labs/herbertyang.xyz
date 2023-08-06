---
title: Investigation of Lost Access to NNS
date: "2021/12/21"
updated: ""
categories:
    - "web3"
excerpt: summary of my investigation of a user's complaint about lost access to NNS that created quite a stir on DFINITY's Dev Forum
coverImage: "/img/investigation.png"
tw_card_type: "summary_large_image"
tw_card_desc: summary of my investigation of a user's complaint about lost access to NNS that created quite a stir on DFINITY's Dev Forum
tw_card_image: "/img/investigation.png"
---

Hi @xiaobing ,

Here’s the memo that summarized what happened. Apologize for the long wait and appreciate your patience.

## Executive Summary

This memo follows up to the original post titled “My NNS has been stolen, Please help me” , that first appeared on Oct 14, 2021 at DFINITY’s official forum by user @xiaobing (hereafter referred to as “OP”) . It’s gathered 99 replies with 1.6K views involving 17 forum users as of Dec 14, 2021, and has caused a lot of anxiety and question marks from the IC community regarding the security measures of the NNS. OP is now planning to submit an NNS proposal to regain access to the neuron he used to own, which has staked 32,000 ICPs for 8 years. This planned proposal, if successfully submitted by OP and adopted by the community, will be the first of its kind for the IC ecosystem, setting up a precedent where the owner of a stolen account tries to recover through decentralized governance. It is drawing a lot of interest and attention from the community. This memo shares the efforts by the DFINITY team to help OP gather facts and the investigation findings from the DFINITY engineering team. It aims to shed some light on the possible causes of this incident. In short, the result from DFINITY’s investigation suggested that:

- This was not caused by any bug in the Internet Computer/ Network Nervous System
- OP’s computer was most likely hacked and the hacker very likely had physical access to his laptop and Yubi-key

## 1. The Stake

OP lost access to his Internet Identity (“II”) account 171674, which has staked 32,000 ICPs in one single neuron for 8 years on the NNS (as of Oct 2021 this was valued at roughly $1.5M). Based on third party explorer ic.rocks 1 and the principle ID OP still keeps, the ICPs are still intact in this neuron - so regardless who now takes control of this neuron, the ICPs locked up in the neuron have not and will not move in the next 7+ years. OP has currently no access to the neuron and it’s not clear who is the current owner.

## 2. The History

OP registered this II account in July. He bought 2 Yubikeys, directly from yubico.com 1. Yubikey is not available in China, so OP had the Yubikeys shipped to Hong Kong and asked a friend to bring them into China. Both Yubikeys are of the same model (likely to be 5C Nano) that can be directly plugged into a laptop.

OP used 3 methods to access this II account including 2 Yubikeys and 1 seed phrase. He used a digital camera (not a cell phone) to take a photo of the seed phrase and hand-wrote it down on a piece of paper. This piece of paper was locked up in a safe.

OP accessed this II account on 4 machines (2 Windows and 2 Macs). There were two known users who had access to this II account, OP and the manager he worked for (hereafter referred to as “`BOSS`”). BOSS is the owner of the company, which has a portfolio of crypto tokens and employs a small team of engineers. It’s beyond the capability of DFINITY to differentiate which specific action was carried out by OP vs BOSS. This memo would assume by default OP was the one that executed all activities mentioned, though in reality OP and BOSS might be the owner of different actions.

On a Friday in August (hereafter referred to as “Incident Day”), all of a sudden OP’s Yubikey no longer worked. OP tried the other Yubikey and the seed phrase. None of them worked. His last successful login was about 2-3 days prior to the Incident Day, on one of the Macs. OP went to DFINITY’s official forum and created the original post on Oct 14.

Initially the NNS could still recognize the II account 171674 and prompted him to use the Yubikey/seed phrase. At some point later, OP found that the error message on NNS had changed. NNS could no longer recognize this II account and would just say “Unknown Identity Anchor” without even prompting him for inserting Yubikey. It seems that whoever is now controlling this neuron has removed all the 4 devices that OP used and also changed the seed phrase.

## 3. The Investigation

`@Fulco` , Support Specialist from DFINITY, tried to help out OP on the forum and maintained a continuous dialogue to help him find recovery solutions. Fulco even created a custom-made script to help him verify the account details. Many other engineers and leaders in DFINITY’s R&D team have been involved behind the scene that led to the eventual conclusion of the investigation.

`@zire (Herbert)` , Director of China Operations for DFINITY, reached out to OP to help. A first phone call between Herbert and OP took place on Oct 20, 2021 where basic facts were gathered and a meeting was arranged in Shanghai for Oct 28, 2021 in DFINITY’s local office. OP and BOSS traveled to Shanghai and attended the meeting with Herbert in person. `@PaulLiu` , Staff Engineer from DFINITY’s R&D team, dialed in via Zoom from the US.

In this first Zoom call (that involved both OP and BOSS), many scattered details mentioned above were confirmed. Additional details worth noting are: 1) OP and BOSS took comprehensive security measures around their office. They appeared pretty tech savvy in terms of handling crypto assets. 2) There was another incident of losing crypto tokens at the end of 2020 in the same office, for a different coin. Based on the description of OP and BOSS, it appeared that the account was not secure in the first place before being given to them. They were using a hardware wallet, but the wallet short-cuited. On the next day the tokens got moved to a Binance account and they couldn’t get it back. Paul pointed out that it might not be caused by a hardware malfunction but sounded like hacking by an insider.

Herbert/Paul let OP/BOSS know that DFINITY would escalate this issue internally and try to deploy engineering resources to see if we could recover the II account’s operation histories from block backups. There could be 3 possible outcomes from this analysis:

- Case A. It shows that their recovery key never matched anything;
- Case B. It shows that their recovery key matched something in the history but later there wasn’t any operation to remove it and somehow it just ended up like this with no more access for OP;
- Case C. It shows that their recovery key matched some record in the history, but later it was replaced.

Case A would call OP/BOSS’ credibility into question out right; Case B would suggest a potential bug in the NNS; and Case C would suggest that, somebody hacked the account, either knowingly or unknowingly, and this person could be just anyone, as far as DFINITY can tell.

During the following few weeks, DFINITY engineers analyzed the history of transactions on the blockchain to understand all changes related to OP’s identity anchor. The conclusion is:

- On Jul 12, an initial recovery phrase was added, as was a second web authentication device “Tiger-backup”.
- Both the initial device and “Tiger-backup” were used frequently until Jul 26.
- On Jul 26, “Tiger-backup” was used to delete the existing recovery phrase and replace it by a new one.
- Both the initial device and “Tiger-backup” were used frequently until Aug 14.
- On Aug 14, the new recovery phrase was used to remove both the initial device and “Tiger-backup”. A new recovery key was also added.
- Since then, there were three sequences of transactions: 1) the recovery phrase was used to add a new device; 2) the new device was used to log into the NNS frontend dapp; 3) the new device was removed right after. The last transaction occurred on Oct 27.

It could be established that:

- Someone is still controlling the II account. There is no data that can pinpoint who that person is.
- The current owner uses the new recovery phrase.
- The new recovery phrase was added from the device “Tiger-backup”
- Case C (from the above) is what happened

On Nov 11, a second Zoom call was arranged among Herbert, Paul, OP and BOSS. All joined the call remotely from their respective offices.

Paul shared the investigation result from the engineering team and let them know that both Case A and B were categorically eliminated. Paul also pointed out that it was highly probable that the person would have physical access to both the laptop AND the Yubikey. Paul/Herbert also highlighted to OP/BOSS that beyond this point, there was nothing more DFINITY, as a technology contributor to the IC ecosystem, could further do to verify who is the rightful owner. Though OP/BOSS would very much want to provide all the paperwork to prove their identities, legitimacy and even transaction history, playing the role of courtroom judge is beyond the scope and responsibility of DFINITY. The NNS is not a court of law and more importantly, DFINITY is not a judge.

OP/BOSS agreed with the result and suggested that this account might be stolen by an insider who used to work for the company. OP/BOSS said they would go back to check the video surveillance. In the meanwhile, OP/BOSS still want to submit an NNS proposal to recover their account. If OP/BOSS can gather enough votes in favor of this proposal, technically speaking this is not entirely impossible. Herbert/Paul also pointed out that, while DFINITY would be happy to provide general technical guidance to OP/BOSS, if the same assistance will be provided to all other IC users fair and square, it cannot be involved in drafting this proposal per se. The proposal would have to be written and submitted by the ICP holder him/herself, not the DFINITY Foundation.

Thank you for reading this long memo. Appreciate your attention to this matter and all the suggestions so far.

---

Here's the [original post that was published to DFINITY's Developer Forum](https://forum.dfinity.org/t/my-nns-has-been-stolen-please-help-me/7896/105?u=zire).