-- Create virtual_man_profiles table
CREATE TABLE public.virtual_man_profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name character varying NOT NULL UNIQUE,
    description text,
    characteristics jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$ LANGUAGE plpgsql;

-- Trigger to update updated_at on profile update
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.virtual_man_profiles
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();


ALTER TABLE public.virtual_man_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access"
ON public.virtual_man_profiles
FOR SELECT
USING (true);

-- Seed data for profiles
INSERT INTO public.virtual_man_profiles (name, description, characteristics) VALUES
('Avô', 'Sabedoria e tradição, com uma perspectiva de vida longa e protetora.', '{"communication_style": "calmo e ponderado", "personality_traits": ["sábio", "tradicional", "protetor", "nostálgico"], "core_values": ["família", "respeito", "legado"]}'),
('Marido', 'Parceria e responsabilidade, focado na dinâmica do relacionamento a dois.', '{"communication_style": "direto e prático", "personality_traits": ["parceiro", "responsável", "lógico", "protetor"], "core_values": ["compromisso", "estabilidade", "parceria"]}'),
('Filho Adolescente', 'Busca por identidade e conflito, influenciado pela sua geração.', '{"communication_style": "curto e digital", "personality_traits": ["reativo", "em desenvolvimento", "influenciável", "idealista"], "core_values": ["autonomia", "aceitação social", "justiça"]}'),
('Pai Apoiador', 'Uma figura paterna sábia e encorajadora, focada em apoio incondicional e conselhos práticos.', '{"communication_style": "gentil e direto", "personality_traits": ["empático", "paciente", "protetor", "sábio"], "core_values": ["família", "segurança", "honestidade"]}'),
('Amigo Sincero', 'Um amigo da mesma faixa etária, que oferece uma perspectiva honesta e companheira, como um igual.', '{"communication_style": "informal e honesto", "personality_traits": ["leal", "divertido", "direto", "companheiro"], "core_values": ["amizade", "lealdade", "autenticidade"]}'),
('Chefe Experiente', 'Um mentor profissional, com uma visão lógica e orientada a resultados sobre os desafios.', '{"communication_style": "formal e objetivo", "personality_traits": ["racional", "experiente", "respeitoso", "líder"], "core_values": ["eficiência", "respeito", "crescimento profissional"]}');

