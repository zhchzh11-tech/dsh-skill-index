# Chapter 6: Practical Application

## Core Idea
Because JailbreakScope's findings are model-agnostic and attack-agnostic, they translate into general-purpose jailbreak monitoring/detection and precise, minimally invasive alignment — at both inference time and training time.

## Frameworks Introduced
- **Representation & Circuit Joint Detection**: a lightweight runtime detector combining a safety probe (representation signal) with circuit monitors (S⁺/S⁻ activation patterns).
  - When to use: to catch jailbreaks robustly, including unseen strategies.
  - How: static phase — screen each prompt pre-generation for abnormally safe representations AND abnormal circuit patterns; block if both align suspiciously. Dynamic phase — monitor representation drift and circuit activations at each decoding step to catch "refusal-first, harmfulness-later" jailbreaks that evade static checks.
- **Precise & Targeted Alignment**: use fine-grained component localization to intervene only on the small, consistent set of attention heads/MLP layers where safety fails.
  - When to use: when you need to restore safety without degrading general capabilities.
  - How (inference-time): inject steering vectors derived from refusal representations to counteract jailbreak manipulation at runtime. (training-time): selectively fine-tune only the identified safety-failure components instead of full-model fine-tuning — lower cost and overfitting.

## Key Concepts
- **Dual-signal screening**: representation signal + circuit signal evaluated jointly.
- **Steering vectors**: internal-direction vectors derived from refusal representations, injected to guide the model toward refusal.
- **Selective alignment fine-tuning**: optimizing only the small parameter subset associated with safety failures.

## Mental Models
- Use **"monitor both signals"** — a jailbreak is a coordinated representation + circuit event; single-signal detection misses borderline cases.
- Use **"surgical intervention"** — a few consistent components cause most safety failures; fix those, not the whole model.

## Anti-patterns
- **Static detection only**: misses progressive "refusal-first" attacks that pass the pre-token screen.
- **Full-model fine-tuning for alignment**: costly and overfit-prone when only a small subset of components is responsible.

## Key Takeaways
1. Two signals (representation deception + circuit shift) give robust, generalizable jailbreak detection.
2. Monitor at every decoding step to catch evasion and "refusal-first" regimes.
3. Localize the small consistent safety-failure set to enable precise steering and selective fine-tuning.
4. Steering vectors and selective tuning restore safety while preserving general capability.

## Connects To
- **Ch 4–5**: detection and alignment leverage the S⁺/S⁻ localization and correlation findings.
- **Ch 7**: notes these insights could also inform new attacks (dual-use concern).
