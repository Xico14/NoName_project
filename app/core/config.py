from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="NONAME_", extra="ignore")

    app_name: str = Field(default="NoName MVP Backend")
    environment: str = Field(default="development")
    version: str = Field(default="0.1.0")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
