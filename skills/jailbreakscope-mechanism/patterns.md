# Patterns — JailbreakScope

## Representation Probing Pattern
**When to use**: to quantify how strongly a jailbreak deceives harmfulness perception, and to get a unified, attack-agnostic deception metric.
**How**: train binary safety probe(s) on paired safe/harmful data; extract the safety direction vector `v`; project `v` into vocabulary space to confirm semantics; apply probe to jailbreak representations and read `P(safe|x)`.
**Trade-offs**: probe architecture can bias results — mitigate by using three probe types (linear, cluster, PCA) and last-token representations. High probe accuracy means separability, not necessarily causal reliance.

## Safety Circuit Localization (Refusal Score Attribution)
**When to use**: to find which specific components (heads, MLP layers) drive refusal vs. affirmation.
**How**: pick target tokens `w⁺ = argmax⟨v,W_U[:,w]⟩`, `w⁻ = argmax⟨−v,W_U[:,w]⟩`; compute refusal score `rs = F_c(x)W_U[:,w⁻] − F_c(x)W_U[:,w⁺]` per component; use maximum-gap segmentation to split into S⁺ and S⁻.
**Trade-offs**: requires the unembedding matrix and per-component forward access; captures late-layer components that dominate safety. See Algorithm 1.

## Interpretation Aggregation (Correlation)
**When to use**: to explain borderline cases that single-view analysis misses (e.g., "refusal-first" jailbreaks).
**How**: compute representation deception `P(safe|x)` and activation shift `ΔA`; take their Pearson correlation; separate Direct Ans vs Refusal First regimes.
**Trade-offs**: linear correlation is a simplification (baseline constants drop out); the relationship holds consistently but magnitude varies by method.

## Dynamic Evolution Tracking
**When to use**: to observe how representation deception and circuit activation co-evolve across the whole generation, catching progressive attacks.
**How**: per generated token, run the probe and Alg 1 on the growing context `x + Y`, record `(ER, EC)` until eos. See Algorithm 2.
**Trade-offs**: more compute than static analysis; essential for detecting "refusal-first, harmfulness-later" regimes.

## Joint Detection Framework
**When to use**: to build a generalizable runtime jailbreak detector (defensive).
**How**: static phase screens each prompt for both abnormally safe representations AND abnormal circuit patterns; dynamic phase monitors representation drift and circuit activations each step.
**Trade-offs**: robust to unseen attacks; needs both probe and circuit monitoring at runtime.

## Precise & Targeted Alignment
**When to use**: to restore safety without degrading general capabilities or expensive full fine-tuning.
**How**: inference-time steering vectors from refusal representations; or training-time selective fine-tuning of only the identified safety-failure components.
**Trade-offs**: surgical (low cost, low overfit) but requires prior circuit localization of the specific failure set.
