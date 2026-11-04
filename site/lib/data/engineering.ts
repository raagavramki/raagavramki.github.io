import type { ArchiveProject, CaseStudy } from "./types"

export const engineeringCaseStudies: CaseStudy[] = [
  {
    slug: "neuroanatomy-sme-agent",
    kind: "engineering",
    visibility: "public",
    category: "nlp",
    title: "Neuroanatomy SME Agent",
    problem: "Answer neuroanatomy questions and generate quizzes grounded in textbooks, not in a model's memory.",
    methodLine: "Multi-granularity chunking, BioLORD embeddings, FAISS + BM25 hybrid retrieval, BGE rerank, tool-calling agent",
    statusLabel: "Project - Nov 2025",
    summary:
      "A retrieval-augmented system for neuroanatomy Q&A and quiz generation. It ingests medical textbooks, cleans and chunks them at three granularities, embeds them with a biomedical model, retrieves with hybrid vector + keyword search and optional reranking, and serves a chat and tools UI with document export.",
    seoDescription: "Retrieval-augmented neuroanatomy Q&A and quiz agent: hybrid FAISS/Elasticsearch search, BioLORD embeddings, BGE reranking.",
    meta: [
      { label: "Period", value: "Nov 2025" },
      { label: "Stack", value: "Python, PyTorch, HuggingFace, FAISS, Elasticsearch, FastAPI" },
      { label: "My role", value: "Sole developer: ingestion, retrieval, agent and UI" },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem and motivation",
        paragraphs: [
          "General-purpose language models answer anatomy questions fluently but without citing a source. The goal was a subject-matter-expert assistant whose answers are retrieved from a curated textbook collection.",
        ],
      },
      { id: "role", title: "My role", paragraphs: ["I implemented the full pipeline: batch ingestion, multi-granularity chunk-graph construction, BioLORD embedding generation, hybrid FAISS/Elasticsearch search with BGE reranking, the custom LangChain-style reasoning and tool-calling layer, and the browser UI and export toolchain."] },
      {
        id: "design",
        title: "System design",
        diagram: {
          caption: "Pipeline as described in the repository README; not an evaluated architecture.",
          steps: [
            { label: "Collection", note: "scan PDF/DOCX/PPTX/TXT/MD, write metadata" },
            { label: "Preprocessing", note: "parse, clean, sanitize, chunk 2048/512/128 with overlap, MinHash dedup, chunk graph" },
            { label: "Embeddings", note: "BioLORD-2023, nodes/edges JSONL" },
            { label: "Hybrid retrieval", note: "FAISS + optional Elasticsearch BM25, RRF fusion" },
            { label: "Rerank", note: "BGE cross-encoder (optional), MiniLM fallback" },
            { label: "Agent + UI", note: "FastAPI: chat, QA/quiz chains, admin; PDF/DOCX/PPTX export" },
          ],
        },
      },
      {
        id: "implementation",
        title: "Implementation",
        bullets: [
          "Chunk sizes (2048/512/128 tokens) and overlap (64) are configurable through environment variables.",
          "Search mode is switchable between vector, BM25 and hybrid; if Elasticsearch is down the app falls back to FAISS.",
          "Prompt-injection sanitization is applied across the ingestion pipeline.",
          "The language model is configurable at runtime; candidates listed in the README include MedGemma 4B, MediPhi and II-Medical-8B.",
        ],
      },
      {
        id: "evaluation",
        title: "Evaluation",
        paragraphs: [
          "The repository documents the system and includes demo recordings; it does not report quantitative retrieval or answer-quality metrics, so none are claimed here.",
        ],
      },
      {
        id: "tradeoffs",
        title: "Challenges and trade-offs",
        bullets: [
          "Three chunk granularities trade context breadth against precision, at the cost of three indexes to build and store.",
          "Hybrid search adds an Elasticsearch dependency; the FAISS fallback keeps the system usable without it.",
          "Answers are only as good as the ingested text, so parsing, cleaning, sanitisation and MinHash deduplication all run before anything is embedded.",
        ],
      },
      { id: "next", title: "What I learned and next steps", paragraphs: ["Retrieval design (chunk sizes, fusion, reranking) matters as much as the model that writes the answer. Next steps: a held-out question set to measure retrieval and grounding, and expert review of generated quizzes."] },
    ],
    artifacts: [
      { label: "GitHub", href: "https://github.com/raagavramki/Subject-Matter-Expert-Agentic-AI", kind: "code" },
    ],
    featuredOrder: 2,
  },
  {
    slug: "multilingual-slm",
    kind: "engineering",
    visibility: "public",
    category: "nlp",
    title: "Multilingual Small Language Model (English, Tamil, Mizo)",
    problem: "Build and pretrain a small language model that covers a low-resource language (Mizo) alongside English and Tamil.",
    methodLine: "3B-token corpus, 96k Unigram tokenizer, 140M-parameter Gemma3-style LM, LoRA fine-tuning",
    statusLabel: "Project - Sept 2025",
    summary:
      "An end-to-end small-model project: corpus construction and cleaning for three languages, a language-balanced Unigram tokenizer, pretraining of a ~140M-parameter Gemma3-style decoder on one H100, and two LoRA fine-tuning experiments. Perplexities are reported with their splits; qualitative samples show real failures.",
    seoDescription: "Pretraining a 140M-parameter multilingual small language model on English, Tamil and Mizo, with a custom Unigram tokenizer and LoRA fine-tuning.",
    meta: [
      { label: "Period", value: "Sept 2025" },
      { label: "Stack", value: "PyTorch, HuggingFace, PEFT/LoRA" },
      { label: "Compute", value: "1x H100, about 5.5 hours for the full run" },
      { label: "My role", value: "Sole developer, from corpus to fine-tuning" },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem and motivation",
        paragraphs: [
          "Mizo is a low-resource language: it makes up about 2.3% of the corpus (68.7M of 3.01B tokens). The aim was a small model and tokenizer that do not simply drown it out.",
        ],
      },
      { id: "role", title: "My role", paragraphs: ["I built the project end to end: the three-language corpus and its cleaning and splitting, the tokenizer, the pretraining code and run, and both LoRA fine-tuning experiments."] },
      {
        id: "design",
        title: "System design",
        diagram: {
          caption: "Pipeline as described in the repository README.",
          steps: [
            { label: "Corpora", note: "English ~1.52B, Tamil ~1.42B, Mizo ~68.7M tokens" },
            { label: "Cleaning + split", note: "normalization, length filter, SHA-1 bucket split 98/1/1" },
            { label: "Tokenizer", note: "Unigram, 96k vocab, temperature-smoothed sampling" },
            { label: "Pretraining", note: "Gemma3-style, 12 layers, hidden 768, 50k steps" },
            { label: "LoRA SFT", note: "FAQ generation; synonym substitution" },
          ],
        },
      },
      {
        id: "implementation",
        title: "Implementation",
        bullets: [
          "Cleaning: Unicode normalization, digit normalization across languages, punctuation unification, length filtering, script filtering that preserves Tamil combining marks and Mizo diacritics.",
          "Deterministic splitting: SHA-1 of each line mapped to a 0-99 bucket (98/1/1), with minimum val/test sizes and a fixed shuffle seed.",
          "Tokenizer: Unigram with NFC normalization and Metaspace pre-tokenizer, sampled with p(L) proportional to |L|^alpha, alpha = 0.23, to protect Mizo.",
          "Model: 12 layers, hidden 768, 6 heads, MLP 2048, RoPE theta 1e6, sliding window and context 512, vocab 96k (~140M parameters).",
          "Training: AdamW (lr 2e-4, wd 0.1), cosine schedule with 2k warmup, effective batch 64 sequences x 512 tokens, 50k steps, bf16, language weights 0.5/0.35/0.15 (EN/TA/Mizo).",
        ],
      },
      {
        id: "evaluation",
        title: "Evaluation",
        table: {
          caption: "Perplexity from the project logs (best pretraining checkpoint, step 50,000).",
          head: ["Measure", "Value", "Split"],
          rows: [
            ["Pretraining perplexity", "2.74", "Training"],
            ["Average validation perplexity", "111.9 (from 1,865 at step 1,000)", "Validation"],
            ["Validation: English / Tamil / Mizo", "110.0 / 187.6 / 38.1", "Validation"],
            ["FAQ generation (LoRA)", "12.7", "Fine-tuning log, step 2,000"],
            ["Synonym substitution (LoRA)", "1.73", "Fine-tuning log, step 2,000"],
          ],
        },
        paragraphs: [
          "Across three pretraining runs, the checkpoint with the lowest validation perplexity was selected. Both LoRA tasks use rank 16, alpha 32, dropout 0.1, applied to attention and MLP layers, with the loss masked to the assistant response only.",
        ],
      },
      {
        id: "tradeoffs",
        title: "Challenges and trade-offs",
        bullets: [
          "Low-resource balance: Mizo is about 2.3% of the corpus, so tokenizer sampling uses a temperature (alpha = 0.23) and pretraining weights Mizo at 15% to keep it represented.",
          "Compute budget: one H100 for about 5.5 hours. At 64 sequences x 512 tokens x 50k steps, the run covers roughly half an epoch of the 3B-token corpus.",
          "Tamil has the highest validation perplexity of the three languages; its morphology produces longer token chains.",
          "Reproducibility: a SHA-1 line-bucket split keeps train/validation/test stable across rebuilds.",
        ],
      },
      { id: "next", title: "What I learned and next steps", paragraphs: ["Data decisions (cleaning, language balance, tokenizer sampling) shaped results more than model tweaks did. Next steps: longer training toward a full epoch or more, and fine-tuning examples in Tamil and Mizo."] },
    ],
    artifacts: [{ label: "GitHub", href: "https://github.com/raagavramki/multilingual-slm", kind: "code" }],
    featuredOrder: 4,
  },
  {
    slug: "glioma-mri-pipeline",
    kind: "engineering",
    visibility: "public",
    category: "vision",
    title: "Glioma MRI Segmentation and Viewer Pipeline",
    problem: "Segment post-treatment glioma sub-regions in multi-sequence MRI and let clinicians inspect predictions in a standard viewer.",
    methodLine: "MONAI SwinUNETR on BraTS 2024, sliding-window inference, NIfTI to DICOM, Orthanc + OHIF, GCP/Vertex AI",
    statusLabel: "Research project - Cloud Ambassadors",
    summary:
      "A personal research project under Cloud Ambassadors' guidance, built on the open BraTS 2024 post-treatment glioma data. It covers training a SwinUNETR segmentation model on four MRI sequences, sliding-window inference, conversion of predictions to DICOM, and a viewer stack (Orthanc PACS, OHIF and a React viewer) that shows colour-coded tumour sub-regions, with GCP deployment.",
    seoDescription: "Glioma MRI segmentation with SwinUNETR on BraTS 2024 and a DICOM/PACS/OHIF visualization pipeline.",
    meta: [
      { label: "Context", value: "Personal research project under Cloud Ambassadors' guidance" },
      { label: "Period", value: "Dec 2024 - Present" },
      { label: "Data", value: "BraTS 2024 (open challenge data)" },
      { label: "My role", value: "Training stack, inference, DICOM conversion and viewer integration" },
    ],
    sections: [
      {
        id: "problem",
        title: "Problem and motivation",
        paragraphs: ["Segmentation scores alone do not help a radiologist; predictions must be viewable in tools they already use."],
      },
      { id: "role", title: "My role", paragraphs: ["This was a personal research project run under Cloud Ambassadors' guidance, using only open BraTS data. I built the training and inference code, the NIfTI-to-DICOM conversion, and the connection to the PACS and viewer."] },
      {
        id: "design",
        title: "System design",
        diagram: {
          caption: "Components of the pipeline; no source code is reproduced here.",
          steps: [
            { label: "BraTS 2024 data", note: "T1, T1c, T2, FLAIR volumes" },
            { label: "Training", note: "MONAI SwinUNETR, 128^3 patches, Dice-CE loss, early stopping" },
            { label: "Inference", note: "sliding window with test-time augmentation" },
            { label: "NIfTI to DICOM", note: "segmentation overlays" },
            { label: "Orthanc PACS + OHIF", note: "ET, SNFH, NETC and RC colour-coded" },
            { label: "React viewer", note: "slice navigation, windowing, overlay controls" },
          ],
        },
      },
      {
        id: "implementation",
        title: "Implementation",
        bullets: [
          "Network: the MONAI implementation of Swin UNETR (Hatamizadeh et al.), feature size 48, four input channels and five output classes (background plus ET, SNFH, NETC and RC). The contribution is the pipeline around it, not a new architecture.",
          "Training: 128^3 patches, AdamW at 1e-4 with cosine decay, Dice + cross-entropy loss, batch 1-2 with 4-step gradient accumulation, up to 300 epochs with early stopping (patience 25), checkpointing and hardware-aware configuration.",
          "Metrics: BraTS-style Dice and HD95; HD95 is computed on a subset of validation batches to save compute.",
          "Viewing: predictions are converted from NIfTI to DICOM, stored in Orthanc and displayed in OHIF, plus a React/TypeScript viewer with Cornerstone3D overlays.",
          "Deployment: containerised for Vertex AI on GCP.",
        ],
      },
      {
        id: "evaluation",
        title: "Evaluation",
        table: {
          caption: "Mean validation Dice on BraTS 2024 data, from the training logs.",
          head: ["Run", "Best mean val Dice", "At epoch", "Early stop at"],
          rows: [
            ["Baseline", "0.660", "82", "107"],
            ["With data augmentation", "0.778", "74", "99"],
          ],
        },
        paragraphs: [
          "At the best augmented epoch, HD95 was about 3.40. Dice is a mean over the sub-regions. The target of above 0.85 has not been reached.",
        ],
      },
      {
        id: "tradeoffs",
        title: "Challenges and trade-offs",
        bullets: [
          "3D volumes are memory-heavy, which limits batch size to 1-2 and makes gradient accumulation necessary.",
          "HD95 on a subset of batches is cheaper but is not a full-validation figure.",
          "First-time DICOM conversion takes 30-60 seconds per patient.",
          "Data augmentation made the biggest difference between the two runs (mean Dice 0.660 to 0.778).",
        ],
      },
      { id: "next", title: "What I learned and next steps", paragraphs: ["A segmentation score is only half the job: clinicians need to inspect results in tools they already use, so integration work (DICOM, PACS, viewers) deserves as much care as the model. Next steps: compare nnU-Net and SegResNet, try a larger feature size, and run loss-weight ablations."] },
    ],
    artifacts: [],
    featuredOrder: 3,
  },
]

export const archiveProjects: ArchiveProject[] = [
  { category: "vision", meta: "Computer Vision", title: "Glioma MRI Segmentation Pipeline", slug: "glioma-mri-pipeline", desc: "SwinUNETR segmentation of post-treatment glioma on BraTS 2024, with DICOM conversion and a PACS/OHIF viewer so results can be inspected clinically.", tags: ["PyTorch", "MONAI", "BraTS 2024"] },
  { category: "nlp", meta: "NLP & Agents", title: "Neuroanatomy SME Agent", slug: "neuroanatomy-sme-agent", desc: "Retrieval-augmented neuroanatomy Q&A and quiz agent with hybrid search and reranking.", tags: ["HuggingFace", "PyTorch", "LangChain"], href: "https://github.com/raagavramki/Subject-Matter-Expert-Agentic-AI" },
  { category: "nlp", meta: "NLP & Agents", title: "Multilingual SLM", slug: "multilingual-slm", desc: "3B-token English/Tamil/Mizo corpus, 96k Unigram tokenizer, 140M-parameter Gemma3-style LM, LoRA fine-tuning.", tags: ["HuggingFace", "PyTorch", "LoRA"], href: "https://github.com/raagavramki/multilingual-slm" },
  { category: "vision", meta: "Computer Vision", title: "Vision Transformers from Scratch", desc: "ViT and Differential ViT on CIFAR-10: 83.69% (ViT) and 84.38% (DiffViT) after benchmarking 11 configurations; DINO attention maps.", tags: ["PyTorch", "Transformers", "CIFAR-10"], href: "https://github.com/raagavramki/vision-transformer" },
  { category: "vision", meta: "Computer Vision", title: "FCN Semantic Segmentation", desc: "FCN-32/16/8 with VGG-16 backbone and bilinear upsampling; 83.3% test mIoU on a 13-class dataset with fine-tuned backbone.", tags: ["PyTorch", "VGG", "Segmentation"], href: "https://github.com/raagavramki/FCN" },
  { category: "ml", meta: "Machine Learning", title: "CNN-RNN OCR Pipeline", desc: "CNN feature extractor with attention-equipped RNN; 99.1% character-level accuracy (ANCC) on word-level OCR.", tags: ["PyTorch", "OCR", "LSTM"], href: "https://github.com/raagavramki/OCR-CNN-RNN" },
  { category: "ml", meta: "Machine Learning", title: "MLP from Scratch", desc: "MLP with customizable layers, activations and optimizers, built to develop intuition for gradient flow.", tags: ["NumPy", "PyTorch", "Wandb"], href: "https://github.com/raagavramki/MLP--from-scratch" },
  { category: "systems", meta: "Systems & Hardware", title: "Y86-64 Pipelined Processor", desc: "Pipelined Y86-64 processor with hazard detection, validated with waveform testbenches.", tags: ["Verilog", "Pipelining", "Testbenches"], href: "https://github.com/raagavramki/Y86-64-ISA-Processor" },
  { category: "systems", meta: "Systems & Hardware", title: "BPSK Modulation System", desc: "BPSK audio transmission over AWGN and noiseless channels with rectangular and raised-cosine pulse shaping.", tags: ["MATLAB", "DSP", "Communications"], href: "https://github.com/raagavramki/BPSK-Modulation" },
  { category: "systems", meta: "Systems & Hardware", title: "4-bit ALU Design", desc: "ALU from Verilog through gate-level NGSpice to transistor-level layout verified in MAGIC.", tags: ["Verilog", "NGSpice", "MAGIC"], href: "https://github.com/raagavramki/VLSI-Project" },
]
