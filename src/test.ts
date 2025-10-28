console.log("Tentando ler a DATABASE_URL (com Bun)...");

// O Bun injeta as variáveis do .env diretamente em 'process.env'
// Você também pode usar a variável global 'Bun.env'

const databaseUrl_process = process.env.DATABASE_URL;
const databaseUrl_bun = Bun.env.DATABASE_URL; 

if (databaseUrl_process) {
  console.log("✅ Sucesso! (via process.env):");
  console.log(databaseUrl_process);
} else if (databaseUrl_bun) {
  console.log("✅ Sucesso! (via Bun.env):");
  console.log(databaseUrl_bun);
} else {
  console.log("❌ Falha! A variável DATABASE_URL não foi encontrada.");
  console.log("Verifique se o arquivo .env está na pasta correta e o nome da variável está exato.");
}