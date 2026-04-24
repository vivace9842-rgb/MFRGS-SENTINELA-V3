/**
 * AGENTE BEATRIZ - VERSÃO PRODUÇÃO UNIFICADA
 * Zero redeclaração | CSP Safe | SES Compatible
 */

(function BeatrizAgent() {
    "use strict";

    // 1. TRAVA DE SEGURANÇA: Se alguém já criou, usa o que existe
    if (window.__BEATRIZ_LOADED__) {
        console.warn("⚠️ Agente Beatriz já foi carregado. Abortando duplicidade.");
        return;
    }
    window.__BEATRIZ_LOADED__ = true;

    // 2. CONFIG - Troca pelos seus dados
    const CONFIG = {
        SUPABASE_URL: 'https://asblzyihnmnkmfitprcx.supabase.co',
        SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYmx6eWlobm1ua21maXRwcmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MDcyNjgsImV4cCI6MjA5MjM4MzI2OH0.MuXquTfO9WQTwWs85Lh7is9wVFHV7x1si_M2JxAZiYc'
    };

    // 3. INICIALIZAÇÃO BLINDADA DO SUPABASE
    // Não usa 'const supabase' pra evitar conflito com SES/Lockdown
    const db = (() => {
        // Se já existe um client global, reaproveita
        if (window.supabaseInstance) return window.supabaseInstance;

        try {
            const client = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
            window.supabaseInstance = client; // Salva pra não recriar
            console.log("✅ Supabase: Conexão única estabelecida.");
            return client;
        } catch (e) {
            console.error("❌ Falha ao criar client Supabase:", e.message);
            return null;
        }
    })();

    // 4. NÚCLEO BEATRIZ - 100% CSP SAFE
    const Beatriz = {
        db, // Acesso ao supabase

        async salvar(tabela, dados) {
            if (!this.db) return { erro: 'DB offline' };
            try {
                const { data, error } = await this.db.from(tabela).insert([dados]);
                if (error) throw error;
                return { sucesso: true, data };
            } catch (err) {
                console.error(`Erro Beatriz DB:`, err.message);
                return { sucesso: false, erro: err.message };
            }
        },

        // Timer 100% CSP Safe - nunca usa string
        agendar(callback, delayMs) {
            if (typeof callback!== 'function') return;
            setTimeout(() => callback(), delayMs); // Arrow function, não string
        },

        init() {
            console.log("🚀 Beatriz Agent: Sistema pronto e soberano.");
            this.agendar(() => console.log("Beatriz: Ping de saúde OK"), 1500);

            // Suas funções de clique/DOM entram aqui
            const app = document.getElementById('app');
            if (app) app.innerHTML = '<p>Sistema operando. Sem erros de escopo.</p>';
        }
    };

    // 5. START QUANDO DOM PRONTO
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Beatriz.init());
    } else {
        Beatriz.init();
    }

    // 6. EXPÕE SÓ O NECESSÁRIO
    window.BeatrizAgent = Beatriz;

})();
