/* SISTEMA MFRGS - VERSÃO ESTÁVEL E UNIFICADA
   Sem redundâncias, sem erros de declaração.
*/

(function() {
    "use strict";

    // Substitua pelos seus dados reais
    const URL_PROJETO = 'https://asblzyihnmnkmfitprcx.supabase.co';
    const CHAVE_PROJETO = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYmx6eWlobm1ua21maXRwcmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MDcyNjgsImV4cCI6MjA5MjM4MzI2OH0.MuXquTfO9WQTwWs85Lh7is9wVFHV7x1si_M2JxAZiYc';

    // VERIFICAÇÃO DE SEGURANÇA: Só declara se já não existir no objeto window
    if (!window.supabase) {
        try {
            window.supabase = supabase.createClient(URL_PROJETO, CHAVE_PROJETO);
            console.log("✅ Conexão com Supabase estabelecida.");
        } catch (e) {
            console.error("❌ Erro na conexão:", e.message);
        }
    }

    // NÚCLEO DO SISTEMA (Tudo o que o sistema faz fica aqui dentro)
    const Sistema = {
        async salvarDados(tabela, objeto) {
            const { data, error } = await window.supabase.from(tabela).insert([objeto]);
            if (error) return console.error("Erro ao salvar:", error);
            return data;
        },
        
        init() {
            console.log("🚀 Sistema pronto e operacional.");
            // Seus gatilhos de botão e funções entram aqui
        }
    };

    // Inicializa quando o documento estiver pronto
    document.addEventListener('DOMContentLoaded', Sistema.init);
    
    // Disponibiliza o Sistema para uso global sem conflitos
    window.AppMFRGS = Sistema;

})();
