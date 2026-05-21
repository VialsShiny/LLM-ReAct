import { existsSync, readFileSync } from "fs";
import { join } from "path";

// Charge et combine les directives de plusieurs SKILL.md spécifiés
export function loadSkills(skillNames: string[]): string {
  if (!skillNames || skillNames.length === 0) return "";

  const baseDir = join(process.cwd(), "skills");
  let combinedSkills = "\n\n=== 🎯 DIRECTIVES COMPORTEMENTALES OBLIGATOIRES ===";

  for (const skill of skillNames) {
    const filePath = join(baseDir, skill, "SKILL.md");

    if (existsSync(filePath)) {
      const content = readFileSync(filePath, "utf-8").trim();
      combinedSkills += `\n\n[SKILL: ${skill.toUpperCase()}]\n${content}`;
      console.log(`✨ Skill chargé avec succès : ${skill}`);
    } else {
      console.warn(`⚠️ Skill demandé introuvable : "${skill}" (Chemin: ${filePath})`);
    }
  }

  return combinedSkills + "\n==================================================";
}