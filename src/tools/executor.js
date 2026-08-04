import { toolRegistry } from './registry.js';

export async function executeTool(action) {

  console.log("ACTION RECUE :", action);

  const { tool, arguments: args } = action;

  console.log("ARGUMENTS TOOL :", args);

  const selectedTool = toolRegistry[tool];

  if (!selectedTool) {
    throw new Error(`Tool inconnu : ${tool}`);
  }

  return await selectedTool(args);
}
