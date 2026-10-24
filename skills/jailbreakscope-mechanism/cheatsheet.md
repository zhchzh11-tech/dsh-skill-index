# Cheatsheet — JailbreakScope

## Decision Rules
- **When interpreting a jailbreak**, do BOTH representation AND circuit analysis, then correlate them — single-view conclusions miss "refusal-first" cases.
- **When picking probe(s)**, use linear + cluster + PCA and last-token representation to avoid probe-structure artifacts.
- **When locating safety components**, use refusal-score attribution + maximum-gap segmentation; expect the dominant components in the later layers.
- **When monitoring at runtime**, use dual-signal screening (representation + circuit); static screening alone misses progressive attacks.
- **When restoring safety**, intervene surgically (steering vectors / selective fine-tuning) on the localized failure set, not the whole model.

## The Core Mechanism (three moves)
1. **Deceive perception**: shift harmful input toward safe representation clusters (`P(safe|x)` high).
2. **Manipulate circuits**: suppress refusal signal S⁻, enhance affirmation signal S⁺.
3. **Coordinate both**: representation deception and circuit activation shift correlate positively.

## Deception ranking (typical, final layers)
- **Most deceptive**: DeepInception, ReNellm, CodeChameleon (safe even in final layers).
- **Less deceptive**: GCG, AutoDAN, PAIR, GPTFuzz (get caught as harmful by final layers).

## Key component map (Llama2-7b)
- Refusal signal head S⁻ = L21H14 → decodes to 'sorry'/'ap' on harmful prompts.
- Affirmation signal head S⁺ = L26H04 → decodes to 'Abstract'/'Introduction' on safe prompts.
- Affirmation MLP = L22 (most important for affirmation).

## Behavioral regimes
- **Direct Ans**: representation deception high enough that model answers immediately.
- **Refusal First**: deception unusually low relative to circuit shift → model initially refuses, then flips to harm. Watch for this in dynamic monitoring.

## Correlation values (deception ↔ activation shift)
- Llama2-7b 0.79 | Llama2-13b 0.77 | Vicuna-13b 0.72 | Vicuna-7b 0.64 | Llama3-8b 0.67.

## Key thresholds & normalization
- Normalize head activations to [−1,1] by dividing by baseline: positive = signal enhanced, negative = suppressed.
- Strong signal activations > 0.85 (S⁺ green / S⁻ red).

## Tells & smells
- **Jailbreak smell at representation level**: probe predicts "safe" with high probability on a malicious prompt → deception likely.
- **Circuit smell**: S⁻ suppression + S⁺ enhancement relative to harmful baseline → manipulation underway.
- **Refusal-first smell**: first token is refusal ("Sorry, I cannot…") but later flips — static detectors miss it.

## Limitations
- Single-turn analysis; multi-turn (e.g., Crescendo) needs per-turn application of the same tracking.
- Dual-use: insights can inform attacks; keep framework defensive, withhold prompts.
