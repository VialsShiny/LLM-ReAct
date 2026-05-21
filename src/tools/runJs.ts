/**
 * run_js(code)
 * Exécute un snippet JavaScript via Bun.spawn().
 * Optimisé et sécurisé pour l'environnement d'exécution Bun.
 */
export async function runJs(code: string): Promise<string> {
  const proc = Bun.spawn(["bun", "--eval", code], {
    stdout: "pipe",
    stderr: "pipe",
  });

  const exitCode = await proc.exited;
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();

  if (exitCode !== 0) {
    return `❌ Erreur (exit ${exitCode}):\n${stderr.trim() || "Pas de message d'erreur"}`;
  }

  return stdout.trim() || "(pas de sortie)";
}