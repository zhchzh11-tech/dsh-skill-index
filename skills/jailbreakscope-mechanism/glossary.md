# Glossary — JailbreakScope

**Activation shift (ΔA)** — deviation of safety-signal component activations under a jailbreak vs. baseline benign/harmful behavior; `ΔA = [S⁺(x)−S⁺(X⁺)] + [S⁻(X⁻)−S⁻(x)]` (Ch 4).

**Affirmation signal head (S⁺)** — components (e.g., L26H04 in Llama2-7b) that enhance affirmative/guiding responses; decoding to informative tokens on safe prompts (Ch 5).

**ASR (Attack Success Rate)** — fraction of jailbreak cases producing a concrete, actionable harmful solution (Ch 5).

**AutoDAN** — evolutionary-based jailbreak; less deceptive, exhibits "refusal-first" behavior (Ch 5).

**Circuit-level analysis** — localizing components (heads, neurons, layers) causally tied to safety and how intervening changes jailbreak vulnerability (Ch 2).

**CodeChameleon** — demonstration/rule-based jailbreak, highly deceptive (Ch 5).

**DeepInception** — rule-based jailbreak; highly deceptive, suppresses refusal signals strongly (Ch 5).

**Deception** — extent to which a jailbreak makes the probe classify its representation as safe; `P(safe|x) ∈ [0,1]` (Ch 4).

**Direct Ans regime** — jailbreak prompts the model answers immediately (Ch 5).

**Five jailbreak categories** — gradient-based, evolutionary-based, demonstration-based, rule-based, multi-agent-based (Ch 1).

**GCG** — gradient-based jailbreak; less pronounced refusal suppression, strong affirmation enhancement (Ch 5).

**GenerativeJudge** — automatic judge used to identify successful jailbreak cases before manual verification (Ch 5).

**GPTFuzz** — evolutionary-based jailbreak; high refusal suppression, minimal affirmation enhancement (Ch 5).

**Harmfulness perception** — model's ability to separate harmful from safe inputs in latent space (Ch 1).

**Jailbreak attack** — adversarial prompt crafted to bypass safety alignment and elicit harmful responses (Ch 1).

**JailbreakScope** — dual-perspective framework integrating representation and circuit analyses to interpret jailbreak mechanisms (Ch 1).

**L21H14** — 14th attention head in layer 21 of Llama2-7b; refusal signal head S⁻ (Ch 5).

**L22 MLP** — the 22nd MLP layer, most important for affirmation (Ch 5).

**L26H04** — 4th attention head in layer 26 of Llama2-7b; affirmation signal head S⁺ (Ch 5).

**Linear activation manifold** — shared linear shift of representations from harmful toward safe regions across jailbreaks (Ch 2).

**LogitLens** — mapping a hidden state back to vocabulary via the unembedding matrix `p = h^⊤ W_U` (Ch 3).

**Maximum-gap segmentation** — sorting refusal scores, taking the largest adjacent difference as threshold to split components into S⁺/S⁻ (Ch 4).

**PAIR** — multi-agent-based jailbreak; less deceptive, fails to deceive at first token (Ch 5).

**Probing** — training a supervised classifier on intermediate representations to reveal encoded concepts (Ch 3).

**Refusal behavior** — model's tendency to reject harmful inputs (Ch 1).

**Refusal direction** — a single latent direction in the residual stream that largely mediates refusal (Ch 2).

**Refusal score (rs)** — logit difference `F_c(x)W_U[:,w⁻] − F_c(x)W_U[:,w⁺]` measuring a component's contribution to refusal (Ch 4).

**Refusal signal head (S⁻)** — components that mediate rejecting/apologetic responses; decoding to 'sorry' on harmful prompts (Ch 5).

**Refusal First regime** — jailbreak where the model initially refuses but later produces harm (Ch 5).

**ReNellm** — demonstration/rule-based jailbreak, highly deceptive (Ch 5).

**Representation deception** — probability the safety probe classifies a jailbreak as safe (Ch 4).

**Representation-level analysis** — examining how safety concepts are encoded in activations and how jailbreaks reshape representations to cross safety boundaries (Ch 2).

**Residual stream (h_l^i)** — per-layer hidden state updated by attention and MLP modules (Ch 3).

**Safety direction vector (v)** — dominant probe discrimination axis between harmful and safe representations (Ch 4).

**Safety probe (P)** — binary classifier on a safe/harmful dataset `D = (X⁺, X⁻)` (Ch 4).

**Safety alignment** — RL-based integration of security mechanisms into LLMs during training (Ch 1).

**Signal components (S)** — union of S⁺ and S⁻, components important for generation safety (Ch 4).

**Steering vectors** — internal-direction vectors derived from refusal representations, injected to counteract jailbreak manipulation (Ch 6).

**Structural token perturbation** — appending tokens (e.g., eos) that reshape activations so a harmful query is encoded as benign without changing surface semantics (Ch 2).

**Unembedding matrix (W_U)** — maps hidden states to vocabulary logits (Ch 3).

**Vicuna** — instruction-tuned variant of Llama; comparison used to assess fine-tuning impact (Ch 5).
