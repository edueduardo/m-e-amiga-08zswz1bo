// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      cbt_progress: {
        Row: {
          completed: boolean | null
          id: string
          quiz_score: number | null
          step_id: string
          track_id: string
          ts: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          id?: string
          quiz_score?: number | null
          step_id: string
          track_id: string
          ts?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          id?: string
          quiz_score?: number | null
          step_id?: string
          track_id?: string
          ts?: string | null
          user_id?: string
        }
        Relationships: []
      }
      challenges: {
        Row: {
          category: string | null
          community_challenge: boolean | null
          created_at: string | null
          description: string | null
          duration_days: number | null
          end_date: string | null
          id: string
          start_date: string | null
          title: string
        }
        Insert: {
          category?: string | null
          community_challenge?: boolean | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title: string
        }
        Update: {
          category?: string | null
          community_challenge?: boolean | null
          created_at?: string | null
          description?: string | null
          duration_days?: number | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title?: string
        }
        Relationships: []
      }
      checkins: {
        Row: {
          hunger_type: Database['public']['Enums']['hunger_type'] | null
          id: string
          mood: number | null
          sleep_hours: number | null
          stress: number | null
          ts: string | null
          user_id: string
        }
        Insert: {
          hunger_type?: Database['public']['Enums']['hunger_type'] | null
          id?: string
          mood?: number | null
          sleep_hours?: number | null
          stress?: number | null
          ts?: string | null
          user_id: string
        }
        Update: {
          hunger_type?: Database['public']['Enums']['hunger_type'] | null
          id?: string
          mood?: number | null
          sleep_hours?: number | null
          stress?: number | null
          ts?: string | null
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string | null
          content_url: string | null
          created_at: string | null
          description: string | null
          id: string
          title: string
        }
        Insert: {
          category?: string | null
          content_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: string | null
          content_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      emergency_contacts: {
        Row: {
          id: string
          name: string | null
          phone: string | null
          relationship: string | null
          user_id: string
        }
        Insert: {
          id?: string
          name?: string | null
          phone?: string | null
          relationship?: string | null
          user_id: string
        }
        Update: {
          id?: string
          name?: string | null
          phone?: string | null
          relationship?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meals: {
        Row: {
          context_tags: string[] | null
          id: string
          photo_url: string | null
          ts: string | null
          user_id: string
        }
        Insert: {
          context_tags?: string[] | null
          id?: string
          photo_url?: string | null
          ts?: string | null
          user_id: string
        }
        Update: {
          context_tags?: string[] | null
          id?: string
          photo_url?: string | null
          ts?: string | null
          user_id?: string
        }
        Relationships: []
      }
      org_aggregates: {
        Row: {
          id: string
          metrics: Json | null
          org_id: string
          ts: string | null
        }
        Insert: {
          id?: string
          metrics?: Json | null
          org_id: string
          ts?: string | null
        }
        Update: {
          id?: string
          metrics?: Json | null
          org_id?: string
          ts?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'org_aggregates_org_id_fkey'
            columns: ['org_id']
            isOneToOne: false
            referencedRelation: 'orgs'
            referencedColumns: ['id']
          },
        ]
      }
      org_members: {
        Row: {
          id: string
          org_id: string
          role: string | null
          user_id: string
        }
        Insert: {
          id?: string
          org_id: string
          role?: string | null
          user_id: string
        }
        Update: {
          id?: string
          org_id?: string
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'org_members_org_id_fkey'
            columns: ['org_id']
            isOneToOne: false
            referencedRelation: 'orgs'
            referencedColumns: ['id']
          },
        ]
      }
      orgs: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      pattern_insights: {
        Row: {
          id: string
          insight: string | null
          kind: Database['public']['Enums']['insight_kind']
          ts: string | null
          user_id: string
        }
        Insert: {
          id?: string
          insight?: string | null
          kind: Database['public']['Enums']['insight_kind']
          ts?: string | null
          user_id: string
        }
        Update: {
          id?: string
          insight?: string | null
          kind?: Database['public']['Enums']['insight_kind']
          ts?: string | null
          user_id?: string
        }
        Relationships: []
      }
      privacy_settings: {
        Row: {
          auto_delete: string | null
          data_sharing: string | null
          export_frequency: string | null
          id: string
          user_id: string
        }
        Insert: {
          auto_delete?: string | null
          data_sharing?: string | null
          export_frequency?: string | null
          id?: string
          user_id: string
        }
        Update: {
          auto_delete?: string | null
          data_sharing?: string | null
          export_frequency?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      safety_flags: {
        Row: {
          id: string
          level: Database['public']['Enums']['safety_flag_level']
          source: string | null
          ts: string | null
          user_id: string
        }
        Insert: {
          id?: string
          level: Database['public']['Enums']['safety_flag_level']
          source?: string | null
          ts?: string | null
          user_id: string
        }
        Update: {
          id?: string
          level?: Database['public']['Enums']['safety_flag_level']
          source?: string | null
          ts?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scheduled_notifications: {
        Row: {
          id: string
          is_read: boolean | null
          message: string | null
          notification_type: string | null
          scheduled_at: string
          sent: boolean | null
          user_id: string
        }
        Insert: {
          id?: string
          is_read?: boolean | null
          message?: string | null
          notification_type?: string | null
          scheduled_at: string
          sent?: boolean | null
          user_id: string
        }
        Update: {
          id?: string
          is_read?: boolean | null
          message?: string | null
          notification_type?: string | null
          scheduled_at?: string
          sent?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      sos_sessions: {
        Row: {
          duration_seconds: number | null
          id: string
          technique_usage_id: string | null
          ts: string | null
          urge_id: string | null
          user_id: string
        }
        Insert: {
          duration_seconds?: number | null
          id?: string
          technique_usage_id?: string | null
          ts?: string | null
          urge_id?: string | null
          user_id: string
        }
        Update: {
          duration_seconds?: number | null
          id?: string
          technique_usage_id?: string | null
          ts?: string | null
          urge_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'sos_sessions_technique_usage_id_fkey'
            columns: ['technique_usage_id']
            isOneToOne: false
            referencedRelation: 'technique_usage'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sos_sessions_urge_id_fkey'
            columns: ['urge_id']
            isOneToOne: false
            referencedRelation: 'urges'
            referencedColumns: ['id']
          },
        ]
      }
      technique_catalog: {
        Row: {
          category: Database['public']['Enums']['technique_category']
          description: string | null
          duration_minutes: number | null
          id: string
          name: string
        }
        Insert: {
          category: Database['public']['Enums']['technique_category']
          description?: string | null
          duration_minutes?: number | null
          id?: string
          name: string
        }
        Update: {
          category?: Database['public']['Enums']['technique_category']
          description?: string | null
          duration_minutes?: number | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      technique_usage: {
        Row: {
          helped: boolean | null
          id: string
          technique_id: string
          ts: string | null
          user_id: string
        }
        Insert: {
          helped?: boolean | null
          id?: string
          technique_id: string
          ts?: string | null
          user_id: string
        }
        Update: {
          helped?: boolean | null
          id?: string
          technique_id?: string
          ts?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'technique_usage_technique_id_fkey'
            columns: ['technique_id']
            isOneToOne: false
            referencedRelation: 'technique_catalog'
            referencedColumns: ['id']
          },
        ]
      }
      urges: {
        Row: {
          id: string
          intensity: number | null
          resolved: boolean | null
          ts: string | null
          user_id: string
        }
        Insert: {
          id?: string
          intensity?: number | null
          resolved?: boolean | null
          ts?: string | null
          user_id: string
        }
        Update: {
          id?: string
          intensity?: number | null
          resolved?: boolean | null
          ts?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          available_time: string | null
          created_at: string | null
          geofences: Json | null
          goals: string | null
          home_page_layout: Json | null
          id: string
          mode_vacation: boolean | null
          preferred_techniques:
            | Database['public']['Enums']['technique_category'][]
            | null
          trigger_patterns: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          available_time?: string | null
          created_at?: string | null
          geofences?: Json | null
          goals?: string | null
          home_page_layout?: Json | null
          id?: string
          mode_vacation?: boolean | null
          preferred_techniques?:
            | Database['public']['Enums']['technique_category'][]
            | null
          trigger_patterns?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          available_time?: string | null
          created_at?: string | null
          geofences?: Json | null
          goals?: string | null
          home_page_layout?: Json | null
          id?: string
          mode_vacation?: boolean | null
          preferred_techniques?:
            | Database['public']['Enums']['technique_category'][]
            | null
          trigger_patterns?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_success_by_hour: {
        Args: never
        Returns: {
          hour_of_day: number
          successful_interventions: number
          total_interventions: number
        }[]
      }
      get_technique_success_by_urge: {
        Args: never
        Returns: {
          category: Database['public']['Enums']['technique_category']
          intensity: number
          successful_interventions: number
          total_interventions: number
        }[]
      }
      upsert_user_preferences: { Args: { p: Json }; Returns: undefined }
    }
    Enums: {
      hunger_type: 'physical' | 'emotional'
      insight_kind: 'emotion' | 'trigger'
      safety_flag_level: 'green' | 'yellow' | 'red'
      technique_category:
        | 'breathing'
        | 'urge_surfing'
        | 'delay'
        | 'safe_plate'
        | 'reframing'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      hunger_type: ['physical', 'emotional'],
      insight_kind: ['emotion', 'trigger'],
      safety_flag_level: ['green', 'yellow', 'red'],
      technique_category: [
        'breathing',
        'urge_surfing',
        'delay',
        'safe_plate',
        'reframing',
      ],
    },
  },
} as const
