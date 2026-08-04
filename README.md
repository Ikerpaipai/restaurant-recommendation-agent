# Restaurant Recommendation Agent 🤖🍽️

Agent IA capable d'analyser une demande utilisateur, de planifier une action, d'utiliser des outils, de sélectionner les meilleurs résultats et de générer une réponse finale.

Ce projet a été développé comme un exercice d'architecture d'agent IA avec une approche proche des systèmes utilisés en production : séparation des responsabilités, orchestration, mémoire, outils, validation et tests.

---

## 🎯 Objectif du projet

Créer un agent conversationnel capable de répondre à des demandes de recherche de restaurants.

Exemple :

> "Trouve-moi un restaurant asiatique à Paris"

L'agent doit :

1. Comprendre l'intention utilisateur
2. Extraire les informations importantes
3. Construire un plan d'action
4. Appeler le bon outil
5. Analyser les résultats obtenus
6. Sélectionner les meilleures options
7. Formater la réponse finale

---

# 🏗️ Architecture de l'agent

Le fonctionnement global suit ce pipeline :

```
User message
      |
      v
State Extractor
      |
      v
Planner Agent
      |
      v
Tool Execution
      |
      v
Decision Agent
      |
      v
Formatter Agent
      |
      v
Final Response
```

---

# 🧠 Les différents agents

## 1. State Extractor

Responsabilité :

* Comprendre la demande utilisateur
* Extraire les informations utiles
* Maintenir l'état courant de la conversation

Exemple :

Input :

```
"trouve un restaurant à Hendaye"
```

Output :

```json
{
  "intent": "find_restaurant",
  "city": "Hendaye",
  "cuisine": null,
  "budget": null,
  "preferences": []
}
```

---

## 2. Planner Agent

Responsabilité :

Transformer l'état utilisateur en plan d'action.

Exemple :

Input :

```json
{
  "intent": "find_restaurant",
  "city": "Paris",
  "cuisine": "asiatique"
}
```

Output :

```json
{
  "goal": "Rechercher un restaurant asiatique",
  "actions": [
    {
      "tool": "search_restaurant",
      "arguments": {
        "city": "Paris",
        "cuisine": "asiatique"
      }
    }
  ]
}
```

---

## 3. Tool : Search Restaurant

L'agent utilise un outil dédié pour rechercher des restaurants.

Le tool accepte différents filtres :

* city
* cuisine
* budget
* preferences

Exemple :

```json
{
  "city": "Paris",
  "cuisine": "asiatique"
}
```

---

## 4. Decision Agent

Responsabilité :

Analyser les résultats retournés par les outils et sélectionner les meilleures options.

Il prend en compte :

* La demande utilisateur
* Les résultats disponibles
* Les critères recherchés

Exemple de sortie :

```json
{
  "selectedRestaurants": [
    {
      "name": "Hakata Choten",
      "score": 100,
      "reason": "Adapté à votre demande"
    }
  ]
}
```

---

## 5. Formatter Agent

Dernière étape du pipeline.

Responsabilité :

* Transformer la décision en réponse utilisateur
* Ne pas modifier les données
* Retourner uniquement le format attendu

---

# 🧩 Memory System

L'agent possède un système de mémoire simple composé de :

## Conversation history

Stockage des messages précédents :

```javascript
[
  {
    role: "user",
    content: "trouve un restaurant à Hendaye"
  }
]
```

---

## Agent State

Stockage de l'état courant :

```json
{
  "intent": "find_restaurant",
  "city": "Hendaye",
  "cuisine": null,
  "budget": null,
  "preferences": []
}
```

---

## Summary Memory

Un summarizer permet de créer un résumé utile de la conversation pour les prochains échanges.

Objectif :

* Garder uniquement les informations importantes
* Éviter d'envoyer toute l'historique au modèle
* Fournir un contexte plus léger aux agents

---

# 🧪 Tests

Le projet contient des tests d'évaluation End-To-End.

Les tests vérifient :

* Extraction de l'intention
* Extraction des paramètres
* Génération du plan
* Appel du bon outil
* Résultat final

Exemples testés :

## Restaurant avec ville

Input :

```
trouve un restaurant à Hendaye
```

Validation :

```json
{
  "intent": "search_restaurant",
  "city": "Hendaye"
}
```

---

## Restaurant asiatique

Input :

```
je veux manger asiatique à Paris
```

Validation :

```json
{
  "intent": "search_restaurant",
  "city": "Paris",
  "cuisine": "asiatique"
}
```

---

# 🔄 Mode Mock et Mode Gemini

Le projet possède deux modes d'exécution.

## Mock mode

Utilisé pour :

* Tester l'architecture
* Tester le pipeline sans dépendance externe
* Éviter la consommation de tokens

Activation :

```bash
AI_MODE=mock
```

---

## Gemini mode

Utilise un modèle Gemini pour les agents.

Activation :

```bash
AI_MODE=gemini
```

---

# 📂 Restaurant API Mock

Le projet utilise actuellement un mock de données restaurant pour simuler les résultats.

⚠️ Limitation actuelle :

Le dataset est volontairement très petit.

Il contient uniquement quelques restaurants d'exemple pour :

* Hendaye
* Paris

Il ne représente pas une vraie base de données restaurant complète.

Exemple :

```javascript
[
  {
    name: "L'Apostrophe",
    city: "Hendaye",
    cuisine: "Régionale"
  },
  {
    name: "Hakata Choten",
    city: "Paris",
    cuisine: "asiatique"
  }
]
```

L'objectif actuel est de tester l'architecture de l'agent, pas de fournir un moteur réel de recommandation restaurant.

---

# 🛠️ Technologies utilisées

* Node.js
* Express
* Google Gemini API
* JavaScript ES Modules
* Zod (validation des schemas)
* Architecture Agent AI

---

# 🚀 Installation

Cloner le repository :

```bash
git clone <repository-url>
```

Installer les dépendances :

```bash
npm install
```

Créer un fichier `.env` :

```
GEMINI_API_KEY=your_api_key
```

---

# ▶️ Lancer le projet

Mode Gemini :

```bash
npm start
```

Mode Mock :

```bash
npm run test:agent:e2e
```

---

# 📌 Améliorations possibles

Quelques pistes d'évolution :

* Ajouter une vraie API restaurant
* Ajouter davantage de scénarios de tests
* Améliorer la mémoire conversationnelle
* Ajouter plus d'outils à l'agent
* Ajouter une interface utilisateur complète

---

# 👨‍💻 Projet personnel - AI Engineering Practice

Ce projet sert d'exercice pratique pour comprendre la conception d'agents IA :

* LLM orchestration
* Tool calling
* Memory management
* Prompt engineering
* Evaluation d'agents
* Architecture modulaire
