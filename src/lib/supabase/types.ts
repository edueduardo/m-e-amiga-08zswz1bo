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
      custom_reminders: {
        Row: {
          created_at: string
          cron_schedule: string
          id: string
          is_active: boolean | null
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cron_schedule: string
          id?: string
          is_active?: boolean | null
          message: string
          user_id: string
        }
        Update: {
          created_at?: string
          cron_schedule?: string
          id?: string
          is_active?: boolean | null
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'custom_reminders_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
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
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          name: string
          photo_url: string | null
          qualifications: string | null
          role: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          name: string
          photo_url?: string | null
          qualifications?: string | null
          role: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          qualifications?: string | null
          role?: string
        }
        Relationships: []
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
          notification_preferences: Json | null
          preferred_interaction_times: Json | null
          preferred_techniques:
            | Database['public']['Enums']['technique_category'][]
            | null
          relationship_status: string | null
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
          notification_preferences?: Json | null
          preferred_interaction_times?: Json | null
          preferred_techniques?:
            | Database['public']['Enums']['technique_category'][]
            | null
          relationship_status?: string | null
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
          notification_preferences?: Json | null
          preferred_interaction_times?: Json | null
          preferred_techniques?:
            | Database['public']['Enums']['technique_category'][]
            | null
          relationship_status?: string | null
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
        Args: Record<PropertyKey, never>
        Returns: {
          hour_of_day: number
          successful_interventions: number
          total_interventions: number
        }[]
      }
      get_technique_success_by_urge: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: Database['public']['Enums']['technique_category']
          intensity: number
          successful_interventions: number
          total_interventions: number
        }[]
      }
      upsert_user_preferences: {
        Args: {
          p: Json
        }
        Returns: undefined
      }
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

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
