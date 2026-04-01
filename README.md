# Client Template

A reusable project template for data analytics client engagements.

## Setup
1. Clone this repo
2. Copy `.env.example` to `.env` and fill in credentials
3. Install dependencies: `pip install -r requirements.txt`
4. Update `docs/client-notes.md` with client context

## Project Structure
- `data/raw/` — original source data, never modified
- `data/processed/` — cleaned and transformed data
- `notebooks/` — exploration and analysis
- `src/` — production scripts and pipelines
- `dashboards/` — visualization apps
- `docs/` — data dictionary and client notes