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
          creator_user_id: string | null
          description: string | null
          duration_days: number | null
          end_date: string | null
          id: string
          start_date: string | null
          title: string
          visibility_status: string | null
        }
        Insert: {
          category?: string | null
          community_challenge?: boolean | null
          created_at?: string | null
          creator_user_id?: string | null
          description?: string | null
          duration_days?: number | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title: string
          visibility_status?: string | null
        }
        Update: {
          category?: string | null
          community_challenge?: boolean | null
          created_at?: string | null
          creator_user_id?: string | null
          description?: string | null
          duration_days?: number | null
          end_date?: string | null
          id?: string
          start_date?: string | null
          title?: string
          visibility_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'challenges_creator_user_id_fkey'
            columns: ['creator_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          room_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          room_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'chat_messages_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'support_rooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'chat_messages_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
      coaching_sessions: {
        Row: {
          id: string
          messages: Json
          started_at: string
          status: Database['public']['Enums']['coaching_session_status']
          title: string
          user_id: string
        }
        Insert: {
          id?: string
          messages?: Json
          started_at: string
          status?: Database['public']['Enums']['coaching_session_status']
          title: string
          user_id: string
        }
        Update: {
          id?: string
          messages?: Json
          started_at?: string
          status?: Database['public']['Enums']['coaching_session_status']
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          audio_url: string | null
          created_at: string
          feedback: Json | null
          id: string
          mood_label: string
          mother_reply: string
          professional_help_suggestion: string | null
          transcript: string
          user_id: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          feedback?: Json | null
          id?: string
          mood_label: string
          mother_reply: string
          professional_help_suggestion?: string | null
          transcript: string
          user_id: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          feedback?: Json | null
          id?: string
          mood_label?: string
          mother_reply?: string
          professional_help_suggestion?: string | null
          transcript?: string
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string | null
          content_data: Json | null
          content_url: string | null
          created_at: string | null
          description: string | null
          id: string
          slug: string | null
          title: string
        }
        Insert: {
          category?: string | null
          content_data?: Json | null
          content_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          slug?: string | null
          title: string
        }
        Update: {
          category?: string | null
          content_data?: Json | null
          content_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          slug?: string | null
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
      gamification_profiles: {
        Row: {
          level: number
          points: number
          unlocked_badges: string[]
          user_id: string
        }
        Insert: {
          level?: number
          points?: number
          unlocked_badges?: string[]
          user_id: string
        }
        Update: {
          level?: number
          points?: number
          unlocked_badges?: string[]
          user_id?: string
        }
        Relationships: []
      }
      growth_garden_elements: {
        Row: {
          customization_options: Json | null
          element_type: string | null
          goal_id: string
          id: string
          position: Json
          status: Database['public']['Enums']['garden_element_status']
          user_id: string
        }
        Insert: {
          customization_options?: Json | null
          element_type?: string | null
          goal_id: string
          id?: string
          position: Json
          status?: Database['public']['Enums']['garden_element_status']
          user_id: string
        }
        Update: {
          customization_options?: Json | null
          element_type?: string | null
          goal_id?: string
          id?: string
          position?: Json
          status?: Database['public']['Enums']['garden_element_status']
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'growth_garden_elements_goal_id_fkey'
            columns: ['goal_id']
            isOneToOne: false
            referencedRelation: 'growth_garden_goals'
            referencedColumns: ['id']
          },
        ]
      }
      growth_garden_goals: {
        Row: {
          current_count: number
          id: string
          related_feature: Database['public']['Enums']['garden_related_feature']
          target_count: number
          title: string
          user_id: string
        }
        Insert: {
          current_count?: number
          id?: string
          related_feature: Database['public']['Enums']['garden_related_feature']
          target_count: number
          title: string
          user_id: string
        }
        Update: {
          current_count?: number
          id?: string
          related_feature?: Database['public']['Enums']['garden_related_feature']
          target_count?: number
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string
          created_at: string
          date: string
          id: string
          media_attachments: Json | null
          prompt: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          date: string
          id?: string
          media_attachments?: Json | null
          prompt: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          date?: string
          id?: string
          media_attachments?: Json | null
          prompt?: string
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
      music_tracks: {
        Row: {
          artist: string | null
          audio_url: string
          category: string | null
          created_at: string
          id: string
          is_user_uploaded: boolean | null
          title: string
          user_id: string | null
        }
        Insert: {
          artist?: string | null
          audio_url: string
          category?: string | null
          created_at?: string
          id?: string
          is_user_uploaded?: boolean | null
          title: string
          user_id?: string | null
        }
        Update: {
          artist?: string | null
          audio_url?: string
          category?: string | null
          created_at?: string
          id?: string
          is_user_uploaded?: boolean | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'music_tracks_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
          analysis_data: Json | null
          id: string
          insight: string | null
          kind: Database['public']['Enums']['insight_kind']
          ts: string | null
          user_id: string
        }
        Insert: {
          analysis_data?: Json | null
          id?: string
          insight?: string | null
          kind: Database['public']['Enums']['insight_kind']
          ts?: string | null
          user_id: string
        }
        Update: {
          analysis_data?: Json | null
          id?: string
          insight?: string | null
          kind?: Database['public']['Enums']['insight_kind']
          ts?: string | null
          user_id?: string
        }
        Relationships: []
      }
      planner_tasks: {
        Row: {
          content: string
          due_date: string | null
          id: string
          status: Database['public']['Enums']['planner_task_status']
          user_id: string
        }
        Insert: {
          content: string
          due_date?: string | null
          id?: string
          status?: Database['public']['Enums']['planner_task_status']
          user_id: string
        }
        Update: {
          content?: string
          due_date?: string | null
          id?: string
          status?: Database['public']['Enums']['planner_task_status']
          user_id?: string
        }
        Relationships: []
      }
      playlists: {
        Row: {
          created_at: string
          id: string
          name: string
          track_ids: string[]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          track_ids?: string[]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          track_ids?: string[]
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
      private_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          privacy_settings: Json | null
          read_status: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          privacy_settings?: Json | null
          read_status?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          privacy_settings?: Json | null
          read_status?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'private_messages_receiver_id_fkey'
            columns: ['receiver_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'private_messages_sender_id_fkey'
            columns: ['sender_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          full_name: string | null
          id: string
          is_two_factor_enabled: boolean | null
          phone_number: string | null
          phone_verification_status:
            | Database['public']['Enums']['phone_verification_status']
            | null
          role: string
          updated_at: string | null
        }
        Insert: {
          full_name?: string | null
          id: string
          is_two_factor_enabled?: boolean | null
          phone_number?: string | null
          phone_verification_status?:
            | Database['public']['Enums']['phone_verification_status']
            | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          full_name?: string | null
          id?: string
          is_two_factor_enabled?: boolean | null
          phone_number?: string | null
          phone_verification_status?:
            | Database['public']['Enums']['phone_verification_status']
            | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reflection_exercises: {
        Row: {
          content: string
          created_at: string
          id: string
          insight_id: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          insight_id?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          insight_id?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reflection_exercises_insight_id_fkey'
            columns: ['insight_id']
            isOneToOne: false
            referencedRelation: 'pattern_insights'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reflection_exercises_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
      self_care_history: {
        Row: {
          answers: Json
          date: string
          id: string
          plan: Json
          user_id: string
        }
        Insert: {
          answers: Json
          date: string
          id?: string
          plan: Json
          user_id: string
        }
        Update: {
          answers?: Json
          date?: string
          id?: string
          plan?: Json
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
      support_posts: {
        Row: {
          author_alias: string
          content: string
          created_at: string
          id: string
          room_id: string
          title: string
          user_id: string
        }
        Insert: {
          author_alias: string
          content: string
          created_at?: string
          id?: string
          room_id: string
          title: string
          user_id: string
        }
        Update: {
          author_alias?: string
          content?: string
          created_at?: string
          id?: string
          room_id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'support_posts_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'support_rooms'
            referencedColumns: ['id']
          },
        ]
      }
      support_replies: {
        Row: {
          author_alias: string
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          author_alias: string
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          author_alias?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'support_replies_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'support_posts'
            referencedColumns: ['id']
          },
        ]
      }
      support_rooms: {
        Row: {
          description: string
          icon_name: string
          id: string
          name: string
        }
        Insert: {
          description: string
          icon_name: string
          id?: string
          name: string
        }
        Update: {
          description?: string
          icon_name?: string
          id?: string
          name?: string
        }
        Relationships: []
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
      user_certificates: {
        Row: {
          certificate_type: string
          certificate_url: string
          completion_date: string
          created_at: string
          id: string
          unique_certificate_id: string
          user_id: string
        }
        Insert: {
          certificate_type: string
          certificate_url: string
          completion_date?: string
          created_at?: string
          id?: string
          unique_certificate_id: string
          user_id: string
        }
        Update: {
          certificate_type?: string
          certificate_url?: string
          completion_date?: string
          created_at?: string
          id?: string
          unique_certificate_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_certificates_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
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
      virtual_man_feedback_analysis: {
        Row: {
          analysis_date: string
          common_negative_keywords: Json | null
          common_positive_keywords: Json | null
          id: string
          improvement_suggestions: string | null
          negative_feedback_count: number
          positive_feedback_count: number
        }
        Insert: {
          analysis_date?: string
          common_negative_keywords?: Json | null
          common_positive_keywords?: Json | null
          id?: string
          improvement_suggestions?: string | null
          negative_feedback_count?: number
          positive_feedback_count?: number
        }
        Update: {
          analysis_date?: string
          common_negative_keywords?: Json | null
          common_positive_keywords?: Json | null
          id?: string
          improvement_suggestions?: string | null
          negative_feedback_count?: number
          positive_feedback_count?: number
        }
        Relationships: []
      }
      virtual_man_interactions: {
        Row: {
          ai_response: Json
          created_at: string
          feedback_comment: string | null
          feedback_rating: string | null
          id: string
          profile_selected: string
          user_id: string
          user_query: string
        }
        Insert: {
          ai_response: Json
          created_at?: string
          feedback_comment?: string | null
          feedback_rating?: string | null
          id?: string
          profile_selected: string
          user_id: string
          user_query: string
        }
        Update: {
          ai_response?: Json
          created_at?: string
          feedback_comment?: string | null
          feedback_rating?: string | null
          id?: string
          profile_selected?: string
          user_id?: string
          user_query?: string
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
      coaching_session_status: 'active' | 'completed' | 'paused'
      garden_element_status: 'seed' | 'seedling' | 'flower'
      garden_related_feature: 'journal' | 'challenge' | 'course'
      hunger_type: 'physical' | 'emotional'
      insight_kind: 'emotion' | 'trigger'
      phone_verification_status: 'verified' | 'pending_email' | 'not_verified'
      planner_task_status: 'todo' | 'in-progress' | 'done'
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
      coaching_session_status: ['active', 'completed', 'paused'],
      garden_element_status: ['seed', 'seedling', 'flower'],
      garden_related_feature: ['journal', 'challenge', 'course'],
      hunger_type: ['physical', 'emotional'],
      insight_kind: ['emotion', 'trigger'],
      phone_verification_status: ['verified', 'pending_email', 'not_verified'],
      planner_task_status: ['todo', 'in-progress', 'done'],
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
