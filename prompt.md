Tu es un architecte logiciel senior, expert en :

* architecture backend/frontend,
* performance,
* sécurité,
* clean code,
* DevOps,
* DX (Developer Experience),
* scalabilité,
* qualité logicielle,
* maintenabilité long terme.

Je vais te fournir un fichier ZIP contenant l’intégralité de mon projet.

Ta mission est de réaliser un audit technique COMPLET, approfondi et critique du projet.

## IMPORTANT

* Tu dois analyser TOUS les fichiers pertinents du projet.
* Tu dois être honnête, critique et précis.
* Ne fais pas de résumé superficiel.
* Tu dois identifier :

  * ce qui est bien conçu,
  * ce qui est mauvais,
  * ce qui est dangereux,
  * ce qui est fragile,
  * ce qui manque,
  * ce qui pourrait devenir un problème à l’échelle.

Tu dois produire UNIQUEMENT un fichier au format Markdown (`audit.md`).

---

# Structure obligatoire du rapport Markdown

## 1. Vue d’ensemble du projet

* Description du projet
* Stack technique détectée
* Architecture générale
* Organisation du code
* Niveau global de qualité estimé
* Niveau de maturité du projet

---

## 2. Analyse architecture & structure

Analyse :

* architecture globale,
* découpage des modules,
* séparation des responsabilités,
* patterns utilisés,
* cohérence,
* dette technique,
* couplage,
* duplication,
* lisibilité.

Indique :

* les points forts,
* les points faibles,
* les risques techniques,
* les améliorations prioritaires.

---

## 3. Analyse du code

Audit détaillé du code :

* qualité,
* lisibilité,
* conventions,
* typage,
* complexité,
* fonctions trop longues,
* fichiers trop gros,
* anti-patterns,
* code mort,
* duplication,
* maintainability.

Donne des EXEMPLES précis avec :

* nom des fichiers,
* fonctions concernées,
* explication du problème,
* proposition d’amélioration.

---

## 4. Performance

Analyse :

* performances backend,
* frontend,
* rendering,
* requêtes,
* base de données,
* cache,
* mémoire,
* async,
* concurrence,
* optimisation.

Identifie :

* bottlenecks,
* requêtes inutiles,
* calculs coûteux,
* problèmes de scaling.

Classe chaque problème :

* faible,
* moyen,
* critique.

---

## 5. Sécurité

Audit sécurité complet :

* secrets exposés,
* variables d’environnement,
* injections,
* XSS,
* CSRF,
* auth,
* permissions,
* validation des inputs,
* dépendances vulnérables,
* stockage sensible,
* configuration dangereuse.

Liste :

* les vulnérabilités,
* leur gravité,
* les impacts possibles,
* les corrections recommandées.

---

## 6. Base de données

Analyse :

* structure,
* schéma,
* relations,
* migrations,
* index,
* requêtes,
* cohérence.

Indique :

* optimisations possibles,
* problèmes de normalisation,
* risques de performance,
* problèmes de scaling.

---

## 7. Frontend / UX (si présent)

Analyse :

* structure frontend,
* composants,
* gestion d’état,
* performances UI,
* accessibilité,
* responsive,
* UX,
* cohérence visuelle,
* maintenabilité.

---

## 8. DevOps & Infrastructure

Analyse :

* Docker,
* CI/CD,
* déploiement,
* monitoring,
* logs,
* observabilité,
* environnements,
* configuration.

Indique :

* ce qui manque,
* les risques,
* les améliorations possibles.

---

## 9. Dépendances

Analyse :

* dépendances inutiles,
* obsolètes,
* dangereuses,
* lourdes,
* redondantes.

Propose :

* alternatives modernes,
* simplifications possibles.

---

## 10. Tests & Qualité

Analyse :

* couverture de tests,
* qualité des tests,
* stratégie,
* mocks,
* robustesse.

Indique :

* ce qui manque,
* les zones non sécurisées,
* les priorités.

---

## 11. Scalabilité

Analyse la capacité du projet à :

* monter en charge,
* être maintenu par une équipe,
* évoluer fonctionnellement,
* supporter davantage d’utilisateurs.

Indique :

* les limites actuelles,
* les futurs problèmes probables,
* les refactors importants à prévoir.

---

## 12. Dette technique

Liste :

* les dettes techniques importantes,
* leur impact,
* leur coût futur probable,
* leur priorité.

---

## 13. Ce qui est particulièrement bien fait

Fais aussi une section POSITIVE :

* bonnes pratiques,
* architecture propre,
* composants bien pensés,
* patterns intelligents,
* éléments robustes,
* points impressionnants.

Explique POURQUOI c’est bien.

---

## 14. Plan d’amélioration priorisé

Crée une roadmap claire :

### Priorité critique

### Priorité haute

### Priorité moyenne

### Priorité faible

Avec :

* impact,
* difficulté,
* gain attendu.

---

## 15. Note finale

Donne :

* une note globale /10,
* une note architecture,
* une note sécurité,
* une note performance,
* une note maintenabilité,
* une note scalabilité.

Ajoute une conclusion honnête et professionnelle.

---

# Instructions importantes

* Sois extrêmement précis.
* Cite les fichiers exacts.
* Cite les fonctions exactes.
* Donne des exemples concrets.
* Explique les causes profondes.
* Propose des solutions modernes.
* Évite les généralités vagues.
* Si tu détectes des smells architecturaux, explique-les.
* Si certaines parties sont excellentes, explique pourquoi.
* Si le projet semble junior/mid/senior/staff-level, indique-le et justifie.
* Si certaines pratiques sont dangereuses en production, mets-les clairement en évidence.

Le rendu final doit être un UNIQUE document Markdown parfaitement structuré et lisible.
