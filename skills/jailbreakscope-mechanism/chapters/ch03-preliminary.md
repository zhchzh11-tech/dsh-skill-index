# Chapter 3: Preliminary

## Core Idea
Two interpretability tools underpin JailbreakScope: probing (reveals what information lives in hidden states) and logitlens (maps hidden states back to the vocabulary space).

## Frameworks Introduced
- **Probing**: train a supervised classifier `p: h_l^i → z` to reveal what information (semantic, syntactic, feature) the model stores in intermediate representation `h_l^i` of layer `l`.
  - When to use: to test whether a concept (e.g., harmfulness) is encoded in a given layer's representation.
  - How: layer-by-layer, train a probe to predict a target feature from the representation; observe where the probe succeeds.
- **LogitLens**: interpret the information encoded in a hidden state by mapping it back to vocabulary space through the unembedding matrix.
  - When to use: to observe vocabulary-distribution changes layer by layer, or to interpret the output of individual attention heads (`a_l^i`) or MLP modules (`m_l^i`).
  - How: `p = h^⊤ W_U`, where `h` is the hidden state being interpreted and `p` is the logits over vocabulary `V`.

## Key Concepts
- **Residual stream `h_l^i`**: updated each layer by the attention and MLP modules; encodes input information.
- **Unembedding matrix `W_U`**: maps hidden states to vocabulary logits.
- **Layer-wise probing**: reveals the role of each layer in representation and information transfer.

## Reference Tables
| Tool | What it reveals | Mechanism | Typical use |
|------|-----------------|-----------|-------------|
| Probing | Concept encoding per layer | Supervised classifier on hidden state | Does layer L store harmfulness? |
| LogitLens | Vocabulary distribution per layer/component | `p = h^⊤ W_U` | Decode a hidden state into tokens |

## Key Takeaways
1. Probing shows what the model has learned/stored in intermediate representations, layer by layer.
2. LogitLens maps any hidden state (full block, attention head, MLP) into vocabulary space.
3. Both are diagnostic: they observe, not intervene.
4. These tools become the basis of representation probing (Ch 4.1) and circuit localization (Ch 4.2).

## Connects To
- **Ch 4**: probing and logitlens are repurposed into representation analysis and refusal-score attribution.
- **Ch 5**: applied empirically to decode direction vectors and jailbreak representations.
