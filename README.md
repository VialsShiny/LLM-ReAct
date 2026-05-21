<div align="center">

<br/>

```
██████╗ ███████╗      █████╗  ██████╗████████╗
██╔══██╗██╔════╝     ██╔══██╗██╔════╝╚══██╔══╝
██████╔╝█████╗       ███████║██║        ██║   
██╔══██╗██╔══╝       ██╔══██║██║        ██║   
██║  ██║███████╗     ██║  ██║╚██████╗   ██║   
╚═╝  ╚═╝╚══════╝     ╚═╝  ╚═╝ ╚═════╝   ╚═╝   
```

**Vibe coding avec TypeScript, les LLMs & le pattern ReAct.**

<br/>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-FF6B35?style=for-the-badge&logo=groq&logoColor=white)
![LLM](https://img.shields.io/badge/LLM-ReAct-8A2BE2?style=for-the-badge&logo=openai&logoColor=white)

<br/>

![GitHub last commit](https://img.shields.io/github/last-commit/VialsShiny/LLM-ReAct?style=flat-square&color=8A2BE2)
![GitHub repo size](https://img.shields.io/github/repo-size/VialsShiny/LLM-ReAct?style=flat-square&color=3178C6)
![GitHub stars](https://img.shields.io/github/stars/VialsShiny/LLM-ReAct?style=flat-square&color=FFD700)

</div>

---

## 🧠 C'est quoi ?

Un **bac à sable personnel** pour expérimenter avec TypeScript, les intégrations LLM, et le pattern **ReAct** (Reason + Act).

Pas d'ambitions production. Juste de l'exploration concrète — vibe coding, itérations rapides, et apprentissage de la façon dont les LLMs raisonnent quand on leur donne la bonne structure.

---

## ⚙️ Prérequis

| Outil | Version |
|-------|---------|
| [Bun](https://bun.sh/) | `>= 1.0` |
| [Clé API Groq](https://console.groq.com/keys) | — |

---

## 🚀 Installation

**1. Cloner le dépôt**

```bash
git clone https://github.com/VialsShiny/LLM-ReAct.git
cd LLM-ReAct
```

**2. Installer les dépendances**

```bash
bun install
```

**3. Configurer les variables d'environnement**

```bash
cp .env.example .env
```

Ouvre ensuite `.env` et renseigne tes credentials :

```env
GROQ_API_URL=https://api.groq.com
GROQ_API_KEY=ta_clé_api_groq_ici
```

**4. Lancer**

```bash
bun run index.ts
```

---

## 📁 Structure du projet

```
LLM-ReAct/
├── src/
│   ├── components/
│   │   ├── formatOfResponse.ts   # Nettoyage JSON & formatage de l'output
│   │   └── getHTMLPages.ts       # Récupération & parsing HTML
│   ├── constant/
│   │   └── LLMNeeds.constants.ts # Prompts & URLs cibles
│   └── modules/
│       └── LLM.ts                # Wrapper Groq avec gestion du rate-limit
├── notes/
│   └── rapport.md                # Output généré
├── index.ts                      # Pipeline principal
├── .env.example
└── package.json
```

---

<div align="center">

Fait avec 🤙 par [**@VialsShiny**](https://github.com/VialsShiny)

</div>