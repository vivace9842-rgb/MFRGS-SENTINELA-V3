// CONFIGURAÇÃO ÚNICA - Preencha aqui e o sistema cuidará do resto
const CONFIG = {
    SUPABASE_URL: ''https://asblzyihnmnkmfitprcx.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYmx6eWlobm1ua21maXRwcmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MDcyNjgsImV4cCI6MjA5MjM4MzI2OH0.MuXquTfO9WQTwWs85Lh7is9wVFHV7x1si_M2JxAZiYc',
    GOOGLE_KEY: 'AIzaSyCIzabDvqzIqLFatrQx-MVOqXLh6urJAL0'
};

// Declaração única e global
const supabaseClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

async function initSentinela() {
    const statusEl = document.getElementById('sys-status');
    
    try {
        // 1. Testar Conexão Beatriz (Google AI)
        const aiTest = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${CONFIG.GOOGLE_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: 'teste' }] }] })
        });

        if (aiTest.status === 200) {
            statusEl.innerText = "SISTEMA ATIVO - BEATRIZ ONLINE";
            statusEl.style.color = "#2ecc71";
            console.log("✅ Beatriz conectada.");
        } else {
            statusEl.innerText = "ERRO NA CHAVE AI";
            statusEl.style.color = "#e74c3c";
        }

        // 2. Carregar Leads (Exemplo Jequié)
        loadTable();

    } catch (err) {
        console.error("Falha na ignição:", err);
        statusEl.innerText = "FALHA DE CONEXÃO";
    }
}

async function loadTable() {
    const { data, error } = await supabaseClient.from('leads').select('*').eq('cidade', 'Jequié');
    const tableBody = document.getElementById('leads-body');
    
    if (data) {
        tableBody.innerHTML = data.map(lead => `
            <tr>
                <td>${lead.empresa}</td>
                <td>${lead.responsavel}</td>
                <td>${lead.status}</td>
                <td><button class="btn-ativar" onclick="ativarProtocolo('${lead.id}')">Ativar Beatriz</button></td>
            </tr>
        `).join('');
    }
}

function ativarProtocolo(id) {
    alert("Beatriz processando fechamento para o lead " + id);
}

// Iniciar
window.onload = initSentinela;
