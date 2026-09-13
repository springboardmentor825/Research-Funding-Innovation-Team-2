"""Lazy Supabase client for document storage."""

from functools import lru_cache
import os

from supabase import Client, create_client


class SupabaseConfigurationError(RuntimeError):
    pass


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise SupabaseConfigurationError(
            "Document storage is not configured. Set SUPABASE_URL and SUPABASE_KEY."
        )
    return create_client(url, key)
