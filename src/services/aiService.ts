import { Configuration, OpenAIApi } from 'openai';

// Configuração da API da OpenAI
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * Envia uma mensagem para o modelo de IA e retorna a resposta
 * @param message A mensagem do usuário
 * @param context Contexto adicional para a conversa
 * @returns Resposta da IA
 */
export const sendMessageToAI = async (message: string, context: string = '') => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Você é um assistente de IA útil. ${context}`,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.data.choices[0]?.message?.content || 'Desculpe, não consegui processar sua solicitação.';
  } catch (error) {
    console.error('Erro ao chamar a API da OpenAI:', error);
    return 'Desculpe, ocorreu um erro ao processar sua mensagem.';
  }
};

/**
 * Gera sugestões com base no contexto fornecido
 * @param context Contexto para gerar sugestões
 * @returns Lista de sugestões
 */
export const generateSuggestions = async (context: string) => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente que gera sugestões úteis baseadas no contexto fornecido. Retorne até 3 sugestões curtas em formato de lista.',
        },
        {
          role: 'user',
          content: `Gere sugestões úteis para: ${context}`,
        },
      ],
      temperature: 0.5,
      max_tokens: 150,
    });

    return response.data.choices[0]?.message?.content || 'Sem sugestões no momento.';
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error);
    return 'Não foi possível gerar sugestões no momento.';
  }
};
