---
title: Top up cycles for ic canisters
description: How to add more cycles to power canister smart contract running on Internet Computer when the balance is running low
image: './img/dont-panic.jpg'
keywords: [IC, Internet Computer, DFINITY, 互联网计算机, canister, smart contract, cycles, top-up]
---

import Donation from '../../../donation.md';

# Top Up Cycles for Canister on IC

Cycles is the native stablecoin for Internet Computer Protocol ("ICP") that measures the usage of computation resources in a canister smart contract including data storage and update calls (query calls are currently free). To ensure your website/Dapp can keep up and running, you need to top up cycles into the canister that hosts the website/Dapp regularly, in the same fashion that you would need to pay the bill to AWS/Digital Ocean every month in the Web2 era. 

## Page failed To load

One day, you see this on your website hosted on IC with a "Page failed to load" error. Ops!

![failed to load](./img/fail-to-load.png)

:::note
Do not panic
:::

Open up the Developer Console from your browser for the detailed error messages.

```bash
Error: Call failed:
  Canister: hbc6w-gqaaa-aaaag-aagdq-cai
  Method: http_request (query)
  "Status": "rejected"
  "Code": "CanisterError"
  "Message": "IC0501: Canister hbc6w-gqaaa-aaaag-aagdq-cai is unable to process query calls because it's frozen. Please top up the canister with cycles and try again."
    at actor.js:158:27
    at async Oe (utils.ts:110:13)
    at async Gr.assetRequestHandler (index.ts:84:19)
    at async Gr.perform (index.ts:36:19)
```

So the canister `hbc6w-gqaaa-aaaag-aagdq-cai` has insufficient cycles.

## Check canister's cycles balance

In Terminal window, go to the root directory of the dfx code that has `dfx.json` file.

```bash
cat canister_ids.json
{
  "hyxyz": {
    "ic": "hbc6w-gqaaa-aaaag-aagdq-cai"
  }
}
```

This is the ID of the canister where cycles balance is running low. Check its balance on the ic network. 

```bash
dfx canister --network=ic status hbc6w-gqaaa-aaaag-aagdq-cai
Error: Failed to get canister status for 'hbc6w-gqaaa-aaaag-aagdq-cai'.
Caused by: Failed to get canister status for 'hbc6w-gqaaa-aaaag-aagdq-cai'.
  Failed to get canister status of hbc6w-gqaaa-aaaag-aagdq-cai.
    Failed to call update function 'canister_status' regarding canister 'hbc6w-gqaaa-aaaag-aagdq-cai'.
      Update call (without wallet) failed.
        The replica returned an HTTP Error: Http Error: status 503 Service Unavailable, content type "text/plain", content: Canister hbc6w-gqaaa-aaaag-aagdq-cai is out of cycles: requested 1_316_000 cycles but the available balance is 70_136_530_232 cycles and the freezing threshold 84_697_292_220 cycles
```

So for this canister `hbc6w-gqaaa-aaaag-aagdq-cai` with all the files and update calls, its freezing threshold is currently `84_697_292_220` cycles. If cycles are lower than this, the canister will become frozen and inaccessible.  The remaining balance of the canister is only `70_136_530_232` cycles. So, it's time to top up. It looks like we need at least additional 15 billion cycles. 

## Top up cycles

Find out how much cycles you have in the cycles wallet that is connected to this canister. It has 2.174 trillion cycles.

```bash
dfx wallet --network=ic balance
2.174 TC (trillion cycles).
```

Let's top up 15 billion cycles.

:::tip
9 zeros make a billion
:::

```bash
dfx canister --network=ic deposit-cycles 15000000000 hbc6w-gqaaa-aaaag-aagdq-cai
Depositing 15000000000 cycles onto hbc6w-gqaaa-aaaag-aagdq-cai
Deposited 15000000000 cycles, updated balance: 85_117_545_244 cycles
```

Verify that the cycles wallet's new balance is 15 billion cycles less.

```bash
dfx wallet --network=ic balance
2.159 TC (trillion cycles).
```

## Verify balance

After depositing another 100 billion cycles, check the new balance of the canister. All systems `Go` now.

```bash
dfx canister --network=ic status hbc6w-gqaaa-aaaag-aagdq-cai
Canister status call result for hbc6w-gqaaa-aaaag-aagdq-cai.
Status: Running
Controllers: iyr2m-aiaaa-aaaag-aaa2q-cai lwhis-d5gpt-zbgse-qdivc-jmt5p-smhdq-h2dbt-vbh7x-h4g4d-tyg2x-zqe yxaiy-ge4x3-xwdqi-r5kim-46lbl-52ulu-46sx7-hzhev-mrsqr-mvygl-eae
Memory allocation: 0
Compute allocation: 0
Freezing threshold: 2_592_000
Memory Size: Nat(276268060)
Balance: 185_090_349_536 Cycles
Module hash: 0x98863747bb8b1366ae5e3c5721bfe08ce6b7480fe4c3864d4fec3d9827255480
```

## Other top-up methods

Other methods can be found in [DFINITY team's documentation on topping up canister](https://internetcomputer.org/docs/current/developer-docs/production/topping-up-canister/#topping-up-a-canister-with-dfx).

Also [ninegua](https://www.thev.net/PaulLiu/) has created a [Canister Tip Jar DApp](https://k25co-pqaaa-aaaab-aaakq-cai.ic0.app/) (tipjar.rocks) where anyone can donate cycles to a third-party canister if that canister has a blackhole controller. It's pretty neat.

<Donation />