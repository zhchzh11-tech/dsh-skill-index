# Chapter 7: Discussion

## Core Idea
JailbreakScope extends prior work by turning interpretation tools into a unified framework and surfaces novel findings (deceptive vs. non-deceptive subsets, coordinated circuit manipulation, consistent cross-view correlation). It also acknowledges the limitation of single-turn scope and the dual-use risk of its own insights.

## Frameworks Introduced
- **Extension framing**: not rediscovering representation/circuit phenomena, but deriving a generalizable understanding across diverse jailbreaks.
  - Representation: use probing to *quantify* how strongly each jailbreak distorts separability (not just confirm harmfulness is encoded).
  - Circuit: disentangle components into S⁺/S⁻ groups and attribute their contributions separately.
  - Aggregation: joint trajectories + correlation across tokens.

## Key Concepts
- **Three novel findings**: (1) some successful attacks keep representations near the harmful cluster; (2) jailbreaks suppress S⁻ and enhance S⁺ in a coordinated way but with very different magnitudes; (3) attacks inducing larger circuit shifts also show stronger representation deception.
- **Refusal-First vs Direct Answer**: distinct behavioral regimes found at token level.
- **Dual-use**: mechanism insights may inspire new attacks.

## Mental Models
- Use **"attack-agnostic pattern hunting"**: look for patterns that transcend attack types and model scales.
- Use **"dual-use awareness"**: deep interpretability cuts both ways — a defensive lens also illuminates attack surfaces.

## Anti-patterns
- **Single-turn analysis only**: misses multi-turn jailbreaks (e.g., Crescendo) that gradually steer the model across turns.
- **Releasing operationalized attack artifacts**: the framework intentionally provides no actionable attack tools/procedures.

## Key Takeaways
1. JailbreakScope repurposes probing/logitlens into a unified, quantitative framework.
2. Not all successful jailbreaks push representations into the safe region — some stay near harmful.
3. Circuit manipulation is coordinated (suppress S⁻, enhance S⁺) but magnitude varies greatly.
4. Cross-view correlation holds consistently; single-turn is a current limitation.

## Connects To
- **Ch 6**: extensions/limitations inform the practical application.
- **Ch 5**: the three novel findings derive from Obs 1–10.
- **Ch 8**: concludes the contributions and defense-oriented stance.
