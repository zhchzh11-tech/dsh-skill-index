# Chapter 2: Related Works

## Core Idea
LLM safety-mechanism research advances along two perspectives — representation-level and circuit-level. JailbreakScope positions itself by bridging them rather than extending either alone.

## Frameworks Introduced
- **Representation-level analysis**: examines how the safety concept is encoded in activations and how jailbreaks reshape representations to cross safety boundaries.
  - When to use: to explain jailbreak as a latent-space shift of harmful→safe.
  - How: probe the separation between harmful/safe representations; identify a "refusal direction" in the residual stream.
- **Circuit-level analysis**: identifies which model components are causally associated with safety and how intervening changes jailbreak vulnerability.
  - When to use: to localize refusal/affirmation to specific heads, neurons, or layers.
  - How: causal patching or functionality ablation, then perturbing those components.

## Key Concepts
- **Refusal direction (Arditi et al.)**: a single latent direction in the residual stream that largely mediates refusal behavior.
- **Linear activation manifold**: different jailbreaks share a similar linear shift of representations from harmful toward safe regions.
- **Structural token perturbation (Yu et al.)**: appending tokens (e.g., eos) can reshape activations so a harmful query is internally encoded as benign without changing surface semantics.
- **Sparse safety neurons (Chen et al.)**: a sparse set of neurons whose activations correlate strongly with refusal, overlapping substantially with utility-related neurons.
- **Safety layers / safety heads**: small blocks of layers or a few attention heads whose ablation sharply degrades safety.

## Mental Models
- Use **"two-perspective map"**: place any safety study as either representation-level, circuit-level, or (rarely) both.
- Think of prior work as **parallel views** that never meet — the gap JailbreakScope closes.

## Anti-patterns
- **Claiming causation from probe accuracy alone**: separability in latent space does not prove the model consults that boundary during inference.
- **Generalizing from one attack type**: prompt-specific activation patterns mean single-attack studies miss the diversity.

## Key Takeaways
1. Representation studies: refusal direction, harmful/safe separation, jailbreak shifts representations to safe region.
2. Circuit studies: sparse neurons, safety layers, a few important attention heads.
3. Jailbreaks involve both a shared linear shift AND prompt-specific heterogeneous patterns.
4. Few studies examine how specific jailbreaks disrupt these mechanisms, and almost none do so from both perspectives.

## Connects To
- **Ch 1**: fills the gaps this chapter's literature leaves.
- **Ch 3**: probing and logitlens — the tools both perspectives build on.
- **Ch 4**: how JailbreakScope repurposes these tools.
- **Refusal direction** (Arditi): direct precursor to the safety direction vector in Ch 4.
