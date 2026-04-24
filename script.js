// CONFIGURAÇÃO DE SOBERANIA
const GOOGLE_AI_KEY = "AIzaSyCIzabDvqzIqLFatrQx-MVOqXLh6urJAL0"; 
const SUPABASE_URL = 'https://asblzyihnmnkmfitprcx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzYmx6eWlobm1ua21maXRwcmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MDcyNjgsImV4cCI6MjA5MjM4MzI2OH0.MuXquTfO9WQTwWs85Lh7is9wVFHV7x1si_M2JxAZiYc';

const supabase = lib.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function ativacaoBeatriz(leadId) {
    console.log("Iniciando Protocolo de Fechamento para o lead:", leadId);
    // Lógica de conexão direta com o Google AI Studio para análise de dor financeira
}

// Carregar leads de Jequié com foco no Dr. Marcos
async function loadLeads() {
    const { data, error } = await supabase.from('leads').select('*').eq('cidade', 'Jequié');
    // Renderização da tabela tática
}

window.onload = loadLeads;
