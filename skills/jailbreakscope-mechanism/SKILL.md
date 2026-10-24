---
name: jailbreakscope-mechanism
description: "Knowledge base from \"JailbreakScope: Interpreting Jailbreak Mechanism through Representation and Circuit Analyses\" by Zeqing He, Zhibo Wang, et al. Use when interpreting LLM jailbreak mechanisms, studying the dual-perspective representation+circuit framework, or referencing concepts like safety direction vector, refusal score, S+/S- signal circuits, representation deception, and jailbreak detection/defense."
---

<!-- argument-hint: [topic, framework name, or chapter number] -->

# JailbreakScope: Interpreting Jailbreak Mechanism through Representation and Circuit Analyses
**Authors**: Zeqing He, Zhibo Wang, Zhixuan Chu, Huiyu Xu, Wenhui Zhang, Qinglong Wang, Rui Zheng (Zhejiang University) | **Type**: technical research paper | **Chapters**: 8 | **Generated**: 2025

## How to Use This Skill

- **Without arguments** — load core frameworks for reference
- **With a topic** — ask about `representation deception`, `refusal score`, `S+ circuit`, `jailbreak detection`, or another indexed topic; I find and read the relevant chapter
- **With chapter** — ask for `ch05`; I load that specific chapter
- **Browse** — ask "what chapters do you have?" to see the full index

When you ask about a topic not covered in Core Frameworks below, I will read
the relevant chapter file before answering.

---

## Core Frameworks & Mental Models

### JailbreakScope (dual-perspective interpretation)
Use it when you need a generalizable, mechanism-level explanation of why diverse jailbreak attacks succeed across different models. It integrates three steps: (1) **representation probing** to quantify deception, (2) **model-behavior circuit** to localize safety-critical components, and (3) **interpretation aggregation** to correlate and track them token-by-token. This is the paper's central contribution.

### The Core Jailbreak Mechanism (three coordinated moves)
1. **Deceive harmfulness perception**: shift harmful inputs toward safe representation clusters so `P(safe|x)` becomes high.
2. **Manipulate a small circuit set**: suppress refusal signal components (S⁻) and amplify affirmation signal components (S⁺).
3. **Coordinate both**: representation deception and circuit activation shift correlate positively (Pearson 0.64–0.79) across models and scales.

Use this mechanism to reason about *any* jailbreak or detection strategy: it is model-agnostic and attack-agnostic.

### Safety Direction Vector & Probing
Think of the **safety direction vector `v`** as the dominant axis a trained safety probe uses to discriminate harmful from safe representations. Project `v` into vocabulary space via LogitLens to get affirmation token `w⁺=argmax⟨v,W_U[:,w]⟩` and refusal token `w⁻=argmax⟨−v,W_U[:,w]⟩`. Use three probe types (linear, cluster, PCA) and last-token representation to avoid probe-structure artifacts.

### Refusal Score Circuit Attribution
Use **refusal score** `rs = F_c(x)W_U[:,w⁻] − F_c(x)W_U[:,w⁺]` to measure each component's contribution to refusal, then **maximum-gap segmentation** to split components into S⁺/S⁻. Expect the safety-critical components in the later layers (e.g., Llama2-7b: L21H14 = refusal head S⁻, L26H04 = affirmation head S⁺, L22 MLP for affirmation).

### Representation Deception & Activation Shift
Define **deception** as `P(safe|x) ∈ [0,1]` and **activation shift** as `ΔA = [S⁺(x)−S⁺(X⁺)] + [S⁻(X⁻)−S⁻(x)]`. Their consistent positive correlation across models is a signature of jailbreak behavior — a useful joint detection signal.

### Behavioral Regimes
Use **"Direct Ans vs Refusal First"** to classify jailbreak outcomes at token level. Refusal First prompts show unusually low deception relative to circuit shift (model initially refuses, then flips to harm) — static detectors miss them; monitor dynamically.

### Alignment Generalization Insight
Prefer **surgical, targeted alignment** over full-model retraining: the safety-failure set is small and consistent, so steering vectors (inference-time) or selective fine-tuning of that subset (training-time) restore safety cheaply with minimal overfit. Scale does not inherently improve alignment robustness.

### Deception Ranking (final-layer behavior)
Rule/demonstration-based methods (DeepInception, ReNellm, CodeChameleon) are most deceptive — safe even in final layers. Gradient/evolutionary/multi-agent methods (GCG, AutoDAN, PAIR, GPTFuzz) are caught as harmful by final layers.

---

## Chapter Index

| # | Title | Key Frameworks |
|---|-------|----------------|
| [ch01](chapters/ch01-introduction.md) | Introduction | JailbreakScope overview, three gaps, five attack categories |
| [ch02](chapters/ch02-related-works.md) | Related Works | Representation vs circuit-level analysis |
| [ch03](chapters/ch03-preliminary.md) | Preliminary | Probing, LogitLens |
| [ch04](chapters/ch04-jailbreakscope.md) | JailbreakScope | Representation probing, safety circuit, Alg 1 & Alg 2, correlation |
| [ch05](chapters/ch05-experiments.md) | Experiments | Observations 1–10, signal heads, correlation values |
| [ch06](chapters/ch06-practical-application.md) | Practical Application | Joint detection, targeted alignment, steering vectors |
| [ch07](chapters/ch07-discussion.md) | Discussion | Novel findings, limitations, dual-use |
| [ch08](chapters/ch08-conclusion-ethics-open-science.md) | Conclusion, Ethics & Open Science | Unified mechanism, responsible disclosure |

## Topic Index

- **Activation shift (ΔA)** → ch04, ch05
- **Affirmation signal head (S⁺)** → ch04, ch05
- **ASR (attack success rate)** → ch05
- **Behavioral regimes (Direct Ans / Refusal First)** → ch05, ch06
- **Circuit-level analysis** → ch02, ch04
- **Deception ranking** → ch05
- **Dynamic evolution tracking** → ch04, ch05, ch06
- **Five jailbreak categories** → ch01
- **Joint detection framework** → ch06
- **L21H14 / L26H04 / L22 MLP** → ch05
- **LogitLens** → ch03
- **Maximum-gap segmentation** → ch04
- **Probing** → ch03, ch04
- **Refusal direction** → ch02, ch04
- **Refusal score** → ch04
- **Refusal signal head (S⁻)** → ch04, ch05
- **Representation deception** → ch04, ch05, ch06
- **Representation-level analysis** → ch02, ch04
- **Safety direction vector (v)** → ch04, ch05
- **Safety probe (P)** → ch04
- **Steering vectors** → ch06
- **Targeted/selective alignment** → ch06

## Supporting Files

- [glossary.md](glossary.md) — all key terms with definitions
- [patterns.md](patterns.md) — all techniques and design patterns
- [cheatsheet.md](cheatsheet.md) — quick reference tables and decision guides

---

## Scope & Limits

This skill covers the JailbreakScope paper content only. It is a mechanistic-interpretability framework for LLM jailbreaks (representation + circuit analysis). For hands-on implementation, combine with the open-sourced pipeline (Zenodo record 17971644). Note the paper's own limits: single-turn analysis primarily; multi-turn jailbreaks need per-turn application. The paper is defensive in intent and releases no actionable attack procedures or specific jailbreak prompts.
