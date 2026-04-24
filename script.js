/**
 * AGENTE BEATRIZ - VERSÃO PRODUÇÃO UNIFICADA
 * Zero redeclaração | CSP Safe | SES Compatible
 */

(function BeatrizAgent() {
    "use strict";

    // 1. TRAVA ANTI-DUPLICIDADE: Se já rodou, para aqui
    if (window.__BEATRIZ_LOADED__) {
        console.warn("⚠️ Agente Beatriz já foi carregado. Abortando duplicidade.");
        return;
    }
    window.__BEATRIZ_LOADED__ = true;

    const statusDiv = document.getElementById('status');

    function logStatus(msg, isError = false) {
        console.log(msg);
        if (statusDiv) {
            statusDiv.textContent = msg;
            statusDiv.className = isError ? 'erro' : 'ok';
        }
    }

    // 2. CONFIG - TROCA PELOS SEUS DADOS REAIS
    const CONFIG = {
        SUPABASE_URL: 'https://asblzyihnmnkmfitprcx.supabase.co',
        SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYmx6eWlobm1ua21maXRwcmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MDcyNjgsImV4cCI6MjA5MjM4MzI2OH0.MuXquTfO9WQTwWs85Lh7is9wVFHV7x1si_M2JxAZiYc'
    };

    // 3. INICIALIZAÇÃO BLINDADA DO SUPABASE
    const db = (() => {
        if (window.supabaseInstance) {
            logStatus("♻️ Reaproveitando instância existente do Supabase.");
            return window.supabaseInstance;
        }

        try {
            if (!window.supabase) {
                throw new Error("Biblioteca do Supabase não carregou. Confere o <script> no HTML.");
            }
            const client = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
            window.supabaseInstance = client;
            logStatus("✅ Supabase: Conexão única estabelecida.");
            return client;
        } catch (e) {
            logStatus(`❌ Falha ao criar client Supabase: ${e.message}`, true);
            return null;
        }
    })();

    // 4. NÚCLEO BEATRIZ - 100% CSP SAFE
    const Beatriz = {
        db,

        async testarConexao() {
            if (!this.db) {
                logStatus("❌ DB offline. Não foi possível testar.", true);
                return;
            }
            logStatus("🔄 Testando conexão com Supabase...");
            try {
                // Teste simples que não precisa de tabela
                const { error } = await this.db.auth.getSession();
                if (error) throw error;
                logStatus("🚀 Beatriz Agent: Sistema pronto e soberano. Conexão OK!");
            } catch (err) {
                logStatus(`❌ Erro no teste de conexão: ${err.message}`, true);
            }
        },

        init() {
            this.testarConexao();
        }
    };

    // 5. START
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Beatriz.init());
    } else {
        Beatriz.init();
    }

    window.BeatrizAgent = Beatriz;

})();
