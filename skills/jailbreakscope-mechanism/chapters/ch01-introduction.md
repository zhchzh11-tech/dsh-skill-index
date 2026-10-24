# Chapter 1: Introduction

## Core Idea
LLM jailbreaks succeed by exploiting flaws in safety alignment, but prior interpretability studies are too narrow — they cover few attack types, study representation and circuit in isolation, and are static. JailbreakScope addresses all three gaps with a unified dual-perspective framework.

## Frameworks Introduced
- **JailbreakScope (dual-perspective interpretation)**: an interpretation framework that jointly analyzes jailbreaks from representation level (how harmfulness perception is distorted) and circuit level (how safety-critical components are manipulated), tracking both token-by-token across the whole generation.
  - When to use: when you need a generalizable, mechanism-level explanation of why diverse jailbreak attacks succeed across different models.
  - How: (1) representation probing → quantify deception; (2) model-behavior circuit → localize S⁺/S⁻ components; (3) interpretation aggregation → correlate and track evolution.

## Key Concepts
- **Jailbreak attack**: adversarial prompt crafted to bypass safety alignment and elicit harmful responses.
- **Five jailbreak categories (JailbreakZoo)**: gradient-based, evolutionary-based, demonstration-based, rule-based, multi-agent-based.
- **Safety alignment**: RL-based integration of security mechanisms into LLMs during training.
- **Harmfulness perception**: model's ability to separate harmful inputs from safe ones in latent space.
- **Refusal behavior**: model's tendency to reject harmful inputs, mediated by latent directions.

## Mental Models
- Think of jailbreak success as **deception of perception**: the model mistakes harmful input for safe.
- Use **"three gaps" framing** (types / integration / dynamics) to critique any interpretation study.
- Think of jailbreaks as **coordinated manipulation**: both semantic perception and functional circuits move together.

## Anti-patterns
- **Studying only a handful of classic attacks** (e.g., only GCG and PAIR): conclusions fail to generalize to the broader attack landscape.
- **Treating representation and circuit analysis as parallel, isolated views**: misses how semantic deviations relate to functional circuit failures.
- **Static first-token analysis only**: misses "initially refuses, later produces harm" jailbreaks.

## Key Takeaways
1. Prior work leaves three gaps: limited attack coverage, no representation–circuit integration, and no dynamic analysis.
2. JailbreakScope integrates representation + circuit levels into one framework.
3. Findings are model-agnostic and attack-agnostic (generalize across 5 LLMs, 7 strategies).
4. The core mechanism: jailbreaks shift harmful inputs toward safe clusters and suppress refusal circuits.

## Connects To
- **Ch 2**: positions JailbreakScope against related representation/circuit works.
- **Ch 4**: the framework introduced here is detailed there.
- **JailbreakZoo taxonomy**: the five attack categories reused as the experimental coverage basis.
