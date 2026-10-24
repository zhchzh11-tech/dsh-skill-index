# Chapter 4: JailbreakScope

## Core Idea
JailbreakScope is a dual-perspective framework answering three research questions: (RQ1) how jailbreaks alter representations, (RQ2) which components matter for generation safety, and (RQ3) how representations and circuits co-evolve during generation.

## Frameworks Introduced
- **Representation Probing (RQ1, Sec 4.1)**: train a binary safety probe `P` on a dataset `D = (X⁺, X⁻)` (safe=+1, harmful=−1); the dominant axis it discriminates along is the **safety direction vector `v`**. Project `v` into vocabulary space via logitlens to confirm semantics. Apply the probe to jailbreak representations to measure **deception** (probe classifies jailbreak as safe).
  - When to use: to quantify how strongly each jailbreak deceives harmfulness perception, as a unified metric across attack types.
  - How: three probe architectures (linear, cluster, PCA) to rule out probe-structure artifacts; last-token representation captures full context.
- **Model Behavior Circuit (RQ2, Sec 4.2)**: locate components (attention heads, MLP layers) important for affirmation (S⁺) and refusal (S⁻) via **refusal score** logit attribution.
  - When to use: to find which specific components jailbreaks manipulate, rather than only observing representation shifts.
  - How: refusal score `rs = F_c(x)W_U[:,w⁻] − F_c(x)W_U[:,w⁺]`; identify target tokens via `w⁺=argmax⟨v,W_U[:,w]⟩`, `w⁻=argmax⟨−v,W_U[:,w]⟩`; then maximum-gap segmentation to pick S⁺/S⁻.
- **Interpretation Aggregation (RQ3, Sec 4.3)**: bridge the two views with Pearson correlation between representation deception and circuit activation shift, plus token-by-token dynamic tracking.
  - When to use: to explain borderline cases (e.g., "refusal-first") that neither single view explains.
  - How: deception `P(safe|x)`, activation shift `ΔA = [S⁺(x)−S⁺(X⁺)] + [S⁻(X⁻)−S⁻(x)]`; dynamic evolution via Alg 2.

## Key Concepts
- **Safety direction vector `v`**: dominant probe discrimination axis between harmful and safe representations.
- **Affirmation/refusal target tokens `w⁺`/`w⁻`**: top decoded tokens along ±v.
- **Refusal score `rs`**: logit difference `F_c(x)W_U[:,w⁻] − F_c(x)W_U[:,w⁺]` measuring a component's contribution to refusal.
- **Signal components `S⁺`/`S⁻`**: components important for affirmation and refusal respectively; `S = S⁺ ∪ S⁻`.
- **Representation deception**: `P(safe|x) ∈ [0,1]` — probability the probe classifies jailbreak as safe.
- **Activation shift `ΔA`**: deviation of safety-signal activations under jailbreak vs. baseline benign/harmful behavior.

## Worked Example (Algorithm 1 — Importance Score Calculation)
```
Input: safety direction vectors {v1..vL}, test prompt set Xt, component F_c in layer l
Output: causal effect for F_c: rs_c
1. w+ = argmax_w ⟨v_l, W_U[:,w]⟩          # affirmation token
2. w- = argmax_w ⟨−v_l, W_U[:,w]⟩          # refusal token
3. for x in Xt:
4.   prob_w- = F_c(x) · W_U[:,w-]
5.   prob_w+ = F_c(x) · W_U[:,w+]
6.   rs_c(i) = prob_w- − prob_w+            # refusal score
7. return rs_c = mean over Xt               # averaged effect
```
- **What it demonstrates**: quantifies a component's contribution to refusal by the logit difference between the refusal token and the affirmation token.

## Worked Example (Algorithm 2 — Dynamic Evolution Tracking)
```
Input: jailbreak prompt x, model F, signal components (S+, S-), trained probe P, signal tokens (w+, w-)
Output: evolution of representations ER and circuits EC
1. Y ← []; i ← 0; while y_i != eos:
2.   A_l ← F_l(x + Y)
3.   ER(i) ← P(A_l)                        # representation deception
4.   rs_S+ ← Alg.1(Xt={x+Y}, Fc=S+)
5.   rs_S- ← Alg.1(Xt={x+Y}, Fc=S-)
6.   y_i ← M(x+Y); Y ← [Y, y_i]; i ← i+1
7. return ER = {ER(1)..ER(i)}, EC = {(rs_S+,rs_S-)(1)..(i)}
```
- **What it demonstrates**: tracks deception and circuit activation jointly for every generated token, exposing "refusal-first" regimes.

## Key Takeaways
1. Three probes (linear/cluster/PCA) make representation findings robust to probe architecture.
2. Refusal score + maximum-gap segmentation cleanly splits components into S⁺ and S⁻.
3. Correlation analysis links representation deception to circuit activation shift.
4. Dynamic tracking is what distinguishes JailbreakScope from static studies.

## Connects To
- **Ch 3**: uses probing and logitlens.
- **Ch 5**: all three RQs are tested experimentally, yielding Observations 1–10.
- **Ch 6**: the correlated signals become a joint detection framework.
