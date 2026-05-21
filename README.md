<div align="center">

```
██████╗ ███████╗      █████╗  ██████╗████████╗
██╔══██╗██╔════╝     ██╔══██╗██╔════╝╚══██╔══╝
██████╔╝█████╗       ███████║██║        ██║   
██╔══██╗██╔══╝       ██╔══██║██║        ██║   
██║  ██║███████╗     ██║  ██║╚██████╗   ██║   
╚═╝  ╚═╝╚══════╝     ╚═╝  ╚═╝ ╚═════╝   ╚═╝   
```

**Harness ReAct from scratch — TypeScript + Bun + Groq**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-FF6B35?style=for-the-badge&logo=groq&logoColor=white)

</div>

---

## 🧠 C'est quoi ?

Un **harness ReAct (Reason + Act) écrit à la main**, sans aucune librairie agent.  
Le LLM décide lui-même quels outils appeler à chaque tour, jusqu'à compléter sa mission.

---

## 🔧 Les 3 outils

| Outil | Description |
|-------|-------------|
| `fetch_url(url)` | Récupère le contenu textuel d'une URL (max 5000 chars) |
| `run_js(code)` | Exécute un snippet JS via `Bun.spawn()` et retourne le stdout |
| `save_note(content)` | Ajoute du contenu dans `notes/rapport.md` |

---

## 📁 Structure

```
react-llm/
├── index.ts                        # Boucle ReAct principale (max 15 tours)
├── src/
│   ├── modules/
│   │   └── LLM.ts                  # Wrapper Groq avec gestion tool_calls + rate limit
│   ├── tools/
│   │   ├── fetchUrl.ts             # fetch_url
│   │   ├── runJs.ts                # run_js (Bun.spawn)
│   │   └── saveNote.ts             # save_note
│   └── constant/
│       └── tools.constants.ts      # Définitions des tools + mission de test
├── notes/
│   └── rapport.md                  # Généré par l'agent
├── .env.example
└── package.json
```

---

## ⚙️ Prérequis

| Outil | Version |
|-------|---------|
| [Bun](https://bun.sh/) | `>= 1.0` |
| [Clé API Groq](https://console.groq.com/keys) | — |

---

## 🚀 Installation

```bash
git clone https://github.com/VialsShiny/LLM-ReAct.git
cd LLM-ReAct
bun install
cp .env.example .env
# → Remplir GROQ_API_URL et GROQ_API_KEY dans .env
bun run start
```

---

<div align="center">

Fait avec 🤙 par [**@VialsShiny**](https://github.com/VialsShiny)

</div>
