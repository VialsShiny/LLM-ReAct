# 🛠️ Plan d'Action : Correctifs et Sécurisation du Harness ReAct

Tu es un ingénieur expert en TypeScript, sécurité logicielle et architectures d'agents LLM. Ton objectif est de corriger les vulnérabilités critiques, les bugs de fiabilité et les défauts de structure identifiés lors de l'audit technique du projet `react-llm`.

Voici les instructions et les patterns d'implémentation attendus pour chaque fichier à modifier.

---

## 🚨 PHASE 1 : Sécurisation Critique & Fiabilité (Priorité Maximale)

### 1. `src/tools/runJs.ts` — Isolation de l'exécution de code (RCE)
* **Problème :** L'outil exécute du code JS arbitraire généré par le LLM via `Bun.spawn(["bun", "--eval", code])` sans aucune sandbox. Risque majeur d'exécution de code à distance (RCE) et d'exfiltration de variables d'environnement (`.env`).
* **Correction attendue :**
    * Implémenter un mécanisme de timeout strict pour éviter les boucles infinies (ex: blocage après 2 secondes).
    * *Option A (Recommandée) :* Remplacer `Bun.spawn` par l'utilisation du module natif `vm` de Node.js (disponible dans Bun) avec un contexte totalement isolé (`vm.createContext({})`) et désactiver l'accès aux modules globaux (`process`, `require`, `import`, `Bun`).
    * *Option B (Alternative de contournement si non isolable proprement) :* Si une vraie isolation n'est pas possible sans Docker, restreindre l'outil à une mini-calculatrice/interpréteur sécurisé ou lever une erreur explicite si des mots-clés sensibles sont détectés (`process`, `fetch`, `Bun`, `fs`, `eval`).
    * Assurer la capture et le renvoi propre des erreurs d'exécution au LLM pour qu'il puisse s'auto-corriger.

### 2. `src/tools/fetchUrl.ts` — Protection SSRF & Timeouts
* **Problème :** Risque de Server-Side Request Forgery (SSRF). Le LLM peut requêter des IPs privées, le réseau local ou des métadonnées Cloud. De plus, l'absence de timeout peut bloquer l'agent indéfiniment.
* **Correction attendue :**
    * Utiliser `URL` pour parser l'argument reçu. Valider impérativement que le protocole est uniquement `http:` ou `https:`.
    * Ajouter une validation de l'hôte : interdire les requêtes vers `localhost`, `127.0.0.1`, `169.254.169.254` (AWS metadata), et les plages d'IP privées (RFC 1918).
    * Intégrer un `AbortController` avec un timeout strict de 8 secondes sur le `fetch`.

### 3. `src/modules/LLM.ts` — Gestion du Rate Limit (Récursion Infinie)
* **Problème :** En cas de `rate_limit_exceeded`, la fonction se rappelle elle-même récursivement sans borne d'arrêt, risquant de provoquer un *Stack Overflow* ou une boucle infinie.
* **Correction attendue :**
    * Ajouter une constante `MAX_RETRIES = 5`.
    * Vérifier le paramètre `retryCount`. S'il atteint ou dépasse `MAX_RETRIES`, lever une exception explicite au lieu de relancer l'appel.

---

## 🟠 PHASE 2 : Robustesse, Typage et Concurrence (Priorité Haute)

### 4. `src/modules/LLM.ts` — Typage de la réponse API
* **Problème :** Utilisation de `any` pour le typage du JSON de retour de l'API Groq (`const data: any = await response.json()`).
* **Correction attendue :**
    * Déclarer une interface TypeScript stricte (ex: `GroqResponse`) décrivant la structure attendue de la réponse de l'API (notamment `choices`, `message`, `tool_calls`, `finish_reason`, et `error`).
    * Remplacer le type `any` par cette interface.

### 5. `src/tools/saveNote.ts` — Écritures concurrentes (Race Conditions)
* **Problème :** L'exécution parallèle via `Promise.all` dans la boucle ReAct peut amener deux appels simultanés à `save_note` à se chevaucher, corrompant le fichier `rapport.md`.
* **Correction attendue :**
    * Modifier le typage de la fonction `encapsuledContent` pour remplacer `content: any` par `content: string`.
    * Mettre en place un mécanisme de verrou (Mutex simple) ou sérialiser les écritures dans le fichier pour garantir qu'une seule opération d'écriture n'ait lieu à la fois.

### 6. `index.ts` — Validation des arguments du LLM & `finish_reason`
* **Problème :** Présence de non-null assertions injustifiées (`args.url!`, `args.code!`) qui font crasher l'application si le LLM omet un paramètre. De plus, le cas `finish_reason === "length"` (contexte saturé) n'est pas géré.
* **Correction attendue :**
    * Supprimer les `!` et implémenter une validation explicite : si un argument requis est manquant, lever une erreur descriptive qui sera renvoyée à l'agent.
    * Ajouter un cas de gestion pour `finish_reason === "length"` : logger un avertissement clair et arrêter proprement la boucle en notifiant l'utilisateur que la fenêtre de contexte est saturée.

---

## 🟡 PHASE 3 : Refactoring & Clean Architecture (Priorité Moyenne)

### 7. Découplage de `tools.constants.ts` et `index.ts`
* **Problème :** Mélange des responsabilités. `tools.constants.ts` contient les schémas des outils, les skills actifs et la `MISSION` (le prompt). `index.ts` importe manuellement chaque outil, brisant l'extensibilité.
* **Correction attendue :**
    * Extraire la variable `MISSION` : faire en sorte qu'elle puisse être passée en argument CLI (via `Bun.argv`) ou lue depuis un fichier externe.
    * Créer un registre d'outils dynamique (un pattern Registry / Map `name -> handler`) pour que `index.ts` n'ait plus à importer manuellement chaque nouveau fichier d'outil.
    * Découper `index.ts` en déplaçant la boucle ReAct principale dans un module dédié (ex: `src/agent/loop.ts`).

### 8. Nettoyage du `package.json`
* **Problème :** Erreur de version de TypeScript (`^6.0.3` en peerDependencies) et mauvaise catégorisation des types Node.
* **Correction attendue :**
    * Déplacer `typescript` et `@types/node` dans les `devDependencies`.
    * Fixer la version de TypeScript sur une version stable existante (ex: `^5.4.0` ou selon les standards actuels de Bun).
    * Remplacer `"latest"` pour `@types/bun` par une version stable cohérente avec le runtime utilisé.

---

## 📋 Directives Générales pour la Génération du Code
1.  **Strict Mode :** Conserver la rigueur de `tsconfig.json` (`noUncheckedIndexedAccess`, etc.). Tout le code généré doit compiler sans warning ni omission de type.
2.  **Modularité :** Ne modifie pas l'approche "sans framework" du projet. Reste sur du TypeScript pur et tire profit des APIs natives de Bun/Node.
3.  **Validation :** Produis les fichiers modifiés complets ou des blocs de code clairs avec indication précise des lignes à remplacer.