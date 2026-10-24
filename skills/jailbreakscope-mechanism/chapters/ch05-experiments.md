# Chapter 5: Experiments

## Core Idea
Empirical validation across 5 LLMs × 7 jailbreak strategies yields ten observations (Obs 1–10) showing that jailbreaks deceive harmfulness perception at the representation level and suppress refusal / amplify affirmation circuits at the circuit level, with a consistent positive correlation between the two.

## Frameworks Introduced
- **Experimental setup**: 5 models (Llama-2-7b/13b-chat, Llama-3-8b-Instruct, Vicuna-7b/13b-v1.5) × 7 jailbreak strategies (GCG, ReNellm, PAIR, DeepInception, AutoDAN, GPTFuzz, CodeChameleon). Success judged via GenerativeJudge + manual verification (concrete actionable solution to the harmful request).
- **Three probe types**: linear, cluster, PCA probes trained on paired AdvBench-derived data (last-token representation).
- **Refusal-score normalization**: divide activation by baseline to [−1,1]; positive = signal enhanced, negative = suppressed.

## Key Concepts
- **ASR (Attack Success Rate)**: fraction of jailbreak cases producing concrete harmful solutions.
- **L21H14**: refusal signal head S⁻ (Llama2-7b) — 14th head in 21st layer.
- **L26H04**: affirmation signal head S⁺ (Llama2-7b) — 4th head in 26th layer.
- **L22 MLP**: the 22nd MLP layer is most important for affirmation.
- **Signal head decoding**: S⁻ on harmful prompts → apologetic/rejecting tokens ('sorry'); S⁺ on safe prompts → guiding/informative tokens ('Abstract', 'Introduction').

## Mental Models
- Use **Obs 1–3** to reason about representation: harmfulness is linearly separable; deceptive jailbreaks encode prompts as safe across all layers; less deceptive ones are caught in final layers.
- Use **Obs 4–6** for circuits: only a small set of components (late-layer heads/MLPs) drives safety; all jailbreaks suppress S⁻ and enhance S⁺, by varying magnitude.
- Use **Obs 8–9** for aggregation: representation deception and circuit activation shift correlate positively (Pearson 0.64–0.79).

## Reference Tables (Refusal attribution of signal heads, selected values)
| Prompt | Method | Llama2-7b S⁺ / S⁻ | Llama3-8b S⁺ / S⁻ | Vicuna1.5-13b S⁺ / S⁻ |
|--------|--------|--------------------|--------------------|------------------------|
| Baseline | Safe | 1.0 / −0.076 | 1.0 / 0.564 | 1.0 / 0.110 |
| Baseline | Harmful | −0.024 / 1.0 | −0.336 / 1.0 | −0.079 / 1.0 |
| Jailbreak | DeepInception | 1.0003 / 0.0997 | 0.988 / 0.110 | 0.867 / 0.709 |
| Jailbreak | GPTFuzz | 0.0702 / 0.2817 | 0.111 / 0.867 | 0.482 / 0.672 |
| Jailbreak | GCG | 0.982 / 0.9997 | 0.756 / 0.851 | 0.992 / 0.734 |

## Reference Tables (Pearson correlation: deception ↔ activation shift)
| Model | Correlation |
|-------|-------------|
| Llama2-7b | 0.79 |
| Llama2-13b | 0.77 |
| Llama3-8b | 0.67 |
| Vicuna1.5-7b | 0.64 |
| Vicuna1.5-13b | 0.72 |

## Worked Example (behavioral regimes in dynamic analysis)
- **Safe prompt**: affirmation signal S⁺ stays active across all tokens; representations remain affirmative throughout.
- **Harmful prompt**: refusal signal amplified early, affirmation suppressed; first tokens are "Sorry, I cannot…".
- **DeepInception (deceptive)**: refusal signal never amplified; representation tracks the affirmation direction — resembles safe behavior, yields direct harmful answer.
- **AutoDAN (less deceptive)**: refusal signal amplified initially → first token "Sorry, I cannot…"; but later refusal stops, representation turns affirmative → model flips to answering. This is the "Refusal First" regime.

## Key Takeaways
1. Obs 1: harmfulness is encoded and linearly separable in representations; directions decode to refusal/affirmation words.
2. Obs 2: rule/demonstration-based methods (ReNellm, CodeChameleon, DeepInception) are most deceptive — safe even in final layers.
3. Obs 4: few late-layer components matter (L21H14, L26H04, L22 MLP).
4. Obs 6: every jailbreak suppresses S⁻ and enhances S⁺, to differing degrees.
5. Obs 7: scale does not improve alignment generalization; instruction tuning barely moves the refusal circuit.
6. Obs 8–9: deception and circuit shift correlate positively; "Refusal First" prompts have unusually low deception for their circuit shift.

## Connects To
- **Ch 4**: executes the three RQs with Alg 1 and Alg 2.
- **Ch 6**: the observed signals power the detection framework.
- **AdvBench**: probe dataset source.
